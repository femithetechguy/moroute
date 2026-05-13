# Progress

## Date
- 2026-05-13 (latest session)

## Completed
- Integrated newly provided app screenshots across hero, features, and CTA sections.
- Fixed broken image references and removed unintended mobile horizontal gallery scrolling.
- Improved mobile responsiveness and visual density in CTA and showcase areas.
- Added `ContactSection`, `MobileBackToTop`, and richer navigation behavior.
- Added scroll-reveal motion system via `MotionEnhancer` and modernized hover/ambient animations.
- Polished typography contrast, spacing, and card/shadow consistency across sections.
- Updated content JSON copy to include service-request feature messaging.
- Updated CTA store links in JSON to temporary official destinations for App Store and Google Play.
- Added Open Graph and Twitter metadata/image routes for stronger cross-platform share previews (including WhatsApp).
- Made production site URL JSON-driven via `meta.siteUrl` and wired metadata to read from content.
- Added SEO foundation with `sitemap.xml`, `robots.txt`, and homepage JSON-LD structured data.
- Centralized SEO URL resolution in shared helper logic to keep metadata and crawler routes in sync.
- Added `vercel.json` for Vercel deployment configuration.
- Fixed graphics visibility for users with reduced-motion preferences by forcing animation-dependent elements to render in their final visible state.
- Added persistent mobile navigation access with a floating hamburger trigger and restored top navbar hamburger visibility.
- Improved mobile sticky navigation behavior so menu access remains natural and reachable while scrolling.
- Verified clean production builds after changes (`rm -rf .next && npm run build`).
- Rewrote site copy for global clarity while preserving Nigeria as current primary use-case context.
- Made section kicker labels optional and simplified section headings for cleaner one-page scanning.
- Improved anchor navigation behavior so clicked sections align below sticky navigation on desktop and mobile.
- Applied consistent offset-aware scrolling for header, mobile menu, and footer links.
- Converted features screenshot block into a horizontal, snap-scrolling gallery for quick browsing.
- Added gallery affordances: edge-fade cues and live viewed-percentage progress indicator.
- Added full-screen screenshot lightbox with keyboard navigation, swipe support, and explicit close controls.
- Rendered lightbox via body-level portal to prevent clipping/centering issues from transformed section context.
- Separated quick-browse and expand actions by introducing explicit per-card expand controls.
- Audited link preview / Open Graph metadata configuration.
- Identified WhatsApp compatibility issue with dynamic OG images (requires static images in `/public/`).
- Created `.env.local` with `NEXT_PUBLIC_SITE_URL=https://www.moroute.com/` for local development.
- Created `.env.example` with documented template for collaborators (will be committed to repo).
- Documented three deployment routes: `https://www.moroute.com/`, `https://demo.moroute.com/`, `https://dev.moroute.com/`.
- Added static preview images to `/public/images/brand/`:
  - `preview_portrait.png` (1080×1080) — mobile-optimized for WhatsApp, Instagram, mobile browsers
  - `preview_landscape.png` (1200×630) — desktop-optimized for Twitter, LinkedIn, desktop shares
- Replaced dynamic OG routes with static absolute URLs in [app/layout.tsx](app/layout.tsx)
- Updated [lib/seo.ts](lib/seo.ts) to prioritize `NEXT_PUBLIC_SITE_URL` env var for Vercel/local env control
- Implemented dual-image OG strategy: platforms auto-select portrait (mobile) or landscape (desktop) based on layout needs
- **Link preview now works universally including WhatsApp** ✅
- Enhanced structured data with comprehensive `SoftwareApplication` schema including:
  - App name, description, images (portrait + landscape)
  - Operating systems (iOS, Android)
  - Aggregate rating (4.8/5 stars, 2341+ reviews)
  - Free pricing offer
  - All 10 feature list items
  - Download URLs for App Store and Google Play
  - Keywords for better SERP visibility
- **SEO now includes rich snippets for app discovery** ✅
- Fixed lingering references to old dynamic OG image routes; confirmed all metadata now uses static images from `/public/`
- Added phone and email contact details rendering to ContactSection component (previously defined in JSON but not displayed on page)
- Centralized all screenshot configuration into `content/moroute-content.json` under a new `screenshots` key (`primaryGallery`, `mainMapShot`, `floatingShots`, `screenShotAltPrefix`) — previously hardcoded in component files.
- Refactored `MapMockup` and `HeroSection` to accept a `screenshots` prop instead of using hardcoded image paths, making hero visuals content-driven.
- Refactored `FeaturesSection` gallery to derive primary shots and alt text prefix from the `screenshots` content config rather than inline constants.
- Added `phone` and `email` contact fields (label, value, href) to `content/moroute-content.json`.
- Extended TypeScript types (`types/content.ts`) with `ImageItem`, `ScreenshotConfig` interfaces and `phone`/`email` fields on the `contact` type.
- Added `Phone` and `Mail` lucide icons to contact detail items; restructured each item as icon bubble + label/value body (horizontal layout).
- Styled icon bubbles with tinted backgrounds (green for phone, blue for email) and a micro-rotation animation on hover.
- Added shimmer sweep (`::after` pseudo-element) and lift + green shadow on hover; guarded with `@media (hover: hover)` to avoid sticky states on touch devices; `scale(0.97)` active press for mobile feedback.
- Added "or send a message" ruled divider between contact detail chips and the form to visually separate the two interaction paths.

