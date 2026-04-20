import type { HeroContent } from "@/types/content";
import MapMockup from "@/components/MapMockup";

type HeroSectionProps = {
  hero: HeroContent;
  texturePath: string;
};

export default function HeroSection({ hero, texturePath }: HeroSectionProps) {
  return (
    <section className="hero" id="home">
      <div className="hero-texture" style={{ backgroundImage: `url(${texturePath})` }} />
      <div>
        <div className="hero-badge">
          <div className="badge-dot" />
          {hero.badge}
        </div>

        <h1>
          {hero.title.lineOne}
          <br />
          {hero.title.lineTwoPrefix} <em>{hero.title.lineTwoHighlight}</em>
          <br />
          {hero.title.lineThree}
        </h1>

        <p>{hero.description}</p>

        <div className="hero-actions">
          <a href={hero.actions.primary.href} className="btn-primary">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
              <path d="M7 1L13 7L7 13M1 7H13" stroke="#080e1a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            {hero.actions.primary.label}
          </a>

          <a href={hero.actions.secondary.href} className="btn-secondary">
            {hero.actions.secondary.label}
          </a>
        </div>
      </div>

      <MapMockup map={hero.map} />
    </section>
  );
}
