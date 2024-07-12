'use client';
import MobileNavigation from '@layouts/mobile-navigation/mobile-navigation';
import { useIsMounted } from '@utils/use-is-mounted';
import Footer from '@layouts/footer/footer';
import Header from '@layouts/root/header';
import { useTranslation } from 'src/app/i18n/client';

export default function RootLayout(
  { children, lang }:
    { children: React.ReactNode; lang: string; }
) {

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
