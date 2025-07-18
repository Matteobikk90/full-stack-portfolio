import { ScrollContainer } from '@/components/scroll-container';
import { educationItems } from '@/utils/lists';
import { DotIcon } from '@phosphor-icons/react';
import { useTranslation } from 'react-i18next';

export const Education = () => {
  const { t } = useTranslation();

  return (
    <section className="flex flex-col gap-4 md:gap-6 w-full flex-1 min-h-0">
      <h2>{t('resume.education.title')}</h2>
      <p>{t('resume.education.subtitle')}</p>
      <ScrollContainer className="flex-1 min-h-0">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
          {educationItems.map(
            ({ id, year, location, title, institution }, index) => (
              <article
                key={id}
                style={{ animationDelay: `${index * 0.35}s` }}
                className="flex flex-col bg-gray p-4 rounded-md space-y-2 animate-fade-up border border-secondary"
              >
                <div className="flex items-center justify-between text-primary">
                  <h3>{year}</h3>
                  <h3>{location}</h3>
                </div>
                <h4 className="text-foreground/50">{title}</h4>
                <h5 className="flex items-center gap-2">
                  <DotIcon className="text-secondary size-5" weight="duotone" />
                  {institution}
                </h5>
              </article>
            )
          )}
        </div>
      </ScrollContainer>
    </section>
  );
};
