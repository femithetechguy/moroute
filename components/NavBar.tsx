import type { MorouteContent } from "@/types/content";

type NavBarProps = {
  brand: string;
  nav: MorouteContent["nav"];
  logoPath: string;
};

export default function NavBar({ brand, nav, logoPath }: NavBarProps) {
  return (
    <header>
      <nav>
        <a href="#home" className="logo" aria-label={brand}>
          <img src={logoPath} alt={`${brand} logo`} className="brand-logo" />
        </a>

        <ul className="nav-links">
          {nav.links.map((link) => (
            <li key={link.label}>
              <a href={link.href}>{link.label}</a>
            </li>
          ))}
        </ul>

        <a className="nav-cta" href={nav.cta.href}>
          {nav.cta.label}
        </a>
      </nav>
    </header>
  );
}
