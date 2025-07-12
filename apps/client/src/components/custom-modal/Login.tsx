import PopUpInfo from '@/components/pop-up-info';
import { Button } from '@/lib/ui/button';
import { DialogDescription } from '@/lib/ui/dialog';
import { useStore } from '@/stores';
import { authProviders } from '@/utils/lists';
import { InfoIcon } from '@phosphor-icons/react';
import { Link, useLocation } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';

export const Login = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const pathname = encodeURIComponent(location.pathname);
  const toggleModal = useStore(({ toggleModal }) => toggleModal);

  return (
    <>
      <DialogDescription className="text-sm flex items-center gap-4 justify-between">
        {t('modal.subtitle')}
        <Button variant="ghost" className="p-0">
          <PopUpInfo
            hoverText={t('info_provider')}
            align="left"
            className="gap-2"
            wrapText
          >
            <InfoIcon weight="duotone" className="size-5" />
          </PopUpInfo>
        </Button>
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
          onClick={() => toggleModal(null)}
          to="/terms-of-service"
          className="underline hover:text-primary"
        >
          {t('modal.privacy.two')}
        </Link>{' '}
        {t('modal.privacy.six')}{' '}
        <Link
          onClick={() => toggleModal(null)}
          to="/privacy-policy"
          className="underline hover:text-primary"
        >
          {t('modal.privacy.three')}
        </Link>
        .{/* <br /> */}
        {/* <span className="text-muted-foreground">
            {t('modal.privacy.four')}{' '}
            <Link
              onClick={toggleModal}
              to="/delete-data"
              className="underline hover:text-primary"
            >
              {t('modal.privacy.five')}
            </Link>
          </span> */}
      </p>
    </>
  );
};
