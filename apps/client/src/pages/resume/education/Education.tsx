import { educationItems } from '@/utils/lists';
import { DotIcon } from '@phosphor-icons/react';

export const Education = () => (
  <section className="flex flex-col gap-6 animate-fade-up">
    <h2>My education</h2>
    <p>
      Built responsive web applications delivering real-time data and
      projections out to 2030.
    </p>
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mr-4">
      {educationItems.map(({ id, year, location, title, institution }) => (
        <article
          key={id}
          className="flex flex-col bg-gray p-6 rounded-md space-y-2"
        >
          <div className="flex items-center justify-between text-primary text-sm">
            <h3>{year}</h3>
            <h3>{location}</h3>
          </div>
          <div>
            <h4>{title}</h4>
          </div>
          <h6 className="flex items-center gap-2">
            <DotIcon className="text-secondary" size={26} weight="duotone" />
            {institution}
          </h6>
        </article>
      ))}
    </div>
  </section>
);
