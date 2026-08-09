"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const departments = [
  {
    number: "01",
    name: "SHIRTS & TEES",
    image: "/products/dept-shirts-tees.png",
    hoverImage: "/products/dept-shirts-tees-2.png",
    alt: "Black and white ABC camo side big ape head tees",
    comingSoon: false,
  },
  {
    number: "02",
    name: "HOODIES & ZIP-UPS",
    image: "/products/dept-hoodies.png",
    hoverImage: "/products/dept-hoodies-2.png",
    alt: "BAPE hoodies — zip, pullover, and shark full-zips",
    comingSoon: true,
  },
  {
    number: "03",
    name: "JACKETS & OUTERWEAR",
    image: "/products/dept-jackets.png",
    hoverImage: "/products/dept-jackets-2.png",
    alt: "BAPE varsity jackets and camo puffer jackets",
    comingSoon: true,
  },
  {
    number: "04",
    name: "BOTTOMS",
    image: "/products/dept-bottoms.png",
    hoverImage: "/products/dept-bottoms-2.png",
    alt: "BAPE camo shorts in multiple colourways",
    comingSoon: true,
  },
  {
    number: "05",
    name: "ACCESSORIES",
    image: "/products/dept-accessories.png",
    hoverImage: "/products/dept-accessories-2.png",
    alt: "BAPE shark full-zip hoods in split camo colourways",
    comingSoon: true,
  },
];

const MOBILE_MQ = "(max-width: 767px)";
const MOBILE_SWAP_MS = 4500;

export function DepartmentsSection() {
  return (
    <section
      id="departments"
      className="scroll-mt-24 bg-cream py-20 md:py-28 lg:scroll-mt-[194px]"
    >
      <div className="mx-auto max-w-[1600px] px-4 md:px-8">
        <div className="flex flex-col items-start gap-4 border-b border-carbon/15 pb-6 sm:flex-row sm:items-end sm:justify-between sm:gap-6 md:pb-8">
          <div>
            <p className="label-lab text-carbon/40">Index 01</p>
            <h2 className="heading-brutal mt-3 text-5xl md:text-7xl lg:text-[84px]">
              Departments
            </h2>
          </div>
          <Link
            href="#catalogue"
            className="group shrink-0 pb-1.5 font-mono-lab text-[9px] uppercase tracking-[0.22em] text-carbon/55 transition-colors hover:text-rust md:text-[10px]"
          >
            View everything
            <span className="ml-2 inline-block transition-transform group-hover:translate-x-1">
              →
            </span>
          </Link>
        </div>

        <ul className="mt-10 grid grid-cols-2 gap-x-4 gap-y-10 md:mt-14 md:grid-cols-3 lg:grid-cols-5 lg:gap-x-5">
          {departments.map((dept, i) => (
            <li
              key={dept.number}
              className="rise"
              style={{ animationDelay: `${i * 70}ms` }}
            >
              <DepartmentCard dept={dept} index={i} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function DepartmentCard({
  dept,
  index,
}: {
  dept: (typeof departments)[number];
  index: number;
}) {
  const [showAlt, setShowAlt] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const hasAlt = Boolean(dept.hoverImage);

  useEffect(() => {
    const mq = window.matchMedia(MOBILE_MQ);
    const sync = () => setIsMobile(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    if (!hasAlt || !isMobile) {
      if (!isMobile) setShowAlt(false);
      return;
    }

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    let intervalId: ReturnType<typeof setInterval> | undefined;
    const startId = setTimeout(() => {
      intervalId = setInterval(() => {
        setShowAlt((prev) => !prev);
      }, MOBILE_SWAP_MS);
    }, index * 350);

    return () => {
      clearTimeout(startId);
      if (intervalId) clearInterval(intervalId);
    };
  }, [hasAlt, isMobile, index]);

  const content = (
    <>
      <div className="relative overflow-hidden border border-carbon/10 bg-white">
        <div className="aspect-[3/4] w-full">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={dept.image}
            alt={dept.alt}
            loading="lazy"
            className={cn(
              "absolute inset-0 h-full w-full object-cover transition-all duration-[650ms] ease-[cubic-bezier(.22,1,.36,1)]",
              hasAlt
                ? showAlt
                  ? "scale-[1.04] opacity-0"
                  : "scale-100 opacity-100"
                : !dept.comingSoon && "group-hover:scale-[1.05]",
              dept.comingSoon && !hasAlt && "opacity-80",
            )}
          />
          {hasAlt && (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img
              src={dept.hoverImage}
              alt=""
              aria-hidden
              loading="lazy"
              className={cn(
                "absolute inset-0 h-full w-full object-cover transition-all duration-[650ms] ease-[cubic-bezier(.22,1,.36,1)]",
                showAlt ? "scale-[1.04] opacity-100" : "scale-105 opacity-0",
                dept.comingSoon && "brightness-90",
              )}
            />
          )}
        </div>

        {dept.comingSoon && (
          <span className="absolute inset-x-0 top-1/2 z-10 -translate-y-1/2 bg-carbon/85 py-2.5 text-center font-mono-lab text-[10px] font-bold tracking-[0.28em] text-cream">
            COMING SOON
          </span>
        )}

        <span className="pointer-events-none absolute left-0 top-0 h-3 w-3 border-l border-t border-carbon/30" />
        <span className="pointer-events-none absolute right-0 top-0 h-3 w-3 border-r border-t border-carbon/30" />
        <span className="pointer-events-none absolute bottom-0 left-0 h-3 w-3 border-b border-l border-carbon/30" />
        <span className="pointer-events-none absolute bottom-0 right-0 h-3 w-3 border-b border-r border-carbon/30" />
      </div>

      <div className="mt-4 flex flex-wrap items-baseline gap-x-3 gap-y-1">
        <span className="font-mono-lab text-[10px] tracking-[0.18em] text-rust">
          {dept.number}
        </span>
        <span
          className={cn(
            "font-sans text-[11px] font-bold uppercase tracking-[0.12em] md:text-xs",
            dept.comingSoon
              ? "text-carbon/45"
              : "text-carbon transition-colors group-hover:text-rust",
          )}
        >
          {dept.name}
        </span>
      </div>
    </>
  );

  const handlers = isMobile
    ? undefined
    : {
        onMouseEnter: () => setShowAlt(true),
        onMouseLeave: () => setShowAlt(false),
      };

  if (dept.comingSoon) {
    return (
      <Link href="/coming-soon" className="group block" {...handlers}>
        {content}
      </Link>
    );
  }

  return (
    <Link href="#catalogue" className="group block" {...handlers}>
      {content}
    </Link>
  );
}
