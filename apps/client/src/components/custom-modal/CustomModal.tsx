import { Button } from '@/lib/ui/button';
import { Dialog, DialogContent, DialogTitle } from '@/lib/ui/dialog';
import { useStore } from '@/stores';
import { proxyTarget } from '@/utils/constants';
import { GithubLogoIcon, GoogleLogoIcon, XIcon } from '@phosphor-icons/react';
import { Link, useLocation } from '@tanstack/react-router';
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
      <DialogContent className="text-center max-w-sm text-foreground rounded-lg border shadow-elevation bg-background p-8 space-y-4 [&>button]:hidden">
        <DialogTitle className="text-lg font-semibold">
          Login to chat
          <Button
            variant="outline"
            size="icon"
            onClick={toggleModal}
            className="absolute top-4 right-4"
          >
            <XIcon size={20} weight="duotone" />
          </Button>
        </DialogTitle>

        <p className="text-sm">Choose a provider to continue</p>

        <div className="grid md:grid-cols-2 gap-3 mb-0">
          <a href={`${proxyTarget}/auth/github?state=${pathname}`}>
            <Button variant="outline" className="w-full" asChild>
              <div className="flex items-center justify-center gap-2">
                <GithubLogoIcon size={20} weight="duotone" />
                GitHub
              </div>
            </Button>
          </a>
          <a href={`${proxyTarget}/auth/google?state=${pathname}`}>
            <Button variant="outline" className="w-full" asChild>
              <div className="flex items-center justify-center gap-2">
                <GoogleLogoIcon size={20} weight="duotone" />
                Google
              </div>
            </Button>
          </a>
          {/* <a href={`${proxyTarget}/auth/facebook?state=${pathname}`}>
            <Button variant="outline" className="w-full" asChild>
              <div className="flex items-center justify-center gap-2">
                <FacebookLogoIcon size={20} weight="duotone" />
                Facebook
              </div>
            </Button>
          </a>
          <a href={`${proxyTarget}/auth/linkedin?state=${pathname}`}>
            <Button variant="outline" className="w-full" asChild>
              <div className="flex items-center justify-center gap-2">
                <LinkedinLogoIcon size={20} weight="duotone" />
                LinkedIn
              </div>
            </Button>
          </a> */}
        </div>
        <p className="text-xs text-muted-foreground text-center px-4 leading-relaxed">
          By continuing, you agree to the{' '}
          <Link
            onClick={toggleModal}
            to="/terms-of-service"
            className="underline hover:text-primary"
          >
            Terms of Service
          </Link>{' '}
          and{' '}
          <Link
            onClick={toggleModal}
            to="/privacy-policy"
            className="underline hover:text-primary"
          >
            Privacy Policy
          </Link>
          .
        </p>
      </DialogContent>
    </Dialog>
  );
};

export default CustomModal;
