import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import LocalSwitcher from './local-switcher';

export default function Header() {
  const t = useTranslations('Navigation');
  const dropdown = t('dropdown');
  const lang = t('lang');

  return (
    <header className='p-4'>
      <nav className='flex items-center justify-between'>
        <Button variant="outline"><Link href='/'>{t('home')}</Link></Button>
        <LocalSwitcher dropdown={dropdown} lang={lang}/>
      </nav>
    </header>
  );
}
