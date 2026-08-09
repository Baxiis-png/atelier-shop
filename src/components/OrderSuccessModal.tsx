"use client";

import { useEffect, useId, useRef, useState } from "react";
import { useRouter } from "next/navigation";

const STORAGE_KEY = "ape-lab-order-success";

export function markOrderSuccess() {
  try {
    sessionStorage.setItem(STORAGE_KEY, "1");
  } catch {
    /* ignore */
  }
}

export function OrderSuccessModal() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const titleId = useId();
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    try {
      if (sessionStorage.getItem(STORAGE_KEY) === "1") {
        sessionStorage.removeItem(STORAGE_KEY);
        setOpen(true);
      }
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    if (!open) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    const timer = window.setTimeout(() => setOpen(false), 6000);

    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
      window.clearTimeout(timer);
    };
  }, [open]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[90] flex items-center justify-center bg-carbon/55 p-4 backdrop-blur-[2px]"
      role="presentation"
      onClick={() => setOpen(false)}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="relative w-full max-w-md border border-carbon/15 bg-cream p-8 text-center shadow-xl md:p-10"
        onClick={(e) => e.stopPropagation()}
      >
        <p className="font-mono-lab text-[9px] uppercase tracking-[0.22em] text-carbon/40">
          Checkout
        </p>
        <h2
          id={titleId}
          className="heading-brutal mt-3 text-3xl text-carbon md:text-4xl"
        >
          Order done
        </h2>
        <p className="mt-4 text-sm leading-relaxed text-carbon/60">
          We will contact you ASAP.
        </p>
        <button
          ref={closeRef}
          type="button"
          onClick={() => {
            setOpen(false);
            router.replace("/");
          }}
          className="mt-8 w-full border border-carbon bg-carbon px-6 py-4 font-sans text-[10px] font-bold uppercase tracking-[0.18em] text-cream transition-colors hover:bg-rust"
        >
          Continue shopping
        </button>
      </div>
    </div>
  );
}
