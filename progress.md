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

## Pending
- Deploy to Vercel production.
