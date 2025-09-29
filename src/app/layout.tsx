import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { notoSans } from "@/lib/fonts";

export const metadata: Metadata = {
  title: "AI Scraper - Intelligent Web Data Extraction",
  description: "Transform any website into structured data with our AI-powered scraping technology. No coding required - just point, click, and extract.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${notoSans.className} `}>
        <div>
          <Header />
          <main>
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
