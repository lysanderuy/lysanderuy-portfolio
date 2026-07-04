import type { Metadata } from "next";
import { Hanken_Grotesk, JetBrains_Mono, DM_Mono, Cormorant_Garamond } from "next/font/google";
import "../styles/globals.css";

const hanken = Hanken_Grotesk({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono-code",
  display: "swap",
});

// Retained for the not-yet-rebuilt legacy section pages.
const dmMono = DM_Mono({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-dm-mono",
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Lysander Uy | Full Stack & Mobile App Developer",
  description: "Portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body
        className={`${hanken.variable} ${jetbrainsMono.variable} ${dmMono.variable} ${cormorant.variable}`}
      >
        {children}
      </body>
    </html>
  );
}
