import Image from "next/image";
import { Bell } from "lucide-react";
import type { HeroContent } from "@/types/content";

type HeroSectionProps = {
  hero: HeroContent;
};

export default function HeroSection({ hero }: HeroSectionProps) {
  return (
    <section className="hero" id="home">
      {/* Scrolling ticker */}
      <div className="hero-ticker" aria-hidden="true">
        <div className="hero-ticker-track">
          {[...hero.ticker, ...hero.ticker].map((item, i) => (
            <span key={i}>
              <span className="hero-ticker-dot" />
              {item}
            </span>
          ))}
        </div>
      </div>

      {/* Main two-column grid */}
      <div className="hero-inner" data-reveal>
        {/* Left: copy */}
        <div className="hero-copy">
          <div className="hero-eyebrow">
            <span className="hero-eyebrow-dot" aria-hidden="true" />
            {hero.eyebrow}
          </div>

          <h1 className="hero-h1">
            {hero.title.lineOne}
            <br />
            <span className="hero-h1-accent">{hero.title.lineTwo}</span>
          </h1>

          <p className="hero-lede">
            {hero.lede} <strong>{hero.ledeBold}</strong>
          </p>

          <div className="hero-reassure">
            <span className="hero-reassure-dot" aria-hidden="true" />
            {hero.reassure}
          </div>

          <div className="hero-stats" role="list">
            {hero.statsStrip.map((stat, i) => (
              <div key={i} className="hero-stat" role="listitem">
                <div className="hero-stat-num">{stat.num}</div>
                <div className="hero-stat-lbl">{stat.lbl}</div>
              </div>
            ))}
          </div>

          <div className="hero-actions">
            <a href={hero.actions.primary.href} className="btn-primary">
              <Bell size={16} strokeWidth={2.3} className="btn-primary-icon" aria-hidden="true" />
              {hero.actions.primary.label}
            </a>
            <a href={hero.actions.secondary.href} className="hero-btn-ghost">
              ▷ {hero.actions.secondary.label}
            </a>
          </div>

          <p className="hero-footnote">🔒 {hero.footnote}</p>
        </div>

        {/* Right: phone visual */}
        <div className="hero-visual" aria-hidden="true">
          <div className="hero-glow-blob" />
          <div className="hero-phones">
            <div className="hero-phone hero-phone-side">
              <Image
                src={hero.phoneScreens.side.src}
                alt={hero.phoneScreens.side.alt}
                width={212}
                height={456}
                className="hero-phone-img"
                priority
              />
            </div>
            <div className="hero-phone hero-phone-main">
              <Image
                src={hero.phoneScreens.main.src}
                alt={hero.phoneScreens.main.alt}
                width={266}
                height={572}
                className="hero-phone-img"
                priority
              />
            </div>
          </div>

          {hero.alertCards.map((card, i) => (
            <div
              key={i}
              className={`hero-alert-card hero-alert-card--${card.type} hero-alert-card--pos${i + 1}`}
            >
              <div className="hero-alert-icon">{card.icon}</div>
              <div className="hero-alert-body">
                <div className="hero-alert-title">{card.title}</div>
                <div className="hero-alert-desc">{card.desc}</div>
                <div className="hero-alert-meta">📍 {card.location} · {card.timeAgo}</div>
              </div>
              <div className="hero-alert-count">👥 {card.count}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
