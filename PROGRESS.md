# Progress Log

> Session-by-session record of what has been completed and what is pending.
> See `CLAUDE.md` for project architecture, patterns, and context.

---

## Session: 2026-05-13

- Integrated newly provided app screenshots across hero, features, and CTA sections
- Fixed broken image references and removed unintended mobile horizontal gallery scrolling
- Improved mobile responsiveness and visual density in CTA and showcase areas
- Added `ContactSection`, `MobileBackToTop`, and richer navigation behavior
- Added scroll-reveal motion system via `MotionEnhancer` and modernized hover/ambient animations
- Polished typography contrast, spacing, and card/shadow consistency across sections
- Updated content JSON copy to include service-request feature messaging
- Updated CTA store links in JSON to temporary official destinations for App Store and Google Play
- Added Open Graph and Twitter metadata/image routes for stronger cross-platform share previews (including WhatsApp)
- Made production site URL JSON-driven via `meta.siteUrl` and wired metadata to read from content
- Added SEO foundation with `sitemap.xml`, `robots.txt`, and homepage JSON-LD structured data
- Centralized SEO URL resolution in shared helper logic
- Added `vercel.json` for Vercel deployment configuration
- Fixed graphics visibility for users with reduced-motion preferences
- Added persistent mobile navigation access with a floating hamburger trigger
- Rewrote site copy for global clarity while preserving Nigeria as current primary use-case context
- Made section kicker labels optional and simplified section headings
- Improved anchor navigation behavior for sticky nav on desktop and mobile
- Converted features screenshot block into a horizontal snap-scrolling gallery with edge-fade cues, progress indicator, and full-screen lightbox
- **Link preview now works universally including WhatsApp** ✅
- Enhanced structured data with comprehensive `SoftwareApplication` schema — **rich snippets for app discovery** ✅
- Added phone and email contact details rendering to ContactSection
- Centralized all screenshot configuration into `content/moroute-content.json` under `screenshots` key
- Implemented `app/api/contact/route.ts` with Gmail API (OAuth2 refresh token) — **contact form fully working end-to-end** ✅
- Switched to Next.js 15 `after()` for fire-and-forget email (returns 200 in ~100ms)
- **Bot protection added to contact form** ✅ — honeypot, timing check, no-space message check; all 5 test scenarios verified
- Added in-memory IP rate limiter (3/min per IP)
- RAF-throttled NavBar scroll listener; removed hash from URL on nav clicks
- Fixed URL hash appearing in address bar on mobile nav/footer links
- Raised all touch targets to 44px minimum (WCAG)
- Created `app/icon.svg` favicon
- Replaced bottom-right toast with centered in-page success modal
- Deployed to Vercel Preview — all features verified working
  - Preview URL: `https://moroute-euy0upej3-tech-guys-projects-4a517b26.vercel.app`

---

## Session: 2026-06-10

- **Hero section fully replaced with new dark design** (FTTG-11):
  - Complete rewrite of `HeroSection.tsx` — dark background (`#05100c`), scrolling ticker, two-column grid, phone mockups, 3 floating alert cards
  - All content driven from `hero.*` in content.json; `HeroContent` type rewritten; `MapMockup.tsx` deleted
  - `suppressHydrationWarning` added to `<html>` (Scribe browser extension hydration mismatch)
  - Fixed Linear GitHub webhook 404; reconnected and redelivered push event via GitHub API

- **Nav updated to floating dark glass** (FTTG-11):
  - `position: fixed`, dark glass over hero → light frosted glass when scrolled (`is-scrolled` class at `scrollY > 60`)
  - `main { padding-top: 84px }` for fixed nav clearance on desktop

- **Hero layout tuned** (FTTG-11):
  - H1 font reduced (`clamp(2rem, 4.5vw, 3.5rem)`) so both lines fit on single lines
  - Grid ratio widened to `1.1fr / 0.9fr`; alert cards pulled in to prevent `overflow: hidden` clipping
  - `border-radius: 24px` added to hero card to match other sections

- **Footer / base of site redesigned** (FTTG-14 — complete):
  - Trust band (4 items) + gold sources text added above footer links
  - `.site-base` dark wrapper with `border-radius: 24px` unifies the base visually
  - `data-reveal` removed from footer so nav links appear instantly

- **Contact phone updated** (FTTG-13 — complete): `09034464384` / `tel:+2349034464384`

- **Mobile responsiveness pass** (FTTG-15, in progress):
  - Fixed nav clearance on mobile: `main { padding-top: 68px }` at 760px
  - 820px: phones resized to 210×452 / 168×360, alert cards hidden
  - 760px: phones resized to 150×322 / 120×257, alert cards hidden, stats remain 3-col
  - Switched from `transform: scale()` to direct dimension changes (scale doesn't affect grid layout space)
  - Fixed horizontal scroll: `html { overflow-x: hidden }`, `main { overflow-x: clip }`, `textureDrift` vertical-only

- Cleaned up repo: removed `moroute.html` prototype, stale `.old` files, unused assets (`hero.png`, `hero-lines.svg`, `map-noise.svg`)
- Merged CLAUDE.md + PROGRESS.md structure — CLAUDE.md = architecture context, PROGRESS.md = work log

---

---

## Session: 2026-06-25

- **Company address added to footer** (FTTG-43):
  - Address: 45, Presidential Avenue, Federal Housing Estate Shagari Village, Akure, Ondo State, Nigeria
  - Added `footer.address` field to `content/moroute-content.json` (single source of truth)
  - Updated `MorouteContent` TypeScript type to include `footer.address: string`
  - Rendered in `SiteFooter.tsx` as `.footer-address` paragraph between sources attribution and the bottom footer bar
  - Styled with muted green label ("Registered address:") and dimmed body text, consistent with footer palette

---

- **Ticker animation fixed on iOS mobile** (FTTG-15):
  - Added `will-change: transform` to `.hero-ticker-track` to promote element to GPU layer
  - Added `translateZ(0)` to `heroTickerScroll` keyframes to prevent iOS Safari from dropping the animation

---

## Pending
- Complete FTTG-11 hero section (any remaining refinements)
- Verify ticker fix on real iOS device
- Deploy to production (`vercel --prod`) when ready
- Verify on `https://www.moroute.com` after production deploy
