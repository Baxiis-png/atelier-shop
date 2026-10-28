"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useCart } from "@/context/cart-context";
import { BagIcon, LabMark } from "@/components/LabMark";
import { cn } from "@/lib/utils";

const ANNOUNCEMENTS = [
  "IN-HOUSE",
  "CASH ON DELIVERY AVAILABLE",
  "FREE SHIPPING ALL OVER MOROCCO",
  "EVERY PIECE VERIFIED",
] as const;

const primaryNav = [
  { label: "HOME", href: "/" },
  { label: "NEW IN", href: "/#new-in" },
  { label: "SHIRTS & TEES", href: "/#catalogue" },
  { label: "HOODIES & ZIP-UPS", href: "/#departments" },
  { label: "JACKETS & OUTERWEAR", href: "/#departments" },
  { label: "BOTTOMS", href: "/#departments" },
  { label: "ESSENTIALS & ACCESSORIES", href: "/#departments" },
];

const secondaryNav = [
  { label: "CHECK", href: "/#detail-study" },
  { label: "SHIPPING", href: "/shipping" },
  { label: "CONTACT", href: "/contact" },
];

export function SiteHeader() {
  const { count } = useCart();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const isHome = pathname === "/";

  return (
    <header className="sticky top-0 z-50">
      {/* ── 1. Announcement marquee (RTL, seamless) ── */}
      <div className="announcement-bar" aria-label="Store announcements">
        <div className="announcement-track">
          <AnnouncementCopy />
          <AnnouncementCopy ariaHidden />
        </div>
      </div>

      {/* ── 2. Main header (compact + L→R entrance) ── */}
      <div className="header-slide-in animate-header-in bg-carbon text-white">
        <div className="border-b border-white/10">
          <div className="mx-auto grid h-14 max-w-[1600px] grid-cols-[1fr_auto_1fr] items-center px-4 md:h-[58px] md:px-8">
            <div className="flex items-center gap-0.5">
              <button
                type="button"
                aria-label="Menu"
                aria-expanded={open}
                onClick={() => setOpen((v) => !v)}
                className="flex h-8 w-8 items-center justify-center text-white/75 transition-colors duration-200 hover:text-gold lg:hidden"
              >
                <span className="flex w-3.5 flex-col gap-[3px]">
                  <span
                    className={cn(
                      "h-[1.5px] w-full origin-center bg-current transition-transform duration-200",
                      open && "translate-y-[4.5px] rotate-45",
                    )}
                  />
                  <span
                    className={cn(
                      "h-[1.5px] w-full bg-current transition-opacity duration-200",
                      open && "opacity-0",
                    )}
                  />
                  <span
                    className={cn(
                      "h-[1.5px] w-full origin-center bg-current transition-transform duration-200",
                      open && "-translate-y-[4.5px] -rotate-45",
                    )}
                  />
                </span>
              </button>
            </div>

            <Link
              href="/"
              className="group flex items-center justify-center gap-2.5"
            >
              <LabMark className="h-7 w-6 text-white transition-colors duration-200 group-hover:text-gold md:h-8 md:w-7" />
              <span className="flex flex-col items-start">
                <span className="heading-brutal text-[16px] leading-none tracking-[-0.02em] md:text-[20px]">
                  APE LAB
                </span>
                <span className="mt-[3px] font-sans text-[6px] font-medium uppercase tracking-[0.32em] text-white/45 md:text-[6.5px]">
                  Research &amp; Curation
                </span>
              </span>
            </Link>

            <div className="flex items-center justify-end gap-0.5">
              <Link
                href="/cart"
                aria-label={`Bag, ${count} items`}
                className="relative flex h-9 w-9 items-center justify-center text-white/75 transition-colors duration-200 hover:text-gold"
              >
                <BagIcon className="h-5 w-5" />
                {count > 0 && (
                  <span className="absolute -right-0.5 -top-0.5 flex h-3.5 min-w-3.5 items-center justify-center bg-gold px-1 font-mono-lab text-[8px] font-bold text-inkbar">
                    {count}
                  </span>
                )}
              </Link>
            </div>
          </div>
        </div>

        <nav className="hidden lg:block" aria-label="Main">
          <div className="mx-auto max-w-[1600px] px-8">
            <ul className="flex items-center justify-center gap-5 xl:gap-7">
              {primaryNav.map((item, i) => (
                <li
                  key={item.label}
                  className="header-slide-in animate-header-in"
                  style={{ animationDelay: `${70 + i * 35}ms` }}
                >
                  <NavLink
                    href={item.href}
                    active={item.label === "HOME" && isHome}
                  >
                    {item.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
          <div className="border-t border-white/[0.08]">
            <div className="mx-auto max-w-[1600px] px-8">
              <ul className="flex items-center justify-center gap-5 xl:gap-7">
                {secondaryNav.map((item, i) => (
                  <li
                    key={item.label}
                    className="header-slide-in animate-header-in"
                    style={{ animationDelay: `${250 + i * 35}ms` }}
                  >
                    <NavLink href={item.href} secondary>
                      {item.label}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </nav>

        {open && (
          <nav
            className="border-t border-white/10 lg:hidden"
            aria-label="Mobile"
            onClick={() => setOpen(false)}
          >
            <ul className="divide-y divide-white/[0.07] px-4 py-1">
              {[...primaryNav, ...secondaryNav].map((item, i) => (
                <li key={`${item.label}-${i}`}>
                  <NavLink
                    href={item.href}
                    active={item.label === "HOME" && isHome}
                    secondary={i >= primaryNav.length}
                    className="block py-3"
                  >
                    {item.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>
        )}
      </div>
    </header>
  );
}

function AnnouncementCopy({ ariaHidden = false }: { ariaHidden?: boolean }) {
  const items = [...ANNOUNCEMENTS, ...ANNOUNCEMENTS, ...ANNOUNCEMENTS];

  return (
    <div className="announcement-copy" aria-hidden={ariaHidden || undefined}>
      {items.map((msg, i) => (
        <span key={`${msg}-${i}`} className="announcement-item">
          {msg}
          <span className="announcement-dot" aria-hidden />
        </span>
      ))}
    </div>
  );
}

function NavLink({
  href,
  children,
  active = false,
  secondary = false,
  className,
}: {
  href: string;
  children: React.ReactNode;
  active?: boolean;
  secondary?: boolean;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "group/nav relative inline-block py-2 font-sans font-bold uppercase transition-colors duration-200",
        secondary
          ? "text-[8.5px] tracking-[0.16em] text-white/50 hover:text-gold"
          : "text-[9px] tracking-[0.14em] text-white hover:text-gold xl:text-[10px]",
        active && "text-gold",
        className,
      )}
    >
      {children}
      <span
        className={cn(
          "pointer-events-none absolute inset-x-0 bottom-[7px] h-px origin-center bg-gold transition-transform duration-300 ease-out",
          active ? "scale-x-100" : "scale-x-0 group-hover/nav:scale-x-100",
        )}
        aria-hidden
      />
    </Link>
  );
}
