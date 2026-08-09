import Link from "next/link";

const checks = [
  { label: "Weave density", value: "Matched" },
  { label: "Tab placement", value: "Matched" },
  { label: "Hang tag print", value: "Matched" },
  { label: "Stitch gauge", value: "Matched" },
];

export function DetailStudySection() {
  return (
    <section
      id="detail-study"
      className="grid scroll-mt-24 lg:grid-cols-2 lg:scroll-mt-[194px]"
    >
      {/* Left: edge-to-edge macro shot */}
      <div className="relative min-h-[380px] bg-carbon md:min-h-[520px] lg:min-h-full">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/products/detail-hem-label.png"
          alt="Close-up of woven hem labels on black and white tees"
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <span className="absolute bottom-4 left-4 bg-black/70 px-3 py-1.5 font-mono-lab text-[8px] uppercase tracking-[0.22em] text-white/75 backdrop-blur-sm">
          40x — Hem label reference
        </span>
      </div>

      {/* Right: study notes */}
      <div className="bg-cocoa px-4 py-20 text-white md:px-12 md:py-24 lg:px-16 lg:py-28 xl:px-20">
        <div className="mx-auto max-w-xl lg:mx-0">
          <p className="font-mono-lab text-[10px] uppercase tracking-[0.26em] text-flame">
            Detail Study — Hem Label
          </p>

          <h2 className="heading-brutal mt-6 text-[42px] sm:text-5xl lg:text-[64px] xl:text-[72px]">
            We read the stitch count
          </h2>

          <p className="mt-8 text-sm leading-relaxed text-white/60 md:text-[15px]">
            Woven density, tab placement, the registration mark next to the ape
            head — these are the things that separate a real hem label texture
            quality from a cheap copy quality. Every intake is photographed at 40x
            and matched against our reference archive before it is priced.
          </p>

          <dl className="mt-12 grid grid-cols-2 border-l border-t border-white/15">
            {checks.map((check) => (
              <div
                key={check.label}
                className="border-b border-r border-white/15 px-5 py-6 md:px-6 md:py-7"
              >
                <dt className="font-mono-lab text-[9px] uppercase tracking-[0.2em] text-white/45">
                  {check.label}
                </dt>
                <dd className="mt-2 font-sans text-xs font-bold uppercase tracking-[0.14em] text-flame md:text-sm">
                  {check.value}
                </dd>
              </div>
            ))}
          </dl>

          <Link
            href="/about"
            className="mt-12 inline-block border border-white/45 px-8 py-4 font-sans text-[10px] font-bold uppercase tracking-[0.18em] text-white transition-colors duration-300 hover:border-white hover:bg-white hover:text-cocoa md:px-10"
          >
            Get to know us
          </Link>
        </div>
      </div>
    </section>
  );
}
