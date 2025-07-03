import { Button } from '@/lib/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from '@/lib/ui/dialog';
import { useStore } from '@/stores';
import { authProviders } from '@/utils/lists';
import { XIcon } from '@phosphor-icons/react';
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
          {authProviders.map(({ id, label, icon }) => (
            <a
              key={id}
              href={`https://matteosoresini.com/auth/${id}?state=${pathname}`}
              className="w-full"
            >
              <Button variant="outline" className="w-full">
                {icon}
                {label}
              </Button>
            </a>
          ))}
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
