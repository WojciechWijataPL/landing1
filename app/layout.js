import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin", "latin-ext"],
  variable: "--font-inter",
  display: "swap",
});

const siteUrl = "https://izolacjepur.pl";

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: "Ocieplanie Pianą PUR — Woj. Łódzkie | IzolacjePUR — Darmowa Wycena",
  description:
    "Ocieplanie pianą PUR poddaszy na terenie województwa łódzkiego. Oszczędność do 40% na ogrzewaniu, bezszwowa izolacja z 25-letnią gwarancją. Darmowy pomiar i wycena.",
  keywords: [
    "ocieplanie pianą PUR łódzkie",
    "izolacja poddasza Łódź",
    "piana poliuretanowa",
    "ocieplanie natryskowe",
    "izolacja domu województwo łódzkie",
    "piana PUR",
  ],
  authors: [{ name: "IzolacjePUR" }],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "pl_PL",
    url: siteUrl,
    siteName: "IzolacjePUR",
    title: "Ocieplanie Pianą PUR — Woj. Łódzkie | IzolacjePUR",
    description:
      "Cieplejszy dom, niższe rachunki. Bezszwowa izolacja poddaszy pianą PUR z 25-letnią gwarancją. Województwo łódzkie. Zamów darmowy pomiar.",
    images: [
      {
        url: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1200&q=80",
        width: 1200,
        height: 630,
        alt: "Ocieplanie pianą PUR — IzolacjePUR",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ocieplanie Pianą PUR — Woj. Łódzkie | IzolacjePUR",
    description:
      "Cieplejszy dom, niższe rachunki. Bezszwowa izolacja poddaszy pianą PUR z 25-letnią gwarancją. Województwo łódzkie.",
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
