import { useTranslations } from 'next-intl';

export default function Footer() {
  const t = useTranslations('footer');
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-auto text-center text-zinc-400 py-5 px-7 border-t">
      <small>&copy; {currentYear}. {t('copyright')}</small>
    </footer>
  );
}
