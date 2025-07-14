import { ScrollContainer } from '@/components/scroll-container';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/lib/ui/accordion';
import { cn } from '@/lib/utils';
import type { FilterKey } from '@/types/filters.types';
import { categoryColorClasses } from '@/utils/filters';
import { formatDateRange } from '@/utils/formatting';
import { DotIcon, HandPointingIcon } from '@phosphor-icons/react';
import { Link, useLoaderData, useSearch } from '@tanstack/react-router';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

export const Search = () => {
  const {
    data: { experiences, projects },
  } = useLoaderData({ from: '/search/' });
  const filters = useSearch({ from: '/search/' });
  const { t } = useTranslation();

  const results = useMemo(
    () => experiences.length + projects.length,
    [experiences.length, projects.length]
  );

  return (
    <main className="flex flex-col p-4">
      <section className="flex flex-col flex-1 min-h-0 space-y-6 md:space-y-10">
        <h1>
          {results > 0
            ? t('search.found_result', { count: results })
            : t('search.no_results')}
        </h1>

        {Object.values(filters).some((vals) => vals?.length) && (
          <div className="flex justify-center gap-2 items-center">
            <p>
              {results > 0
                ? t('search.based_on_filters')
                : t('search.no_results_subtitle')}
              :
            </p>
            {Object.entries(filters).flatMap(([key, vals]) =>
              vals.map((val) => (
                <span
                  key={`${key}-${val}`}
                  className={cn(
                    'rounded-md hover:opacity-80 py-1 px-2',
                    categoryColorClasses[key as FilterKey]
                  )}
                >
                  {val}
                </span>
              ))
            )}
          </div>
        )}

        {results > 0 && (
          <span className="flex items-center gap-2 mx-auto">
            <HandPointingIcon
              aria-label="View"
              role="img"
              className="size-5"
              weight="duotone"
            />
            <sup>
              <sup>* </sup>
              {t('search.click_for_more')}
            </sup>
          </span>
        )}

        <ScrollContainer
          className="flex-1 min-h-0"
          backgroundColor="bg-foreground"
        >
          <Accordion
            defaultValue={['experience', 'work']}
            type="multiple"
            className="w-full grid xl:grid-cols-2 gap-8 md:gap-20"
          >
            {!!experiences.length && (
              <AccordionItem value="experience" className="border-0 rounded-md">
                <AccordionTrigger className="px-4 text-resume border-b overflow-hidden rounded-none flex items-center">
                  <h2>{t('resume.menu.experience')}</h2>
                </AccordionTrigger>
                <AccordionContent className="p-0">
                  <ul>
                    {experiences.map(
                      ({
                        id,
                        company,
                        title,
                        location,
                        slug,
                        isRemote,
                        startDate,
                        endDate,
                      }) => (
                        <li
                          key={id}
                          className="flex items-center group hover:bg-gray gap-4"
                        >
                          <Link
                            to="/resume/experience/$id"
                            params={{ id: slug }}
                            className="w-full h-full space-y-2 py-4 md:px-4"
                          >
                            <span className="flex items-center gap-2 text-resume">
                              <DotIcon
                                className="text-secondary size-5"
                                weight="duotone"
                              />
                              <strong className="text-resume">{title}</strong> /
                              <strong>
                                {formatDateRange(startDate, endDate!)}
                              </strong>
                              <HandPointingIcon
                                aria-label="View"
                                role="img"
                                className="ml-auto text-secondary size-5 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity duration-200"
                                weight="duotone"
                              />
                            </span>
                            <em>
                              {company} – {location}
                              {isRemote && (
                                <span className="text-xs"> (Remote)</span>
                              )}
                            </em>
                          </Link>
                        </li>
                      )
                    )}
                  </ul>
                </AccordionContent>
              </AccordionItem>
            )}

            {!!projects.length && (
              <AccordionItem value="work" className="border-0 rounded-md">
                <AccordionTrigger className="px-4 text-work border-b overflow-hidden rounded-none flex items-center">
                  <h2>{t('work.title')}</h2>
                </AccordionTrigger>
                <AccordionContent>
                  <ul>
                    {projects.map(({ id, title, slug }) => (
                      <li
                        key={id}
                        className="flex items-center group hover:bg-gray"
                      >
                        <Link
                          to="/work/$slug"
                          params={{ slug }}
                          className="w-full h-full space-y-2 py-4 md:px-4"
                        >
                          <span className="flex items-center gap-2">
                            <DotIcon
                              className="text-work size-5"
                              weight="duotone"
                            />
                            <strong className="text-work">{title}</strong>
                            <HandPointingIcon
                              aria-label="View"
                              role="img"
                              className="text-work size-5 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity duration-200 ml-auto"
                              weight="duotone"
                            />
                          </span>
                          <em>{t(`work.${slug}.description`)}</em>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </AccordionContent>
              </AccordionItem>
            )}
          </Accordion>
        </ScrollContainer>
      </section>
    </main>
  );
};
