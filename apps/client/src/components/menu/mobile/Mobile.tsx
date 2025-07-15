import PopUpInfo from '@/components/pop-up-info';
import { Logo } from '@/features/header/Logo';
import { Button } from '@/lib/ui/button';
import { cn } from '@/lib/utils';
import { useStore } from '@/stores';
import { currentYear } from '@/utils/constants';
import { actions } from '@/utils/lists';
import { hoverStyles, menuLinks } from '@/utils/menu';
import {
  BinocularsIcon,
  DotsThreeOutlineVerticalIcon,
  XIcon,
} from '@phosphor-icons/react';
import { Link } from '@tanstack/react-router';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useShallow } from 'zustand/shallow';

export const MenuMobile = () => {
  const { t } = useTranslation();
  const { lang, toggleLang, toggleModal } = useStore(
    useShallow(({ lang, toggleLang, toggleModal }) => ({
      lang,
      toggleLang,
      toggleModal,
    }))
  );
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <nav
        className={cn(
          'md:hidden fixed inset-0 top-[3.5rem] h-[calc(100dvh_-_3.5rem)] px-4 py-2 pt-0 flex flex-col justify-between container mx-auto',
          isOpen
            ? 'opacity-100 bg-background z-12'
            : 'opacity-0 bg-transparent delay-[800ms] z-10'
        )}
      >
        <div>
          {menuLinks.slice(1, 4).map(({ path, label, icon: Icon }, index) => (
            <Link
              key={path}
              to={path}
              onClick={() => setIsOpen(false)}
              className={cn(
                'relative group flex py-8 items-center justify-center gap-2 w-full overflow-hidden transition-transform duration-300 ease-in-out -translate-x-[100vw] outline-0 border-b',
                isOpen && 'translate-x-0',
                hoverStyles[path]
              )}
              style={{
                transitionDelay: isOpen
                  ? `${index * 200}ms`
                  : `${(menuLinks.length - 1 - index) * 200}ms`,
              }}
              activeProps={{
                className: 'font-medium text-background',
              }}
            >
              <span
                className="absolute inset-0 left-[-100%] w-full h-full transition-all duration-300 group-hover:left-0 group-focus:left-0 group-data-[status=active]:left-0"
                style={{
                  background: `var(--section${path.replace('/', '-')})`,
                }}
              />
              <span className="relative flex items-center gap-2">
                <Icon className="size-5" weight="duotone" />
                {t(`menu.${label}`)}
              </span>
            </Link>
          ))}
        </div>
        <div className="flex flex-col items-center gap-2 md:gap-4">
          <div className="flex items-center gap-3 sm:gap-4 justify-center md:justify-start">
            <PopUpInfo
              hoverText={`${t('lang')} ${lang === 'en' ? 'ITA' : 'ENG'}`}
              align="right"
            >
              <Button
                variant="outline"
                size="icon"
                onClick={() => toggleLang(lang === 'en' ? 'it' : 'en')}
                aria-label="Toggle language"
              >
                <span
                  role="img"
                  className="text-xl"
                  aria-label={lang === 'en' ? 'UK flag' : 'Italian flag'}
                >
                  {lang === 'en' ? '🇬🇧' : '🇮🇹'}
                </span>
              </Button>
            </PopUpInfo>
            {actions.map(
              (
                { align, label, className, onClick, href, isLink, icon, id },
                index
              ) => (
                <PopUpInfo key={label} hoverText={t(id)} align={align}>
                  <Button
                    variant="outline"
                    size="icon"
                    asChild={!onClick && !isLink}
                    onClick={onClick}
                    className={cn(
                      'transition-transform duration-300 ease-in-out -translate-x-[100vw]',
                      isOpen && 'translate-x-0',
                      className
                    )}
                    aria-label={label}
                    style={{
                      transitionDelay: isOpen
                        ? `${index * 200}ms`
                        : `${(menuLinks.length - 1 - index) * 200}ms`,
                    }}
                  >
                    {isLink ? (
                      <Link
                        to={href}
                        aria-label={label}
                        className="w-full h-full flex items-center justify-center"
                        onClick={() => setIsOpen((prev) => !prev)}
                      >
                        {icon}
                      </Link>
                    ) : href ? (
                      <a
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={label}
                      >
                        {icon}
                      </a>
                    ) : (
                      icon
                    )}
                  </Button>
                </PopUpInfo>
              )
            )}
          </div>
          <p className="text-xs text-center md:text-right">
            © {currentYear} Matteo Soresini. All rights reserved.
          </p>
        </div>
      </nav>

      <div className="flex items-center gap-3">
        <PopUpInfo
          hoverText={`${isOpen ? 'Close' : 'Open'} menu`}
          position="bottom"
          align="right"
        >
          <Button
            variant="outline"
            size="icon"
            className="md:hidden relative"
            onClick={() => setIsOpen((prev) => !prev)}
            aria-label="Toggle menu"
            sound="menu"
          >
            {isOpen ? (
              <XIcon className="size-5" weight="duotone" />
            ) : (
              <DotsThreeOutlineVerticalIcon
                className="size-5"
                weight="duotone"
              />
            )}
          </Button>
        </PopUpInfo>
        <PopUpInfo
          hoverText={t('search.title')}
          position="bottom"
          className="md:hidden block"
        >
          <Button
            variant="outline"
            size="icon"
            onClick={() => toggleModal('filter')}
            aria-label="Search"
          >
            <BinocularsIcon className="size-5" weight="duotone" />
          </Button>
        </PopUpInfo>
      </div>

      <Link
        to="/"
        className="md:hidden absolute left-1/2 -translate-x-1/2"
        onClick={() => setIsOpen(false)}
        aria-label="Homepage"
      >
        <Logo />
      </Link>
    </>
  );
};
