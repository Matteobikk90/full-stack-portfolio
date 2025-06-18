import Breadcrumbs from '@/components/breadcrumbs';
import { ScrollContainer } from '@/components/scroll-container';
import { formatDateRange } from '@/utils/formatting';
import { DotIcon } from '@phosphor-icons/react';
import { useLoaderData } from '@tanstack/react-router';

export const Info = () => {
  const { data } = useLoaderData({
    from: '/resume/experience/$id',
  });

  if (!data) return null;

  return (
    <section className="flex flex-col animate-fade-up w-full flex-1 min-h-0">
      <Breadcrumbs />
      <article className="flex flex-col bg-gray p-4 sm:p-6 rounded-md flex-1 min-h-0 max-h-max border border-secondary">
        <ScrollContainer className="flex-1 min-h-0 pr-4">
          <div className="space-y-4">
            <div className="flex items-start justify-between text-primary mb-0 text-xs md:text-sm lg:text-base">
              <span>{formatDateRange(data.startDate, data.endDate!)}</span>
              <div className="flex flex-col">
                <span>{data.location}</span>
                {data.isRemote && <span className="text-xs">(Remote)</span>}
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
                    <DotIcon
                      className="text-secondary size-5"
                      weight="duotone"
                    />
                    {duty}
                  </li>
                ))}
              </ul>
            </div>
            <h4 className="font-semibold mb-2">Technologies</h4>
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
            {data.projects?.length > 0 && (
              <>
                <h4 className="font-semibold mb-2">Projects</h4>
                <ul className="text-secondary flex flex-wrap gap-4">
                  {data.projects.map(({ id, title, url }) => (
                    <li key={id}>
                      <a
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline hover:text-primary flex gap-1 items-center"
                      >
                        <DotIcon className="size-5" weight="duotone" />
                        {title}
                      </a>
                    </li>
                  ))}
                </ul>
              </>
            )}
          </div>
        </ScrollContainer>
      </article>
    </section>
  );
};
