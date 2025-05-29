import { formatDateRange } from '@/utils/formatting';
import { mockExperiences } from '@/utils/mockedData';

export const Experience = () => {
  return (
    <section className="flex flex-col gap-6 animate-fade-up">
      <h2>My experience</h2>
      <h3>tcfghvjbkngfchvjbnkm</h3>
      <div className="grid grid-cols-2 gap-6">
        {mockExperiences.map(({ company, startDate, endDate, title }) => (
          <article className="flex flex-col bg-foreground/80 p-6 rounded-md">
            <h4 className="text-resume">
              {formatDateRange(startDate, endDate!)}
            </h4>
            <h4>{company}</h4>
            <h4>
              <span className="text-resume">•</span> {title}
            </h4>
          </article>
        ))}
      </div>
    </section>
  );
};
