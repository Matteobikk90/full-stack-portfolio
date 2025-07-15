import { MenuDesktop, MenuMobile } from '@/components/menu';
import PopUpInfo from '@/components/pop-up-info';
import { useAuth } from '@/hooks/useAuth';
import { useLogout } from '@/hooks/useLogout';
import { Button } from '@/lib/ui/button';
import { useStore } from '@/stores';
import {
  BinocularsIcon,
  ChatsIcon,
  MoonIcon,
  SignOutIcon,
  SunIcon,
} from '@phosphor-icons/react';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useShallow } from 'zustand/shallow';

export const Header = () => {
  const { isAuthenticated } = useAuth();
  const { handleLogout } = useLogout();
  const { t } = useTranslation();
  const { mode, toggleTheme, updateBackground, toggleModal, openChat } =
    useStore(
      useShallow(
        ({ mode, toggleTheme, updateBackground, toggleModal, openChat }) => ({
          mode,
          toggleTheme,
          updateBackground,
          toggleModal,
          openChat,
        })
      )
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
      toggleModal('auth');
    }
  };

  return (
    <header className="flex items-center justify-between px-4 py-2 w-full container mx-auto relative shrink">
      <MenuDesktop />
      <MenuMobile />
      <div className="flex items-center gap-3 sm:gap-4 z-12">
        <PopUpInfo
          hoverText={t('search.title')}
          position="bottom"
          className="hidden md:block"
        >
          <Button
            variant="outline"
            size="icon"
            onClick={() => toggleModal('filter')}
            aria-label="Search"
          >
            <BinocularsIcon className="size-5" weight="duotone" />
          </Button>
        </PopUpInfo>
        <PopUpInfo hoverText={t('theme')} position="bottom">
          <Button
            variant="outline"
            data-testid="theme-toggle"
            size="icon"
            onClick={handleToggle}
            aria-label={t('theme')}
            sound="theme"
          >
            {mode === 'dark' ? (
              <SunIcon className="size-5" weight="duotone" />
            ) : (
              <MoonIcon className="size-5" weight="duotone" />
            )}
          </Button>
        </PopUpInfo>
        <div className="flex flex-col md:flex-row gap-3 sm:gap-4 relative">
          <PopUpInfo
            hoverText={isAuthenticated ? t('chat') : t('login_chat')}
            position="bottom"
            align="left"
          >
            <Button
              variant="outline"
              size="icon"
              onClick={handleClick}
              className="animate-pulse-slow"
              aria-label={isAuthenticated ? t('chat') : t('login_chat')}
            >
              <ChatsIcon className="size-5" weight="duotone" />
            </Button>
          </PopUpInfo>
          {isAuthenticated && (
            <PopUpInfo
              hoverText="Logout"
              position="bottom"
              align="left"
              className="md:static md:m-0 absolute mt-12"
            >
              <Button
                variant="outline"
                size="icon"
                onClick={handleLogout}
                aria-label="Logout"
              >
                <SignOutIcon className="size-5" weight="duotone" />
              </Button>
            </PopUpInfo>
          )}
        </div>
      </div>
    </header>
  );
};
