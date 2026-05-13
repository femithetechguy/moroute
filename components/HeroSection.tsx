import type { HeroContent } from "@/types/content";
import type { MorouteContent } from "@/types/content";
import { AlertTriangle, Bell, Users, ShieldPlus, Phone, Heart, Lock, Info } from "lucide-react";

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
            <Bell size={14} strokeWidth={2.3} className="btn-primary-icon" aria-hidden="true" />
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

      <div className="hero-right" aria-hidden="true" />

      {hero.quote.text ? (
        <div className="hero-quote" aria-label="Customer quote">
          <div className="hero-quote-mark" aria-hidden="true">"</div>
          <div className="hero-quote-body">
            <p className="hero-quote-text">{hero.quote.text}</p>
            <p className="hero-quote-tagline">{hero.quote.tagline}</p>
          </div>
        </div>
      ) : null}
    </section>
  );
}
