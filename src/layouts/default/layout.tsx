'use client';

import { useSessionStorage } from 'react-use';
import Image from 'src/@core/components/ui/image';
import Header from '@layouts/default/header';
import Footer from '@layouts/footer/footer';
import MobileNavigation from '@layouts/mobile-navigation/mobile-navigation';
import { useTranslation } from 'src/app/i18n/client';
import { useIsMounted } from '@utils/use-is-mounted';


export default function DefaultLayout({
  children,
  lang,
}: {
  children: React.ReactNode;
  lang: string;
}) {
  const isMounted = useIsMounted();

  return (
    <div className="flex flex-col min-h-screen">

      <Header lang={lang} />
      <main
        className="relative flex-grow"
        style={{
          WebkitOverflowScrolling: 'touch',
        }}
      >
        {children}
      </main>
      <Footer lang={lang} />
      <MobileNavigation lang={lang} />
    </div>
  );
}
