"use client";

import { useState, type FormEvent } from "react";
import { cn } from "@/lib/utils";

const INTERESTS = [
  {
    id: "discounts",
    label: "Discounts",
    hint: "Sales, first-checkout perks, and limited offers",
  },
  {
    id: "arrivals",
    label: "New arrivals",
    hint: "Fresh intakes when they clear the bench",
  },
  {
    id: "availability",
    label: "Availabilities",
    hint: "Restocks and when a size comes back online",
  },
] as const;

type InterestId = (typeof INTERESTS)[number]["id"];

const STORAGE_KEY = "ape-lab-notify";

export function NotifySection() {
  const [email, setEmail] = useState("");
  const [interests, setInterests] = useState<Record<InterestId, boolean>>({
    discounts: true,
    arrivals: true,
    availability: true,
  });
  const [status, setStatus] = useState<"idle" | "ok" | "error">("idle");

  const emailValid = email.trim().includes("@") && email.trim().includes(".");
  const anyInterest = INTERESTS.some((i) => interests[i.id]);
  const canSubmit = emailValid && anyInterest;

  function toggle(id: InterestId) {
    setInterests((prev) => ({ ...prev, [id]: !prev[id] }));
    setStatus("idle");
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!canSubmit) {
      setStatus("error");
      return;
    }

    const payload = {
      email: email.trim().toLowerCase(),
      interests: INTERESTS.filter((i) => interests[i.id]).map((i) => i.id),
      at: new Date().toISOString(),
    };

    try {
      const existing = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]") as unknown[];
      const list = Array.isArray(existing) ? existing : [];
      localStorage.setItem(STORAGE_KEY, JSON.stringify([...list, payload]));
      setStatus("ok");
      setEmail("");
    } catch {
      setStatus("error");
    }
  }

  return (
    <section
      id="notify"
      className="scroll-mt-24 border-t border-carbon/10 bg-carbon text-white lg:scroll-mt-[194px]"
    >
      <div className="mx-auto max-w-[1600px] px-4 py-20 md:px-8 md:py-28">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-20 lg:items-end">
          <div>
            <p className="label-lab text-white/35">Stay in the loop</p>
            <h2 className="heading-brutal mt-4 text-5xl md:text-6xl lg:text-[72px]">
              Notify me
            </h2>
            <p className="mt-6 max-w-md text-sm leading-relaxed text-white/55 md:text-[15px]">
              Drop your email and choose what you want from the lab — discounts,
              new arrivals, or availability alerts when a piece comes back.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <label className="block">
              <span className="font-mono-lab text-[9px] uppercase tracking-[0.2em] text-white/40">
                Email
              </span>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setStatus("idle");
                }}
                placeholder="you@gmail.com"
                autoComplete="email"
                className="mt-2 w-full border border-white/25 bg-transparent px-4 py-3.5 text-sm text-white outline-none transition-colors placeholder:text-white/30 focus:border-gold"
              />
            </label>

            <fieldset>
              <legend className="font-mono-lab text-[9px] uppercase tracking-[0.2em] text-white/40">
                Notify me about
              </legend>
              <div className="mt-3 grid gap-px border border-white/15 bg-white/15 sm:grid-cols-3">
                {INTERESTS.map((item) => (
                  <label
                    key={item.id}
                    className={cn(
                      "flex cursor-pointer flex-col gap-2 bg-carbon px-4 py-4 transition-colors",
                      interests[item.id] ? "bg-carbon" : "bg-carbon/80",
                    )}
                  >
                    <span className="flex items-center gap-2.5">
                      <input
                        type="checkbox"
                        checked={interests[item.id]}
                        onChange={() => toggle(item.id)}
                        className="h-3.5 w-3.5 accent-gold"
                      />
                      <span className="font-sans text-[10px] font-bold uppercase tracking-[0.14em] text-white">
                        {item.label}
                      </span>
                    </span>
                    <span className="pl-6 text-xs leading-relaxed text-white/45">
                      {item.hint}
                    </span>
                  </label>
                ))}
              </div>
            </fieldset>

            <div className="flex flex-wrap items-center gap-4">
              <button
                type="submit"
                disabled={!canSubmit}
                className={cn(
                  "border px-8 py-4 font-sans text-[10px] font-bold uppercase tracking-[0.18em] transition-colors md:px-10",
                  canSubmit
                    ? "border-gold bg-gold text-inkbar hover:bg-white hover:border-white"
                    : "cursor-not-allowed border-white/20 text-white/35",
                )}
              >
                Notify me
              </button>
              {status === "ok" && (
                <p className="font-mono-lab text-[9px] uppercase tracking-[0.18em] text-gold">
                  You&apos;re on the list
                </p>
              )}
              {status === "error" && (
                <p className="font-mono-lab text-[9px] uppercase tracking-[0.18em] text-flame">
                  Enter a valid email and pick at least one topic
                </p>
              )}
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
