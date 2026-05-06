function esc(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

function nl2br(s: string): string {
  return esc(s).replace(/\n/g, "<br>");
}

export function adminEmailHtml(name: string, email: string, message: string): string {
  const n = esc(name);
  const e = esc(email);
  const m = nl2br(message);
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="color-scheme" content="light">
<meta name="supported-color-schemes" content="light">
<style>:root{color-scheme:light}</style>
</head>
<body style="margin:0;padding:0;background:#f3f7fb;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#f3f7fb;padding:32px 16px;">
<tr><td align="center">
<table width="560" cellpadding="0" cellspacing="0" border="0" style="max-width:560px;width:100%;">

<tr><td bgcolor="#0a1e36" style="background:#0a1e36;border-radius:16px 16px 0 0;padding:20px 28px;">
<table width="100%" cellpadding="0" cellspacing="0" border="0"><tr>
<td><span style="color:#16c784;font-size:18px;font-weight:800;letter-spacing:-0.02em;">MoRoute</span></td>
<td align="right"><span style="display:inline-block;background:#16c784;color:#053b2a;font-size:10px;font-weight:700;padding:4px 10px;border-radius:999px;letter-spacing:0.06em;text-transform:uppercase;">New Message</span></td>
</tr></table>
</td></tr>

<tr><td bgcolor="#ffffff" style="background:#ffffff;padding:28px;">
<p style="margin:0 0 4px;font-size:22px;font-weight:700;color:#0e1b2c;letter-spacing:-0.02em;">Contact Form Submission</p>
<p style="margin:0 0 24px;font-size:14px;color:#69809f;">Someone reached out via moroute.com</p>

<table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:10px;">
<tr><td bgcolor="#f3f7fb" style="background:#f3f7fb;border-radius:10px;padding:14px 16px;border-left:3px solid #16c784;">
<p style="margin:0 0 4px;font-size:10px;font-weight:700;color:#69809f;text-transform:uppercase;letter-spacing:0.1em;">Name</p>
<p style="margin:0;font-size:15px;font-weight:600;color:#0e1b2c;">${n}</p>
</td></tr></table>

<table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:10px;">
<tr><td bgcolor="#f3f7fb" style="background:#f3f7fb;border-radius:10px;padding:14px 16px;border-left:3px solid #16c784;">
<p style="margin:0 0 4px;font-size:10px;font-weight:700;color:#69809f;text-transform:uppercase;letter-spacing:0.1em;">Email</p>
<a href="mailto:${e}" style="font-size:15px;font-weight:600;color:#2e79e9;text-decoration:none;">${e}</a>
</td></tr></table>

<table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:24px;">
<tr><td bgcolor="#f3f7fb" style="background:#f3f7fb;border-radius:10px;padding:14px 16px;border-left:3px solid #16c784;">
<p style="margin:0 0 8px;font-size:10px;font-weight:700;color:#69809f;text-transform:uppercase;letter-spacing:0.1em;">Message</p>
<p style="margin:0;font-size:14px;color:#2f4664;line-height:1.7;">${m}</p>
</td></tr></table>

<table cellpadding="0" cellspacing="0" border="0">
<tr><td bgcolor="#16c784" style="background:#16c784;border-radius:10px;">
<a href="mailto:${e}" style="display:inline-block;padding:12px 20px;font-size:13px;font-weight:700;color:#053b2a;text-decoration:none;">Reply to ${n}</a>
</td></tr></table>
</td></tr>

<tr><td bgcolor="#f3f7fb" style="background:#f3f7fb;border-radius:0 0 16px 16px;padding:14px 28px;text-align:center;border-top:1px solid #e2eaf3;">
<p style="margin:0;font-size:12px;color:#69809f;">Sent via the contact form at <a href="https://www.moroute.com" style="color:#0f8f62;text-decoration:none;">moroute.com</a></p>
</td></tr>

</table>
</td></tr>
</table>
</body>
</html>`;
}

export function confirmationEmailHtml(name: string, message: string): string {
  const n = esc(name);
  const m = nl2br(message);
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="color-scheme" content="light">
<meta name="supported-color-schemes" content="light">
<style>:root{color-scheme:light}</style>
</head>
<body style="margin:0;padding:0;background:#f3f7fb;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#f3f7fb;padding:32px 16px;">
<tr><td align="center">
<table width="560" cellpadding="0" cellspacing="0" border="0" style="max-width:560px;width:100%;">

<tr><td bgcolor="#0a1e36" style="background:#0a1e36;border-radius:16px 16px 0 0;padding:20px 28px;">
<span style="color:#16c784;font-size:18px;font-weight:800;letter-spacing:-0.02em;">MoRoute</span>
</td></tr>

<tr><td bgcolor="#07182e" style="background:#07182e;padding:36px 28px;text-align:center;">
<table width="100%" cellpadding="0" cellspacing="0" border="0">
<tr><td align="center" style="padding-bottom:16px;">
<table cellpadding="0" cellspacing="0" border="0"><tr>
<td width="60" height="60" bgcolor="#1a3a25" style="background:rgba(22,199,132,0.18);border-radius:30px;width:60px;height:60px;text-align:center;vertical-align:middle;">
<span style="font-size:26px;color:#16c784;line-height:60px;">&#10003;</span>
</td></tr></table>
</td></tr>
<tr><td align="center">
<p style="margin:0 0 10px;font-size:24px;font-weight:800;color:#ecf4ff;letter-spacing:-0.02em;">Message received!</p>
<p style="margin:0 auto;font-size:15px;color:rgba(232,243,255,0.72);line-height:1.6;max-width:380px;">Hi ${n} — thanks for reaching out. We'll get back to you as soon as possible.</p>
</td></tr>
</table>
</td></tr>

<tr><td bgcolor="#ffffff" style="background:#ffffff;padding:28px;">
<p style="margin:0 0 20px;font-size:15px;color:#2f4664;line-height:1.7;">Your message is in — our team will review it and you can typically expect a reply within <strong style="color:#0e1b2c;">1–2 business days</strong>.</p>

<table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:20px;">
<tr><td style="border-top:1px solid #e2eaf3;height:1px;font-size:0;line-height:0;">&nbsp;</td></tr>
</table>

<p style="margin:0 0 10px;font-size:10px;font-weight:700;color:#69809f;text-transform:uppercase;letter-spacing:0.1em;">Your message</p>
<table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:24px;">
<tr><td bgcolor="#f3f7fb" style="background:#f3f7fb;border-radius:10px;padding:14px 16px;border-left:3px solid #16c784;">
<p style="margin:0;font-size:14px;color:#2f4664;line-height:1.7;">${m}</p>
</td></tr></table>

<p style="margin:0 0 20px;font-size:14px;color:#69809f;line-height:1.6;">While you wait, explore how MoRoute keeps drivers safer on the road.</p>

<table cellpadding="0" cellspacing="0" border="0">
<tr><td bgcolor="#16c784" style="background:#16c784;border-radius:10px;">
<a href="https://www.moroute.com" style="display:inline-block;padding:12px 20px;font-size:13px;font-weight:700;color:#053b2a;text-decoration:none;">Visit moroute.com</a>
</td></tr></table>
</td></tr>

<tr><td bgcolor="#f3f7fb" style="background:#f3f7fb;border-radius:0 0 16px 16px;padding:14px 28px;text-align:center;border-top:1px solid #e2eaf3;">
<p style="margin:0 0 4px;font-size:12px;color:#69809f;">You're receiving this because you contacted us at <a href="https://www.moroute.com" style="color:#0f8f62;text-decoration:none;">moroute.com</a></p>
<p style="margin:0;font-size:12px;color:#69809f;">&#169; 2026 MoRoute. All rights reserved.</p>
</td></tr>

</table>
</td></tr>
</table>
</body>
</html>`;
}
