import { NextRequest, NextResponse } from "next/server";
import { google } from "googleapis";

function buildRfc2822(from: string, to: string, replyTo: string, subject: string, body: string): string {
  const lines = [
    `From: MoRoute <${from}>`,
    `To: ${to}`,
    `Reply-To: ${replyTo}`,
    `Subject: ${subject}`,
    `MIME-Version: 1.0`,
    `Content-Type: text/plain; charset=utf-8`,
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

  const serviceEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  const privateKey = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n");
  const sendAs = process.env.GOOGLE_SEND_AS;
  const sendTo = process.env.CONTACT_FORM_TO;

  if (!serviceEmail || !privateKey || !sendAs || !sendTo) {
    console.warn("[contact] Gmail credentials not configured — check env vars.");
    return NextResponse.json({ error: "Email service is not configured yet." }, { status: 503 });
  }

  try {
    const auth = new google.auth.JWT({
      email: serviceEmail,
      key: privateKey,
      scopes: ["https://www.googleapis.com/auth/gmail.send"],
      subject: sendAs,
    });

    const gmail = google.gmail({ version: "v1", auth });

    const subject = `New message from ${name.trim()} via MoRoute`;
    const emailBody = [
      `Name:    ${name.trim()}`,
      `Email:   ${email.trim()}`,
      ``,
      `Message:`,
      message.trim(),
    ].join("\n");

    const raw = buildRfc2822(sendAs, sendTo, email.trim(), subject, emailBody);

    await gmail.users.messages.send({ userId: "me", requestBody: { raw } });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("[contact] Gmail API error:", error);
    return NextResponse.json({ error: "Failed to send your message. Please try again." }, { status: 500 });
  }
}
