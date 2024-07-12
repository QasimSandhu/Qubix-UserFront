'use client';
import Copyright from '@layouts/footer/copyright';
import { footer } from './data';

interface FooterProps {
  variant?: 'default' | 'medium';
  lang: string;
}

const Footer: React.FC<FooterProps> = ({ variant = 'default', lang }) => {
  return (
    <footer className="mt-[50px] lg:mt-14 2xl:mt-16">
      <Copyright variant={variant} lang={lang} />
    </footer>
  );
};

export default Footer;
