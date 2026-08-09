import Link from "next/link";
import { SIZE_GUIDE_ROWS } from "@/lib/size-guide";

export default function SizeGuidePage() {
  return (
    <div className="bg-cream">
      <div className="mx-auto max-w-[1600px] px-4 py-16 md:px-8 md:py-24">
        <p className="label-lab text-carbon/40">Support — Fit</p>
        <h1 className="heading-brutal mt-4 max-w-3xl text-5xl md:text-6xl lg:text-[80px]">
          Size guide
        </h1>
        <p className="mt-6 max-w-2xl text-sm leading-relaxed text-carbon/60 md:text-[15px]">
          Here&apos;s the size guide. Make sure that you pick the right size
          based on this guide before confirming an order. A 1–3 cm variance is
          allowed for manual measurement. All values in cm.
        </p>

        <div className="mt-14 overflow-x-auto border border-carbon/15">
          <table className="w-full min-w-[480px] border-collapse text-center font-mono-lab text-[11px] uppercase tracking-[0.06em] text-cream">
            <thead>
              <tr className="bg-[#4a4a4a]">
                <th className="border border-white/20 px-3 py-3 font-bold">
                  Size
                </th>
                <th className="border border-white/20 px-3 py-3 font-bold">
                  Shoulder
                </th>
                <th className="border border-white/20 px-3 py-3 font-bold">
                  Bust
                </th>
                <th className="border border-white/20 px-3 py-3 font-bold">
                  Length
                </th>
                <th className="border border-white/20 px-3 py-3 font-bold">
                  Sleeve
                </th>
              </tr>
            </thead>
            <tbody>
              {SIZE_GUIDE_ROWS.map((row, i) => (
                <tr
                  key={row.size}
                  className={i % 2 === 0 ? "bg-[#6b6b6b]" : "bg-[#8a8a8a]"}
                >
                  <th
                    scope="row"
                    className="border border-white/20 bg-[#4a4a4a] px-3 py-2.5 font-bold"
                  >
                    {row.size}
                  </th>
                  <td className="border border-white/20 px-3 py-2.5">
                    {row.shoulder}
                  </td>
                  <td className="border border-white/20 px-3 py-2.5">
                    {row.bust}
                  </td>
                  <td className="border border-white/20 px-3 py-2.5">
                    {row.length}
                  </td>
                  <td className="border border-white/20 px-3 py-2.5">
                    {row.sleeve}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-16 max-w-2xl border border-carbon/15 bg-white p-8 md:p-10">
          <p className="font-mono-lab text-[9px] uppercase tracking-[0.22em] text-carbon/40">
            Before you order
          </p>
          <h2 className="heading-brutal mt-3 text-3xl text-carbon md:text-4xl">
            Pick with certainty
          </h2>
          <ul className="mt-6 list-disc space-y-4 pl-5 text-sm leading-relaxed text-carbon/65">
            <li>
              Compare your measurements to the chart above — shoulder, bust,
              length, and sleeve.
            </li>
            <li>
              Choose the size that matches your fit preference before you
              confirm checkout.
            </li>
            <li>
              Once the order is confirmed, size exchanges follow the same
              return rules as worn / unworn pieces.
            </li>
          </ul>
        </div>

        <div className="mt-12 flex flex-wrap gap-3">
          <Link
            href="/#catalogue"
            className="inline-block border border-carbon bg-carbon px-8 py-4 font-sans text-[10px] font-bold uppercase tracking-[0.18em] text-cream transition-colors hover:bg-rust"
          >
            Shop the catalogue
          </Link>
          <Link
            href="/returns"
            className="inline-block border border-carbon px-8 py-4 font-sans text-[10px] font-bold uppercase tracking-[0.18em] text-carbon transition-colors hover:bg-carbon hover:text-cream"
          >
            Return policy
          </Link>
        </div>
      </div>
    </div>
  );
}
