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

export interface HeroStatItem {
  num: string;
  lbl: string;
}

export interface HeroAlertCard {
  type: "red" | "amber" | "teal";
  icon: string;
  title: string;
  desc: string;
  location: string;
  timeAgo: string;
  count: string;
}

export interface HeroContent {
  eyebrow: string;
  title: {
    lineOne: string;
    lineTwo: string;
  };
  lede: string;
  ledeBold: string;
  reassure: string;
  statsStrip: HeroStatItem[];
  footnote: string;
  actions: {
    primary: LinkItem;
    secondary: LinkItem;
  };
  ticker: string[];
  alertCards: HeroAlertCard[];
  phoneScreens: {
    main: ImageItem;
    side: ImageItem;
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
  brandLogoAlt: string;
  pageTexturePath: string;
  heroTexturePath: string;
}

export interface ImageItem {
  src: string;
  alt: string;
}

export interface ScreenshotConfig {
  primaryGallery: ImageItem[];
  mainMapShot: ImageItem;
  floatingShots: ImageItem[];
  screenShotAltPrefix: string;
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
  screenshots: ScreenshotConfig;
  meta: {
    title: string;
    description: string;
    siteUrl: string;
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
  contact: {
    sectionTag: string;
    title: string;
    description: string;
    form: {
      nameLabel: string;
      namePlaceholder: string;
      emailLabel: string;
      emailPlaceholder: string;
      messageLabel: string;
      messagePlaceholder: string;
      submitLabel: string;
      sendingLabel: string;
      sentLabel: string;
      helperText: string;
      sendingMessage: string;
      successMessage: string;
    };
    phone: {
      label: string;
      value: string;
      href: string;
    };
    email: {
      label: string;
      value: string;
      href: string;
    };
  };
  ui: {
    backToTopLabel: string;
    backToTopAriaLabel: string;
  };
  footer: {
    trustItems: Array<{ icon: string; title: string; sub: string; }>;
    sources: string;
    address: string;
    links: LinkItem[];
    copyright: string;
  };
}
