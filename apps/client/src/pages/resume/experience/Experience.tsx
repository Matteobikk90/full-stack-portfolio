import { Button } from '@/lib/ui/button';
import type { ExperienceTypes } from '@/types/experiences.types';
import { formatDateRange } from '@/utils/formatting';
import { DotIcon } from '@phosphor-icons/react';
import * as ScrollArea from '@radix-ui/react-scroll-area';
import { Link, useLoaderData } from '@tanstack/react-router';

export const Experience = () => {
  const data: ExperienceTypes[] = useLoaderData({ from: '/resume/experience' });

  return (
    <section className="flex flex-col gap-6 animate-fade-up">
      <h2>My experience</h2>
      <p>
        Built responsive web applications delivering real-time data and
        projections out to 2030.
      </p>

      <ScrollArea.Root type="always">
        <ScrollArea.Viewport className="h-[19rem]">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mr-4">
            {data.map(
              (
                { id, company, startDate, endDate, title, location, isRemote },
                index
              ) => (
                <article
                  key={id}
                  style={{ animationDelay: `${index * 0.35}s` }}
                  className="flex flex-col bg-gray p-4 rounded-md space-y-2 animate-fade-up"
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
                    <Link to="/resume/experience/$id" params={{ id }}>
                      <Button className="flex items-center gap-1 text-xs border animate-pulse-slow">
                        Info
                      </Button>
                    </Link>
                  </div>
                </article>
              )
            )}
          </div>
        </ScrollArea.Viewport>
        <ScrollArea.Scrollbar
          className="w-4 bg-background"
          orientation="vertical"
        >
          <ScrollArea.Thumb className="bg-secondary rounded-md ml-2" />
        </ScrollArea.Scrollbar>
      </ScrollArea.Root>
    </section>
  );
};
