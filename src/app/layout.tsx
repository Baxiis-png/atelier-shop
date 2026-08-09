import type { Metadata } from "next";
import { CartProvider } from "@/context/cart-context";
import { ContactModalProvider } from "@/context/contact-modal-context";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { FloatingWhatsApp } from "@/components/FloatingWhatsApp";
import "./globals.css";

export const metadata: Metadata = {
  title: "APE LAB — Streetwear Research & Curation",
  description:
    "Curated, authenticated streetwear. Seven-point verification on every intake.",
  icons: { icon: "/logo.png" },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-cream text-carbon antialiased">
        <CartProvider>
          <ContactModalProvider>
            <SiteHeader />
            <main>{children}</main>
            <SiteFooter />
            <FloatingWhatsApp />
          </ContactModalProvider>
        </CartProvider>
      </body>
    </html>
  );
}
