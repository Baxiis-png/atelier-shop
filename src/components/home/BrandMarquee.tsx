const BRANDS = [
  "A BATHING APE®",
  "NEIGHBORHOOD",
  "STÜSSY",
  "COMME DES GARÇONS",
  "HUMAN MADE",
  "SUPREME",
  "UNDERCOVER",
  "WTAPS",
] as const;

export function BrandMarquee() {
  return (
    <div className="brand-marquee" aria-label="Featured brands">
      <div className="brand-marquee-track">
        <BrandCopy />
        <BrandCopy ariaHidden />
        <BrandCopy ariaHidden />
      </div>
    </div>
  );
}

function BrandCopy({ ariaHidden = false }: { ariaHidden?: boolean }) {
  return (
    <div
      className="brand-marquee-content"
      aria-hidden={ariaHidden || undefined}
    >
      {BRANDS.map((brand) => (
        <span key={brand} className="brand-marquee-item">
          {brand}
          <span className="brand-marquee-dot" aria-hidden />
        </span>
      ))}
    </div>
  );
}
