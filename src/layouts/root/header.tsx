import { useRef } from 'react';
import dynamic from 'next/dynamic';
import { siteSettings } from '@settings/site-settings';
import { ROUTES } from '@utils/routes';
import { useUI } from '@contexts/ui.context';
import { useActiveScroll } from '@utils/use-active-scroll';
import Container from 'src/@core/components/ui/container';
import Logo from 'src/@core/components/ui/logo';
import UserIcon from 'src/@core/components/icons/user-icon';
import MenuIcon from 'src/@core/components/icons/menu-icon';
import HeaderMenu from '@layouts/header/header-menu';
import LanguageSwitcher from 'src/@core/components/ui/language-switcher';
import { useModalAction } from 'src/@core/components/common/modal/modal.context';
import cn from 'classnames';
import { useTranslation } from 'src/app/i18n/client';
import { useRouter } from 'next/navigation'
const AuthMenu = dynamic(() => import('@layouts/header/auth-menu'), {
  ssr: false,
});

type DivElementRef = React.MutableRefObject<HTMLDivElement>;
const { site_header } = siteSettings;

function Header({ lang }: { lang: string }) {
  const { openSidebar, isAuthorized } = useUI();
  const { openModal } = useModalAction();
  const { push } = useRouter();
  const { t } = useTranslation(lang, 'common');
  const siteHeaderRef = useRef() as DivElementRef;
  useActiveScroll(siteHeaderRef);
  function handleLogin() {
    // openModal('LOGIN_VIEW');
    console.log("logins")
    push(`/${lang}/signin`)
  }
  function handleMobileMenu() {
    return openSidebar();
  }

  return (
    <header
      id="siteHeader"
      ref={siteHeaderRef}
      className={cn('header-one w-full h-16 lg:h-20 z-30 sticky top-0')}
    >
      <div className="z-20 w-full h-16 transition duration-200 ease-in-out innerSticky body-font bg-brand-light lg:h-20">
        <Container className="flex items-center justify-between w-full h-full">
          <div className="flex shrink-0">
            <button
              aria-label="Menu"
              className="flex-col items-center justify-center hidden outline-none menuBtn ltr:mr-5 rtl:ml-5 lg:flex xl:hidden shrink-0 focus:outline-none"
              onClick={handleMobileMenu}
            >
              <MenuIcon />
            </button>

            <Logo className="logo -mt-1.5 md:-mt-1 " />
          </div>

          <HeaderMenu
            data={site_header.menu}
            className="hidden xl:flex md:ltr:pl-6 md:rtl:pr-6 xl:ltr:pl-10 xl:rtl:pr-10"
            lang={lang}
          />
          <div className="flex shrink-0 -mx-2.5 xl:-mx-3.5">
            <div className="xl:mx-3.5 mx-2.5">
              <LanguageSwitcher lang={lang} />
            </div>

            <div className="items-center hidden lg:flex shrink-0 xl:mx-3.5 mx-2.5">
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
        </Container>
      </div>
    </header>
  );
}

export default Header;
