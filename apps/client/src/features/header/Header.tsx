import { Button, buttonVariants } from '@/lib/ui/button';
import useStore from '@/stores';
import { menuLinks } from '@/utils/menu';
import { Link } from '@tanstack/react-router';
import { Moon, Sun } from 'lucide-react';
import { useEffect } from 'react';
import { useShallow } from 'zustand/react/shallow';

export const Header = () => {
  const { mode, toggle } = useStore(
    useShallow((state) => ({
      mode: state.mode,
      toggle: state.toggle,
    }))
  );

  useEffect(() => {
    document.documentElement.classList.remove('light', 'dark');
    document.documentElement.classList.add(mode);
  }, [mode]);

  return (
    <header className="flex justify-between p-4 w-full backdrop-blur">
      <nav className="flex items-center gap-4">
        {menuLinks.map(({ path, label, icon: Icon }) => (
          <Link
            key={path}
            to={path}
            className={buttonVariants({ variant: 'ghost' })}
            activeProps={{
              className: 'bg-accent text-accent-foreground',
            }}
            inactiveProps={{
              className: 'bg-transparent hover:bg-muted',
            }}
          >
            <Icon className="mr-2 h-4 w-4" />
            {label}
          </Link>
        ))}
      </nav>

      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" onClick={toggle}>
          {mode === 'dark' ? (
            <Sun className="h-4 w-4" />
          ) : (
            <Moon className="h-4 w-4" />
          )}
        </Button>
        <Button variant="ghost" className="text-sm font-medium px-3">
          Login
        </Button>
      </div>
    </header>
  );
};
