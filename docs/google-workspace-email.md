# Google Workspace Email — Setup Guide

Sending contact form submissions via the Gmail API from a Google Workspace account.

---

## Chosen approach

**Service Account with domain-wide delegation** (recommended for Workspace).  
No user interaction or token refresh needed — the service account impersonates a Workspace address server-side.

---

## Step 1 — Google Cloud project

1. Go to [console.cloud.google.com](https://console.cloud.google.com).
2. Create a new project (e.g. `moroute-mail`) or reuse an existing one.
3. Enable the **Gmail API**: APIs & Services → Library → search "Gmail API" → Enable.

---

## Step 2 — Service account

1. IAM & Admin → Service Accounts → **Create Service Account**.
2. Name it (e.g. `moroute-mailer`), click through to finish.
3. Open the service account → **Keys** tab → Add Key → **JSON**.
4. Download the `.json` key file — keep it secret, never commit it.

From the downloaded JSON you need two values:
- `client_email` → `GOOGLE_SERVICE_ACCOUNT_EMAIL`
- `private_key` → `GOOGLE_PRIVATE_KEY`

---

## Step 3 — Domain-wide delegation (Google Workspace Admin)

This lets the service account send email on behalf of a real Workspace address.

1. In the service account detail page, copy the **Client ID** (numeric).
2. Go to [admin.google.com](https://admin.google.com) → Security → Access and data control → **API controls** → Manage domain-wide delegation → **Add new**.
3. Paste the Client ID and add this OAuth scope:
   ```
   https://www.googleapis.com/auth/gmail.send
   ```
4. Save.

---

## Step 4 — Environment variables

Add to `.env.local` (and to Vercel environment variables for production):

```env
# Gmail API — service account
GOOGLE_SERVICE_ACCOUNT_EMAIL=moroute-mailer@your-project.iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nABC123...\n-----END PRIVATE KEY-----\n"
GOOGLE_SEND_AS=noreply@moroute.com

# Contact form routing
CONTACT_FORM_TO=hello@moroute.com
```

> `GOOGLE_SEND_AS` must be a real mailbox in your Workspace domain.  
> `CONTACT_FORM_TO` is where form submissions land.

---

## Step 5 — Implementation (Next.js API route)

Once credentials are in `.env.local`, the route will be created at:

```
app/api/contact/route.ts
```

It will:
1. Validate the incoming POST body (name, email, message).
2. Build a RFC 2822 email (base64url-encoded).
3. Call `gmail.users.messages.send` using the service account JWT.
4. Return `200` on success, `400` on validation error, `500` on send failure.

The contact form in `ContactSection.tsx` will be wired to POST to this route instead of the current timeout simulation.

---

## OAuth2 path (alternative — no Workspace Admin access required)

If domain-wide delegation is not available, use OAuth2 with a long-lived refresh token instead.

### Get a refresh token

1. Cloud Console → Credentials → OAuth 2.0 Client IDs → **Desktop app** → Create.
2. Open [OAuth 2.0 Playground](https://developers.google.com/oauthplayground).
3. Settings (gear icon) → check **Use your own OAuth credentials** → enter Client ID + Secret.
4. Scope: `https://www.googleapis.com/auth/gmail.send` → Authorize → exchange for tokens.
5. Copy the **Refresh token** (it does not expire unless revoked).

### Environment variables

```env
GOOGLE_CLIENT_ID=...apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=...
GOOGLE_REFRESH_TOKEN=1//0e...
GOOGLE_SEND_AS=noreply@moroute.com
CONTACT_FORM_TO=hello@moroute.com
```

---

## Package dependency

Either path requires `googleapis`:

```bash
npm install googleapis
```

---

## Security notes

- Never commit `.env.local` or the service account JSON file.
- `GOOGLE_PRIVATE_KEY` newlines must be escaped as `\n` in `.env` files; Next.js handles unescaping automatically.
- Rate-limit the API route on Vercel using middleware or an edge config to prevent form spam.
- Validate and sanitise all form fields server-side before constructing the email.
