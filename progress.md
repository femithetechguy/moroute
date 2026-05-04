# Progress

## Date
- 2026-05-04 (latest session)

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

## Pending
- Obtain Google Cloud service account credentials and add to `.env.local` / Vercel env vars.
- Implement `app/api/contact/route.ts` to send form submissions via Gmail API.
- Wire `ContactSection.tsx` form to POST to the API route (replace current timeout simulation).
- Deploy to Vercel production.
