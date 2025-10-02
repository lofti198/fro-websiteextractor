import type { Metadata } from "next";
import "./globals.css";
import { notoSans } from "@/lib/fonts";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { getLocale } from 'next-intl/server';

export const metadata: Metadata = {
  title: "AI Scraper - Intelligent Web Data Extraction",
  description: "Transform any website into structured data with our AI-powered scraping technology. No coding required - just point, click, and extract.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body className={`${notoSans.className} `}>
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
