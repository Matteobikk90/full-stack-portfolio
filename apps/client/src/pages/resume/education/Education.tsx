import { educationItems } from '@/utils/lists';
import { DotIcon } from '@phosphor-icons/react';

export const Education = () => (
  <section className="flex flex-col gap-6 w-full">
    <h2>My education</h2>
    <p>
      Studied science in high school, then jumped into web dev through a
      bootcamp.
    </p>
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
      {educationItems.map(
        ({ id, year, location, title, institution }, index) => (
          <article
            key={id}
            style={{ animationDelay: `${index * 0.35}s` }}
            className="flex flex-col bg-gray p-4 rounded-md space-y-2 animate-fade-up"
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
  </section>
);
