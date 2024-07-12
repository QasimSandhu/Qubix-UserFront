'use client';

import { useRef } from 'react';
import dynamic from 'next/dynamic';
import { useTranslation } from 'src/app/i18n/client';
import cn from 'classnames';
import { ROUTES } from '@utils/routes';
import { useUI } from '@contexts/ui.context';
import { siteSettings } from '@settings/site-settings';
import { useActiveScroll } from '@utils/use-active-scroll';
import Container from 'src/@core/components/ui/container';
import Logo from 'src/@core/components/ui/logo';
import HeaderMenu from '@layouts/header/header-menu';
import LanguageSwitcher from 'src/@core/components/ui/language-switcher';
import UserIcon from 'src/@core/components/icons/user-icon';
import { useRouter } from 'next/navigation'
import { useModalAction } from 'src/@core/components/common/modal/modal.context';
const AuthMenu = dynamic(() => import('@layouts/header/auth-menu'), {
  ssr: false,
});


type DivElementRef = React.MutableRefObject<HTMLDivElement>;
const { site_header } = siteSettings;

function Header({ lang }: { lang: string }) {
  const { t } = useTranslation(lang, 'common');
  const { push } = useRouter();
  const { isAuthorized } = useUI();
  // const { openModal } = useModalAction();
  const siteHeaderRef = useRef() as DivElementRef;
  // const siteSearchRef = useRef() as DivElementRef;
  useActiveScroll(siteHeaderRef, 40);
  function handleLogin() {
    // openModal('LOGIN_VIEW');
    push(`/${lang}/signup`)
  }

  return (
    <header
      id="siteHeader"
      ref={siteHeaderRef}
      className={cn('header-two sticky-header sticky top-0 z-20 lg:relative w-full h-16 lg:h-auto')}
    >
      <div className="z-20 transition-all duration-200 ease-in-out innerSticky lg:w-full body-font bg-fill-secondary">
        <Container className="flex items-center justify-between h-16 py-3 top-bar lg:h-auto">
          <Logo className="logo -mt-1.5 md:-mt-1 " />
          {/* End of logo */}
          <HeaderMenu
            data={site_header.menu}
            className="hidden xl:flex md:ltr:pl-6 md:rtl:pr-6 xl:ltr:pl-10 xl:rtl:pr-10"
            lang={lang}
          />
          <div className="flex shrink-0 -mx-2.5 xl:-mx-3.5">
            <div className="xl:mx-3.5 mx-2.5">
              <LanguageSwitcher lang={lang} />
            </div>
            <div className="items-center hidden lg:flex shrink-0 mx-2.5 xl:mx-3.5">
              <UserIcon className="text-brand-dark text-opacity-40" />
              <AuthMenu
                isAuthorized={isAuthorized}
                href={`/${lang}${ROUTES.ACCOUNT}`}
                btnProps={{
                  children: t('text-sign-in'),
                  onClick: handleLogin,
                }}
              >
                {t('text-account')}
              </AuthMenu>
            </div>
          </div>
          {/* End of auth & lang */}
        </Container>
        {/* End of top part */}

        {/* <div className="hidden navbar bg-brand-light lg:block">
          <Container className="flex items-center justify-between h-16">
            <HeaderMenu
              data={site_header.menu}
              className="flex transition-all duration-200 ease-in-out"
              lang={lang}
            />


            <div className="flex items-center ltr:ml-auto rtl:mr-auto shrink-0">
              <div className="flex items-center py-4 overflow-hidden transition-all duration-200 ease-in-out opacity-0 shrink-0 navbar-right">

                <div className="flex items-center shrink-0 ltr:ml-7 rtl:mr-7">
                  <UserIcon className="text-brand-dark text-opacity-40" />
                  <AuthMenu
                    isAuthorized={isAuthorized}
                    href={`/${lang}${ROUTES.ACCOUNT}`}
                    btnProps={{
                      children: t('text-sign-in'),
                      onClick: handleLogin,
                    }}
                  >
                    {t('text-account')}
                  </AuthMenu>
                </div>
              </div>
            </div>
          </Container>
        </div> */}
        {/* End of menu part */}
      </div>
    </header>
  );
}

export default Header;