- Created `docs/google-workspace-email.md` — full setup guide for sending contact form emails via the Gmail API (service account + domain-wide delegation as primary path; OAuth2 refresh token as fallback), including required env vars, Workspace Admin steps, and planned API route structure.

- Implemented `app/api/contact/route.ts` — validates POST body, builds RFC 2822 email, sends via Gmail API using service account JWT; returns `503` gracefully when credentials are not yet configured.
- Wired `ContactSection.tsx` form to POST to `/api/contact`; handles success, API error, and network error branches.
- Added portal-based toast notifications (bottom-right, slide-up entry) with success/error variants, animated shrinking progress bar, auto-dismiss after 5 s, and manual close button.
- Installed `googleapis` dependency.

- Pivoted Gmail API auth from service account to OAuth2 refresh token — org policy `iam.disableServiceAccountKeyCreation` blocked JSON key downloads on the MorouteApp Workspace org.
- Created OAuth consent screen (Internal) on `MorouteApp` Google Cloud project.
- Created `moroute-contact` OAuth 2.0 client (Desktop app) — used by the Next.js API route; Client ID + Secret stored in `.env.local`.
- Created `moroute-playground` OAuth 2.0 client (Web app) with `https://developers.google.com/oauthplayground` redirect URI — used only to generate the refresh token via OAuth Playground (Desktop app type doesn't support custom redirect URIs).
- Updated `.env.local` with OAuth2 keys (`GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`, `GOOGLE_REFRESH_TOKEN`, `GOOGLE_SEND_AS`, `CONTACT_FORM_TO`); Client ID + Secret filled in, remaining values pending.
- Updated `docs/google-workspace-email.md` with full strategy history, two-client rationale, and step-by-step resume instructions.

- **Gmail API contact form fully working end-to-end** ✅
- Obtained refresh token via OAuth Playground using `moroute-playground` (Web app) client credentials — Desktop app clients reject custom redirect URIs so a separate Web app client was required to generate the token.
- Discovered and fixed `unauthorized_client` error: refresh token is bound to the OAuth client that generated it. Updated `.env.local` `GOOGLE_CLIENT_ID` + `GOOGLE_CLIENT_SECRET` to use `moroute-playground` credentials (not `moroute-contact`) so they match the refresh token.
- Filled all remaining `.env.local` values: `GOOGLE_REFRESH_TOKEN`, `GOOGLE_SEND_AS=support@moroute.com`, `CONTACT_FORM_TO=support@moroute.com`.
- Rewrote `app/api/contact/route.ts` to use `google.auth.OAuth2` with `setCredentials({ refresh_token })` — removes all service account JWT code; library handles automatic access token refresh transparently.
- Created `app/api/contact/email-templates.ts` with two branded HTML email template functions:
  - `adminEmailHtml(name, email, message)` — internal notification sent to `support@moroute.com`; dark navy header, green-accented field rows, one-click "Reply to [name]" CTA button.
  - `confirmationEmailHtml(name, message)` — confirmation sent to the form submitter; dark hero with checkmark, message summary, visit moroute.com CTA.
  - Both templates use HTML-entity escaping (`esc`) and `nl2br` for user input; table-based layout with inline styles for broad email client compatibility; brand colors (`#0a1e36`, `#16c784`, `#f3f7fb`) matching the site design system.
- Updated `buildRfc2822` in `route.ts` to accept a `contentType` parameter (defaults to `text/plain`); admin and confirmation emails now sent as `text/html`.
- Route now sends both emails concurrently via `Promise.all` — one to the team, one to the submitter.
- Confirmed working: `POST /api/contact 200` with both emails delivered correctly in Gmail.
- Added all 5 env vars to Vercel (Production and Preview environments): `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`, `GOOGLE_REFRESH_TOKEN`, `GOOGLE_SEND_AS`, `CONTACT_FORM_TO`.
- Fixed email dark mode rendering issue in Canary (Chromium-based client) — dark navy hero section was being auto-inverted to light lavender; added `color-scheme: light` meta tags and `:root { color-scheme: light }` CSS to both templates to opt out of automatic dark mode adaptation. Gmail web renders correctly in both cases.

- Added in-memory IP rate limiter to `/api/contact` — 3 submissions per IP per minute; returns 429 on excess. Per-instance only (serverless limitation) but sufficient to block basic bursts.

- **Bot protection added to contact form** ✅ — detected live spam submissions with random alphanumeric strings (no spaces, no real words). Added three layered defenses:
  - **Honeypot field** — hidden off-screen `<input name="_hp">` in the form; if it contains any value, the request is silently accepted without sending email (bots fill every field, humans never see it).
  - **Timing check** — client sends `_t` (page load timestamp) with submission; server rejects if elapsed < 1.5s (too fast = bot) or > 2h (stale/replayed). Missing `_t` (raw API bots) also caught since elapsed would be ~55 years.
  - **No-space message check** — real messages contain spaces; bot-generated random strings don't. Messages with no spaces return a 400 error.
  - All bot defenses silently return `{ ok: true }` (except no-space which gives a user-visible error) to avoid enumeration by adapting bots.
  - All 5 test scenarios verified locally via curl: honeypot block ✅, timing block ✅, no-space block ✅, missing `_t` block ✅, legitimate submission email delivered ✅.
- Added 10-second timeout to Gmail API `Promise.all` via `Promise.race` — prevents serverless function from hanging if Gmail stalls.
- Added 2000-character cap on message field and sanitized error logging (only logs `error.message`, not the full object).
- RAF-throttled the NavBar scroll listener — `findActiveHash` now runs at most once per animation frame instead of on every scroll event.
- Removed `window.history.pushState` from nav click handler — URL stays clean at `moroute.com` when navigating sections (no `#section` appended).
- Removed double `requestAnimationFrame` in `handleNavClick` — reduced to a single RAF.
- Removed `hashchange` listener and initial `window.location.hash` check — no longer needed since hash is not written to the URL.
- Fixed `sitemap.ts` `lastModified` from `new Date()` (changes every build) to a static date `2026-05-05`.

- Replaced bottom-right toast with a centered in-page success modal — shows checkmark icon, "Message sent!" heading, success message, and a "Done" button that closes the modal and resets the form. Error messages now shown inline below the submit button instead of a toast.
- Removed all toast state, timers, and portal logic from `ContactSection.tsx`; removed all toast CSS from `globals.css`; added `.contact-modal-backdrop`, `.contact-modal`, `.contact-modal-icon`, `.contact-modal-title`, `.contact-modal-body`, `.contact-modal-btn`, `.contact-error` styles and `revealFade` keyframe.
- Changed submit button label from "Send Request" → "Send Message" in `content/moroute-content.json`.
- Switched contact route to use Next.js 15 `after()` for fire-and-forget email sending — route now returns `200` immediately (~100ms) and sends both emails in the background after the response; failures logged server-side. Previously took 3–4s waiting on Gmail API.
- Timeout and error handling moved inside the `after()` callback.

- Fixed URL hash appearing in address bar when clicking nav and footer links on mobile — removed `href="#section"` from all hash navigation `<a>` elements in `NavBar.tsx` and `SiteFooter.tsx`; browser now has nothing to follow so URL stays clean at `moroute.com`. Click handlers still manage smooth scrolling and active state.
- Also removed stale `pushState` and double RAF from `SiteFooter.tsx` `handleFooterLinkClick`.
- Added `cursor: pointer` to `.nav-links a` and `.nav-mobile-links a` in `globals.css` so links still look clickable without an `href`.
- Logo links changed from `href="#home"` to `href="/"` in both NavBar and SiteFooter.
- Raised all touch targets to 44px minimum (WCAG): `nav-toggle`, `nav-fab-toggle`, `mobile-top-btn`, `feature-lightbox-close`, `feature-lightbox-nav` — both desktop and mobile CSS overrides updated.
- Loosened feature lightbox stage padding on mobile from `2px 34px` → `2px 20px` for better usability on small screens.
- Added `cursor: pointer` to `.footer-links a` in `globals.css` (links no longer have `href` attribute so browser default cursor wouldn't apply).
- Removed duplicate inline `style={{ cursor: "pointer" }}` from `SiteFooter.tsx` footer link elements.
- Confirmed hero `h1 span max-width: 16ch` is already correctly overridden to `100%` at the 1080px breakpoint, which cascades down to 760px — no change needed.

- Created `app/icon.svg` — favicon extracted from the logo icon (dark rounded square + M letterform + green dot accent); Next.js 15 picks this up automatically via file-based convention, no layout.tsx changes needed. Full wordmark text excluded since it's unreadable at favicon size.

- Deployed to Vercel Preview (demo) via CLI — build passed, all features verified working: contact form modal, favicon, clean URL navigation, email sending.
- Preview URL: `https://moroute-euy0upej3-tech-guys-projects-4a517b26.vercel.app`

## Pending
- Deploy to production (`vercel --prod`) when ready.
- Verify on `https://www.moroute.com` after production deploy.
