import { NextRequest, NextResponse } from "next/server";
import { google } from "googleapis";
import { adminEmailHtml, confirmationEmailHtml } from "./email-templates";

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

    await Promise.all([
      gmail.users.messages.send({ userId: "me", requestBody: { raw: adminRaw } }),
      gmail.users.messages.send({ userId: "me", requestBody: { raw: confirmRaw } }),
    ]);

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("[contact] Gmail API error:", error);
    return NextResponse.json({ error: "Failed to send your message. Please try again." }, { status: 500 });
  }
}
