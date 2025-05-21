import profileImg from '@/assets/images/me.jpeg';
import { aboutMeList } from '@/utils/lists';

export const About = () => (
  <main className="h-screen p-4 max-w-5xl m-auto space-y-12">
    <h1 className="text-about">About me</h1>
    <section className="flex gap-24">
      <figure className="animate-rotate-in">
        <img
          src={profileImg}
          alt="Matteo Soresini"
          className="rounded-xl object-cover w-160 max-h-100 shadow-elevation"
          loading="lazy"
        />
        <figcaption className="mt-2 text-center text-sm text-foreground">
          <em>Matteo Soresini</em>
        </figcaption>
      </figure>
      <article className="flex flex-col justify-evenly mb-6">
        {aboutMeList.map(({ icon, text }, index) => (
          <div
            key={text}
            style={{ animationDelay: `${index + 1 * 0.25}s` }}
            className="animate-fade-up flex items-center gap-4 p-4 rounded-xl shadow-elevation hover:shadow-md transition-shadow"
          >
            <div className="shrink-0">{icon}</div>
            <p className="text-foreground">{text}</p>
          </div>
        ))}
      </article>
    </section>
  </main>
);
