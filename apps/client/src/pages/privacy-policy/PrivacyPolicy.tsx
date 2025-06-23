import { ScrollContainer } from '@/components/scroll-container';
import { Link } from '@tanstack/react-router';
import { t } from 'i18next';

export const PrivacyPolicy = () => (
  <main className="flex flex-col gap-6 py-8 px-4">
    <h1>{t('privacy.title')}</h1>
    <p>{t('privacy.intro')}</p>

    <section className="flex flex-col flex-1 min-h-0">
      <ScrollContainer className="flex-1 min-h-0">
        <article className="flex flex-col gap-4">
          <h2 className="text-xl font-semibold">
            {t('privacy.section1.title')}
          </h2>
          <p>{t('privacy.section1.description')}</p>
          <ul className="list-disc list-inside">
            <li>{t('privacy.section1.list.0')}</li>
            <li>{t('privacy.section1.list.1')}</li>
            <li>{t('privacy.section1.list.2')}</li>
          </ul>

          <h2 className="text-xl font-semibold">
            {t('privacy.section2.title')}
          </h2>
          <p>{t('privacy.section2.description')}</p>
          <ul className="list-disc list-inside">
            <li>{t('privacy.section2.list.0')}</li>
            <li>{t('privacy.section2.list.1')}</li>
            <li>{t('privacy.section2.list.2')}</li>
          </ul>
          <p>{t('privacy.section2.disclaimer')}</p>

          <h2 className="text-xl font-semibold">
            {t('privacy.section3.title')}
          </h2>
          <p>{t('privacy.section3.description')}</p>

          <h2 className="text-xl font-semibold">
            {t('privacy.section4.title')}
          </h2>
          <p>{t('privacy.section4.description')}</p>

          <h2 className="text-xl font-semibold">
            {t('privacy.section5.title')}
          </h2>
          <p>{t('privacy.section5.description')}</p>

          <h2 className="text-xl font-semibold">
            {t('privacy.section6.title')}
          </h2>
          <p>
            {t('privacy.section6.description')}{' '}
            <Link to="/delete-data" className="underline text-blue-600">
              {t('privacy.section6.link')}
            </Link>{' '}
            {t('privacy.section6.afterLink')}
          </p>

          <p className="text-sm">
            {t('privacy.effectiveDate')}:&nbsp;
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
