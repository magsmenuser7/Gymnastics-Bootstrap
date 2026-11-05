import type { Metadata } from "next";
import { Inter_Tight, Instrument_Serif } from "next/font/google";
import "./globals.css";

const sans = Inter_Tight({ variable: "--font-sans", subsets: ["latin"], weight: ["300", "400", "500", "600"] });
const serif = Instrument_Serif({ variable: "--font-serif", subsets: ["latin"], weight: "400", style: "italic" });

export const metadata: Metadata = {
  title: "Gymnastics Association of Andhra Pradesh (GAAP) | Promoting Gymnastics in Guntur",
  description:
    "The Gymnastics Association of Andhra Pradesh (GAAP) in Guntur promotes gymnastics through state-level championships, training programs, and workshops. Join us to foster talent and prepare for national and international competitions.",
  keywords: "Gymnastics in Andhra Pradesh",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${sans.variable} ${serif.variable}`}>
      <body>{children}</body>
    </html>
  );
}
