import { after } from "next/server";
import { NextRequest, NextResponse } from "next/server";
import { google } from "googleapis";
import { adminEmailHtml, confirmationEmailHtml } from "./email-templates";

// In-memory rate limiter — 3 submissions per IP per minute.
// Per-instance only (serverless), but sufficient to block basic bursts.
const rateLimitMap = new Map<string, { count: number; reset: number }>();
const RATE_LIMIT = 3;
const RATE_WINDOW_MS = 60 * 1000;

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);
  if (!entry || now > entry.reset) {
    rateLimitMap.set(ip, { count: 1, reset: now + RATE_WINDOW_MS });
    return false;
  }
  if (entry.count >= RATE_LIMIT) return true;
  entry.count++;
  return false;
}

function buildRfc2822(from: string, to: string, replyTo: string, subject: string, body: string, contentType = "text/plain"): string {
  const lines = [
    `From: MoRoute <${from}>`,
    `To: ${to}`,
    `Reply-To: ${replyTo}`,
    `Subject: ${subject}`,
    `MIME-Version: 1.0`,
    `Content-Type: ${contentType}; charset=utf-8`,
    ``,
    body,
  ];
  return Buffer.from(lines.join("\r\n")).toString("base64url");
}

export async function POST(request: NextRequest) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0].trim() ?? "unknown";
  if (isRateLimited(ip)) {
    return NextResponse.json({ error: "Too many requests. Please wait a moment and try again." }, { status: 429 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const { name, email, message } = body as Record<string, unknown>;

  if (typeof name !== "string" || !name.trim()) {
    return NextResponse.json({ error: "Name is required." }, { status: 400 });
  }
  if (typeof email !== "string" || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
    return NextResponse.json({ error: "A valid email address is required." }, { status: 400 });
  }
  if (typeof message !== "string" || !message.trim()) {
    return NextResponse.json({ error: "Message is required." }, { status: 400 });
  }
  if (message.length > 2000) {
    return NextResponse.json({ error: "Message must be 2000 characters or fewer." }, { status: 400 });
  }

  const sendAs = process.env.GOOGLE_SEND_AS;
  const sendTo = process.env.CONTACT_FORM_TO;

  if (!process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_CLIENT_SECRET || !process.env.GOOGLE_REFRESH_TOKEN || !sendAs || !sendTo) {
    console.warn("[contact] Gmail credentials not configured — check env vars.");
    return NextResponse.json({ error: "Email service is not configured yet." }, { status: 503 });
  }

  try {
    const auth = new google.auth.OAuth2(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET,
    );
    auth.setCredentials({ refresh_token: process.env.GOOGLE_REFRESH_TOKEN });

    const gmail = google.gmail({ version: "v1", auth });

    const adminRaw = buildRfc2822(
      sendAs, sendTo, email.trim(),
      `New message from ${name.trim()} via MoRoute`,
      adminEmailHtml(name.trim(), email.trim(), message.trim()),
      "text/html",
    );
    const confirmRaw = buildRfc2822(
      sendAs, email.trim(), sendAs,
      `We received your message`,
      confirmationEmailHtml(name.trim(), message.trim()),
      "text/html",
    );

    after(async () => {
      const timeout = new Promise<never>((_, reject) =>
        setTimeout(() => reject(new Error("Gmail API timeout")), 10_000)
      );
      try {
        await Promise.race([
          Promise.all([
            gmail.users.messages.send({ userId: "me", requestBody: { raw: adminRaw } }),
            gmail.users.messages.send({ userId: "me", requestBody: { raw: confirmRaw } }),
          ]),
          timeout,
        ]);
      } catch (err) {
        const msg = err instanceof Error ? err.message : "unknown error";
        console.error("[contact] Gmail API error:", msg);
      }
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    const msg = error instanceof Error ? error.message : "unknown error";
    console.error("[contact] setup error:", msg);
    return NextResponse.json({ error: "Failed to send your message. Please try again." }, { status: 500 });
  }
}
