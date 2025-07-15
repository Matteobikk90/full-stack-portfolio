import avatar from '@/assets/images/avatar-404.png';
import ParticlesBackground from '@/components/particles';
import { ScrollContainer } from '@/components/scroll-container';
import { Button } from '@/lib/ui/button';
import { Link } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';

export const NotFound = () => {
  const { t } = useTranslation();

  return (
    <main className="flex flex-col">
      <ParticlesBackground />
      <ScrollContainer className="flex-1 min-h-0 z-10">
        <section className="firefox-cell h-full">
          <div className="flex flex-col lg:grid lg:grid-cols-2 items-center justify-center lg:place-items-center h-full">
            <article className="space-y-4 sm:space-y-6 order-2 lg:order-1 p-4">
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
            <article className="order-1 lg:order-2">
              <figure>
                <img
                  loading="lazy"
                  src={avatar}
                  alt="Lost Avatar"
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
