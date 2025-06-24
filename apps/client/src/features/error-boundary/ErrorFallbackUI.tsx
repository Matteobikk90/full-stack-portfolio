import avatar from '@/assets/images/avatar-error.png';
import ParticlesBackground from '@/components/particles';
import Footer from '@/features/footer';
import Header from '@/features/header';
import { Button } from '@/lib/ui/button';
import { Link } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';

export const ErrorFallbackUI = () => {
  const { t } = useTranslation();

  return (
    <>
      <Header />
      <main>
        <ParticlesBackground />
        <section className="flex flex-col-reverse lg:grid grid-cols-1 lg:items-center lg:grid-cols-2 z-10 lg:justify-items-center items-center justify-center h-full relative">
          <article className="space-y-4 sm:space-y-6 text-center">
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
          <article>
            <img
              src={avatar}
              alt="Avatar"
              className="w-[200px] h-[300px] sm:h-[375px] sm:w-[250px]"
            />
          </article>
        </section>
      </main>
      <Footer />
    </>
  );
};
