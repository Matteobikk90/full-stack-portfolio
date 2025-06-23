import { Button } from '@/lib/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from '@/lib/ui/dialog';
import { useStore } from '@/stores';
import {
  FacebookLogoIcon,
  GithubLogoIcon,
  GoogleLogoIcon,
  LinkedinLogoIcon,
  XIcon,
} from '@phosphor-icons/react';
import { Link, useLocation } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';
import { useShallow } from 'zustand/shallow';

export const CustomModal = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const pathname = encodeURIComponent(location.pathname);
  const { isOpen, toggleModal } = useStore(
    useShallow((state) => ({
      isOpen: state.isOpen,
      toggleModal: state.toggleModal,
    }))
  );

  return (
    <Dialog open={isOpen} onOpenChange={toggleModal}>
      <DialogContent className="flex flex-col gap-6 max-w-lg w-[calc(100%_-_2rem)] rounded-lg border shadow-elevation bg-background p-6 [&>button]:hidden">
        <DialogTitle className="text-lg font-semibold">
          {t('login_chat')}
          <Button
            variant="outline"
            size="icon"
            onClick={toggleModal}
            className="absolute top-4 right-4"
            aria-label="Close dialog"
          >
            <XIcon className="size-5" weight="duotone" />
          </Button>
        </DialogTitle>

        <DialogDescription className="text-sm">
          {t('modal.subtitle')}
        </DialogDescription>

        <div className="grid grid-cols-2 gap-4 mb-0">
          <a href={`https://matteosoresini.com/auth/github?state=${pathname}`}>
            <Button variant="outline" className="w-full">
              <GithubLogoIcon className="size-5" weight="duotone" />
              GitHub
            </Button>
          </a>
          <a href={`https://matteosoresini.com/auth/google?state=${pathname}`}>
            <Button variant="outline" className="w-full">
              <GoogleLogoIcon className="size-5" weight="duotone" />
              Google
            </Button>
          </a>
          <a
            href={`https://matteosoresini.com/auth/facebook?state=${pathname}`}
            className="w-full"
          >
            <Button variant="outline" className="w-full">
              <FacebookLogoIcon className="size-5" weight="duotone" />
              Facebook
            </Button>
          </a>
          <a
            href={`https://matteosoresini.com/auth/linkedin?state=${pathname}`}
            className="w-full"
          >
            <Button variant="outline" className="w-full">
              <LinkedinLogoIcon className="size-5" weight="duotone" />
              LinkedIn
            </Button>
          </a>
        </div>
        <p className="text-xs leading-relaxed">
          {t('modal.privacy.one')}{' '}
          <Link
            onClick={toggleModal}
            to="/terms-of-service"
            className="underline hover:text-primary"
          >
            {t('modal.privacy.two')}
          </Link>{' '}
          {t('modal.privacy.six')}{' '}
          <Link
            onClick={toggleModal}
            to="/privacy-policy"
            className="underline hover:text-primary"
          >
            {t('modal.privacy.three')}
          </Link>
          .
          <br />
          <span className="text-muted-foreground">
            {t('modal.privacy.four')}{' '}
            <Link
              onClick={toggleModal}
              to="/delete-data"
              className="underline hover:text-primary"
            >
              {t('modal.privacy.five')}
            </Link>
          </span>
        </p>
      </DialogContent>
    </Dialog>
  );
};

export default CustomModal;
