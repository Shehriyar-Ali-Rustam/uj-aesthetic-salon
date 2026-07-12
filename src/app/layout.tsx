import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";

import { SmoothScrollProvider } from "@/components/providers/SmoothScrollProvider";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Preloader } from "@/components/layout/Preloader";
import { CLINIC } from "@/lib/content";
import { asset } from "@/lib/basePath";

/**
 * Both faces are self-hosted variable fonts (latin subset, ~70KB together).
 * Serving them ourselves keeps the build offline-safe, drops a third-party
 * request on every visit, and lets next/font inline the @font-face + preload.
 */

/** Display face — geometric, a little architectural. Headlines and UI labels. */
const spaceGrotesk = localFont({
  src: "./fonts/SpaceGrotesk-Variable.woff2",
  weight: "300 700",
  style: "normal",
  variable: "--font-space-grotesk",
  display: "swap",
});

/** Body face — quiet, high legibility at small sizes. */
const inter = localFont({
  src: "./fonts/Inter-Variable.woff2",
  weight: "300 700",
  style: "normal",
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: `${CLINIC.name} — Advanced Aesthetic Care`,
  description: CLINIC.description,
  openGraph: {
    title: `${CLINIC.name} — Advanced Aesthetic Care`,
    description: CLINIC.description,
    type: "website",
    images: [asset("/posters/video1.jpg")],
  },
};

export const viewport: Viewport = {
  themeColor: "#f6f1ea",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${inter.variable}`}>
      <body className="antialiased">
        <Preloader />
        <SmoothScrollProvider>
          <Header />
          {children}
          <Footer />
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
