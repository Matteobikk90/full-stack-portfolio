import avatar from '@/assets/images/avatar-404.png';
import ParticlesBackground from '@/components/particles';
import { useTheme } from '@/hooks/useTheme';
import { Button } from '@/lib/ui/button';
import { Link } from '@tanstack/react-router';
import AnimatedCursor from 'react-animated-cursor';
import { useTranslation } from 'react-i18next';

export const NotFound = () => {
  const { t } = useTranslation();
  useTheme();

  return (
    <>
      <AnimatedCursor
        innerSize={6}
        outerSize={30}
        innerScale={0}
        outerScale={0}
        outerAlpha={0}
        outerStyle={{
          border: '2px solid var(--foreground)',
        }}
        innerStyle={{
          backgroundColor: 'var(--foreground)',
        }}
        trailingSpeed={7}
      />
      <main>
        <ParticlesBackground />
        <section className="flex flex-col-reverse lg:grid grid-cols-1 lg:items-center lg:grid-cols-2 z-10 lg:justify-items-center items-center justify-center h-full relative">
          <article className="space-y-4 sm:space-y-6">
            <h1>{t('not_found.title')}</h1>
            <p>
              {t('not_found.description')}
              <br />
              {t('not_found.suggestion')}
            </p>
            <p>
              {t('not_found.contact')}
              <Link to="/contact" className="text-blue-500">
                {t('not_found.contact_me')}
              </Link>
            </p>
            <Link className="flex justify-center" to="/">
              <Button aria-label="Reload">{t('not_found.button')}</Button>
            </Link>
          </article>
          <article>
            <img
              src={avatar}
              alt="Lost Avatar"
              className="w-[200px] sm:w-[250px]"
            />
          </article>
        </section>
      </main>
    </>
  );
};
