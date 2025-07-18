import { ScrollContainer } from '@/components/scroll-container';
import { Button } from '@/lib/ui/button';
import { formatDateRange } from '@/utils/formatting';
import { DotIcon } from '@phosphor-icons/react';
import { Link, useLoaderData } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';

export const Experience = () => {
  const { t } = useTranslation();
  const { data } = useLoaderData({
    from: '/resume/experience',
  });

  return (
    <section className="flex flex-col gap-4 md:gap-6 animate-fade-up w-full flex-1 min-h-0">
      <h2>{t('resume.experience.title')}</h2>
      <p>{t('resume.experience.subtitle')}</p>
      <ScrollContainer className="flex-1 min-h-0">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
          {data.map(
            (
              {
                id,
                company,
                startDate,
                endDate,
                title,
                location,
                isRemote,
                slug,
              },
              index
            ) => (
              <article
                key={id}
                style={{ animationDelay: `${index * 0.35}s` }}
                className="flex flex-col bg-gray p-4 rounded-md space-y-2 animate-fade-up border-secondary border"
              >
                <div className="flex items-start justify-between text-primary">
                  <h3>{formatDateRange(startDate, endDate!)}</h3>
                  <div>
                    <h3>{location}</h3>
                    {isRemote && (
                      <span className="text-xs absolute">(Remote)</span>
                    )}
                  </div>
                </div>
                <h4 className="text-foreground/50">{company}</h4>
                <div className="flex items-center justify-between gap-2">
                  <h5 className="flex items-center gap-1">
                    <DotIcon
                      className="text-secondary size-5"
                      weight="duotone"
                    />
                    {title}
                  </h5>
                  <Link to="/resume/experience/$id" params={{ id: slug }}>
                    <Button className="flex items-center gap-1 text-xs border rounded-lg hover:-translate-y-1">
                      Info
                    </Button>
                  </Link>
                </div>
              </article>
            )
          )}
        </div>
      </ScrollContainer>
    </section>
  );
};
