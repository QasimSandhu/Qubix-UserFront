import RootLayout from '@layouts/root/layout';

export default function DefaultLayout({
  children,
  params: { lang },
}: {
  children: React.ReactNode;
  params: {
    lang: string;
  };
}) {
  return <RootLayout lang={lang}>{children}</RootLayout>;
}
