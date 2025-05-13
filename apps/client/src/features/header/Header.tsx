import { MenuDesktop, MenuMobile } from '@/components/Menu';
import { Button } from '@/lib/ui/button';
import useStore from '@/stores';
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
    <header className="flex items-center justify-between p-4 w-full backdrop-blur border-b shadow-xs relative z-50">
      <MenuDesktop />
      <MenuMobile />
      <div className="flex items-center gap-2 z-10">
        <Button variant="outline" size="icon" onClick={toggle}>
          {mode === 'dark' ? (
            <Sun className="h-4 w-4" />
          ) : (
            <Moon className="h-4 w-4" />
          )}
        </Button>
        <Button variant="ghost" className="text-sm font-medium">
          Login
        </Button>
      </div>
    </header>
  );
};
