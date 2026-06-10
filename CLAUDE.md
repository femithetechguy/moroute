# MoRoute — Project Context for Claude

## What This Project Is
MoRoute is a road safety app for Nigerian roads. The marketing/landing site is a Next.js 15 single-page app deployed on Vercel. It surfaces live incident alerts, community updates, safer route guidance, and one-tap SOS help. Currently in pre-launch (early alerts / waitlist phase).

**Live URLs**
- Production: `https://www.moroute.com`
- Preview/Demo: `https://demo.moroute.com`
- Dev: `https://dev.moroute.com`

---

## Tech Stack
- **Framework:** Next.js 15 (App Router), React 19, TypeScript
- **Styling:** CSS Modules / global CSS (`app/globals.css`) — no Tailwind
- **Icons:** Lucide React
- **Email:** Gmail API via OAuth2 refresh token (`googleapis`)
- **Deployment:** Vercel (CLI + dashboard)
- **Content:** Single source of truth → `content/moroute-content.json`

---

## Project Structure

```
app/
  layout.tsx          — root layout, metadata, OG tags
  page.tsx            — assembles all sections
  globals.css         — all styles live here
  icon.svg            — favicon (auto-picked up by Next.js 15)
  api/contact/
    route.ts          — contact form POST handler (Gmail API, rate limiting, bot protection)
    email-templates.ts — branded HTML email templates (admin + confirmation)
  robots.ts / sitemap.ts

components/           — one file per section
  NavBar.tsx
  HeroSection.tsx
  FeaturesSection.tsx
  StatsBar.tsx
  ThreatsRiskSection.tsx
  CtaSection.tsx
  ContactSection.tsx
  SiteFooter.tsx        — includes trust band + sources attribution above footer links
  MobileBackToTop.tsx
  MotionEnhancer.tsx  — scroll-reveal / ambient animations

content/
  moroute-content.json  — ALL copy, images, links, contact details (single source of truth)

lib/
  seo.ts              — SEO helpers, reads NEXT_PUBLIC_SITE_URL
  
types/
  content.ts          — TypeScript interfaces for content.json shape

docs/
  google-workspace-email.md  — Gmail API setup guide (OAuth2 strategy, env vars, two-client rationale)

public/images/brand/
  preview_portrait.png   — 1080×1080 OG image (WhatsApp, mobile)
  preview_landscape.png  — 1200×630 OG image (Twitter, LinkedIn, desktop)

public/images/screenshots/
  screen-live-feed.png   — hero phone mockup (front phone, live feed screen)
  screen-on-route.png    — hero phone mockup (back phone, on-route map screen)

PROGRESS.md           — session-by-session log of what has been completed and what's pending
```

---

## Key Decisions & Patterns

### Content is JSON-driven
All copy, screenshot paths, CTA links, contact details, and metadata feed from `content/moroute-content.json`. Never hardcode content in components.

### Styling
All CSS lives in `app/globals.css`. No Tailwind, no CSS modules per component. Animations use keyframes defined in globals.css.

### Navigation
- Hash links removed from `<a href>` to keep URL clean at `moroute.com`
- Click handlers manage smooth scroll + active state manually
- `window.history.pushState` is intentionally NOT used
- Logo href is `"/"` not `"#home"`
- Nav is `position: fixed` (floating) — dark glass over hero, transitions to light frosted glass when `is-scrolled` class is added (triggered at `scrollY > 60`)
- `main { padding-top: 84px }` provides clearance for the fixed nav on desktop; `68px` on mobile (760px)

### Contact Form (`/api/contact`)
- Three-layer bot protection: honeypot field, timing check (1.5s–2h window), no-space message check
- Rate limit: 3 submissions per IP per minute (in-memory, per serverless instance)
- Sends two emails concurrently via `Promise.all` inside Next.js 15 `after()` (fire-and-forget, returns 200 immediately)
- Admin email → `support@moroute.com`, confirmation → form submitter
- Gmail OAuth2: uses `moroute-playground` Web app client credentials (NOT `moroute-contact`) because refresh token is bound to the client that generated it

### OG / SEO
- Static OG images in `/public/images/brand/` (not dynamic routes) — required for WhatsApp compatibility
- Dual-image strategy: portrait + landscape, platforms auto-select
- Structured data: `SoftwareApplication` schema with ratings, OS, features, download URLs
- `sitemap.ts` uses static `lastModified` date (not `new Date()`) to avoid unnecessary cache busts

