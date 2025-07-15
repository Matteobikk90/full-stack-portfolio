import avatar from '@/assets/images/avatar-error.png';
import ParticlesBackground from '@/components/particles';
import { ScrollContainer } from '@/components/scroll-container';
import { Button } from '@/lib/ui/button';
import { Link } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';

export const ErrorFallbackUI = () => {
  const { t } = useTranslation();

  return (
    <main className="flex flex-col">
      <ParticlesBackground />
      <ScrollContainer className="flex-1 min-h-0 z-10">
        <section className="firefox-cell h-full">
          <div className="text-center flex flex-col lg:grid lg:grid-cols-2 items-center justify-center lg:place-items-center h-full">
            <article className="space-y-4 sm:space-y-6 order-2 lg:order-1 p-4">
              <h1 className="lg:text-left">{t('error.title')}</h1>
              <p>
                {t('error.working')}{' '}
                <span className="text-foreground text-3xl lg:text-5xl">
                  {t('error.emoji')}
                </span>
                <br />
                {t('error.message')}
              </p>
              <p>
                {t('error.suggestion')}
                <Link to="/contact" className="text-blue-500">
                  {t('error.contact_me')}
                </Link>
              </p>
              <Link to="/">
                <Button aria-label="Reload" className="max-w-fit">
                  {t('error.button')}
                </Button>
              </Link>
            </article>
            <article className="order-1 lg:order-2">
              <figure>
                <img
                  loading="lazy"
                  src={avatar}
                  alt="Avatar"
                  className="w-[200px] sm:w-[250px]"
                />
              </figure>
            </article>
          </div>
        </section>
      </ScrollContainer>
    </main>
  );
};
