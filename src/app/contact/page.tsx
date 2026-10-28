"use client";

import Link from "next/link";
import { useContactModal } from "@/context/contact-modal-context";

const PHONE = "+1 438 355 2337";
const EMAIL = "ape.lab@outlook.com";

export default function ContactPage() {
  const { openContact } = useContactModal();

  return (
    <div className="bg-cream">
      <div className="mx-auto max-w-[1600px] px-4 py-16 md:px-8 md:py-24">
        <p className="label-lab text-carbon/40">Support — Desk</p>
        <h1 className="heading-brutal mt-4 max-w-3xl text-5xl md:text-6xl lg:text-[80px]">
          Contact
        </h1>
        <p className="mt-6 max-w-2xl text-sm leading-relaxed text-carbon/60 md:text-[15px]">
          We are available{" "}
          <span className="font-bold text-carbon">Monday to Saturday</span>, from{" "}
          <span className="font-bold text-carbon">11 AM to 8 PM</span>. Reach
          out anytime in that timeline.
        </p>

        <div className="mt-14 grid gap-px border border-carbon/15 bg-carbon/15 md:grid-cols-3">
          <div className="bg-cream px-6 py-10 md:px-8">
            <p className="font-mono-lab text-[9px] uppercase tracking-[0.2em] text-carbon/40">
              Hours
            </p>
            <p className="heading-brutal mt-4 text-2xl text-carbon md:text-3xl">
              Mon–Sat
            </p>
            <p className="mt-3 font-mono-lab text-sm tracking-[0.08em] text-carbon">
              11:00 — 20:00
            </p>
            <p className="mt-4 text-sm leading-relaxed text-carbon/55">
              Outside these hours, leave a message — we pick it up as soon as
              the lab opens.
            </p>
          </div>

          <div className="bg-cream px-6 py-10 md:px-8">
            <p className="font-mono-lab text-[9px] uppercase tracking-[0.2em] text-carbon/40">
              Phone / WhatsApp
            </p>
            <a
              href="https://wa.me/14383552337"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 block font-mono-lab text-xl tracking-[0.06em] text-carbon transition-colors hover:text-rust md:text-2xl"
            >
              {PHONE}
            </a>
            <p className="mt-4 text-sm leading-relaxed text-carbon/55">
              Best for orders, returns, and fast answers during open hours.
            </p>
            <button
              type="button"
              onClick={openContact}
              className="mt-6 inline-block border border-carbon px-6 py-3 font-sans text-[10px] font-bold uppercase tracking-[0.18em] text-carbon transition-colors hover:bg-carbon hover:text-cream"
            >
              Text the lab
            </button>
          </div>

          <div className="bg-cream px-6 py-10 md:px-8">
            <p className="font-mono-lab text-[9px] uppercase tracking-[0.2em] text-carbon/40">
              Email
            </p>
            <a
              href={`mailto:${EMAIL}`}
              className="mt-4 block break-all font-mono-lab text-lg tracking-[0.04em] text-carbon transition-colors hover:text-rust md:text-xl"
            >
              {EMAIL}
            </a>
            <p className="mt-4 text-sm leading-relaxed text-carbon/55">
              For detailed requests — we try our best to reply as soon as we
              can.
            </p>
          </div>
        </div>

        <div className="mt-16 max-w-2xl border border-carbon/15 bg-white p-8 md:p-10">
          <p className="font-mono-lab text-[9px] uppercase tracking-[0.22em] text-carbon/40">
            Response time
          </p>
          <h2 className="heading-brutal mt-3 text-3xl text-carbon md:text-4xl">
            We try our best
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-carbon/60">
            During{" "}
            <span className="font-bold text-carbon">Mon–Sat, 11 AM–8 PM</span>,
            our team is on desk. Messages sent in that window usually get a
            quick reply. For inquiries received outside of regular hours or on
            Sunday, our team will get in touch with you when the lab resumes
            operations.
          </p>
        </div>

        <div className="mt-12 flex flex-wrap gap-3">
          <Link
            href="/shipping"
            className="inline-block border border-carbon px-8 py-4 font-sans text-[10px] font-bold uppercase tracking-[0.18em] text-carbon transition-colors hover:bg-carbon hover:text-cream"
          >
            Shipping
          </Link>
          <Link
            href="/returns"
            className="inline-block border border-carbon px-8 py-4 font-sans text-[10px] font-bold uppercase tracking-[0.18em] text-carbon transition-colors hover:bg-carbon hover:text-cream"
          >
            Returns
          </Link>
        </div>
      </div>
    </div>
  );
}
