import { MenuDesktop, MenuMobile } from '@/components/menu';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/lib/ui/button';
import { useStore } from '@/stores';
import { ChatsIcon, MoonIcon, SunIcon } from '@phosphor-icons/react';
import { useEffect } from 'react';
import { useShallow } from 'zustand/shallow';

export const Header = () => {
  const { isAuthenticated } = useAuth();
  const { mode, toggleTheme, updateBackground, toggleModal, openChat } =
    useStore(
      useShallow((state) => ({
        mode: state.mode,
        toggleTheme: state.toggleTheme,
        updateBackground: state.updateBackground,
        toggleModal: state.toggleModal,
        openChat: state.openChat,
      }))
    );

  useEffect(() => {
    document.documentElement.classList.remove('light', 'dark');
    document.documentElement.classList.add(mode);
  }, [mode]);

  const handleToggle = () => {
    toggleTheme();
    updateBackground();
  };

  const handleClick = () => {
    if (isAuthenticated) {
      openChat();
    } else {
      toggleModal();
    }
  };

  return (
    <header className="fixed top-0 flex items-center justify-between p-4 md:py-8 w-full z-10 max-w-6xl left-1/2 -translate-x-1/2">
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
          onClick={handleClick}
          aria-label={isAuthenticated ? 'Open chat' : 'Login to chat'}
        >
          <ChatsIcon size={32} weight="duotone" />
        </Button>
      </div>
    </header>
  );
};
