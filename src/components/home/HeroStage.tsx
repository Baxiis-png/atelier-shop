"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useId, useState, type FormEvent } from "react";
import styles from "./Hero.module.css";

const COLORWAYS = [
  {
    id: "bleu",
    name: "Blue camo",
    solidName: "Navy",
    swatch: "#2f8fe0",
    accent: "#3c9ae8",
    camo: "/images/camo-bleu.jpg",
    solid: "/images/marine.jpg",
    camoAlt:
      "Reversible blue camouflage puffer, patterned side, high collar, embroidered ape-head logo and hanging camo tag",
    solidAlt:
      "Reversible puffer, solid navy side, high collar, elastic cuffs and hem drawcord",
  },
  {
    id: "vert",
    name: "Green camo",
    solidName: "Black",
    swatch: "#7eae2a",
    accent: "#8fbf32",
    camo: "/images/camo-vert.jpg",
    solid: "/images/noir.jpg",
    camoAlt:
      "Reversible green camouflage puffer, patterned side, high collar, embroidered ape-head logo and hanging camo tag",
    solidAlt:
      "Reversible puffer, solid black side, high collar, zip pockets and hem drawcord",
  },
  {
    id: "gris",
    name: "Grey camo",
    solidName: "Cream",
    swatch: "#d7d7db",
    accent: "#e6e6ea",
    camo: "/images/camo-gris.jpg",
    solid: "/images/creme.jpg",
    camoAlt:
      "Reversible grey and white camouflage puffer, patterned side, high collar, embroidered ape-head logo",
    solidAlt:
      "Reversible puffer, solid cream side, high collar, camo tag and elastic cuffs",
  },
] as const;

type HeroStageProps = {
  fontClassName: string;
};

