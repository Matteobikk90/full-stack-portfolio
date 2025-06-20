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
      <DialogContent className="flex flex-col gap-6 max-w-lg w-full rounded-lg border shadow-elevation bg-background p-6 [&>button]:hidden">
        <DialogTitle className="text-lg font-semibold">
          Login to chat
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
          Choose a provider to continue
        </DialogDescription>

        <div className="grid md:grid-cols-2 gap-4 mb-0">
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
          <br />
          <span className="text-muted-foreground">
            For Facebook users, see{' '}
            <Link
              onClick={toggleModal}
              to="/delete-data"
              className="underline hover:text-primary"
            >
              how to delete your data
            </Link>
            .
          </span>
        </p>
      </DialogContent>
    </Dialog>
  );
};

export default CustomModal;
