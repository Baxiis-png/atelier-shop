"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useCart } from "@/context/cart-context";
import { CITIES } from "@/lib/cities";
import { formatPrice, getProductById } from "@/lib/products";
import { cn } from "@/lib/utils";
import { markOrderSuccess } from "@/components/OrderSuccessModal";

function itemOriginalPrice(productId: string, price: number) {
  return getProductById(productId)?.compareAt ?? price;
}

export default function CheckoutPage() {
  const router = useRouter();
  const { items, count, clearCart } = useCart();
  const [city, setCity] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const subtotal = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const originalTotal = items.reduce(
    (sum, i) => sum + itemOriginalPrice(i.productId, i.price) * i.quantity,
    0,
  );
  const saved = Math.max(0, originalTotal - subtotal);

  if (count === 0) {
    return (
      <div className="mx-auto max-w-[1600px] px-4 py-28 text-center md:px-8">
        <p className="label-lab text-carbon/40">Checkout</p>
        <h1 className="heading-brutal mt-4 text-4xl md:text-6xl">
          Nothing to confirm
        </h1>
        <Link
          href="/#catalogue"
          className="mt-10 inline-block border border-carbon px-10 py-4 font-sans text-[10px] font-bold uppercase tracking-[0.18em] text-carbon transition-colors hover:bg-carbon hover:text-cream"
        >
          Browse the catalogue
        </Link>
      </div>
    );
  }

  async function handleConfirm() {
    if (
      !city ||
      !name.trim() ||
      !phone.trim() ||
      !email.trim() ||
      !address.trim() ||
      !acceptTerms ||
      submitting
    )
      return;

    setSubmitting(true);
    setSubmitError("");

    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          city,
          name: name.trim(),
          phone: phone.trim(),
          email: email.trim(),
          address: address.trim(),
          items: items.map((item) => ({
            productId: item.productId,
            handle: item.handle,
            title: item.title,
            brand: item.brand,
            colorway: item.colorway,
            size: item.size,
            price: item.price,
            quantity: item.quantity,
          })),
        }),
      });

      const data = (await res.json().catch(() => ({}))) as {
        error?: string;
        ok?: boolean;
      };

      if (!res.ok || !data.ok) {
        setSubmitError(
          data.error ||
            "Could not send the order to Shopify. Check your store connection and try again.",
        );
        setSubmitting(false);
        return;
      }

      clearCart();
      markOrderSuccess();
      router.push("/");
    } catch {
      setSubmitError("Network error — please try again.");
      setSubmitting(false);
    }
  }

  const canSubmit =
    Boolean(city) &&
    name.trim().length > 1 &&
    phone.trim().length > 5 &&
    email.trim().includes("@") &&
    address.trim().length > 3 &&
    acceptTerms &&
    !submitting;

  return (
    <div className="mx-auto max-w-[1600px] px-4 py-16 md:px-8 md:py-20">
      <p className="label-lab text-carbon/40">Checkout</p>
      <h1 className="heading-brutal mt-3 text-4xl md:text-6xl">Confirm order</h1>
      <p className="mt-4 max-w-xl text-sm leading-relaxed text-carbon/55">
        Free shipping wherever you are — 48–72 hours. Select your city, fill your
        details, then confirm — your order is sent to the lab.
      </p>

      <div className="mt-12 grid gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:gap-16">
        <div className="space-y-8">
          <div className="border border-carbon/15 bg-white p-6 md:p-8">
            <p className="font-mono-lab text-[9px] uppercase tracking-[0.22em] text-carbon/40">
              Delivery zone
            </p>
            <h2 className="heading-brutal mt-2 text-2xl text-carbon md:text-3xl">
              Select your city
            </h2>
            <label className="mt-6 block">
              <span className="font-mono-lab text-[9px] uppercase tracking-[0.18em] text-carbon/45">
                City
              </span>
              <select
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className={cn(
                  "mt-3 w-full appearance-none border border-carbon bg-cream px-4 py-4 font-sans text-[11px] font-bold uppercase tracking-[0.14em] text-carbon outline-none transition-colors focus:border-rust",
                  !city && "text-carbon/40",
                )}
              >
                <option value="">Select your city</option>
                {CITIES.map((name) => (
                  <option key={name} value={name}>
                    {name}
                  </option>
                ))}
              </select>
            </label>
            {city ? (
              <p className="mt-4 text-sm text-carbon/60">
                <span className="font-bold text-carbon">{city}</span> — free
                delivery wherever you are in 48–72 hours.
              </p>
            ) : null}
          </div>

          <div className="border border-carbon/15 bg-white p-6 md:p-8">
            <p className="font-mono-lab text-[9px] uppercase tracking-[0.22em] text-carbon/40">
              Recipient
            </p>
            <h2 className="heading-brutal mt-2 text-2xl text-carbon md:text-3xl">
              Your details
            </h2>

            <div className="mt-6 space-y-5">
              <label className="block">
                <span className="font-mono-lab text-[9px] uppercase tracking-[0.18em] text-carbon/45">
                  Full name
                </span>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="mt-3 w-full border border-carbon/20 bg-cream px-4 py-3.5 font-sans text-sm text-carbon outline-none transition-colors focus:border-carbon"
                  placeholder="Your name"
                />
              </label>
              <label className="block">
                <span className="font-mono-lab text-[9px] uppercase tracking-[0.18em] text-carbon/45">
                  Phone
                </span>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="mt-3 w-full border border-carbon/20 bg-cream px-4 py-3.5 font-sans text-sm text-carbon outline-none transition-colors focus:border-carbon"
                  placeholder="WhatsApp / mobile number"
                />
              </label>
              <label className="block">
                <span className="font-mono-lab text-[9px] uppercase tracking-[0.18em] text-carbon/45">
                  Email address
                </span>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-3 w-full border border-carbon/20 bg-cream px-4 py-3.5 font-sans text-sm text-carbon outline-none transition-colors focus:border-carbon"
                  placeholder="you@email.com"
                />
              </label>
              <label className="block">
                <span className="font-mono-lab text-[9px] uppercase tracking-[0.18em] text-carbon/45">
                  Address
                </span>
                <textarea
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  rows={3}
                  className="mt-3 w-full resize-none border border-carbon/20 bg-cream px-4 py-3.5 font-sans text-sm text-carbon outline-none transition-colors focus:border-carbon"
                  placeholder="Street, building, neighbourhood"
                />
              </label>

              <label className="flex cursor-pointer items-start gap-1.5 border border-carbon/10 bg-cream/80 px-2 py-1.5">
                <input
                  type="checkbox"
                  checked={acceptTerms}
                  onChange={(e) => setAcceptTerms(e.target.checked)}
                  className="mt-0.5 h-2.5 w-2.5 shrink-0 accent-rust"
                  required
                />
                <span className="text-[10px] leading-snug text-carbon/50">
                  I understand and accept the{" "}
                  <Link
                    href="/returns"
                    className="text-inherit underline-offset-2 hover:underline"
                  >
                    return policy
                  </Link>{" "}
                  and the terms &amp; conditions of APE LAB. I confirm my order
                  details are correct before final confirmation.
                </span>
              </label>
            </div>
          </div>
        </div>

        <aside className="h-fit border border-carbon/15 bg-cream p-6 md:p-8 lg:sticky lg:top-28">
          <p className="font-mono-lab text-[9px] uppercase tracking-[0.22em] text-carbon/40">
            Order summary
          </p>
          <ul className="mt-6 divide-y divide-carbon/10 border-t border-carbon/10">
            {items.map((item) => {
              const linePrice = item.price * item.quantity;
              const lineOriginal =
                itemOriginalPrice(item.productId, item.price) * item.quantity;
              const showCompare = lineOriginal > linePrice;

              return (
                <li
                  key={`${item.productId}-${item.size}`}
                  className="flex gap-3 py-4"
                >
                  <div className="relative h-16 w-12 shrink-0 overflow-hidden border border-carbon/10 bg-bone">
                    <Image
                      src={item.image}
                      alt=""
                      fill
                      sizes="48px"
                      className="object-cover"
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-[12px] font-bold uppercase tracking-[0.04em] text-carbon">
                      {item.title}
                    </p>
                    <p className="mt-1 font-mono-lab text-[10px] text-carbon/45">
                      {item.size} · ×{item.quantity}
                    </p>
                  </div>
                  <div className="shrink-0 text-right">
                    {showCompare && (
                      <p className="font-mono-lab text-[10px] text-carbon/35 line-through">
                        {formatPrice(lineOriginal)}
                      </p>
                    )}
                    <p className="font-mono-lab text-[11px] text-rust">
                      {formatPrice(linePrice)}
                    </p>
                  </div>
                </li>
              );
            })}
          </ul>

          <div className="mt-2 space-y-2.5 border-t border-carbon/15 pt-5">
            {saved > 0 && (
              <div className="flex items-baseline justify-between">
                <span className="font-mono-lab text-[10px] uppercase tracking-[0.2em] text-carbon/45">
                  Original
                </span>
                <span className="font-mono-lab text-[12px] text-carbon/40 line-through">
                  {formatPrice(originalTotal)}
                </span>
              </div>
            )}
            <div className="flex items-baseline justify-between">
              <span className="font-mono-lab text-[10px] uppercase tracking-[0.2em] text-carbon/50">
                Subtotal
              </span>
              <span className="font-display text-xl font-bold text-rust">
                {formatPrice(subtotal)}
              </span>
            </div>
            {saved > 0 && (
              <div className="flex items-baseline justify-between">
                <span className="font-mono-lab text-[10px] uppercase tracking-[0.2em] text-rust">
                  You saved
                </span>
                <span className="font-mono-lab text-[12px] font-bold text-rust">
                  {formatPrice(saved)}
                </span>
              </div>
            )}
          </div>
          <p className="mt-3 font-mono-lab text-[9px] uppercase tracking-[0.16em] text-rust">
            Shipping free — 48–72h
          </p>

          {submitError ? (
            <p className="mt-6 text-xs leading-relaxed text-rust">{submitError}</p>
          ) : null}

          <button
            type="button"
            disabled={!canSubmit}
            onClick={handleConfirm}
            className={cn(
              "mt-8 w-full py-4 font-sans text-[10px] font-bold uppercase tracking-[0.2em] transition-colors",
              canSubmit
                ? "bg-carbon text-cream hover:bg-rust"
                : "cursor-not-allowed bg-carbon/15 text-carbon/40",
            )}
          >
            {submitting
              ? "Sending order…"
              : canSubmit
                ? "Confirm & send order"
                : "Complete details to send"}
          </button>

          <button
            type="button"
            onClick={() => router.push("/cart")}
            className="mt-3 w-full py-3 font-mono-lab text-[9px] uppercase tracking-[0.18em] text-carbon/45 transition-colors hover:text-carbon"
          >
            ← Back to bag
          </button>
        </aside>
      </div>
    </div>
  );
}
