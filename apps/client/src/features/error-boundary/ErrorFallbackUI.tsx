import avatar from '@/assets/images/avatar.png';
import ParticlesBackground from '@/components/particles';
import { Button } from '@/lib/ui/button';
import { Link } from '@tanstack/react-router';

export const ErrorFallbackUI = () => (
  <main>
    <ParticlesBackground />
    <section className="flex flex-col-reverse lg:grid grid-cols-1 lg:items-center lg:grid-cols-2 z-10 lg:justify-items-center items-center justify-center h-full relative">
      <article className="space-y-4 sm:space-y-6 text-center">
        <h1 className="lg:text-left">Oh no, something went wrong</h1>
        <p className="text-blue-0/40">
          Our developers <span className="text-3xl lg:text-5xl">🧑‍💻🧑‍💻🧑‍💻</span>{' '}
          <br />
          are working hard to solve this problem.
        </p>
        <p className="text-blue-0/40 text-heading-sm">
          If the issue continues, please{' '}
          <Link to="/contact" className="text-blue-500">
            get in touch
          </Link>
        </p>
        <Link to="/">
          <Button aria-label="Reload" className="max-w-fit">
            Go to homepage
          </Button>
        </Link>
      </article>
      <article>
        <img
          src={avatar}
          alt="Avatar"
          className="w-[200px] h-[300px] sm:h-[375px] sm:w-[250px]"
        />
      </article>
    </section>
  </main>
);
