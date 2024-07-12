'use client';

import Link from 'src/@core/components/ui/link';
import SearchIcon from 'src/@core/components/icons/search-icon';
import UserIcon from 'src/@core/components/icons/user-icon';
import MenuIcon from 'src/@core/components/icons/menu-icon';
import HomeIcon from 'src/@core/components/icons/home-icon';
import { useUI } from '@contexts/ui.context';
import { ROUTES } from '@utils/routes';
import dynamic from 'next/dynamic';
import { Drawer } from 'src/@core/components/common/drawer/drawer';
import { getDirection } from '@utils/get-direction';
import { useModalAction } from 'src/@core/components/common/modal/modal.context';
import motionProps from 'src/@core/components/common/drawer/motion';
import { useTranslation } from 'src/app/i18n/client';
import { useRouter } from 'next/navigation';

const AuthMenu = dynamic(() => import('@layouts/header/auth-menu'), {
  ssr: false,
});
const MobileMenu = dynamic(() => import('@layouts/header/mobile-menu'));

export default function BottomNavigation({ lang }: { lang: string }) {
  const { t } = useTranslation(lang, 'common');
  const { push } = useRouter();
  const {
    openSidebar,
    closeSidebar,
    displaySidebar,
    isAuthorized,
  } = useUI();
  const { openModal } = useModalAction();
  const dir = getDirection(lang);
  const contentWrapperCSS = dir === 'ltr' ? { left: 0 } : { right: 0 };
  function handleLogin() {
    push(`/signin`)
    // openModal('LOGIN_VIEW');
  }
  function handleMobileMenu() {
    return openSidebar();
  }

  return (
    <>
      <div className="lg:hidden fixed z-30 -bottom-0.5 flex items-center justify-between shadow-bottomNavigation body-font bg-brand-light w-full h-14 px-4 md:px-6 lg:px-8 text-brand-muted pb-0.5">
        <button
          aria-label="Menu"
          className="flex flex-col items-center justify-center outline-none shrink-0 focus:outline-none"
          onClick={handleMobileMenu}
        >
          <MenuIcon />
        </button>
        <Link href={`/${lang}${ROUTES.HOME}`} className="shrink-0">
          <span className="sr-only">{t('breadcrumb-home')}</span>
          <HomeIcon />
        </Link>

        <AuthMenu
          isAuthorized={isAuthorized}
          href={`/${lang}${ROUTES.ACCOUNT}`}
          btnProps={{
            className: 'shrink-0 focus:outline-none',
            children: <UserIcon />,
            onClick: handleLogin,
          }}
        >
          <UserIcon />
        </AuthMenu>
      </div>
      <Drawer
        className="w-[375px]"
        placement={dir === 'rtl' ? 'right' : 'left'}
        open={displaySidebar}
        onClose={closeSidebar}
        // @ts-ignore
        level={null}
        contentWrapperStyle={contentWrapperCSS}
        {...motionProps}
      >
        <MobileMenu lang={lang} />
      </Drawer>
    </>
  );
}
