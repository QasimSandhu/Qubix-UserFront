import Container from 'src/@core/components/ui/container';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Qubix',
  description:
    'React, NextJS, TypeScript, React-Query and Tailwind CSS.',
};

export default async function Page({
  params: { lang },
}: {
  params: {
    lang: string;
  };
}) {
  return (
    <>

      <Container>
        Content
      </Container>
    </>
  );
}