export function HeroStage({ fontClassName }: HeroStageProps) {
  const [colorId, setColorId] = useState<(typeof COLORWAYS)[number]["id"]>("bleu");
  const [flipped, setFlipped] = useState(false);
  const [contact, setContact] = useState("");
  const [notifyStatus, setNotifyStatus] = useState<
    "idle" | "ok" | "error" | "submitting"
  >("idle");
  const [notifyError, setNotifyError] = useState("");
  const [reduced, setReduced] = useState(false);
  const [canParallax, setCanParallax] = useState(false);
  const [shift, setShift] = useState({ x: 0, y: 0 });
  const titleId = useId();
  const contactId = useId();
  const notifyStatusId = useId();
  const color = COLORWAYS.find((item) => item.id === colorId) ?? COLORWAYS[0];

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)");
    const sync = () => {
      setReduced(reduce.matches);
      setCanParallax(fine.matches && !reduce.matches);
    };
    sync();
    reduce.addEventListener("change", sync);
    fine.addEventListener("change", sync);
    return () => {
      reduce.removeEventListener("change", sync);
      fine.removeEventListener("change", sync);
    };
  }, []);

  function contactKind(value: string): "email" | "phone" | null {
    const trimmed = value.trim();
    if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) return "email";
    const digits = trimmed.replace(/\D/g, "");
    if (
      digits.length >= 8 &&
      digits.length <= 15 &&
      /^[+\d][\d\s().-]{6,}$/.test(trimmed)
    ) {
      return "phone";
    }
    return null;
  }

  async function handleNotify(event: FormEvent) {
    event.preventDefault();
    const kind = contactKind(contact);
    if (!kind || notifyStatus === "submitting") {
      setNotifyStatus("error");
      setNotifyError("Enter a valid email or phone number.");
      return;
    }

    setNotifyStatus("submitting");
    setNotifyError("");
    const trimmed = contact.trim();

    try {
      const res = await fetch("/api/notify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...(kind === "email"
            ? { email: trimmed.toLowerCase() }
            : { phone: trimmed }),
          interests: ["arrivals"],
        }),
      });
      const data = (await res.json().catch(() => ({}))) as {
        ok?: boolean;
        error?: string;
      };
      if (!res.ok || !data.ok) {
        setNotifyStatus("error");
        setNotifyError(data.error || "Couldn't save that. Try again.");
        return;
      }
      setNotifyStatus("ok");
      setContact("");
    } catch {
      setNotifyStatus("error");
      setNotifyError("Couldn't save that. Try again.");
    }
  }

  const faceName = flipped ? color.solidName : color.name;

  return (
    <section
      id="new-in"
      lang="en"
      aria-labelledby={titleId}
      className={`${styles.hero} ${fontClassName}`}
      style={{ ["--accent" as string]: color.accent }}
      onMouseMove={(event) => {
        if (!canParallax) return;
        const bounds = event.currentTarget.getBoundingClientRect();
        const x = (event.clientX - bounds.left) / bounds.width - 0.5;
        const y = (event.clientY - bounds.top) / bounds.height - 0.5;
        setShift({ x: x * 18, y: y * 12 });
      }}
      onMouseLeave={() => setShift({ x: 0, y: 0 })}
    >
      <div className={styles.inner}>
        <div className={styles.copy}>
          <p className={styles.kicker}>Winter Collection</p>
          <h1 id={titleId} className={styles.title}>
            <span className={styles.line}>Two looks.</span>
            <span className={styles.line}>One single</span>
            <span className={`${styles.line} ${styles.stroke}`}>jacket.</span>
          </h1>
          <p className={styles.lede}>
            Camo on one side, solid on the other. High collar, warm fill,
            ready for winter.
          </p>
          <div className={styles.actions}>
            <Link href="/coming-soon" className={`${styles.btn} ${styles.primary}`}>
              Coming soon
            </Link>
            <form className={styles.notify} onSubmit={handleNotify} noValidate>
              <div className={styles.notifyRow}>
                <label className={styles.srOnly} htmlFor={contactId}>
                  Email or phone
                </label>
                <input
                  id={contactId}
                  className={styles.notifyInput}
                  type="text"
                  name="contact"
                  inputMode="email"
                  autoComplete="email"
                  placeholder="Email or phone"
                  value={contact}
                  aria-invalid={notifyStatus === "error"}
                  aria-describedby={notifyStatusId}
                  onChange={(event) => {
                    setContact(event.target.value);
                    if (notifyStatus !== "submitting") {
                      setNotifyStatus("idle");
                      setNotifyError("");
                    }
                  }}
                />
                <button
                  type="submit"
                  className={`${styles.btn} ${styles.primary}`}
                  disabled={notifyStatus === "submitting"}
                >
                  {notifyStatus === "submitting" ? "Sending…" : "Get notified"}
                </button>
              </div>
              <p
                id={notifyStatusId}
                className={styles.notifyNote}
                data-state={
                  notifyStatus === "ok" || notifyStatus === "error"
                    ? notifyStatus
                    : undefined
                }
                role="status"
              >
                {notifyStatus === "ok"
                  ? "You're on the list. We'll let you know at the drop."
                  : notifyError}
              </p>
            </form>
          </div>
        </div>

        <div className={styles.visual}>
          <div
            className={styles.stage}
            style={{
              ["--px" as string]: `${shift.x}px`,
              ["--py" as string]: `${shift.y}px`,
            }}
          >
            <div className={reduced ? undefined : styles.float}>
              <div className={`${styles.flip} ${flipped ? styles.isFlipped : ""}`}>
                {COLORWAYS.map((item) => {
                  const active = item.id === color.id;
                  return (
                    <div
                      key={item.id}
                      className={`${styles.layer} ${active ? styles.layerOn : ""}`}
                      aria-hidden={!active}
                    >
                      <div className={styles.inner3d}>
                        <div className={styles.face} aria-hidden={flipped}>
                          <Image
                            src={item.camo}
                            alt={item.camoAlt}
                            fill
                            sizes="(max-width: 1024px) 100vw, 46vw"
                            priority={item.id === "bleu"}
                          />
                        </div>
                        <div className={`${styles.face} ${styles.back}`} aria-hidden={!flipped}>
                          <Image
                            src={item.solid}
                            alt={item.solidAlt}
                            fill
                            sizes="(max-width: 1024px) 100vw, 46vw"
                          />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className={styles.shadow} aria-hidden />
          </div>

          <div className={styles.controls}>
            <p className={styles.faceLabel} aria-live="polite">
              {flipped ? `Solid side · ${faceName}` : `Camo side · ${faceName}`}
            </p>
            <ul
              id="coloris"
              className={styles.swatches}
              aria-label="Colorways"
            >
              {COLORWAYS.map((item) => (
                <li key={item.id}>
                  <button
                    type="button"
                    className={styles.swatch}
                    style={{ ["--swatch" as string]: item.swatch }}
                    aria-label={`${item.name}, reversible with ${item.solidName.toLowerCase()}`}
                    aria-pressed={item.id === color.id}
                    onClick={() => setColorId(item.id)}
                  />
                </li>
              ))}
            </ul>
            <button
              type="button"
              className={styles.flipBtn}
              aria-pressed={flipped}
              aria-label={
                flipped ? "Show the camo side" : "Show the solid side"
              }
              onClick={() => setFlipped((value) => !value)}
            >
              <FlipIcon />
              Flip the jacket
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

function FlipIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M4 8h11a4 4 0 0 1 0 8H8" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M7 5 4 8l3 3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
