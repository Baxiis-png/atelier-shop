"use client";

import Link from "next/link";
import { useState } from "react";
import { formatPrice, type Product } from "@/lib/products";
import { cn } from "@/lib/utils";

export function ProductCard({
  product,
  index = 0,
}: {
  product: Product;
  index?: number;
}) {
  const [hover, setHover] = useState(false);
  const soldOut = product.sizes.every((s) => !s.inStock);
  const secondary = product.images[1] ?? product.images[0];

  return (
    <article
      className="group rise"
      style={{ animationDelay: `${Math.min(index, 8) * 60}ms` }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <Link href={`/products/${product.handle}`} className="block">
        <div className="relative overflow-hidden bg-bone">
          <div className="aspect-[4/5] w-full">
            <img
              src={product.images[0]}
              alt={product.title}
              loading="lazy"
              className={cn(
                "absolute inset-0 h-full w-full object-cover transition-all duration-[650ms] ease-[cubic-bezier(.22,1,.36,1)]",
                hover ? "scale-[1.04] opacity-0" : "scale-100 opacity-100",
              )}
            />
            <img
              src={secondary}
              alt=""
              aria-hidden="true"
              loading="lazy"
              className={cn(
                "absolute inset-0 h-full w-full object-cover transition-all duration-[650ms] ease-[cubic-bezier(.22,1,.36,1)]",
                hover ? "scale-[1.04] opacity-100" : "scale-105 opacity-0",
              )}
            />
          </div>

          <span className="pointer-events-none absolute left-0 top-0 h-3 w-3 border-l border-t border-ink/25" />
          <span className="pointer-events-none absolute right-0 top-0 h-3 w-3 border-r border-t border-ink/25" />
          <span className="pointer-events-none absolute bottom-0 left-0 h-3 w-3 border-b border-l border-ink/25" />
          <span className="pointer-events-none absolute bottom-0 right-0 h-3 w-3 border-b border-r border-ink/25" />

          {product.badge && !soldOut && (
            <span className="absolute left-3 top-3 bg-amber px-2 py-1 font-mono-lab text-[9px] font-bold tracking-[0.16em] text-ink">
              {product.badge}
            </span>
          )}

          {soldOut && (
            <span className="absolute inset-x-0 top-1/2 -translate-y-1/2 bg-ink/80 py-2 text-center font-mono-lab text-[10px] tracking-[0.24em] text-bone">
              SOLD OUT
            </span>
          )}

          <div
            className={cn(
              "absolute inset-x-0 bottom-0 flex items-center justify-center gap-2 bg-paper/95 py-2.5 transition-transform duration-300",
              hover ? "translate-y-0" : "translate-y-full",
            )}
          >
            {product.sizes.map((s) => (
              <span
                key={s.size}
                className={cn(
                  "font-mono-lab text-[10px] tracking-[0.08em]",
                  s.inStock ? "text-ink" : "text-ink/25 line-through",
                )}
              >
                {s.size}
                {s.inStock ? ` ${s.quantity ?? 1}` : ""}
              </span>
            ))}
          </div>
        </div>

        <div className="pt-3.5">
          <p className="font-mono-lab text-[9px] tracking-[0.18em] text-ink/40">
            {product.brand}
          </p>
          <h3 className="mt-1.5 font-display text-[12px] font-bold uppercase leading-snug tracking-[0.01em] text-ink">
            {product.title}
            <span className="text-ink/45"> — {product.colorway}</span>
          </h3>
          <p className="mt-1.5 flex items-baseline gap-2 font-mono-lab text-xs text-rust">
            {formatPrice(product.price)}
            {product.compareAt && (
              <span className="text-ink/35 line-through">
                {formatPrice(product.compareAt)}
              </span>
            )}
          </p>
        </div>
      </Link>
    </article>
  );
}
