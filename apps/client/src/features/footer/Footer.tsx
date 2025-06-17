import PopUpInfo from '@/components/pop-up-info';
import { Button } from '@/lib/ui/button';
import { currentYear } from '@/utils/constants';
import { actions } from '@/utils/lists';
import { Link } from '@tanstack/react-router';

export const Footer = () => (
  <footer className="w-full container mx-auto p-4 md:py-8 flex flex-col md:flex-row items-center justify-between gap-4">
    <div className="flex flex-wrap items-center gap-4 justify-center md:justify-start">
      {actions.map(
        ({ align, label, className, onClick, href, isLink, icon }) => (
          <PopUpInfo key={label} hoverText={label} align={align}>
            <Button
              variant="outline"
              size="icon"
              asChild={!onClick && !isLink}
              onClick={onClick}
              className={className}
              aria-label={label}
            >
              {isLink ? (
                <Link to={href}>{icon}</Link>
              ) : href ? (
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                >
                  {icon}
                </a>
              ) : (
                icon
              )}
            </Button>
          </PopUpInfo>
        )
      )}
    </div>

    <p className="text-sm text-center md:text-right">
      © {currentYear} Matteo Soresini. All rights reserved.
    </p>
  </footer>
);
