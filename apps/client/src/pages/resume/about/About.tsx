import { ScrollContainer } from '@/components/scroll-container';
import { Button } from '@/lib/ui/button';
import { handleDownload } from '@/utils/download';
import { aboutInfo } from '@/utils/lists';
import { FilePdfIcon } from '@phosphor-icons/react';
import { Label } from '@radix-ui/react-label';
import { useTranslation } from 'react-i18next';

export const About = () => {
  const { t } = useTranslation();

  return (
    <section className="flex flex-col gap-4 md:gap-6 w-full flex-1 min-h-0">
      <h2>{t('resume.about.title')}</h2>
      <p>{t('resume.about.subtitle')}</p>
      <ScrollContainer className="flex-1 min-h-0">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-2 space-y-3">
          {aboutInfo.map(({ label, value }) => (
            <div
              key={label}
              className="flex justify-between items-center sm:justify-start gap-2"
            >
              <Label className="text-foreground/50">
                {t(`resume.about.${label}`)}:
              </Label>
              <h3 className="font-medium mb-0.5 break-all">{value}</h3>
            </div>
          ))}
        </div>
        <Button
          onClick={handleDownload}
          className="flex items-center gap-2 p-4 rounded-md max-w-max animate-bounce mt-4 ml-0.5"
        >
          {t('cv')}
          <FilePdfIcon className="size-5" weight="duotone" />
        </Button>
      </ScrollContainer>
    </section>
  );
};
