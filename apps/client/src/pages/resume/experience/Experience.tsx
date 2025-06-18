import { ScrollContainer } from '@/components/scroll-container';
import { Button } from '@/lib/ui/button';
import { formatDateRange } from '@/utils/formatting';
import { DotIcon } from '@phosphor-icons/react';
import { Link, useLoaderData } from '@tanstack/react-router';

export const Experience = () => {
  const { data } = useLoaderData({
    from: '/resume/experience',
  });

  return (
    <section className="flex flex-col gap-6 animate-fade-up w-full flex-1 min-h-0">
      <h2>Professional Experience</h2>
      <p>
        From UI to database, I’ve worked across the stack to build fast, modern
        web apps that users enjoy.
      </p>
      <ScrollContainer className="flex-1 min-h-0">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mr-4 md:m-0">
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
