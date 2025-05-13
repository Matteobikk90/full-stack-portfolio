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
      <nav
        className={cn(
          'md:hidden fixed inset-0 h-[calc(100vh_-_4.4rem)] top-[4.4rem] bg-background justify-evenly p-6 flex flex-col gap-4 transform transition-transform duration-300',
          isOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        {menuLinks.map(({ path, label, icon: Icon }) => (
          <Link
            key={path}
            to={path}
            onClick={() => setIsOpen(false)}
            className={cn(
              'flex-1 flex items-center gap-2',
              buttonVariants({ variant: 'ghost' })
            )}
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
        className="md:hidden"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label="Toggle menu"
      >
        {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </Button>
    </>
  );
};
