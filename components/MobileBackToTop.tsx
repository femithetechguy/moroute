"use client";

import { useEffect, useState } from "react";
import type { MorouteContent } from "@/types/content";

type MobileBackToTopProps = {
  ui: MorouteContent["ui"];
};

export default function MobileBackToTop({ ui }: MobileBackToTopProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setIsVisible(window.scrollY > 420);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <button
      type="button"
      className={`mobile-top-btn${isVisible ? " is-visible" : ""}`}
      aria-label={ui.backToTopAriaLabel}
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
    >
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
        <path d="M3.5 9.5L8 5L12.5 9.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <span>{ui.backToTopLabel}</span>
    </button>
  );
}
