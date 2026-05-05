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

## Step 2 — OAuth 2.0 Client ID (already done ✅)

OAuth consent screen configured as **Internal** (Workspace org users only, no verification needed).

OAuth 2.0 Client ID created:
- **Name:** `moroute-contact`
- **Type:** Desktop app
- **Client ID:** `707469193370-ln4mnbpm9o5blc3jh9bumhoas1bcf544.apps.googleusercontent.com`
- **Client Secret:** stored in `.env.local` as `GOOGLE_CLIENT_SECRET`

---

## Step 3 — Get a refresh token (pending ⏳)

1. Go to [OAuth 2.0 Playground](https://developers.google.com/oauthplayground)
2. Click the **gear icon** (top right) → check **"Use your own OAuth credentials"** → paste Client ID + Secret
3. In the scope input paste:
   ```
   https://www.googleapis.com/auth/gmail.send
   ```
4. Click **Authorize APIs** → sign in with the Workspace account that will send emails → allow access
5. Click **Exchange authorization code for tokens**
6. Copy the **Refresh token** → paste into `GOOGLE_REFRESH_TOKEN` in `.env.local`

> The refresh token does not expire unless the user revokes access or the OAuth client is deleted.

---

## Step 4 — Fill remaining environment variables

Add to `.env.local` and to Vercel environment variables for production:

```env
# OAuth 2.0 credentials
GOOGLE_CLIENT_ID=707469193370-ln4mnbpm9o5blc3jh9bumhoas1bcf544.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=<from .env.local>
GOOGLE_REFRESH_TOKEN=<from OAuth Playground>

# The Gmail/Workspace address emails are sent from
GOOGLE_SEND_AS=noreply@moroute.com

# The inbox that receives contact form submissions
CONTACT_FORM_TO=hello@moroute.com
```

> `GOOGLE_SEND_AS` must be a real mailbox the authenticated user has access to send from.

---

## Step 5 — Update the API route

Once `GOOGLE_REFRESH_TOKEN` is in `.env.local`, update `app/api/contact/route.ts` to use OAuth2 instead of the service account JWT:

```ts
const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
);
oauth2Client.setCredentials({ refresh_token: process.env.GOOGLE_REFRESH_TOKEN });

const gmail = google.gmail({ version: "v1", auth: oauth2Client });
```

The rest of the route (RFC 2822 email building, validation, error handling) stays the same.

---

## Implementation status

| Task | Status |
|------|--------|
| Enable Gmail API | ✅ Done |
| Create service account | ✅ Done (unused — blocked by org policy) |
| Create OAuth consent screen | ✅ Done (Internal) |
| Create OAuth 2.0 Client ID | ✅ Done |
| Get refresh token via OAuth Playground | ⏳ Pending |
| Fill `GOOGLE_SEND_AS` + `CONTACT_FORM_TO` | ⏳ Pending |
| Update API route to use OAuth2 | ⏳ Pending |
| Add env vars to Vercel | ⏳ Pending |

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
