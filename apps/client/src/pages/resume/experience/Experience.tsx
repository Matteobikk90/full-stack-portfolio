import { formatDateRange } from '@/utils/formatting';
import { mockExperiences } from '@/utils/mockedData';

export const Experience = () => {
  return (
    <section className="flex flex-col gap-6 animate-fade-up">
      <h2>My experience</h2>
      <p>
        Built responsive web applications delivering real-time data and
        projections out to 2030.
      </p>
      <div className="grid grid-cols-2 gap-6">
        {mockExperiences.map(({ company, startDate, endDate, title }) => (
          <article className="flex flex-col bg-gray p-6 rounded-md">
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
