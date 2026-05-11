import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import Navbar from "@/components/ui/Navbar";
import { readData } from "@/lib/data";
import type { SiteData } from "@/lib/types";
import "./globals.css";

const inter = Inter({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export async function generateMetadata(): Promise<Metadata> {
  const site = readData<SiteData>("site.json");
  return {
    title: site.seo.title,
    description: site.seo.description,
    openGraph: {
      title: site.seo.ogTitle ?? site.seo.title,
      description: site.seo.ogDescription ?? site.seo.description,
      url: site.seo.ogUrl,
    },
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const site = readData<SiteData>("site.json");
  return (
    <html lang="ko" className="scroll-smooth">
      <head>
        {site.seo.naverVerification && (
          <>
            <meta name="NaverBot" content="All" />
            <meta name="NaverBot" content="index,follow" />
            <meta name="Yeti" content="All" />
            <meta name="Yeti" content="index,follow" />
          </>
        )}
      </head>
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} antialiased bg-[#080808] text-[#f0f0f0] min-h-screen`}
      >
        <Navbar />
        <main className="pt-16">{children}</main>
      </body>
    </html>
  );
}
