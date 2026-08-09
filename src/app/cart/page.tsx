"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/context/cart-context";
import { formatPrice } from "@/lib/products";

export default function CartPage() {
  const { items, count, updateQuantity, removeItem } = useCart();

  const subtotal = items.reduce((sum, i) => sum + i.price * i.quantity, 0);

  if (count === 0) {
    return (
      <div className="mx-auto max-w-[1600px] px-4 py-28 text-center md:px-8">
        <p className="label-lab text-carbon/40">Bag empty — 0 specimens</p>
        <h1 className="heading-brutal mt-4 text-4xl md:text-6xl">
          Nothing on the bench
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

  return (
    <div className="mx-auto max-w-[1600px] px-4 py-16 md:px-8 md:py-20">
      <p className="label-lab text-carbon/40">
        {count} {count === 1 ? "specimen" : "specimens"}
      </p>
      <h1 className="heading-brutal mt-3 text-4xl md:text-6xl">Your bag</h1>

      <ul className="mt-12 divide-y divide-carbon/12 border-t border-carbon/12">
        {items.map((item) => (
          <li
            key={`${item.productId}-${item.size}`}
            className="flex gap-4 py-6 md:gap-6"
          >
            <Link
              href={`/products/${item.handle}`}
              className="relative h-32 w-24 shrink-0 overflow-hidden border border-carbon/10 bg-bone md:h-36 md:w-28"
            >
              <Image
                src={item.image}
                alt={item.title}
                fill
                sizes="128px"
                className="object-cover"
              />
            </Link>

            <div className="flex flex-1 flex-col justify-between">
              <div>
                <p className="font-mono-lab text-[9px] uppercase tracking-[0.18em] text-carbon/40">
                  {item.brand}
                </p>
                <Link
                  href={`/products/${item.handle}`}
                  className="mt-1.5 block font-sans text-[13px] font-bold uppercase tracking-[0.02em] text-carbon hover:text-rust"
                >
                  {item.title}
                </Link>
                <p className="mt-1 font-mono-lab text-[11px] text-carbon/50">
                  {item.colorway} · Size {item.size}
                </p>
              </div>

              <div className="flex items-end justify-between">
                <div className="flex items-center gap-3 font-mono-lab text-xs">
                  <button
                    type="button"
                    onClick={() =>
                      updateQuantity(item.productId, item.size, item.quantity - 1)
                    }
                    className="h-8 w-8 border border-carbon/20 text-carbon transition-colors hover:border-carbon"
                    aria-label="Decrease quantity"
                  >
                    −
                  </button>
                  <span className="w-4 text-center">{item.quantity}</span>
                  <button
                    type="button"
                    onClick={() =>
                      updateQuantity(item.productId, item.size, item.quantity + 1)
                    }
                    className="h-8 w-8 border border-carbon/20 text-carbon transition-colors hover:border-carbon"
                    aria-label="Increase quantity"
                  >
                    +
                  </button>
                </div>

                <div className="text-right">
                  <p className="font-mono-lab text-sm text-rust">
                    {formatPrice(item.price * item.quantity)}
                  </p>
                  <button
                    type="button"
                    onClick={() => removeItem(item.productId, item.size)}
                    className="mt-1 font-mono-lab text-[9px] uppercase tracking-[0.16em] text-carbon/40 transition-colors hover:text-rust"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>

      <div className="mt-12 max-w-md">
        <div className="flex items-baseline justify-between border-t border-carbon/15 pt-6">
          <span className="font-mono-lab text-[10px] uppercase tracking-[0.2em] text-carbon/50">
            Subtotal
          </span>
          <span className="font-display text-xl font-bold text-rust">
            {formatPrice(subtotal)}
          </span>
        </div>
        <Link
          href="/checkout"
          className="mt-6 block w-full bg-carbon py-4 text-center font-sans text-[10px] font-bold uppercase tracking-[0.2em] text-cream transition-colors hover:bg-rust"
        >
          Proceed to checkout
        </Link>
        <p className="mt-4 font-mono-lab text-[9px] uppercase tracking-[0.18em] text-carbon/35">
          Seven-point authentication log included with every order
        </p>
      </div>
    </div>
  );
}
