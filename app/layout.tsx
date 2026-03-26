import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Navbar from "@/components/ui/Navbar";
import Cursor from "@/components/ui/Cursor";
import { readData } from "@/lib/data";
import type { SiteData } from "@/lib/types";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export async function generateMetadata(): Promise<Metadata> {
  const site = readData<SiteData>("site.json");
  return {
    title: site.seo.title,
    description: site.seo.description,
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className="scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#080808] text-[#f0f0f0] min-h-screen cursor-none`}
      >
        <Cursor />
        <Navbar />
        <main className="pt-16">{children}</main>
      </body>
    </html>
  );
}
