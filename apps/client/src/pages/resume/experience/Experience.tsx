import type { ExperienceTypes } from '@/types/experiences.types';
import { formatDateRange } from '@/utils/formatting';
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
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {data.map(({ id, company, startDate, endDate, title }) => (
          <article key={id} className="flex flex-col bg-gray p-6 rounded-md">
            <h4 className="text-primary text-sm">
              {formatDateRange(startDate, endDate!)}
            </h4>
            <h5>{company}</h5>
            <h6>
              <span className="text-secondary">•</span> {title}
            </h6>
          </article>
        ))}
      </div>
    </section>
  );
};
