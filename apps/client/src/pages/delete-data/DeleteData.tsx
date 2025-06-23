import { Link } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';

export const DeleteData = () => {
  const { t } = useTranslation();

  return (
    <main>
      <section className="flex flex-col gap-6 py-8 px-4">
        <h1>{t('delete.title')}</h1>
        <p>
          {t('delete.instructions')}{' '}
          <a
            className="underline text-blue-600"
            href="mailto:matteo.soresini@hotmail.it?subject=Facebook Data Deletion Request"
          >
            matteo.soresini@hotmail.it
          </a>{' '}
          {t('delete.emailSubject')}
          <strong> “Facebook Data Deletion Request”</strong>.
        </p>
        <p>
          {t('delete.alternative')}{' '}
          <Link to="/contact" className="underline text-blue-600">
            {t('contact.title')}
          </Link>{' '}
          {t('delete.finalNote')}
        </p>
      </section>
    </main>
  );
};
