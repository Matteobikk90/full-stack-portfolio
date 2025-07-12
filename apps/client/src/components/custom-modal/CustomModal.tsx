import { Filters } from '@/components/custom-modal/Filters';
import { Login } from '@/components/custom-modal/Login';
import { Button } from '@/lib/ui/button';
import { Dialog, DialogContent, DialogTitle } from '@/lib/ui/dialog';
import { useStore } from '@/stores';
import { XIcon } from '@phosphor-icons/react';
import { useTranslation } from 'react-i18next';
import { useShallow } from 'zustand/shallow';
import PopUpInfo from '../pop-up-info';

export const CustomModal = () => {
  const { t } = useTranslation();
  const { isOpen, toggleModal, activeModal, resetAll } = useStore(
    useShallow(({ isOpen, toggleModal, activeModal, resetAll }) => ({
      isOpen,
      toggleModal,
      activeModal,
      resetAll,
    }))
  );

  return (
    <Dialog
      open={isOpen}
      onOpenChange={() => {
        toggleModal(null);
        resetAll();
      }}
    >
      {activeModal && (
        <DialogContent className="flex flex-col gap-6 max-w-lg w-[calc(100%_-_2rem)] rounded-lg border shadow-elevation bg-background p-6 [&>button]:hidden min-h-32">
          <DialogTitle className="text-lg font-semibold">
            {activeModal === 'auth' ? t('login_chat') : t('search.title')}
            <PopUpInfo
              hoverText={t('close_modal')}
              align="left"
              className="absolute top-4 right-4"
            >
              <Button
                variant="outline"
                size="icon"
                onClick={() => toggleModal(null)}
                aria-label="Close dialog"
              >
                <XIcon className="size-5" weight="duotone" />
              </Button>
            </PopUpInfo>
          </DialogTitle>

          {activeModal === 'auth' && <Login />}
          {activeModal === 'filter' && <Filters />}
        </DialogContent>
      )}
    </Dialog>
  );
};

export default CustomModal;
