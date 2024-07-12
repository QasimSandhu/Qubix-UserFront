import { SAFlag } from 'src/@core/components/icons/language/SAFlag';
import { CNFlag } from 'src/@core/components/icons/language/CNFlag';
import { USFlag } from 'src/@core/components/icons/language/USFlag';
import { DEFlag } from 'src/@core/components/icons/language/DEFlag';
import { ESFlag } from 'src/@core/components/icons/language/ESFlag';


export const siteSettings = {
  name: 'Qubix',
  description:
    'Fastest E-commerce template built with React, NextJS, TypeScript, React-Query and Tailwind CSS.',
  author: {
    name: 'Qubix',
    websiteUrl: 'https://google.test',
    address: '',
  },
  logo: {
    url: "siteLogo",
    alt: 'Qubix',
    href: '/en',
    width: 128,
    height: 30,
  },
  defaultLanguage: 'en',
  currencyCode: 'USD',
  site_header: {
    menu: [
      {
        id: 1,
        path: '/',
        label: 'Home',
        subMenu: [
          {
            id: 1,
            path: '/',
            label: 'Example',
          },

        ],
      },

      {
        id: 4,
        path: '/',
        label: 'Example 2.0',
      },
    ],
    languageMenu: [
      {
        id: 'ar',
        name: 'AR',
        value: 'ar',
        icon: <SAFlag />,
      },
      {
        id: 'zh',
        name: 'ZH',
        value: 'zh',
        icon: <CNFlag />,
      },
      {
        id: 'en',
        name: 'EN',
        value: 'en',
        icon: <USFlag />,
      },
      {
        id: 'de',
        name: 'DE',
        value: 'de',
        icon: <DEFlag />,
      },
      {
        id: 'es',
        name: 'ES',
        value: 'es',
        icon: <ESFlag />,
      },
    ],
    pagesMenu: [
      {
        id: 1,
        path: '/search',
        label: 'menu-best-deals',
      },
      {
        id: 2,
        path: '/about-us',
        label: 'menu-about-us',
      },
      {
        id: 3,
        path: '/contact-us',
        label: 'menu-contact-us',
      },
      {
        id: 4,
        path: '/faq',
        label: 'menu-faq',
      },
    ],
  },
};
