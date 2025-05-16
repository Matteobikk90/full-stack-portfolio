import { MenuDesktop, MenuMobile } from '@/components/menu';
import { Button } from '@/lib/ui/button';
import { useStore } from '@/stores';
import { MessageCircle, Moon, Sun } from 'lucide-react';
import { useEffect } from 'react';
import { useShallow } from 'zustand/shallow';

export const Header = () => {
  const { mode, toggle, updateBackground } = useStore(
    useShallow((state) => ({
      mode: state.mode,
      toggle: state.toggle,
      updateBackground: state.updateBackground,
    }))
  );

  useEffect(() => {
    document.documentElement.classList.remove('light', 'dark');
    document.documentElement.classList.add(mode);
  }, [mode]);

  const handleToggle = () => {
    toggle();
    updateBackground();
  };

  return (
    <header className="fixed flex items-center justify-between p-4 w-full backdrop-blur shadow-elevation z-10">
      <MenuDesktop />
      <MenuMobile />
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" onClick={handleToggle}>
          {mode === 'dark' ? (
            <Sun className="h-4 w-4" />
          ) : (
            <Moon className="h-4 w-4" />
          )}
        </Button>
        <Button
          variant="outline"
          size="icon"
          // aria-label={isLoggedIn ? 'Open chat' : 'Login to chat'}
        >
          <MessageCircle className="h-4 w-4" />
        </Button>
      </div>
    </header>
  );
};
