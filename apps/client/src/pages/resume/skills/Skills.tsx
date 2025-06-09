import { skillItems } from '@/utils/lists';
import * as ScrollArea from '@radix-ui/react-scroll-area';

export const Skills = () => (
  <section className="flex flex-col gap-6 animate-fade-up w-full">
    <h2>Tech Stack</h2>
    <p>
      I build fast, responsive UIs with React and Tailwind, handle backend logic
      with Node.js and PostgreSQL, and cover auth, testing, and deployment with
      tools like JWT, Vitest, and AWS.
    </p>
    <ScrollArea.Root type="always">
      <ScrollArea.Viewport className="h-[14rem] lg:h-[22rem]">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 mr-4">
          {skillItems.map(({ id, icon }, index) => (
            <article
              key={id}
              style={{ animationDelay: `${index * 0.35}s` }}
              className="bg-gray p-4 rounded-md flex justify-center animate-fade-up"
            >
              {icon}
            </article>
          ))}
        </div>
      </ScrollArea.Viewport>
      <ScrollArea.Scrollbar
        className="w-4 bg-background"
        orientation="vertical"
      >
        <ScrollArea.Thumb className="bg-secondary rounded-md ml-2 " />
      </ScrollArea.Scrollbar>
    </ScrollArea.Root>
  </section>
);
