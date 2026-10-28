import { Bebas_Neue, Inter } from "next/font/google";
import { HeroStage } from "./HeroStage";

const display = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-hero-display",
  display: "swap",
});

const body = Inter({
  subsets: ["latin"],
  variable: "--font-hero-text",
  display: "swap",
});

export function Hero() {
  return <HeroStage fontClassName={`${display.variable} ${body.variable}`} />;
}
