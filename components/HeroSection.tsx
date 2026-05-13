import type { HeroContent } from "@/types/content";
import type { MorouteContent } from "@/types/content";
import { AlertTriangle, Users, ShieldPlus, Phone, Heart, Lock, Info } from "lucide-react";
import MapMockup from "@/components/MapMockup";

type HeroSectionProps = {
  hero: HeroContent;
  texturePath: string;
  screenshots: MorouteContent["screenshots"];
};

const PILL_ICONS = [
  <AlertTriangle key="alert" size={18} strokeWidth={2} />,
  <Users key="users" size={18} strokeWidth={2} />,
  <ShieldPlus key="shield" size={18} strokeWidth={2} />,
  <Phone key="phone" size={18} strokeWidth={2} />,
];

export default function HeroSection({ hero, texturePath, screenshots }: HeroSectionProps) {
  const lineTwoPrefix = hero.title.lineTwoPrefix ? `${hero.title.lineTwoPrefix} ` : "";

  return (
    <section className="hero" id="home" data-reveal>
      <div className="hero-texture" style={{ backgroundImage: `url(${texturePath})` }} />
      <div>
        <div className="hero-badge">
          <div className="badge-dot" />
          {hero.badge}
        </div>

        <h1>
          <span>{hero.title.lineOne}</span>
          <span>
            {lineTwoPrefix}
            <em>{hero.title.lineTwoHighlight}</em>
          </span>
        </h1>

        {hero.title.lineThree ? <p className="hero-line-soft">{hero.title.lineThree}</p> : null}

        <p>{hero.description}</p>

        {hero.tagline ? (
          <p className="hero-tagline">
            <Heart size={15} strokeWidth={2.5} fill="currentColor" aria-hidden="true" />
            {hero.tagline}
          </p>
        ) : null}

        {hero.pills.length > 0 ? (
          <div className="hero-pills" role="list">
            {hero.pills.map((pill, i) => (
              <div key={pill} className="hero-pill" role="listitem">
                <span className="hero-pill-icon" aria-hidden="true">{PILL_ICONS[i]}</span>
                <span>{pill}</span>
              </div>
            ))}
          </div>
        ) : null}

        <div className="hero-actions">
          <a href={hero.actions.primary.href} className="btn-primary">
            <svg width="13" height="15" viewBox="0 0 13 15" fill="none" aria-hidden="true">
              <path d="M6.5 1C6.5 1 4 1 4 3.5C4 4.5 4.5 5 4.5 5H2C1.44772 5 1 5.44772 1 6V7C1 7.55228 1.44772 8 2 8H11C11.5523 8 12 7.55228 12 7V6C12 5.44772 11.5523 5 11 5H8.5C8.5 5 9 4.5 9 3.5C9 1 6.5 1 6.5 1ZM1 9V13C1 13.5523 1.44772 14 2 14H11C11.5523 14 12 13.5523 12 13V9H1Z" stroke="#053b2a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            {hero.actions.primary.label}
          </a>

          <a href={hero.actions.secondary.href} className="btn-secondary">
            <Info size={13} strokeWidth={2.3} aria-hidden="true" />
            {hero.actions.secondary.label}
          </a>
        </div>

        {hero.footnote ? (
          <p className="hero-footnote">
            <Lock size={11} strokeWidth={2.5} aria-hidden="true" />
            {hero.footnote}
          </p>
        ) : null}
      </div>

      <div className="hero-right">
        <MapMockup map={hero.map} screenshots={screenshots} />
        {hero.quote.text ? (
          <div className="hero-quote" aria-label="Customer quote">
            <div className="hero-quote-mark" aria-hidden="true">"</div>
            <p className="hero-quote-text">{hero.quote.text}</p>
            <p className="hero-quote-tagline">{hero.quote.tagline}</p>
          </div>
        ) : null}
      </div>
    </section>
  );
}
