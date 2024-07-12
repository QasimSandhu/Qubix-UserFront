import Image from 'src/@core/components/ui/image';
import { siteSettings } from '@settings/site-settings';
import { useTranslation } from 'src/app/i18n/client';

interface CopyrightProps {
  lang: string;
  variant?: 'default' | 'medium';
}
const year = new Date().getFullYear();
const Copyright: React.FC<CopyrightProps> = ({
  lang,
  variant = 'default',
}) => {
  const { t } = useTranslation(lang, 'footer');
  return (
    <div className="pb-20 lg:pb-7">
      <div
        className={`${
          variant === 'default' &&
          'mx-auto max-w-[1920px] px-4 md:px-6 lg:px-8 2xl:px-10'
        }`}
      >
        <div className="flex flex-col pt-6 text-center border-t md:flex-row md:justify-between border-border-three lg:pt-7">
          <p className="text-brand-dark text-sm leading-7 lg:leading-[27px] lg:text-15px">
            &copy;&nbsp;{t('text-copyright')} {year}&nbsp;
            <a
              className="transition-colors duration-200 ease-in-out text-brand-dark hover:text-brand"
              href={siteSettings.author.websiteUrl}
            >
              {siteSettings.author.name}
            </a>
            &nbsp; {t('text-all-rights-reserved')}
          </p>

        </div>
      </div>
    </div>
  );
};

export default Copyright;
