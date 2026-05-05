"use client";

import { useEffect, useRef, useState, type CSSProperties, type TouchEvent } from "react";
import { createPortal } from "react-dom";
import type { MorouteContent } from "@/types/content";
import type { FeatureIconName } from "@/types/content";
import type { LucideIcon } from "lucide-react";
import { ChartLine, ChevronLeft, ChevronRight, MapPinned, Maximize2, Megaphone, Route, ShieldAlert, ShieldCheck, X } from "lucide-react";

type FeaturesSectionProps = {
  features: MorouteContent["features"];
  screenshots: MorouteContent["screenshots"];
};

const ICONS: Record<FeatureIconName, LucideIcon> = {
  "shield-alert": ShieldAlert,
  "map-pinned": MapPinned,
  route: Route,
  megaphone: Megaphone,
  "shield-check": ShieldCheck,
  "chart-line": ChartLine
};

const SCREENSHOT_NUMBERS = Array.from({ length: 50 }, (_, index) => index + 1);
const EXTRA_SCREENSHOT_NAMES = [
  "creenshot51.jpeg",
  "creenshot52.jpeg",
  "creenshot53.jpeg",
  "creenshot54.jpeg",
  "creenshot55.jpeg",
  "creenshot56.jpeg",
  "creenshot57.jpeg",
  "creenshot58.jpeg",
  "creenshot59.jpeg",
  "creenshot60.jpeg",
  "creenshot61.jpeg"
];

const buildFeatureShowcaseShots = (screenshots: MorouteContent["screenshots"]) => [
  ...screenshots.primaryGallery,
  ...SCREENSHOT_NUMBERS.map((number) => ({
    src: `/images/somescreenshot/screenshot${number}.jpeg`,
    alt: `${screenshots.screenShotAltPrefix} ${number}`
  })),
  ...EXTRA_SCREENSHOT_NAMES.map((name, index) => ({
    src: `/images/somescreenshot/${name}`,
    alt: `${screenshots.screenShotAltPrefix} ${SCREENSHOT_NUMBERS.length + index + 1}`
  }))
];

