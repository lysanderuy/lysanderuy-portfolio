import type { Metadata } from "next";
import { DM_Mono, Cormorant_Garamond } from "next/font/google";
import "../styles/globals.css";

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
      <body className={`${dmMono.variable} ${cormorant.variable}`}>{children}</body>
    </html>
  );
}
