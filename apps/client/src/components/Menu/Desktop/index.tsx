import { buttonVariants } from '@/lib/ui/button';
import { cn } from '@/lib/utils';
import { menuLinks } from '@/utils/menu';
import { Link } from '@tanstack/react-router';

export const MenuDesktop = () => (
  <nav className={cn('md:flex items-center gap-4 hidden')}>
    {menuLinks.map(({ path, label, icon: Icon }) => (
      <Link
        key={path}
        to={path}
        className={cn(
          'flex items-center gap-2',
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
);
