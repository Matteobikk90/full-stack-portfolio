import ParticlesBackground from '@/components/particles';
import TypedText from '@/components/typed-text';

export const Home = () => {
  return (
    <main className="flex flex-col items-center justify-center gap-5">
      <ParticlesBackground />
      <h1 className="p-0 text-foreground">
        Hello, I’m{' '}
        <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
          Matteo
        </span>{' '}
        👋
      </h1>
      <h2>
        I build elegant <strong>full-stack</strong> apps.
      </h2>
      <div className="text-lg sm:text-xxl text-foreground">
        <TypedText
          text={[
            'React, TypeScript, Node.js, Prisma.',
            'Testing, Design Systems, CI/CD.',
            'Made with ❤️ in Italy.',
          ]}
        />
      </div>
    </main>
  );
};
