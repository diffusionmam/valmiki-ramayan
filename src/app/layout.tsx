import type { Metadata, Viewport } from "next";
import { Geist_Mono } from "next/font/google";
import { Noto_Serif_Devanagari, Inter } from "next/font/google";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import "./globals.css";

// Apply the stored theme before paint to avoid a flash of incorrect theme.
const themeInitScript = `
(function(){try{
  var s=localStorage.getItem('theme');
  var m=window.matchMedia('(prefers-color-scheme: dark)').matches;
  if(s==='dark'||(!s&&m)){document.documentElement.classList.add('dark');}
}catch(e){}})();
`;

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

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fef3c7" },
    { media: "(prefers-color-scheme: dark)", color: "#1a1714" },
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
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        {/* Progressive enhancement: mark JS as enabled so reveal animations run. */}
        <script
          dangerouslySetInnerHTML={{
            __html: "document.documentElement.classList.add('js');",
          }}
        />
        <noscript>
          <style>{`.reveal{opacity:1!important;transform:none!important}`}</style>
        </noscript>
      </head>
      <body className="flex min-h-full flex-col" suppressHydrationWarning>
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
