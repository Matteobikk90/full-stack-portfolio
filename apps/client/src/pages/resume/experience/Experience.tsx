import type { ExperienceTypes } from '@/types/experiences.types';
import { formatDateRange } from '@/utils/formatting';
import { DotIcon } from '@phosphor-icons/react';
import * as ScrollArea from '@radix-ui/react-scroll-area';
import { useLoaderData } from '@tanstack/react-router';

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
              ({ id, company, startDate, endDate, title, location }) => (
                <article
                  key={id}
                  className="flex flex-col bg-gray p-6 rounded-md space-y-2"
                >
                  <div className="flex items-center justify-between text-primary text-sm">
                    <h4>{formatDateRange(startDate, endDate!)}</h4>
                    <h4>{location}</h4>
                  </div>
                  <h5>{company}</h5>
                  <h6 className="flex items-center gap-2">
                    <DotIcon
                      className="text-secondary"
                      size={26}
                      weight="duotone"
                    />
                    {title}
                  </h6>
                </article>
              )
            )}
          </div>
        </ScrollArea.Viewport>
        <ScrollArea.Scrollbar
          className="w-4 bg-background"
          orientation="vertical"
        >
          <ScrollArea.Thumb className="bg-secondary rounded-md ml-2 " />
        </ScrollArea.Scrollbar>
      </ScrollArea.Root>
    </section>
  );
};
