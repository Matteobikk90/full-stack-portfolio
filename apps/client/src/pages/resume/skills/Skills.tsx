import { ScrollContainer } from '@/components/scroll-container';
import { skillItems } from '@/utils/lists';

export const Skills = () => (
  <section className="flex flex-col gap-4 md:gap-6 animate-fade-up w-full flex-1 min-h-0">
    <h2>Tech Stack</h2>
    <p>
      I build fast, responsive UIs with React and Tailwind, handle backend logic
      with Node.js and PostgreSQL, and cover auth, testing, and deployment with
      tools like JWT, Vitest, and AWS.
    </p>
    <ScrollContainer className="flex-1 min-h-0">
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
        {skillItems.map(({ id, icon }, index) => (
          <article
            key={id}
            style={{ animationDelay: `${index * 0.35}s` }}
            className="bg-gray p-4 rounded-md flex justify-center animate-fade-up border border-secondary"
          >
            {icon}
          </article>
        ))}
      </div>
    </ScrollContainer>
  </section>
);
