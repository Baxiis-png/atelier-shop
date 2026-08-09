"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";
import { useCart } from "@/context/cart-context";
import { formatPrice, type Product } from "@/lib/products";
import { SIZE_GUIDE_ROWS } from "@/lib/size-guide";
import { cn, discountPercent } from "@/lib/utils";

const APE_CHEERS = ["Nice", "You did it !!", "Nice taste"] as const;

export function ProductDetail({ product }: { product: Product }) {
  const { addItem } = useCart();
  const [activeImage, setActiveImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [added, setAdded] = useState(false);
  const [cheer, setCheer] = useState<(typeof APE_CHEERS)[number]>("Nice");
  const [sizeGuideOpen, setSizeGuideOpen] = useState(false);

  const soldOut = product.sizes.every((s) => !s.inStock);
  const salePct =
    product.compareAt && product.compareAt > product.price
      ? discountPercent(product.price, product.compareAt)
      : 0;

  function handleAdd() {
    if (!selectedSize || soldOut) return;
    if (!product.sizes.find((s) => s.size === selectedSize)?.inStock) return;

    addItem({
      productId: product.id,
      handle: product.handle,
      title: product.title,
      brand: product.brand,
      colorway: product.colorway,
      size: selectedSize,
      price: product.price,
      image: product.images[0],
    });

    setCheer(APE_CHEERS[Math.floor(Math.random() * APE_CHEERS.length)]!);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  }

  return (
    <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
      <div>
        <div className="relative aspect-[4/5] overflow-hidden border border-carbon/10 bg-bone">
          <Image
            src={product.images[activeImage]}
            alt={product.title}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
          />
          <span className="pointer-events-none absolute left-0 top-0 h-4 w-4 border-l border-t border-carbon/30" />
          <span className="pointer-events-none absolute right-0 top-0 h-4 w-4 border-r border-t border-carbon/30" />
          <span className="pointer-events-none absolute bottom-0 left-0 h-4 w-4 border-b border-l border-carbon/30" />
          <span className="pointer-events-none absolute bottom-0 right-0 h-4 w-4 border-b border-r border-carbon/30" />
        </div>

        {product.images.length > 1 && (
          <div className="mt-3 flex gap-3">
            {product.images.map((img, i) => (
              <button
                key={img}
                type="button"
                onClick={() => setActiveImage(i)}
                aria-label={`View image ${i + 1}`}
                className={cn(
                  "relative aspect-square w-20 overflow-hidden border bg-bone transition-colors",
                  i === activeImage
                    ? "border-carbon"
                    : "border-carbon/15 hover:border-carbon/50",
                )}
              >
                <Image src={img} alt="" fill sizes="80px" className="object-cover" />
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="flex flex-col justify-center">
        <p className="font-mono-lab text-[10px] uppercase tracking-[0.24em] text-carbon/45">
          {product.brand}
        </p>

        <h1 className="heading-brutal mt-4 text-4xl md:text-5xl lg:text-[56px]">
          {product.title}
        </h1>

        <p className="mt-3 font-mono-lab text-[11px] uppercase tracking-[0.16em] text-carbon/50">
          {product.colorway}
        </p>

        <p className="mt-8 flex items-baseline gap-3">
          <span className="font-display text-2xl font-bold text-rust">
            {formatPrice(product.price)}
          </span>
          {product.compareAt && (
            <>
              <span className="font-mono-lab text-base text-carbon/35 line-through">
                {formatPrice(product.compareAt)}
              </span>
              {salePct > 0 && (
                <span className="bg-rust px-2 py-1 font-mono-lab text-[9px] font-bold uppercase tracking-[0.16em] text-white">
                  −{salePct}%
                </span>
              )}
            </>
          )}
        </p>

        <p className="mt-8 max-w-md text-sm leading-relaxed text-carbon/60">
          {product.description}
        </p>

        <div className="mt-10">
          <div className="flex items-baseline justify-between gap-4">
            <p className="font-mono-lab text-[10px] uppercase tracking-[0.2em] text-carbon/45">
              Select size
            </p>
            <button
              type="button"
              onClick={() => setSizeGuideOpen(true)}
              className="font-mono-lab text-[10px] uppercase tracking-[0.18em] text-carbon underline decoration-carbon/30 underline-offset-4 transition-colors hover:text-rust hover:decoration-rust"
            >
              Size guide
            </button>
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            {product.sizes.map((s) => (
              <button
                key={s.size}
                type="button"
                disabled={!s.inStock}
                onClick={() => setSelectedSize(s.size)}
                className={cn(
                  "min-w-[3.25rem] border px-4 py-3 font-mono-lab text-xs uppercase tracking-[0.1em] transition-colors",
                  selectedSize === s.size
                    ? "border-carbon bg-carbon text-cream"
                    : "border-carbon/20 text-carbon hover:border-carbon",
                  !s.inStock &&
                    "cursor-not-allowed border-carbon/10 text-carbon/25 line-through hover:border-carbon/10",
                )}
              >
                {s.size}
              </button>
            ))}
          </div>
        </div>

        <div className="relative mt-10 w-full max-w-sm">
          {added && (
            <div
              className="pointer-events-none absolute bottom-full left-[72%] z-10 mb-1 flex flex-col items-center animate-ape-pop"
              aria-hidden
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/mascot-ape-thumbs.png"
                alt=""
                className="h-16 w-auto origin-bottom animate-ape-thumb drop-shadow-md [image-rendering:pixelated]"
              />
              <span className="mt-0.5 text-center font-mono-lab text-[9px] font-bold uppercase tracking-[0.16em] text-rust">
                {cheer}
              </span>
            </div>
          )}
          <button
            type="button"
            disabled={soldOut || !selectedSize}
            onClick={handleAdd}
            className={cn(
              "w-full py-4 font-sans text-[10px] font-bold uppercase tracking-[0.2em] transition-colors",
              soldOut || !selectedSize
                ? "cursor-not-allowed bg-carbon/15 text-carbon/40"
                : "bg-carbon text-cream hover:bg-rust",
            )}
          >
            {soldOut
              ? "Sold out"
              : added
                ? "Added to bag ✓"
                : selectedSize
                  ? "Add to bag"
                  : "Select a size"}
          </button>
        </div>

        <dl className="mt-10 grid grid-cols-2 gap-x-6 gap-y-4 border-t border-carbon/12 pt-8">
          {[
            ["Authentication", "Seven-point"],
            ["Hem label", "Verified"],
            ["Hang tag", "Original"],
            ["Condition", "Deadstock"],
          ].map(([label, value]) => (
            <div key={label}>
              <dt className="font-mono-lab text-[9px] uppercase tracking-[0.18em] text-carbon/40">
                {label}
              </dt>
              <dd className="mt-1.5 font-sans text-[11px] font-bold uppercase tracking-[0.12em] text-rust">
                {value}
              </dd>
            </div>
          ))}
        </dl>

        <Link
          href="/"
          className="mt-10 font-mono-lab text-[10px] uppercase tracking-[0.18em] text-carbon/45 transition-colors hover:text-rust"
        >
          ← Back to the catalogue
        </Link>
      </div>

      {sizeGuideOpen && (
        <SizeGuideModal onClose={() => setSizeGuideOpen(false)} />
      )}
    </div>
  );
}

function SizeGuideModal({ onClose }: { onClose: () => void }) {
  const titleId = useId();
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[80] flex items-center justify-center bg-carbon/55 p-4 backdrop-blur-[2px]"
      role="presentation"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto border border-carbon/15 bg-cream p-6 shadow-xl md:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 font-mono-lab text-[10px] uppercase tracking-[0.2em] text-carbon/45 transition-colors hover:text-carbon"
          aria-label="Close"
        >
          Close
        </button>

        <p className="font-mono-lab text-[9px] uppercase tracking-[0.22em] text-carbon/40">
          Tee fit
        </p>
        <h3
          id={titleId}
          className="heading-brutal mt-2 text-3xl text-carbon md:text-4xl"
        >
          Size guide
        </h3>
        <p className="mt-3 max-w-lg text-sm leading-relaxed text-carbon/55">
          A 1–3 cm variance is allowed for manual measurement. All values in cm.
        </p>

        <div className="mt-6 overflow-x-auto border border-carbon/15">
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
      </div>
    </div>
  );
}
