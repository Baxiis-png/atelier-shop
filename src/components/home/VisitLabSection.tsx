"use client";

import { CrosshairIcon } from "@/components/LabMark";
import { useContactModal } from "@/context/contact-modal-context";

const PHONE = "+1 438 355 2337";

const info = [
  { label: "Address", value: "Coming soon" },
  { label: "Hours", value: "Mon–Sat, 11:00–20:00" },
  { label: "Phone", value: PHONE },
];

export function VisitLabSection() {
  const { openContact } = useContactModal();

  return (
    <section
      id="visit"
      className="scroll-mt-24 bg-cream py-20 md:py-28 lg:scroll-mt-[194px]"
    >
      <div className="mx-auto max-w-[1600px] px-4 md:px-8">
        <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
          {/* Left: storefront */}
          <div className="relative border border-carbon/10 bg-white">
            <div className="relative aspect-[4/3] w-full overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/storefront.png"
                alt="APE LAB storefront window with the ape head and DNA helix logo"
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover"
              />
              <div
                className="absolute inset-x-0 top-1/2 z-10 -translate-y-1/2 bg-ink/85 py-3 text-center font-mono-lab text-[11px] font-bold uppercase tracking-[0.28em] text-bone backdrop-blur-[2px] md:text-[12px] md:tracking-[0.32em]"
                aria-label="Coming soon"
              >
                Coming soon
              </div>
            </div>
            <span className="pointer-events-none absolute left-0 top-0 h-4 w-4 border-l border-t border-carbon/30" />
            <span className="pointer-events-none absolute right-0 top-0 h-4 w-4 border-r border-t border-carbon/30" />
            <span className="pointer-events-none absolute bottom-0 left-0 h-4 w-4 border-b border-l border-carbon/30" />
            <span className="pointer-events-none absolute bottom-0 right-0 h-4 w-4 border-b border-r border-carbon/30" />
          </div>

          {/* Right: details */}
          <div>
            <CrosshairIcon className="h-7 w-7 text-carbon/35" />

            <p className="label-lab mt-8 text-carbon/40">Index 03</p>

            <h2 className="heading-brutal mt-3 text-5xl md:text-6xl lg:text-[76px]">
              The lab
            </h2>

            <p className="mt-7 max-w-md text-sm leading-relaxed text-carbon/60 md:text-[15px]">
              Born from a relentless passion for global streetwear, Ape Lab was
              built for those who know the difference. Operating exclusively
              online, we serve as a dedicated digital research and curation
              project. Browse the latest drops from anywhere and secure your next
              grail.
            </p>

            <dl className="mt-12 grid gap-px border-t border-carbon/15 pt-8 sm:grid-cols-3 sm:gap-0 sm:divide-x sm:divide-carbon/15">
              {info.map((item, i) => (
                <div key={item.label} className={i === 0 ? "sm:pr-6" : "sm:px-6"}>
                  <dt className="font-mono-lab text-[9px] uppercase tracking-[0.2em] text-carbon/40">
                    {item.label}
                  </dt>
                  <dd className="mt-2 text-[13px] leading-relaxed text-carbon">
                    {item.value}
                  </dd>
                </div>
              ))}
            </dl>

            <button
              type="button"
              onClick={openContact}
              className="mt-12 inline-block border border-carbon px-8 py-4 font-sans text-[10px] font-bold uppercase tracking-[0.18em] text-carbon transition-colors duration-300 hover:bg-carbon hover:text-cream md:px-10"
            >
              Get in touch
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
