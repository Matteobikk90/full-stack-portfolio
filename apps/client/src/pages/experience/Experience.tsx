import ResumeSidebar from '@/components/resume-sidebar';
import { formatDateRange } from '@/utils/formatting';
import { mockExperiences } from '@/utils/mockedData';

export const Experience = () => {
  return (
    <main className="grid grid-cols-1 md:grid-cols-[auto_1fr] gap-24 p-4 max-w-6xl mx-auto animate-fade-up">
      <ResumeSidebar />
      <section className="flex flex-col gap-6">
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
    </main>
  );
};
