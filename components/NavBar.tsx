"use client";

import { useEffect, useId, useMemo, useState, type CSSProperties, type MouseEvent } from "react";
import type { MorouteContent } from "@/types/content";

type NavBarProps = {
  brand: string;
  nav: MorouteContent["nav"];
  logoPath: string;
  logoAlt: string;
};

export default function NavBar({ brand, nav, logoPath, logoAlt }: NavBarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeHash, setActiveHash] = useState("#home");
  const mobileMenuId = useId();
  const trackedHashes = useMemo(
    () => nav.links.map((link) => link.href).filter((href) => href.startsWith("#")),
    [nav.links]
  );

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    document.body.classList.toggle("nav-menu-open", isOpen);

    return () => {
      document.body.style.overflow = "";
      document.body.classList.remove("nav-menu-open");
    };
  }, [isOpen]);

  useEffect(() => {
    if (trackedHashes.length === 0) {
      return;
    }

    const findActiveHash = () => {
      const offset = 140;
      let current = trackedHashes[0];

      for (const hash of trackedHashes) {
        const section = document.querySelector(hash);
        if (!section) {
          continue;
        }

        if (window.scrollY + offset >= section.getBoundingClientRect().top + window.scrollY) {
          current = hash;
        }
      }

      setActiveHash(current);
    };

    const handleHashChange = () => {
      const currentHash = window.location.hash;
      if (trackedHashes.includes(currentHash)) {
        setActiveHash(currentHash);
      }
    };

    if (trackedHashes.includes(window.location.hash)) {
      setActiveHash(window.location.hash);
    } else {
      findActiveHash();
    }

    window.addEventListener("scroll", findActiveHash, { passive: true });
    window.addEventListener("resize", findActiveHash);
    window.addEventListener("hashchange", handleHashChange);

    return () => {
      window.removeEventListener("scroll", findActiveHash);
      window.removeEventListener("resize", findActiveHash);
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, [trackedHashes]);

  const closeMenu = () => setIsOpen(false);

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

  const handleNavClick = (event: MouseEvent<HTMLAnchorElement>, href: string) => {
    if (!href.startsWith("#")) {
      closeMenu();
      return;
    }

    event.preventDefault();
    setActiveHash(href);
    setIsOpen(false);

    if (window.location.hash !== href) {
      window.history.pushState(null, "", href);
    }

    window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => {
        scrollToSection(href);
      });
    });
  };

  return (
    <header className="nav-shell">
      <nav>
        <a href="#home" className="logo" aria-label={brand}>
          <img src={logoPath} alt={logoAlt} className="brand-logo" />
        </a>

        <ul className="nav-links">
          {nav.links.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                className={link.href === activeHash ? "is-active" : undefined}
                onClick={(event) => handleNavClick(event, link.href)}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="nav-controls">
          <a className="nav-cta" href={nav.cta.href} onClick={(event) => handleNavClick(event, nav.cta.href)}>
            {nav.cta.label}
          </a>

          <button
            className={`nav-toggle${isOpen ? " is-open" : ""}`}
            type="button"
            aria-expanded={isOpen}
            aria-controls={mobileMenuId}
            aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
            onClick={() => setIsOpen((previous) => !previous)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </nav>

      <button
        className={`nav-fab-toggle${isOpen ? " is-open" : ""}`}
        type="button"
        aria-expanded={isOpen}
        aria-controls={mobileMenuId}
        aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
        onClick={() => setIsOpen((previous) => !previous)}
      >
        <span />
        <span />
        <span />
      </button>

      <div className={`nav-mobile-menu${isOpen ? " is-open" : ""}`} id={mobileMenuId} aria-hidden={!isOpen}>
        <div className="nav-mobile-head">
          <div className="nav-mobile-kicker">Quick Navigate</div>
          <button type="button" className="nav-mobile-close" aria-label="Close menu" onClick={closeMenu}>
            <span />
            <span />
          </button>
        </div>

        <ul className="nav-mobile-links">
          {nav.links.map((link, index) => (
            <li className="nav-mobile-item" key={link.label} style={{ "--menu-stagger": `${index * 55 + 70}ms` } as CSSProperties}>
              <a
                href={link.href}
                className={link.href === activeHash ? "is-active" : undefined}
                onClick={(event) => handleNavClick(event, link.href)}
              >
                <span className="nav-mobile-link-main">{link.label}</span>
                <span className="nav-mobile-link-meta">section {String(index + 1).padStart(2, "0")}</span>
              </a>
            </li>
          ))}
        </ul>

        <a className="nav-mobile-cta" href={nav.cta.href} onClick={(event) => handleNavClick(event, nav.cta.href)}>
          {nav.cta.label}
        </a>
      </div>

      <button
        type="button"
        className={`nav-mobile-backdrop${isOpen ? " is-open" : ""}`}
        aria-label="Close navigation menu"
        onClick={closeMenu}
        tabIndex={isOpen ? 0 : -1}
      />
    </header>
  );
}
