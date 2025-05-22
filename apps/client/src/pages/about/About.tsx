import profileImg from '@/assets/images/me.jpeg';
import AccentFrame from '@/components/accent-frame';
import { aboutMeList } from '@/utils/lists';

export const About = () => (
  <main>
    <AccentFrame className="stroke-about animate-fade-up" />
    <h1 className="text-about animate-fade-up">About me</h1>
    <section className="flex flex-col lg:flex-row lg:gap-12 xl:gap-24 max-w-5xl mx-auto mt-4 lg:mt-16 px-4">
      <figure className="animate-rotate-in">
        <img
          src={profileImg}
          alt="Matteo Soresini"
          className="rounded-xl object-contain m-auto lg:w-160 max-h-56 lg:max-h-100"
          loading="lazy"
        />
        <figcaption className="mt-2 text-center text-sm text-foreground">
          <em>Matteo Soresini</em>
        </figcaption>
      </figure>
      <article className="flex flex-col justify-evenly lg:mb-6 gap-3 mt-4 lg:mt-0">
        {aboutMeList.map(({ icon, text }, index) => (
          <div
            key={text}
            style={{ animationDelay: `${index + 1 * 0.25}s` }}
            className="animate-fade-up flex items-center gap-4 p-4 rounded-xl shadow-elevation hover:shadow-md transition-shadow"
          >
            <div className="shrink-0">{icon}</div>
            <p>{text}</p>
          </div>
        ))}
      </article>
    </section>
  </main>
);
