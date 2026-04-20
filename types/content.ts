export type FeatureTone = "green" | "red" | "blue" | "orange" | "purple" | "teal";
export type RiskColor = "green" | "red" | "orange";
export type FeatureIconName =
  | "shield-alert"
  | "map-pinned"
  | "route"
  | "megaphone"
  | "shield-check"
  | "chart-line";

export interface LinkItem {
  label: string;
  href: string;
}

export interface HeroContent {
  badge: string;
  title: {
    lineOne: string;
    lineTwoPrefix: string;
    lineTwoHighlight: string;
    lineThree: string;
  };
  description: string;
  actions: {
    primary: LinkItem;
    secondary: LinkItem;
  };
  map: {
    texturePath: string;
    safeChip: string;
    incidentChip: string;
    info: {
      etaLabel: string;
      etaValue: string;
      etaExtra: string;
      safetyLabel: string;
      safetyValue: string;
      safetyMax: string;
    };
    sosLabel: string;
  };
}

export interface StatItem {
  value: string;
  suffix: string;
  label: string;
}

export interface FeatureItem {
  icon: FeatureIconName;
  tone: FeatureTone;
  name: string;
  description: string;
}

export interface AppAssets {
  brandLogoPath: string;
  pageTexturePath: string;
  heroTexturePath: string;
}

export interface ThreatItem {
  title: string;
  description: string;
}

export interface RiskRegion {
  label: string;
  score: number;
  color: RiskColor;
}

export interface MorouteContent {
  brand: string;
  assets: AppAssets;
  meta: {
    title: string;
    description: string;
  };
  nav: {
    links: LinkItem[];
    cta: LinkItem;
  };
  hero: HeroContent;
  stats: StatItem[];
  features: {
    sectionTag: string;
    sectionTitle: string;
    items: FeatureItem[];
  };
  threats: {
    sectionTag: string;
    sectionTitle: string;
    items: ThreatItem[];
    riskPanel: {
      title: string;
      regions: RiskRegion[];
    };
  };
  cta: {
    title: string;
    description: string;
    stores: Array<{
      name: "App Store" | "Google Play";
      href: string;
      badgePath: string;
      alt: string;
    }>;
  };
  footer: {
    links: LinkItem[];
    copyright: string;
  };
}
