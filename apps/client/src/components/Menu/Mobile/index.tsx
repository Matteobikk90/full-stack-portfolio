import { Button } from '@/lib/ui/button';
import { cn } from '@/lib/utils';
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
          'md:hidden fixed inset-0 top-[4.4rem] h-[calc(100dvh_-_4.4rem)] z-10 p-6 flex flex-col items-center justify-evenly gap-6',
          isOpen
            ? 'opacity-100 bg-background'
            : 'opacity-0 bg-transparent delay-[800ms]'
        )}
      >
        {menuLinks.map(({ path, label, icon: Icon }, index) => (
          <Link
            key={path}
            to={path}
            onClick={() => setIsOpen(false)}
            className={cn(
              'relative group flex flex-1 items-center justify-center gap-2 w-full overflow-hidden transition-transform duration-300 ease-in-out -translate-x-[100vw] outline-0',
              isOpen && 'translate-x-0',
              hoverStyles[path]
            )}
            style={{
              transitionDelay: isOpen
                ? `${index * 200}ms`
                : `${(menuLinks.length - 1 - index) * 200}ms`,
            }}
            activeProps={{
              className: 'font-semibold',
            }}
          >
            <span
              className="absolute inset-0 left-[-100%] w-full h-full z-0 transition-all duration-300 group-hover:left-0 group-focus:left-0 group-data-[status=active]:left-0"
              style={{
                background: `var(--section${path.replace('/', '-')})`,
              }}
            />
            <span className="relative z-10 flex items-center gap-2">
              <Icon size={16} weight="duotone" />
              {label}
            </span>
          </Link>
        ))}
      </nav>

      <Button
        variant="outline"
        size="icon"
        className="md:hidden"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label="Toggle menu"
      >
        {isOpen ? (
          <XIcon size={20} />
        ) : (
          <DotsThreeOutlineVerticalIcon size={20} weight="duotone" />
        )}
      </Button>
    </>
  );
};
