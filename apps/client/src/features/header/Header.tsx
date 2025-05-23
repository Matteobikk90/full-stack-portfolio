import { MenuDesktop, MenuMobile } from '@/components/menu';
import { Button } from '@/lib/ui/button';
import { useStore } from '@/stores';
import { ChatCircleDotsIcon, MoonIcon, SunIcon } from '@phosphor-icons/react';
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
    <header className="fixed top-0 flex items-center justify-between p-4 w-full backdrop-blur shadow-elevation z-10">
      <MenuDesktop />
      <MenuMobile />
      <div className="flex items-center gap-4">
        <Button
          variant="outline"
          data-testid="theme-toggle"
          size="icon"
          onClick={handleToggle}
        >
          {mode === 'dark' ? (
            <SunIcon size={32} weight="duotone" />
          ) : (
            <MoonIcon size={32} weight="duotone" />
          )}
        </Button>
        <Button
          variant="outline"
          size="icon"
          // aria-label={isLoggedIn ? 'Open chat' : 'Login to chat'}
        >
          <ChatCircleDotsIcon size={32} weight="duotone" />
        </Button>
      </div>
    </header>
  );
};
