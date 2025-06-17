import avatar from '@/assets/images/avatar.png';
import ParticlesBackground from '@/components/particles';
import TypedText from '@/components/typed-text';

export const Home = () => {
  return (
    <main className="flex flex-col items-center justify-center gap-5 flex-1">
      <ParticlesBackground />
      <section className="flex flex-col-reverse lg:grid grid-cols-1 lg:items-center lg:grid-cols-2">
        <article className="space-y-4 sm:space-y-6">
          <h1 className="p-0 text-left">
            Hello, I’m{' '}
            <span className="bg-gradient-to-r from-blue-500 to-purple-500 text-transparent [background-clip:text] [-webkit-background-clip:text] [-webkit-text-fill-color:transparent]">
              Matteo
            </span>{' '}
            👋
          </h1>
          <h2>
            I build elegant <strong>full-stack</strong> apps.
          </h2>
          <div className="text-lg sm:text-xxl">
            <TypedText
              text={[
                'React, TypeScript, Node.js, Prisma.',
                'Testing, Design Systems, CI/CD.',
                'Made with ❤️ in Italy.',
              ]}
            />
          </div>
        </article>
        <article className="relative m-auto z-11">
          <img src={avatar} alt="Avatar" className="sm:w-[250px] w-[200px]" />
          <span className="absolute animate-blink w-[26px] h-[26px] sm:w-8 sm:h-8 bg-skin top-[79px] left-[65px] sm:top-[99px] sm:left-[82px]"></span>
          <span className="absolute animate-blink w-[26px] h-[26px] sm:w-8 sm:h-8 bg-skin top-[79px] left-[121px] sm:top-[99px] sm:left-[151px]"></span>
        </article>
      </section>
    </main>
  );
};
