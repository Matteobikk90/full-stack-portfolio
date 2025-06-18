import PopUpInfo from '@/components/pop-up-info';
import { Logo } from '@/features/header/Logo';
import { Button } from '@/lib/ui/button';
import { cn } from '@/lib/utils';
import { currentYear } from '@/utils/constants';
import { actions } from '@/utils/lists';
import { hoverStyles, menuLinks } from '@/utils/menu';
import { DotsThreeOutlineVerticalIcon, XIcon } from '@phosphor-icons/react';
import { Link } from '@tanstack/react-router';
import { useState } from 'react';

export const MenuMobile = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <nav
        className={cn(
          'md:hidden fixed inset-0 top-[4.4rem] h-[calc(100dvh_-_4.4rem)] p-4 pt-0 flex flex-col justify-between gap-6',
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
                {label}
              </span>
            </Link>
          ))}
        </div>
        <div className="flex flex-wrap items-center gap-4 justify-center md:justify-start">
          {actions.map(
            (
              { onClick, isLink, href, className, label, icon, align },
              index
            ) => (
              <PopUpInfo key={label} hoverText={label} align={align}>
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
                    <Link to={href}>{icon}</Link>
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
          <p className="text-sm text-center md:text-right">
            © {currentYear} Matteo Soresini. All rights reserved.
          </p>
        </div>
      </nav>

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
        >
          {isOpen ? (
            <XIcon className="size-5" weight="duotone" />
          ) : (
            <DotsThreeOutlineVerticalIcon className="size-5" weight="duotone" />
          )}
        </Button>
      </PopUpInfo>

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
