import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        carbon: "#111111",
        cream: "#F4F4F0",
        cocoa: "#4A2E1B",
        gold: "#E9AB4E",
        inkbar: "#16110E",
        rust: "#D9601A",
        flame: "#EE8236",
        bone: "#F4F0E8",
        paper: "#FAFAF7",
        ink: "#3B2314",
        amber: "#D4A843",
      },
      fontFamily: {
        display: [
          "Arial Black",
          "Arial Bold",
          "Helvetica Neue",
          "Impact",
          "system-ui",
          "sans-serif",
        ],
        sans: [
          "Inter",
          "Helvetica Neue",
          "system-ui",
          "-apple-system",
          "Segoe UI",
          "sans-serif",
        ],
        "mono-lab": [
          "ui-monospace",
          "SFMono-Regular",
          "Cascadia Code",
          "Consolas",
          "monospace",
        ],
      },
      letterSpacing: {
        brutal: "-0.03em",
        lab: "0.3em",
      },
      keyframes: {
        rise: {
          from: { opacity: "0", transform: "translateY(12px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        marquee: {
          /* Left → right: content drifts toward the right edge */
          from: { transform: "translateX(-50%)" },
          to: { transform: "translateX(0)" },
        },
        "header-in": {
          from: { opacity: "0", transform: "translateX(-18px)" },
          to: { opacity: "1", transform: "translateX(0)" },
        },
        "ape-pop": {
          "0%": { opacity: "0", transform: "translate(-50%, 12px) scale(0.4)" },
          "35%": { opacity: "1", transform: "translate(-50%, -8px) scale(1.12)" },
          "55%": { transform: "translate(-50%, 0) scale(0.96)" },
          "70%": { transform: "translate(-50%, -4px) scale(1.04)" },
          "100%": { opacity: "1", transform: "translate(-50%, 0) scale(1)" },
        },
        "ape-thumb": {
          "0%, 100%": { transform: "rotate(0deg)" },
          "40%": { transform: "rotate(-12deg)" },
          "70%": { transform: "rotate(6deg)" },
        },
      },
      animation: {
        rise: "rise 0.6s cubic-bezier(0.22, 1, 0.36, 1) both",
        marquee: "marquee 24s linear infinite",
        "header-in": "header-in 0.55s cubic-bezier(0.22, 1, 0.36, 1) both",
        "ape-pop": "ape-pop 0.55s cubic-bezier(0.22, 1, 0.36, 1) both",
        "ape-thumb": "ape-thumb 0.7s ease-in-out 0.2s both",
      },
    },
  },
  plugins: [],
};

export default config;
