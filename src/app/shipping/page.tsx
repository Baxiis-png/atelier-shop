"use client";

import Link from "next/link";
import { useState } from "react";
import { CITIES } from "@/lib/cities";
import { cn } from "@/lib/utils";

const highlights = [
  {
    label: "Delivery window",
    value: "48–72 hours",
    detail: "From order confirmation to your door.",
  },
  {
    label: "Coverage",
    value: "Morocco",
    detail: "Mainland cities and major regions nationwide.",
  },
  {
    label: "Cost",
    value: "Free",
    detail: "No shipping fee on every authenticated order.",
  },
  {
    label: "Coverage zone",
    value: "Wherever you are",
    detail: "We deliver to you — wherever you are.",
  },
] as const;

export default function ShippingPage() {
  const [city, setCity] = useState("");

  return (
    <div className="bg-cream">
      <div className="mx-auto max-w-[1600px] px-4 py-16 md:px-8 md:py-24">
        <p className="label-lab text-carbon/40">Support — Logistics</p>
        <h1 className="heading-brutal mt-4 max-w-3xl text-5xl md:text-6xl lg:text-[80px]">
          Shipping
        </h1>
        <p className="mt-6 max-w-2xl text-sm leading-relaxed text-carbon/60 md:text-[15px]">
          Every cleared specimen ships free across Morocco. Once your order is
          confirmed, we pack it the same day or next business morning and hand it
          to our courier for delivery wherever you are within 48 to 72 hours.
        </p>

        <dl className="mt-14 grid gap-px border border-carbon/15 bg-carbon/15 sm:grid-cols-2 lg:grid-cols-4">
          {highlights.map((item) => (
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

        <div className="mt-16 max-w-xl border border-carbon/15 bg-white p-8 md:p-10">
          <p className="font-mono-lab text-[9px] uppercase tracking-[0.22em] text-carbon/40">
            Coverage check
          </p>
          <h2 className="heading-brutal mt-3 text-3xl text-carbon md:text-4xl">
            Is your city covered?
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-carbon/55">
            Pick your city to see if free shipping is available there — 48–72
            hours, wherever you are.
          </p>

          <label className="mt-8 block">
            <span className="font-mono-lab text-[9px] uppercase tracking-[0.18em] text-carbon/45">
              Your city
            </span>
            <select
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className={cn(
                "mt-3 w-full appearance-none border border-carbon bg-cream px-4 py-4 font-sans text-[11px] font-bold uppercase tracking-[0.14em] text-carbon outline-none transition-colors",
                "focus:border-rust",
                !city && "text-carbon/40",
              )}
            >
              <option value="">Check your city</option>
              {CITIES.map((name) => (
                <option key={name} value={name}>
                  {name}
                </option>
              ))}
            </select>
          </label>

          {city ? (
            <p className="mt-6 border-t border-carbon/10 pt-6 text-sm leading-relaxed text-carbon/70">
              <span className="font-bold text-rust">Available</span> —{" "}
              <span className="font-bold text-carbon">{city}</span> is covered
              for free delivery in 48–72 hours. Cash on delivery available.
            </p>
          ) : (
            <p className="mt-6 border-t border-carbon/10 pt-6 text-sm text-carbon/40">
              Select a city to check shipping availability.
            </p>
          )}
        </div>

        <div className="mt-12 flex flex-wrap gap-3">
          <Link
            href="/#catalogue"
            className="inline-block border border-carbon bg-carbon px-8 py-4 font-sans text-[10px] font-bold uppercase tracking-[0.18em] text-cream transition-colors hover:bg-rust"
          >
            Shop the catalogue
          </Link>
          <Link
            href="/#visit"
            className="inline-block border border-carbon px-8 py-4 font-sans text-[10px] font-bold uppercase tracking-[0.18em] text-carbon transition-colors hover:bg-carbon hover:text-cream"
          >
            Contact the lab
          </Link>
        </div>
      </div>
    </div>
  );
}
