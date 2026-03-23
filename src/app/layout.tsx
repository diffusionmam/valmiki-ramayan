import type { Metadata } from "next";
import { Geist_Mono } from "next/font/google";
import { Noto_Serif_Devanagari, Inter } from "next/font/google";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import "./globals.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

const notoSerif = Noto_Serif_Devanagari({
  variable: "--font-heading",
  subsets: ["latin", "devanagari"],
  weight: ["400", "500", "600", "700"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Srimad Valmiki Ramayana — Sanskrit Epic with English Translation",
    template: "%s | Valmiki Ramayana",
  },
  description:
    "Read the complete Srimad Valmiki Ramayana online — 24,000 Sanskrit verses across 6 Kaandas with word-by-word meaning, English translation, and commentary.",
  keywords: [
    "Ramayana",
    "Valmiki Ramayana",
    "Sanskrit",
    "Rama",
    "Sita",
    "Indian Epics",
    "Vedic Literature",
    "Hindu Scripture",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${notoSerif.variable} ${geistMono.variable} h-full antialiased`}
      data-scroll-behavior="smooth"
      suppressHydrationWarning
    >
      <body className="flex min-h-full flex-col" suppressHydrationWarning>
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
