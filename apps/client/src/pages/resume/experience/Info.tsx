import Breadcrumbs from '@/components/breadcrumbs';
import { formatDateRange } from '@/utils/formatting';
import { DotIcon } from '@phosphor-icons/react';
import * as ScrollArea from '@radix-ui/react-scroll-area';
import { useLoaderData } from '@tanstack/react-router';

export const Info = () => {
  const { data } = useLoaderData({
    from: '/resume/experience/$id',
  });

  if (!data) return null;

  return (
    <section className="flex flex-col animate-fade-up w-full">
      <Breadcrumbs />
      <article className="bg-gray p-6 rounded-md space-y-4">
        <div className="flex items-start justify-between text-primary">
          <h3>{formatDateRange(data.startDate, data.endDate!)}</h3>
          <div>
            <h3>{data.location}</h3>
            {data.isRemote && (
              <span className="text-xs absolute">(Remote)</span>
            )}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <h2 className="text-xl font-bold">{data.company}</h2>
          <h3 className="flex items-center gap-2">
            <DotIcon className="text-secondary size-5" weight="duotone" />
            {data.title}
          </h3>
        </div>
        <div>
          <h4 className="font-semibold mb-2">Key Duties</h4>
          <ul className="space-y-2">
            {data.duties.map((duty, index) => (
              <li key={index} className="flex gap-2 items-center">
                <DotIcon className="text-secondary size-5" weight="duotone" />
                {duty}
              </li>
            ))}
          </ul>
        </div>

        <h4 className="font-semibold mb-2">Technologies</h4>
        <ScrollArea.Root type="auto">
          <ScrollArea.Viewport className="max-h-[6rem]">
            <ul className="flex flex-wrap gap-2 text-xs">
              {data.technologies.map((tech, index) => (
                <li
                  style={{ animationDelay: `${index * 0.1}s` }}
                  key={tech}
                  className="bg-secondary text-background p-2 rounded-md animate-fade-up"
                >
                  {tech}
                </li>
              ))}
            </ul>
          </ScrollArea.Viewport>
          <ScrollArea.Scrollbar
            className="w-4 bg-gray !-right-4"
            orientation="vertical"
          >
            <ScrollArea.Thumb className="bg-secondary rounded-md ml-2" />
          </ScrollArea.Scrollbar>
        </ScrollArea.Root>
        {data.projects?.length > 0 && (
          <div>
            <h4 className="font-semibold mb-2">Projects</h4>
            <ul className="text-secondary">
              {data.projects.map(({ id, title, url }) => (
                <li key={id}>
                  <a
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline hover:text-primary flex gap-2 items-center"
                  >
                    <DotIcon className="size-5" weight="duotone" />
                    {title}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </article>
    </section>
  );
};