export default function FeaturesSection({ features, screenshots }: FeaturesSectionProps) {
  const FEATURE_SHOWCASE_SHOTS = buildFeatureShowcaseShots(screenshots);
  const isLongSectionCopy = features.sectionTitle.length > 120;
  const hasSectionTag = features.sectionTag.trim().length > 0;
  const showcaseRef = useRef<HTMLDivElement | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);
  const touchStartXRef = useRef<number | null>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isAtStart, setIsAtStart] = useState(true);
  const [isAtEnd, setIsAtEnd] = useState(false);
  const [activeShotIndex, setActiveShotIndex] = useState<number | null>(null);
  const [isMounted, setIsMounted] = useState(false);

  const isLightboxOpen = activeShotIndex !== null;
  const activeShot = activeShotIndex === null ? null : FEATURE_SHOWCASE_SHOTS[activeShotIndex];
  const currentShotNumber = activeShotIndex === null ? 0 : activeShotIndex + 1;

  const showPreviousShot = () => {
    setActiveShotIndex((current) => {
      if (current === null) {
        return current;
      }

      return current === 0 ? FEATURE_SHOWCASE_SHOTS.length - 1 : current - 1;
    });
  };

  const showNextShot = () => {
    setActiveShotIndex((current) => {
      if (current === null) {
        return current;
      }

      return current === FEATURE_SHOWCASE_SHOTS.length - 1 ? 0 : current + 1;
    });
  };

  const closeLightbox = () => {
    setActiveShotIndex(null);
  };

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    const showcase = showcaseRef.current;
    if (!showcase) {
      return;
    }

    let frameId = 0;

    const updateShowcaseState = () => {
      const maxScroll = showcase.scrollWidth - showcase.clientWidth;
      const currentScroll = showcase.scrollLeft;
      const tolerance = 2;

      if (maxScroll <= 0) {
        setScrollProgress(100);
        setIsAtStart(true);
        setIsAtEnd(true);
        return;
      }

      setScrollProgress(Math.round((currentScroll / maxScroll) * 100));
      setIsAtStart(currentScroll <= tolerance);
      setIsAtEnd(maxScroll - currentScroll <= tolerance);
    };

    const queueUpdate = () => {
      if (frameId !== 0) {
        return;
      }

      frameId = window.requestAnimationFrame(() => {
        frameId = 0;
        updateShowcaseState();
      });
    };

    const imageNodes = Array.from(showcase.querySelectorAll("img"));
    const resizeObserver = typeof ResizeObserver !== "undefined" ? new ResizeObserver(queueUpdate) : null;

    queueUpdate();
    showcase.addEventListener("scroll", queueUpdate, { passive: true });
    window.addEventListener("resize", queueUpdate);
    resizeObserver?.observe(showcase);
    imageNodes.forEach((image) => image.addEventListener("load", queueUpdate));

    return () => {
      showcase.removeEventListener("scroll", queueUpdate);
      window.removeEventListener("resize", queueUpdate);
      resizeObserver?.disconnect();
      imageNodes.forEach((image) => image.removeEventListener("load", queueUpdate));

      if (frameId !== 0) {
        window.cancelAnimationFrame(frameId);
      }
    };
  }, []);

  useEffect(() => {
    if (!isLightboxOpen) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeLightbox();
        return;
      }

      if (event.key === "ArrowLeft") {
        showPreviousShot();
        return;
      }

      if (event.key === "ArrowRight") {
        showNextShot();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isLightboxOpen]);

  useEffect(() => {
    document.body.classList.toggle("feature-lightbox-open", isLightboxOpen);

    if (isLightboxOpen) {
      window.requestAnimationFrame(() => {
        closeButtonRef.current?.focus();
      });
    }

    return () => {
      document.body.classList.remove("feature-lightbox-open");
    };
  }, [isLightboxOpen]);

  const handleLightboxTouchStart = (event: TouchEvent<HTMLElement>) => {
    touchStartXRef.current = event.touches[0]?.clientX ?? null;
  };

  const handleLightboxTouchEnd = (event: TouchEvent<HTMLElement>) => {
    const startX = touchStartXRef.current;
    const endX = event.changedTouches[0]?.clientX;
    touchStartXRef.current = null;

    if (startX === null || endX === undefined) {
      return;
    }

    const deltaX = endX - startX;
    if (Math.abs(deltaX) < 42) {
      return;
    }

    if (deltaX < 0) {
      showNextShot();
      return;
    }

    showPreviousShot();
  };

  return (
    <section id="features" data-reveal>
      {hasSectionTag ? <div className="section-tag">{features.sectionTag}</div> : null}
      <div className={`section-title${isLongSectionCopy ? " section-title--body" : ""}`}>{features.sectionTitle}</div>

      <div className="feature-showcase-head">
        <p className="feature-showcase-title">App Screens</p>
        <p className="feature-showcase-hint">Swipe to preview. Tap expand for full view.</p>
      </div>

      <div className="feature-showcase-wrap" data-start={isAtStart ? "true" : "false"} data-end={isAtEnd ? "true" : "false"}>
        <div className="feature-showcase" aria-label="MoRoute app screenshot gallery" ref={showcaseRef}>
          {FEATURE_SHOWCASE_SHOTS.map((shot, index) => (
            <figure
              className="feature-showcase-card"
              key={shot.src}
              style={{ "--stagger": `${index * 90 + 90}ms` } as CSSProperties}
            >
              <img src={shot.src} alt={shot.alt} loading="lazy" />
              <button
                type="button"
                className="feature-showcase-expand"
                onClick={() => setActiveShotIndex(index)}
                aria-label={`Expand ${shot.alt}`}
              >
                <Maximize2 size={15} />
              </button>
            </figure>
          ))}
        </div>
      </div>

      <div className="feature-showcase-progress" aria-live="polite">
        <span>{scrollProgress}% viewed</span>
        <div
          className="feature-showcase-progress-track"
          role="progressbar"
          aria-label="Screenshot gallery progress"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={scrollProgress}
          aria-valuetext={`${scrollProgress}% viewed`}
        >
          <div className="feature-showcase-progress-fill" style={{ width: `${scrollProgress}%` }} />
        </div>
      </div>

      <div className="features-grid">
        {features.items.map((feature, index) => {
          const Icon = ICONS[feature.icon];

          return (
            <article
              className="feature-card"
              key={feature.name}
              style={{ "--stagger": `${index * 70 + 120}ms` } as CSSProperties}
            >
              <div className={`feature-icon icon-${feature.tone}`}>
                <Icon size={20} strokeWidth={2.2} />
              </div>
              <div className="feature-name">{feature.name}</div>
              <div className="feature-desc">{feature.description}</div>
            </article>
          );
        })}
      </div>

      {activeShot && isMounted
        ? createPortal(
            <div className="feature-lightbox" role="dialog" aria-modal="true" aria-label="Expanded screenshot view" onClick={closeLightbox}>
              <div className="feature-lightbox-panel" onClick={(event) => event.stopPropagation()}>
                <div className="feature-lightbox-top">
                  <div className="feature-lightbox-meta">
                    <p className="feature-lightbox-count">
                      Screen {currentShotNumber} of {FEATURE_SHOWCASE_SHOTS.length}
                    </p>
                    <p className="feature-lightbox-hint">Swipe or use arrows</p>
                  </div>
                  <button
                    type="button"
                    className="feature-lightbox-close"
                    onClick={closeLightbox}
                    aria-label="Close screenshot preview"
                    ref={closeButtonRef}
                  >
                    <X size={18} />
                  </button>
                </div>

                <div className="feature-lightbox-stage" onTouchStart={handleLightboxTouchStart} onTouchEnd={handleLightboxTouchEnd}>
                  <figure className="feature-lightbox-figure">
                    <img src={activeShot.src} alt={activeShot.alt} className="feature-lightbox-image" />
                  </figure>

                  <button type="button" className="feature-lightbox-nav feature-lightbox-prev" onClick={showPreviousShot} aria-label="Previous screenshot">
                    <ChevronLeft size={18} />
                  </button>

                  <button type="button" className="feature-lightbox-nav feature-lightbox-next" onClick={showNextShot} aria-label="Next screenshot">
                    <ChevronRight size={18} />
                  </button>
                </div>
              </div>
            </div>,
            document.body
          )
        : null}
    </section>
  );
}
