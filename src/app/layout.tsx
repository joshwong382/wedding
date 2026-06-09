import type { Metadata } from "next";
import localFont from "next/font/local";
import { Montserrat } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { siteConfig } from "@/content/site";
import "./globals.css";

const amoresaAged = localFont({
  src: "../../public/fonts/amoresa-aged.otf",
  variable: "--font-display",
  display: "swap",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "600"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: siteConfig.meta.title,
  description: siteConfig.meta.description,
  metadataBase: new URL(siteConfig.meta.url),
  openGraph: {
    title: siteConfig.meta.title,
    description: siteConfig.meta.description,
    url: siteConfig.meta.url,
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { theme } = siteConfig;

  return (
    <html
      lang="en"
      className={`${amoresaAged.variable} ${montserrat.variable}`}
      style={{
        "--color-primary": theme.primary,
        "--color-accent": theme.accent,
        "--color-heading": theme.heading,
        "--color-body-muted": theme.bodyMuted,
        "--color-heart-dark": theme.heartDark,
      } as React.CSSProperties}
    >
      <body className="antialiased">{children}<Analytics /><SpeedInsights /></body>
    </html>
  );
}
