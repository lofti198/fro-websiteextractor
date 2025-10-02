import type { Metadata } from "next";
import { getTranslations } from 'next-intl/server';
import Header from "@/components/header";
import Footer from "@/components/footer";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('metadata');
  
  return {
    title: t('title'),
    description: t('description'),
  };
}

export default async function LocaleLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <Header />
      <main>
        {children}
      </main>
      <Footer />
    </div>
  );
}

