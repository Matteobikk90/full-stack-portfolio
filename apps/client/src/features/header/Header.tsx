import { MenuDesktop, MenuMobile } from '@/components/menu';
import PopUpInfo from '@/components/pop-up-info';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/lib/ui/button';
import { useStore } from '@/stores';
import { ChatsIcon, MoonIcon, SunIcon } from '@phosphor-icons/react';
import { useEffect } from 'react';
import { useShallow } from 'zustand/shallow';

export const Header = () => {
  const { isAuthenticated } = useAuth();
  const { mode, toggleTheme, updateBackground, openChat } = useStore(
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
    // if (isAuthenticated) {
    //   openChat();
    // } else {
    //   toggleModal();
    // }
    openChat();
  };

  return (
    <header className="flex items-center justify-between p-4 w-full container mx-auto relative max-h-max flex-1">
      <MenuDesktop />
      <MenuMobile />
      <div className="flex items-center gap-4 z-12">
        <PopUpInfo hoverText="Switch theme" position="bottom">
          <Button
            variant="outline"
            data-testid="theme-toggle"
            size="icon"
            onClick={handleToggle}
            aria-label="Switch theme"
            sound="theme"
          >
            {mode === 'dark' ? (
              <SunIcon className="size-5" weight="duotone" />
            ) : (
              <MoonIcon className="size-5" weight="duotone" />
            )}
          </Button>
        </PopUpInfo>
        <PopUpInfo
          hoverText={isAuthenticated ? 'Open chat' : 'Log in to chat'}
          position="bottom"
          align="left"
        >
          <Button
            variant="outline"
            size="icon"
            onClick={handleClick}
            className="animate-pulse-slow"
            aria-label={isAuthenticated ? 'Open chat' : 'Login to chat'}
          >
            <ChatsIcon className="size-5" weight="duotone" />
          </Button>
        </PopUpInfo>
      </div>
    </header>
  );
};
