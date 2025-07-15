import avatarMask from '@/assets/images/avatar-aku.png';
import avatar from '@/assets/images/avatar.png';
import ParticlesBackground from '@/components/particles';
import { ScrollContainer } from '@/components/scroll-container';
import TypedText from '@/components/typed-text';
import { useUISound } from '@/hooks/useUISound';
import { cn } from '@/lib/utils';
import { useStore } from '@/stores';
import { toastDuration } from '@/utils/constants';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';
import { useShallow } from 'zustand/shallow';

export const Home = () => {
  const { discovered, setDiscovered } = useStore(
    useShallow(({ discovered, setDiscovered }) => ({
      discovered,
      setDiscovered,
    }))
  );
  const { play } = useUISound();
  const { t } = useTranslation();

  const handleClick = () => {
    if (discovered) return;

    play('crash');
    setDiscovered();

    toast.success(t('easter.title'), {
      description: t('easter.description'),
      duration: toastDuration,
    });
  };

  return (
    <main className="flex flex-col">
      <ParticlesBackground />
      <ScrollContainer className="flex-1 min-h-0 z-10">
        <section className="firefox-cell h-full">
          <div className="flex flex-col lg:grid lg:grid-cols-2 items-center justify-center lg:place-items-center h-full">
            <article className="space-y-4 sm:space-y-6 order-2 lg:order-1">
              <h1 className="p-0 text-left">
                {t('home.title')}
                <span className="bg-gradient-to-r from-blue-500 to-purple-500 text-transparent [background-clip:text] [-webkit-background-clip:text] [-webkit-text-fill-color:transparent]">
                  Matteo
                </span>{' '}
                👋
              </h1>
              <h2>
                {t('home.subtitle')} <strong>{t('home.subtitle2')}</strong>{' '}
                {t('home.subtitle3')}
              </h2>
              <div className="text-lg sm:text-xxl">
                <TypedText
                  text={[
                    'React, TypeScript, Node.js, Prisma, PostgreSQL.',
                    'Testing, Design Systems, CI/CD, AWS.',
                    'Made with ❤️.',
                  ]}
                />
              </div>
            </article>
            <article
              className="relative z-11 w-[200px] h-[300px] sm:h-[375px] sm:w-[250px] order-1 lg:order-2"
              onClick={handleClick}
            >
              <figure>
                <img
                  loading="lazy"
                  src={avatarMask}
                  alt="Avatar Mask"
                  className={cn(
                    'absolute inset-0 w-full h-full object-contain transition-opacity duration-500',
                    discovered ? 'opacity-100' : 'opacity-0 pointer-events-none'
                  )}
                />
              </figure>
              <figure>
                <img
                  loading="lazy"
                  src={avatar}
                  alt="Avatar"
                  className={cn(
                    'absolute inset-0 w-full h-full object-contain transition-opacity duration-500',
                    discovered ? 'opacity-0 pointer-events-none' : 'opacity-100'
                  )}
                />
              </figure>
              {!discovered && (
                <>
                  <span className="absolute animate-blink w-[26px] h-[26px] sm:w-8 sm:h-8 bg-skin top-[79px] left-[65px] sm:top-[99px] sm:left-[82px]"></span>
                  <span className="absolute animate-blink w-[26px] h-[26px] sm:w-8 sm:h-8 bg-skin top-[79px] left-[121px] sm:top-[99px] sm:left-[151px]"></span>
                </>
              )}
            </article>
          </div>
        </section>
      </ScrollContainer>
    </main>
  );
};
