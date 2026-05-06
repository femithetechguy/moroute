# Google Workspace Email — Setup Guide

Sending contact form submissions via the Gmail API from a Google Workspace account.

---

## Strategy history

### Original plan — Service Account with domain-wide delegation
The initial plan was to use a Google Cloud service account with domain-wide delegation so the app could impersonate a Workspace address server-side with no user interaction or token refresh needed.

**Why it was blocked:** The MorouteApp Google Workspace org enforces the `iam.disableServiceAccountKeyCreation` organisation policy (part of Google's "Secure by Default" rollout). This prevents downloading JSON key files for any service account, making the JWT auth path impossible without org admin intervention.

**What was completed before the block:**
- Gmail API enabled on the `MorouteApp` Google Cloud project
- Service account `moroute-mailer@morouteapp.iam.gserviceaccount.com` created

### Active approach — OAuth2 with refresh token ✅
Switched to OAuth2 with a long-lived refresh token. No JSON key file needed, no org admin required. The refresh token is obtained once via OAuth Playground and stored in env vars — it does not expire unless explicitly revoked.

---

## Step 1 — Gmail API (already done ✅)

Gmail API is enabled on the `MorouteApp` Google Cloud project.

---

## Step 2 — OAuth 2.0 Client IDs (already done ✅)

OAuth consent screen configured as **Internal** (Workspace org users only, no verification needed).

Two OAuth clients created — one for the app, one just to generate the refresh token via OAuth Playground:

| Name | Type | Purpose |
|------|------|---------|
| `moroute-contact` | Desktop app | Used by the Next.js API route in production |
| `moroute-playground` | Web application | Used only in OAuth Playground to get the refresh token |

**Why two clients?** Desktop app clients don't support custom redirect URIs, so OAuth Playground (which needs `https://developers.google.com/oauthplayground` as a redirect URI) rejects them with `redirect_uri_mismatch`. The Web app client has that URI whitelisted. The refresh token generated via either client works the same way in the app.

- **`moroute-contact` Client ID:** `707469193370-ln4mnbpm9o5blc3jh9bumhoas1bcf544.apps.googleusercontent.com`
- **`moroute-contact` Client Secret:** stored in `.env.local` as `GOOGLE_CLIENT_SECRET`
- **`moroute-playground`** credentials: used only in OAuth Playground, not stored in `.env.local`

---

## Step 3 — Get a refresh token ✅

Used the **`moroute-playground`** (Web app) Client ID + Secret in OAuth Playground.

1. Go to [OAuth 2.0 Playground](https://developers.google.com/oauthplayground)
2. Click the **gear icon** (top right) → check **"Use your own OAuth credentials"** → paste the `moroute-playground` Client ID + Secret
3. In the scope input paste:
   ```
   https://www.googleapis.com/auth/gmail.send
   ```
4. Click **Authorize APIs** → sign in with `support@moroute.com` → allow access
5. Click **Exchange authorization code for tokens**
6. Copy the **Refresh token** (the `refresh_token` field — not `expires_in` which is just the short-lived access token) → paste into `GOOGLE_REFRESH_TOKEN` in `.env.local`

> **Important:** A refresh token is bound to the OAuth client that generated it. The `.env.local` `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET` **must match the `moroute-playground` credentials**, not `moroute-contact`. Using mismatched credentials causes an `unauthorized_client` 401 error.

> The refresh token does not expire unless the user revokes access or the OAuth client is deleted.

---

## Step 4 — Fill remaining environment variables ✅

All values are set in `.env.local`. Also add these to Vercel environment variables for production:

```env
# OAuth 2.0 credentials — use moroute-playground client (matches the refresh token)
GOOGLE_CLIENT_ID=<moroute-playground client ID>
GOOGLE_CLIENT_SECRET=<moroute-playground client secret>
GOOGLE_REFRESH_TOKEN=<from OAuth Playground>

# The Gmail/Workspace address emails are sent from
GOOGLE_SEND_AS=support@moroute.com

# The inbox that receives contact form submissions
CONTACT_FORM_TO=support@moroute.com
```

> `GOOGLE_SEND_AS` must be a real mailbox the authenticated user (`support@moroute.com`) has send-as access to.

---

## Step 5 — Update the API route ✅

`app/api/contact/route.ts` uses OAuth2 with automatic token refresh:

```ts
const auth = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
);
auth.setCredentials({ refresh_token: process.env.GOOGLE_REFRESH_TOKEN });

const gmail = google.gmail({ version: "v1", auth });
```

The `googleapis` library handles access token refresh automatically — the short-lived access token (`expires_in: 3599`) is fetched and refreshed behind the scenes; only the refresh token needs to be stored.

### Email templates

`app/api/contact/email-templates.ts` exports two branded HTML email functions:

| Function | Recipient | Content |
|----------|-----------|---------|
| `adminEmailHtml(name, email, message)` | `CONTACT_FORM_TO` | Internal notification with name, email, message fields and a one-click Reply CTA |
| `confirmationEmailHtml(name, message)` | Form submitter | Branded confirmation with checkmark hero, message summary, and moroute.com CTA |

Both templates:
- HTML-escape all user input to prevent injection
- Use table-based layout with inline styles for email client compatibility
- Match site brand colors (`#0a1e36` navy header, `#16c784` green accents, `#f3f7fb` backgrounds)

The route sends both emails concurrently via `Promise.all`.

---

## Implementation status

| Task | Status |
|------|--------|
| Enable Gmail API | ✅ Done |
| Create service account | ✅ Done (unused — blocked by org policy) |
| Create OAuth consent screen | ✅ Done (Internal) |
| Create OAuth 2.0 Client ID (`moroute-contact` Desktop app) | ✅ Done |
| Create OAuth 2.0 Client ID (`moroute-playground` Web app) | ✅ Done |
| Get refresh token via OAuth Playground | ✅ Done — using `moroute-playground` credentials |
| Fill `GOOGLE_SEND_AS` + `CONTACT_FORM_TO` | ✅ Done — both `support@moroute.com` |
| Update API route to use OAuth2 | ✅ Done |
| Create branded HTML email templates | ✅ Done |
| Confirmed end-to-end email delivery | ✅ Done — `POST /api/contact 200` |
| Add env vars to Vercel | ⏳ Pending |
| Deploy to production | ⏳ Pending |

---

## Package dependency

```bash
npm install googleapis
```

Already installed.

---

## Security notes

- Never commit `.env.local`.
- The refresh token is long-lived — treat it like a password.
- Rate-limit the `/api/contact` route on Vercel to prevent form spam.
- All form fields are validated server-side before the email is built.
