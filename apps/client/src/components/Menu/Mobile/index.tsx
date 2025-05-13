import { Button, buttonVariants } from '@/lib/ui/button';
import { cn } from '@/lib/utils';
import { menuLinks } from '@/utils/menu';
import { Link } from '@tanstack/react-router';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';

export const MenuMobile = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <nav className="md:hidden fixed inset-0 top-[4.4rem] h-[calc(100vh_-_4.4rem)] bg-background/80 backdrop-blur-lg z-40 p-6 flex flex-col items-center justify-evenly gap-6">
        {menuLinks.map(({ path, label, icon: Icon }, index) => (
          <Link
            to={path}
            onClick={() => setIsOpen(false)}
            className={cn(
              'flex flex-1 items-center gap-2 w-full -translate-x-[100vw] ease-in-out',
              isOpen && 'translate-x-0',
              buttonVariants({ variant: 'ghost' })
            )}
            style={{
              transitionDelay: isOpen
                ? `${index * 200}ms`
                : `${(menuLinks.length - 1 - index) * 200}ms`,
            }}
            activeProps={{
              className: 'bg-accent text-accent-foreground',
            }}
            inactiveProps={{
              className: 'bg-transparent hover:bg-muted',
            }}
          >
            <Icon className="h-4 w-4" />
            {label}
          </Link>
        ))}
      </nav>

      <Button
        variant="outline"
        size="icon"
        className="md:hidden z-50"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label="Toggle menu"
      >
        {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </Button>
    </>
  );
};
