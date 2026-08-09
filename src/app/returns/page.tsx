"use client";

import Link from "next/link";
import { useContactModal } from "@/context/contact-modal-context";

const rules = [
  {
    label: "Condition",
    value: "Unworn only",
    detail:
      "Returns are accepted only if the piece has not been worn, washed, or altered in any way.",
  },
  {
    label: "Tags",
    value: "Still attached",
    detail:
      "Original hang tags, labels, and packaging must remain intact and attached exactly as received.",
  },
  {
    label: "State",
    value: "As shipped",
    detail:
      "The item must be returned in the same condition it left the lab — no stains, odours, or damage.",
  },
  {
    label: "Window",
    value: "2 days max",
    detail:
      "You have a maximum of 2 days from delivery to request and complete a return.",
  },
] as const;

export default function ReturnsPage() {
  const { openContact } = useContactModal();

  return (
    <div className="bg-cream">
      <div className="mx-auto max-w-[1600px] px-4 py-16 md:px-8 md:py-24">
        <p className="label-lab text-carbon/40">Support — Policy</p>
        <h1 className="heading-brutal mt-4 max-w-3xl text-5xl md:text-6xl lg:text-[80px]">
          Returns
        </h1>
        <p className="mt-6 max-w-2xl text-sm leading-relaxed text-carbon/60 md:text-[15px]">
          Every specimen ships authenticated and ready to wear. If something is
          not right, we accept returns under clear rules — so both sides stay
          protected and the archive stays clean.
        </p>

        <dl className="mt-14 grid gap-px border border-carbon/15 bg-carbon/15 sm:grid-cols-2 lg:grid-cols-4">
          {rules.map((item) => (
            <div key={item.label} className="bg-cream px-6 py-8">
              <dt className="font-mono-lab text-[9px] uppercase tracking-[0.2em] text-carbon/40">
                {item.label}
              </dt>
              <dd className="heading-brutal mt-3 text-2xl text-carbon md:text-3xl">
                {item.value}
              </dd>
              <p className="mt-3 text-sm leading-relaxed text-carbon/55">
                {item.detail}
              </p>
            </div>
          ))}
        </dl>

        <div className="mt-16 max-w-2xl border border-carbon/15 bg-white p-8 md:p-10">
          <p className="font-mono-lab text-[9px] uppercase tracking-[0.22em] text-carbon/40">
            Fit issues
          </p>
          <h2 className="heading-brutal mt-3 text-3xl text-carbon md:text-4xl">
            Size problem returns
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-carbon/60">
            If the size is wrong, we accept a return only to{" "}
            <span className="font-bold text-carbon">change</span> it for another
            size.
          </p>
          <ul className="mt-6 list-disc space-y-4 pl-5 text-sm leading-relaxed text-carbon/65">
            <li>
              Size exchanges are{" "}
              <span className="font-bold text-carbon">swap only</span> — no cash
              refund on size problems.
            </li>
            <li>
              The same{" "}
              <span className="font-bold text-carbon">tags attached</span> rule
              applies: hang tags and labels must stay intact.
            </li>
            <li>
              The same{" "}
              <span className="font-bold text-carbon">2-day window</span> applies
              from delivery to request the size change.
            </li>
            <li>
              The piece must still be{" "}
              <span className="font-bold text-carbon">unworn</span> and in the
              same state as shipped.
            </li>
          </ul>
          <p className="mt-6 border-t border-carbon/10 pt-6 text-sm leading-relaxed text-carbon/50">
            Check the{" "}
            <Link
              href="/size-guide"
              className="font-bold text-carbon underline underline-offset-2 hover:text-rust"
            >
              size guide
            </Link>{" "}
            before ordering to reduce fit issues.
          </p>
        </div>

        <div className="mt-8 max-w-2xl border border-carbon/15 bg-white p-8 md:p-10">
          <p className="font-mono-lab text-[9px] uppercase tracking-[0.22em] text-carbon/40">
            How it works
          </p>
          <h2 className="heading-brutal mt-3 text-3xl text-carbon md:text-4xl">
            Request a return
          </h2>
          <ol className="mt-6 list-decimal space-y-4 pl-5 text-sm leading-relaxed text-carbon/65">
            <li>
              Contact us within{" "}
              <span className="font-bold text-carbon">2 days</span> of delivery
              via WhatsApp.
            </li>
            <li>
              Confirm the piece is{" "}
              <span className="font-bold text-carbon">unworn</span>, with{" "}
              <span className="font-bold text-carbon">tags attached</span>, and
              in the{" "}
              <span className="font-bold text-carbon">same state as shipped</span>
              .
            </li>
            <li>
              We will share return{" "}
              <span className="font-bold text-carbon">instructions</span>.
            </li>
            <li>
              Items that fail inspection may be{" "}
              <span className="font-bold text-carbon">refused</span> for refund.
            </li>
          </ol>
          <p className="mt-6 border-t border-carbon/10 pt-6 text-sm leading-relaxed text-carbon/50">
            Returns outside the 2-day window, or for worn / untagged / altered
            pieces, cannot be accepted.
          </p>
        </div>

        <div className="mt-12 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={openContact}
            className="inline-block border border-carbon bg-carbon px-8 py-4 font-sans text-[10px] font-bold uppercase tracking-[0.18em] text-cream transition-colors hover:bg-rust"
          >
            Contact the lab
          </button>
          <Link
            href="/shipping"
            className="inline-block border border-carbon px-8 py-4 font-sans text-[10px] font-bold uppercase tracking-[0.18em] text-carbon transition-colors hover:bg-carbon hover:text-cream"
          >
            Shipping info
          </Link>
        </div>
      </div>
    </div>
  );
}
