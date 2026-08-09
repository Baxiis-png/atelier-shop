"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";

const PHONE = "+1 438 355 2337";
const WHATSAPP_URL = "https://wa.me/14383552337";

type ContactModalContextValue = {
  openContact: () => void;
  closeContact: () => void;
};

const ContactModalContext = createContext<ContactModalContextValue | null>(
  null,
);

export function ContactModalProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const openContact = useCallback(() => setOpen(true), []);
  const closeContact = useCallback(() => setOpen(false), []);
  const value = useMemo(
    () => ({ openContact, closeContact }),
    [openContact, closeContact],
  );

  return (
    <ContactModalContext.Provider value={value}>
      {children}
      {open && <GetInTouchDialog onClose={closeContact} />}
    </ContactModalContext.Provider>
  );
}

export function useContactModal() {
  const ctx = useContext(ContactModalContext);
  if (!ctx) {
    throw new Error("useContactModal must be used within ContactModalProvider");
  }
  return ctx;
}

function GetInTouchDialog({ onClose }: { onClose: () => void }) {
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
        className="relative w-full max-w-md border border-carbon/15 bg-cream p-8 shadow-xl md:p-10"
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
          Get in touch
        </p>
        <h3
          id={titleId}
          className="heading-brutal mt-3 text-3xl text-carbon md:text-4xl"
        >
          Text the lab
        </h3>
        <p className="mt-4 text-sm leading-relaxed text-carbon/55">
          Reach us via WhatsApp — same number listed on this page.
        </p>
        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-8 block border border-carbon bg-white px-6 py-5 text-center font-mono-lab text-lg tracking-[0.08em] text-carbon transition-colors hover:bg-carbon hover:text-cream md:text-xl"
        >
          {PHONE}
        </a>
      </div>
    </div>
  );
}
