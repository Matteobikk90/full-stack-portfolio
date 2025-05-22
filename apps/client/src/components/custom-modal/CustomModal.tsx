import { Button } from '@/lib/ui/button';
import { Dialog, DialogContent, DialogTitle } from '@/lib/ui/dialog';
import { useStore } from '@/stores';
import { GithubLogoIcon, GoogleLogoIcon } from '@phosphor-icons/react';
import { useLocation } from '@tanstack/react-router';
import { useShallow } from 'zustand/shallow';

export const CustomModal = () => {
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
      <DialogContent>
        <DialogTitle className="text-center">Login to chat</DialogTitle>
        <div className="grid grid-cols-2 gap-4">
          <a href={`http://localhost:4000/auth/github?state=${pathname}`}>
            <Button variant="outline" className="w-full" asChild>
              <div className="flex items-center justify-center gap-2">
                <GithubLogoIcon size={24} />
                GitHub
              </div>
            </Button>
          </a>
          <a href={`http://localhost:4000/auth/google?state=${pathname}`}>
            <Button variant="outline" className="w-full" asChild>
              <div className="flex items-center justify-center gap-2">
                <GoogleLogoIcon size={24} />
                Google
              </div>
            </Button>
          </a>
        </div>
      </DialogContent>
    </Dialog>
  );
};
