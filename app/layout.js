import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin", "latin-ext"],
  variable: "--font-inter",
  display: "swap",
});

const siteUrl = "https://izolacjepur-pro.pl";

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: "Ocieplanie Pianą PUR | IzolacjePUR Pro — Darmowa Wycena",
  description:
    "Nowoczesne ocieplanie pianą PUR poddaszy. Oszczędność do 40% na ogrzewaniu, bezszwowa izolacja z 25-letnią gwarancją. Darmowy pomiar i wycena w Twoim regionie.",
  keywords: [
    "ocieplanie pianą PUR",
    "izolacja poddasza",
    "piana poliuretanowa",
    "ocieplanie natryskowe",
    "izolacja domu",
    "piana PUR",
  ],
  authors: [{ name: "IzolacjePUR Pro" }],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "pl_PL",
    url: siteUrl,
    siteName: "IzolacjePUR Pro",
    title: "Ocieplanie Pianą PUR | IzolacjePUR Pro",
    description:
      "Cieplejszy dom, niższe rachunki. Bezszwowa izolacja poddaszy pianą PUR z 25-letnią gwarancją. Zamów darmowy pomiar.",
    images: [
      {
        url: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1200&q=80",
        width: 1200,
        height: 630,
        alt: "Ocieplanie pianą PUR — IzolacjePUR Pro",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ocieplanie Pianą PUR | IzolacjePUR Pro",
    description:
      "Cieplejszy dom, niższe rachunki. Bezszwowa izolacja poddaszy pianą PUR z 25-letnią gwarancją.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport = {
  themeColor: "#2563eb",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="pl" className={inter.variable}>
      <body>{children}</body>
    </html>
  );
}
