import { Button } from '@/lib/ui/button';
import { Dialog, DialogContent, DialogTitle } from '@/lib/ui/dialog';
import { useStore } from '@/stores';
import { useShallow } from 'zustand/shallow';

export const CustomModal = () => {
  const { isOpen, toggleModal } = useStore(
    useShallow((state) => ({
      isOpen: state.isOpen,
      toggleModal: state.toggleModal,
    }))
  );

  return (
    <Dialog open={isOpen} onOpenChange={toggleModal}>
      <DialogContent>
        <DialogTitle className="text-center">Continue to chat</DialogTitle>
        <div className="flex flex-col gap-4 mt-6">
          <Button
            variant="outline"
            onClick={() =>
              (window.location.href = 'http://localhost:4000/auth/github')
            }
          >
            Continue with GitHub
          </Button>
          <Button
            variant="outline"
            onClick={() =>
              (window.location.href = 'http://localhost:4000/auth/google')
            }
          >
            Continue with Google
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