### Hero Section
- Dark background (`#05100c`), two-column grid (`1.1fr / 0.9fr`), `border-radius: 24px`
- Left: eyebrow badge, H1 (2 lines, single-line each), lede, reassure, stats strip, CTAs, footnote
- Right: two phone mockups (side + main) from `public/images/screenshots/`, ambient glow blob
- 3 floating alert cards (red/amber/teal) absolutely positioned within `.hero-visual`
- Scrolling ticker strip at top (duplicated JSX items for seamless loop)
- All content driven from `hero.*` in `content/moroute-content.json`
- `overflow: hidden` on `.hero` clips phone/card overflow at border-radius corners

### Footer / Site Base
- `.site-base` wraps trust band + sources + `<footer>` in a dark background block
- Trust band content driven from `footer.trustItems` (4 items); sources from `footer.sources`
- Sources text colour: gold `#c8a84b`
- Footer nav links and copyright styled for dark background

### Animations
- `MotionEnhancer` drives scroll-reveal (IntersectionObserver, `threshold: 0.18`)
- All animations guarded with `prefers-reduced-motion` — elements render in final visible state when motion is reduced
- Hero CTA: Bell ring animation; hero elements use `heroRise` keyframe
- RAF-throttled NavBar scroll listener
- `textureDrift` on `main::before` — vertical only (no horizontal translate) to prevent mobile scroll

### Mobile Responsiveness
- Fixed nav clearance: `main { padding-top: 84px }` desktop, `68px` at 760px
- `html { overflow-x: hidden }` + `main { overflow-x: clip }` prevent horizontal scroll
- 820px breakpoint: phones resized (210×452 / 168×360), alert cards hidden
- 760px breakpoint: phones resized (150×322 / 120×257), alert cards hidden, stats 3-col
- Direct dimension changes used (NOT `transform: scale()`) so grid layout space matches visual size

---

## Environment Variables
Stored in `.env.local` (not committed) and Vercel dashboard (Production + Preview):

| Variable | Purpose |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | Site URL for metadata resolution (`https://www.moroute.com/`) |
| `GOOGLE_CLIENT_ID` | OAuth2 client ID (`moroute-playground` Web app client) |
| `GOOGLE_CLIENT_SECRET` | OAuth2 client secret |
| `GOOGLE_REFRESH_TOKEN` | Long-lived refresh token (generated via OAuth Playground) |
| `GOOGLE_SEND_AS` | Gmail send-from address (`support@moroute.com`) |
| `CONTACT_FORM_TO` | Contact form destination email |

`.env.example` is committed with documented placeholders for collaborators.

---

## Current Status (as of 2026-06-10)
- Hero section fully redesigned (dark design, phone mockups, ticker, alert cards) — FTTG-11 in progress
- Footer / site base redesigned with trust band and sources — FTTG-14 complete
- Contact phone number updated — FTTG-13 complete
- Mobile responsiveness pass complete — FTTG-15 in progress (pending real-device verification)
- Floating nav with dark-to-light scroll transition live
- **Pending:** Production deploy (`vercel --prod`) and verify on `https://www.moroute.com`

See `PROGRESS.md` for the full session-by-session history.

> **Always read `PROGRESS.md` before starting any work or giving a status update.** It is the source of truth for what has been done and what is pending.

---

## How to Run Locally
```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # verify production build
```

Clean build: `rm -rf .next && npm run build`

---

## Linear + GitHub Integration

**Setup (already done):**
- GitHub webhook configured on the `moroute` repo pointing to Linear's Payload URL
- Repo linked to the FTTG Solutions team in Linear (Settings → Integrations → GitHub)
- "Link commits to issues with magic words" toggle must be **ON** in Linear GitHub settings

**Commit message format:**
```
type: short description

Fixes FTTG-XX   ← use when commit completes the issue (Linear auto-closes it)
Ref FTTG-XX     ← use when making progress but issue is not done yet
```

**Branching strategy:**
- Day-to-day work happens on `develop` — no feature branch needed for small changes
- Use `Fixes` or `Ref` in every commit body on develop to track against the issue
- When promoting to `demo` or `main`, include the issue ID in the PR title for clean linking

**Magic words that close issues on merge:** fix, fixes, fixed, closes, closed, resolve, resolves, complete, completes, implements

**Magic words that reference without closing:** ref, refs, part of, related to, contributes to

**Simple rule:**
- Still working on it? → `Ref FTTG-XX: what you changed`
- Done with it? → `Fixes FTTG-XX: what you changed`

Example:
```
Fixes FTTG-12: added Linear GitHub integration notes to CLAUDE.md
Ref FTTG-12: updated hero section copy
```
