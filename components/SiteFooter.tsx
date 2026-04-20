import type { MorouteContent } from "@/types/content";

type SiteFooterProps = {
  brand: string;
  footer: MorouteContent["footer"];
  logoPath: string;
};

export default function SiteFooter({ brand, footer, logoPath }: SiteFooterProps) {
  return (
    <footer id="contact">
      <a href="#home" className="logo logo-small" aria-label={brand}>
        <img src={logoPath} alt={`${brand} logo`} className="brand-logo brand-logo-footer" />
      </a>

      <ul className="footer-links">
        {footer.links.map((link) => (
          <li key={link.label}>
            <a href={link.href}>{link.label}</a>
          </li>
        ))}
      </ul>

      <div className="footer-copy">{footer.copyright}</div>
    </footer>
  );
}
