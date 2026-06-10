"use client";

import type { MouseEvent } from "react";
import type { MorouteContent } from "@/types/content";

type SiteFooterProps = {
  brand: string;
  footer: MorouteContent["footer"];
  logoPath: string;
  logoAlt: string;
};

export default function SiteFooter({ brand, footer, logoPath, logoAlt }: SiteFooterProps) {
  const scrollToSection = (hash: string) => {
    const section = document.querySelector(hash);
    if (!(section instanceof HTMLElement)) {
      return;
    }

    const navShell = document.querySelector(".nav-shell");
    const navHeight = navShell instanceof HTMLElement ? navShell.offsetHeight : 0;
    const navTop = navShell instanceof HTMLElement ? Number.parseFloat(window.getComputedStyle(navShell).top) || 0 : 0;
    const breathingSpace = window.innerWidth <= 920 ? 14 : 10;
    const totalOffset = navTop + navHeight + breathingSpace;
    const targetTop = section.getBoundingClientRect().top + window.scrollY - totalOffset;

    window.scrollTo({ top: Math.max(targetTop, 0), behavior: "smooth" });
  };

  const handleFooterLinkClick = (event: MouseEvent<HTMLAnchorElement>, href: string) => {
    if (!href.startsWith("#")) {
      return;
    }

    event.preventDefault();
    requestAnimationFrame(() => scrollToSection(href));
  };

  return (
    <div className="site-base">
      {/* Trust band */}
      <div className="trust-band">
        <div className="trust-band-inner">
          {footer.trustItems.map((item) => (
            <div key={item.title} className="trust-item">
              <div className="trust-item-icon">{item.icon}</div>
              <div>
                <div className="trust-item-title">{item.title}</div>
                <div className="trust-item-sub">{item.sub}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Sources attribution */}
      <p className="trust-sources">{footer.sources}</p>

      {/* Footer */}
      <footer>
        <a href="/" className="logo logo-small" aria-label={brand} onClick={(event) => handleFooterLinkClick(event, "#home")}>
          <img src={logoPath} alt={logoAlt} className="brand-logo brand-logo-footer" />
        </a>

        <ul className="footer-links">
          {footer.links.map((link) => (
            <li key={link.label}>
              <a
                href={link.href.startsWith("#") ? undefined : link.href}
                onClick={(event) => handleFooterLinkClick(event, link.href)}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="footer-copy">{footer.copyright}</div>
      </footer>
    </div>
  );
}
