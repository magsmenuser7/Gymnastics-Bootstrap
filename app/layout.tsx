import type { Metadata } from "next";
import { Oswald, Open_Sans } from "next/font/google";
import "./vendor/bootstrap.min.css";
import "./vendor/font-awesome/css/font-awesome.min.css";
import "./globals.css";

const oswald = Oswald({ variable: "--font-oswald", subsets: ["latin"], weight: ["200", "400", "500", "600", "700"] });
const openSans = Open_Sans({ variable: "--font-open-sans", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Gymnastics Association of Andhra Pradesh (GAAP) | Promoting Gymnastics in Guntur",
  description:
    "The Gymnastics Association of Andhra Pradesh (GAAP) in Guntur promotes gymnastics through state-level championships, training programs, and workshops. Join us to foster talent and prepare for national and international competitions.",
  keywords: "Gymnastics in Andhra Pradesh",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${oswald.variable} ${openSans.variable}`}>
      <body>{children}</body>
    </html>
  );
}
