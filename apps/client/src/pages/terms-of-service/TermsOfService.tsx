import { ScrollContainer } from '@/components/scroll-container';
import { Link } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';

export const TermsOfService = () => {
  const { t } = useTranslation();

  return (
    <main className="flex flex-col gap-6 px-4">
      <h1>{t('terms.title')}</h1>
      <p>{t('terms.intro')}</p>

      <section className="flex flex-col flex-1 min-h-0">
        <ScrollContainer className="flex-1 min-h-0">
          <article className="flex flex-col gap-4">
            <h2 className="text-xl font-semibold">
              {t('terms.section1.title')}
            </h2>
            <p>{t('terms.section1.content')}</p>

            <h2 className="text-xl font-semibold">
              {t('terms.section2.title')}
            </h2>
            <p>{t('terms.section2.content1')}</p>
            <p>
              {t('terms.section2.content2')}{' '}
              <Link to="/privacy-policy" className="underline text-blue-600">
                {t('terms.privacyLink')}
              </Link>
              .
            </p>

            <h2 className="text-xl font-semibold">
              {t('terms.section3.title')}
            </h2>
            <p>{t('terms.section3.content')}</p>

            <h2 className="text-xl font-semibold">
              {t('terms.section4.title')}
            </h2>
            <p>{t('terms.section4.content')}</p>

            <h2 className="text-xl font-semibold">
              {t('terms.section5.title')}
            </h2>
            <p>{t('terms.section5.content')} </p>

            <p className="text-sm">
              {t('terms.effective')}:&nbsp;
              {new Date().toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </p>
          </article>
        </ScrollContainer>
      </section>
    </main>
  );
};
