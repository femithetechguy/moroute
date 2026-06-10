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
- **Styling:** All CSS in `app/globals.css` — no Tailwind, no CSS modules per component
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
```

---

## Key Decisions & Patterns

### Content is JSON-driven
All copy, screenshot paths, CTA links, contact details, and metadata feed from `content/moroute-content.json`. Never hardcode content in components.

### Styling
All CSS lives in `app/globals.css`. Animations use keyframes defined there. No component-level CSS files.

### Navigation
- `position: fixed` floating nav — dark glass over hero, transitions to light frosted glass on scroll via `is-scrolled` class (triggered at `scrollY > 60`)
- Hash links removed from `<a href>` — click handlers manage smooth scroll + active state
- `window.history.pushState` intentionally NOT used — URL stays clean at `moroute.com`
- Logo href is `"/"` not `"#home"`
- `main { padding-top: 84px }` clears the fixed nav on desktop; `68px` at 760px

### Hero Section
- Dark background (`#05100c`), two-column grid (`1.1fr / 0.9fr`), `border-radius: 24px`
- Left: eyebrow badge, H1 (2 single lines), lede, reassure, stats strip, CTAs, footnote
- Right: two phone mockups + ambient glow blob; 3 floating alert cards absolutely positioned within `.hero-visual`
- Scrolling ticker strip at top (JSX items duplicated for seamless loop animation)
- All content driven from `hero.*` in `content/moroute-content.json`

### Footer / Site Base
- `.site-base` wraps trust band + sources text + `<footer>` in one dark background block
- Trust band and sources driven from `footer.trustItems` and `footer.sources` in content.json
- Sources text colour: gold `#c8a84b`

### Contact Form (`/api/contact`)
- Three-layer bot protection: honeypot field, timing check (1.5s–2h), no-space message check
- Rate limit: 3 submissions per IP per minute (in-memory, per serverless instance)
- Fire-and-forget via Next.js 15 `after()` — returns 200 immediately, sends emails in background
- Admin email → `support@moroute.com`, confirmation → submitter
- Gmail OAuth2: uses `moroute-playground` Web app client (NOT `moroute-contact`) — refresh token is bound to the client that generated it

### OG / SEO
- Static OG images in `/public/images/brand/` — required for WhatsApp compatibility
- `sitemap.ts` uses static `lastModified` date (not `new Date()`) to avoid unnecessary cache busts
- Structured data: `SoftwareApplication` schema with ratings, OS, features, download URLs

### Animations
- `MotionEnhancer` drives scroll-reveal via IntersectionObserver (`threshold: 0.18`)
- All animations guarded with `prefers-reduced-motion`
- `textureDrift` on `main::before` — vertical translate only (no horizontal) to prevent mobile scroll

### Mobile Responsiveness
- `html { overflow-x: hidden }` + `main { overflow-x: clip }` prevent horizontal scroll
- Phone mockups resized directly at breakpoints — do NOT use `transform: scale()` (doesn't reduce grid layout space)
- 820px: phones 210×452 / 168×360, alert cards hidden
- 760px: phones 150×322 / 120×257, alert cards hidden

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

## How to Run Locally
```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # verify production build
```

Clean build: `rm -rf .next && npm run build`

---

## Linear + GitHub Integration

**Commit message format:**
```
Fixes FTTG-XX: what you changed   ← completes the issue (Linear auto-closes)
Ref FTTG-XX: what you changed     ← progress, issue still open
```

- `Fixes` / `Closes` / `Resolves` → closes the issue and logs in Linear activity
- `Ref` / `Refs` → links the commit as a resource, issue stays open
- Day-to-day work on `develop` branch — no feature branches for small changes

---

> **Read `PROGRESS.md` for current status, recent changes, and pending work.**
