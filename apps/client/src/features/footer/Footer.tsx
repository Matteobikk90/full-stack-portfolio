import PopUpInfo from '@/components/pop-up-info';
import { Button } from '@/lib/ui/button';
import { currentYear } from '@/utils/constants';
import { handleDownload } from '@/utils/download';
import {
  FilePdfIcon,
  GithubLogoIcon,
  LinkedinLogoIcon,
  PaperPlaneTiltIcon, // for "Hire Me"
} from '@phosphor-icons/react';
import { Link } from '@tanstack/react-router';

export const Footer = () => (
  <footer className="w-full container mx-auto p-4 md:py-8 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
    <div className="flex flex-wrap items-center gap-4 justify-center md:justify-start">
      <PopUpInfo hoverText="GitHub" align="right">
        <Button variant="outline" size="icon" asChild>
          <a
            href="https://github.com/Matteobikk90"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
          >
            <GithubLogoIcon className="size-5" weight="duotone" />
          </a>
        </Button>
      </PopUpInfo>
      <PopUpInfo hoverText="LinkedIn">
        <Button variant="outline" size="icon" asChild>
          <a
            href="https://www.linkedin.com/in/matteosoresini90/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
          >
            <LinkedinLogoIcon className="size-5" weight="duotone" />
          </a>
        </Button>
      </PopUpInfo>
      <PopUpInfo hoverText="Download CV">
        <Button
          variant="outline"
          size="icon"
          onClick={handleDownload}
          aria-label="Download CV"
        >
          <FilePdfIcon className="size-5" weight="duotone" />
        </Button>
      </PopUpInfo>

      <PopUpInfo hoverText="Hire Me">
        <Button
          variant="outline"
          size="icon"
          asChild
          className="animate-bounce"
          aria-label="Contact"
        >
          <Link to="/contact">
            <PaperPlaneTiltIcon className="size-5" weight="duotone" />
          </Link>
        </Button>
      </PopUpInfo>
    </div>

    <p className="text-sm text-center md:text-right">
      © {currentYear} Matteo Soresini. All rights reserved.
    </p>
  </footer>
);
