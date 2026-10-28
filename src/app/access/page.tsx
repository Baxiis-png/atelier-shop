"use client";

import { Suspense, useState, type FormEvent } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";

function AccessForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const nextPath = searchParams.get("next") || "/";
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!password.trim() || submitting) return;

    setSubmitting(true);
    setError("");

    try {
      const res = await fetch("/api/access", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password: password.trim(), next: nextPath }),
      });
      const data = (await res.json().catch(() => ({}))) as {
        ok?: boolean;
        next?: string;
        error?: string;
      };

      if (!res.ok || !data.ok) {
        setError(data.error || "Wrong password");
        setSubmitting(false);
        return;
      }

      router.replace(data.next || "/");
      router.refresh();
    } catch {
      setError("Could not unlock. Try again.");
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mt-10 w-full max-w-sm space-y-4">
      <label className="block">
        <span className="font-mono-lab text-[9px] uppercase tracking-[0.2em] text-carbon/40">
          Password
        </span>
        <input
          type="password"
          autoFocus
          required
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            setError("");
          }}
          className="mt-2 w-full border border-carbon/20 bg-transparent px-4 py-3.5 text-sm outline-none transition-colors focus:border-carbon"
        />
      </label>
      <button
        type="submit"
        disabled={!password.trim() || submitting}
        className={cn(
          "w-full border px-8 py-4 font-sans text-[10px] font-bold uppercase tracking-[0.18em] transition-colors",
          password.trim() && !submitting
            ? "border-carbon bg-carbon text-cream hover:bg-inkbar"
            : "cursor-not-allowed border-carbon/20 text-carbon/35",
        )}
      >
        {submitting ? "Unlocking…" : "Enter lab"}
      </button>
      {error && (
        <p className="font-mono-lab text-[9px] uppercase tracking-[0.18em] text-flame">
          {error}
        </p>
      )}
    </form>
  );
}

export default function AccessPage() {
  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-cream px-6">
      <div className="w-full max-w-md">
        <p className="label-lab text-carbon/40">APE LAB</p>
        <h1 className="heading-brutal mt-4 text-4xl md:text-5xl">
          Closed for intake
        </h1>
        <p className="mt-4 max-w-sm text-sm leading-relaxed text-carbon/55">
          The storefront is locked while we finish stock. Enter the access
          password to preview the lab.
        </p>
        <Suspense fallback={null}>
          <AccessForm />
        </Suspense>
      </div>
    </div>
  );
}
