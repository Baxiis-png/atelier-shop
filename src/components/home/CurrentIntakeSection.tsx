import Link from "next/link";

const headingLines = ["Blue ABC", "Camo Side", "Big Ape", "Head"];

export function CurrentIntakeSection() {
  return (
    <section
      id="new-in"
      className="relative scroll-mt-24 bg-[#0D0D0D] text-white lg:scroll-mt-[194px]"
    >
      <div className="tech-grid absolute inset-0" aria-hidden />
      <div
        className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-black/60"
        aria-hidden
      />

      <div className="relative mx-auto max-w-[1600px] px-4 py-20 md:px-8 md:py-28 lg:py-32">
        <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
          {/* Left: copy */}
          <div>
            <p className="font-mono-lab text-[10px] uppercase tracking-[0.26em] text-rust">
              Specimen 001 — Current Intake
            </p>

            <h2 className="heading-brutal mt-6 text-[46px] sm:text-6xl lg:text-[80px] xl:text-[92px]">
              {headingLines.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </h2>

            <p className="mt-8 max-w-md text-sm leading-relaxed text-white/55 md:text-[15px]">
              Two colourways cleared the bench this week. Original camo hang tags,
              woven hem labels, and a seven-point authentication log attached to
              every order.
            </p>

            <div className="mt-10 flex flex-wrap gap-3">
              <GhostButton href="#catalogue">Shop the drop</GhostButton>
              <GhostButton href="#detail-study">How we verify</GhostButton>
            </div>
          </div>

          {/* Right: stacked intake videos */}
          <figure className="group relative flex aspect-[4/5] flex-col gap-3 overflow-hidden sm:aspect-[3/4] lg:aspect-[4/5]">
            <video
              className="min-h-0 w-full flex-1 object-contain [clip-path:inset(0_105px_0_105px)]"
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              aria-label="Current intake field recording — Blue ABC Camo Side Big Ape Head"
            >
              <source src="/videos/hero-intake.mp4" type="video/mp4" />
            </video>
            <video
              className="min-h-0 w-full flex-1 object-contain [clip-path:inset(0_105px_0_105px)]"
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              aria-label="Current intake secondary recording"
            >
              <source src="/videos/hero-intake-b.mp4" type="video/mp4" />
            </video>
          </figure>
        </div>
      </div>
    </section>
  );
}

function GhostButton({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="border border-white/45 px-7 py-4 font-sans text-[10px] font-bold uppercase tracking-[0.18em] text-white transition-colors duration-300 hover:border-white hover:bg-white hover:text-carbon md:px-9"
    >
      {children}
    </Link>
  );
}
