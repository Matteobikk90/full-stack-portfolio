import en from '@/i18n/en.json';
import it from '@/i18n/it.json';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    it: { translation: it },
  },
  fallbackLng: 'en',
  pluralSeparator: '_',
  supportedLngs: ['en', 'it'],
  interpolation: {
    escapeValue: false,
  },
  react: {
    useSuspense: false,
  },
});

export default i18n;
