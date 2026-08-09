import Link from "next/link";
import { LabMark } from "@/components/LabMark";

const columns = [
  {
    title: "DEPARTMENTS",
    links: [
      { label: "Shirts & Tees", href: "/#catalogue" },
      { label: "Hoodies & Zip-Ups", href: "/#departments" },
      { label: "Jackets & Outerwear", href: "/#departments" },
      { label: "Bottoms", href: "/#departments" },
      { label: "Accessories", href: "/#departments" },
    ],
  },
  {
    title: "THE LAB",
    links: [
      { label: "Authentication", href: "/#detail-study" },
      {
        label: "Get to know us",
        href: "/about",
        highlight: true,
      },
    ],
  },
  {
    title: "SUPPORT",
    links: [
      { label: "Shipping", href: "/shipping" },
      { label: "Returns", href: "/returns" },
      { label: "Size Guide", href: "/size-guide" },
      { label: "Contact", href: "/contact" },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="bg-carbon text-white">
      <div className="mx-auto max-w-[1600px] px-4 py-16 md:px-8 md:py-20">
        <div className="grid gap-12 md:grid-cols-[1.4fr_repeat(3,1fr)] md:gap-8">
          <div>
            <div className="flex items-center gap-3">
              <LabMark className="h-10 w-9" />
              <div>
                <p className="heading-brutal text-xl leading-none">APE LAB</p>
                <p className="mt-1 font-mono-lab text-[7px] uppercase tracking-[0.32em] text-white/45">
                  Research &amp; Curation
                </p>
              </div>
            </div>
            <p className="mt-6 max-w-xs text-sm leading-relaxed text-white/50">
              Every piece is catalogued, photographed at 40x, and matched against
              our reference archive before it reaches the floor.
            </p>
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <p className="label-lab text-white/35">{col.title}</p>
              <ul className="mt-5 space-y-3">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className={
                        "highlight" in link && link.highlight
                          ? "inline-block border border-white px-3 py-1.5 text-sm font-bold text-rust transition-colors hover:bg-white hover:text-carbon"
                          : "text-sm text-white/65 transition-colors hover:text-rust"
                      }
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16 flex flex-col gap-3 border-t border-white/10 pt-8 md:flex-row md:items-center md:justify-between">
          <p className="font-mono-lab text-[9px] uppercase tracking-[0.24em] text-white/35">
            © {new Date().getFullYear()} APE LAB — All rights reserved
          </p>
          <p className="font-mono-lab text-[9px] uppercase tracking-[0.24em] text-rust">
            Quality Verified
          </p>
        </div>
      </div>
    </footer>
  );
}
