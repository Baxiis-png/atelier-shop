import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Get to know us — APE LAB",
  description:
    "The story behind APE LAB — streetwear research, curation, and authentication.",
};

const chapters = [
  {
    index: "01",
    title: "The itch",
    body: "APE LAB started with a simple frustration: too many pieces looked right in photos and fell apart under a closer look. We were collectors first — hunting drops, comparing hems, arguing over tags — and tired of guessing what was real.",
  },
  {
    index: "02",
    title: "The lab mindset",
    body: "So we built a digital research and curation project, not a flashy storefront. Every intake is treated like a specimen: photographed, logged, and matched against our reference archive before it is priced. Woven density, tab placement, registration marks — the quiet details that separate quality from a cheap copy.",
  },
  {
    index: "03",
    title: "Online, everywhere",
    body: "Born from a relentless passion for global streetwear, APE LAB was built for those who know the difference. We operate exclusively online so you can browse the latest cleared drops from anywhere and secure your next grail without walking a showroom floor.",
  },
  {
    index: "04",
    title: "What we stand for",
    body: "Free shipping across Morocco in 48–72 hours. Clear return rules. Seven-point authentication on every piece. Quality verified — not as a slogan, but as the daily work of the lab.",
  },
] as const;

export default function AboutPage() {
  return (
    <div className="bg-cream">
      <div className="mx-auto max-w-[1600px] px-4 py-16 md:px-8 md:py-24">
        <p className="label-lab text-carbon/40">The lab — Origin</p>
        <h1 className="heading-brutal mt-4 max-w-4xl text-5xl md:text-6xl lg:text-[80px]">
          Get to know us
        </h1>
        <p className="mt-6 max-w-2xl text-sm leading-relaxed text-carbon/60 md:text-[15px]">
          The storyline behind APE LAB — how a passion for streetwear became a
          research desk for{" "}
          <span className="font-bold text-carbon">Extreme</span> good quality
          pieces in a cheap quality world.
        </p>

        <div className="mt-16 space-y-px border border-carbon/15 bg-carbon/15">
          {chapters.map((chapter) => (
            <article key={chapter.index} className="bg-cream px-6 py-10 md:px-10 md:py-12">
              <div className="flex flex-wrap items-baseline gap-x-4 gap-y-2">
                <span className="font-mono-lab text-[10px] tracking-[0.2em] text-rust">
                  {chapter.index}
                </span>
                <h2 className="heading-brutal text-3xl text-carbon md:text-4xl">
                  {chapter.title}
                </h2>
              </div>
              <p className="mt-5 max-w-3xl text-sm leading-relaxed text-carbon/65 md:text-[15px]">
                {chapter.body}
              </p>
            </article>
          ))}
        </div>

        <div className="mt-16 max-w-2xl border border-carbon/15 bg-white p-8 md:p-10">
          <p className="font-mono-lab text-[9px] uppercase tracking-[0.22em] text-carbon/40">
            Still curious
          </p>
          <h2 className="heading-brutal mt-3 text-3xl text-carbon md:text-4xl">
            See the work
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-carbon/60">
            Browse the catalogue for current intake, or open the detail study to
            see how we read a hem label before it ever hits the bag.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/#catalogue"
              className="inline-block border border-carbon bg-carbon px-8 py-4 font-sans text-[10px] font-bold uppercase tracking-[0.18em] text-cream transition-colors hover:bg-rust"
            >
              Catalogue
            </Link>
            <Link
              href="/#detail-study"
              className="inline-block border border-carbon px-8 py-4 font-sans text-[10px] font-bold uppercase tracking-[0.18em] text-carbon transition-colors hover:bg-carbon hover:text-cream"
            >
              Detail study
            </Link>
            <Link
              href="/contact"
              className="inline-block border border-carbon px-8 py-4 font-sans text-[10px] font-bold uppercase tracking-[0.18em] text-carbon transition-colors hover:bg-carbon hover:text-cream"
            >
              Contact
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
