import Form from '@/components/form';
import { ScrollContainer } from '@/components/scroll-container';
import { useTranslation } from 'react-i18next';

export const Contact = () => {
  const { t } = useTranslation();

  return (
    <main className="flex flex-col">
      <section className="flex flex-col flex-1 min-h-0 max-w-3xl mx-auto space-y-8">
        <h1 className="text-contact">{t('contact.title')}</h1>
        <p>{t('contact.subtitle')}</p>
        <ScrollContainer
          className="flex-1 min-h-0"
          backgroundColor="bg-contact"
        >
          <Form />
        </ScrollContainer>
      </section>
    </main>
  );
};
