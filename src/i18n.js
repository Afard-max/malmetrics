import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import translationES from './locales/es/translation.json';
import translationEN from './locales/en/translation.json';
import translationJA from './locales/ja/translation.json';
import translationPT from './locales/pt/translation.json';
import translationZH from './locales/zh/translation.json';

const resources = {
  es: { translation: translationES },
  en: { translation: translationEN },
  ja: { translation: translationJA },
  pt: { translation: translationPT },
  zh: { translation: translationZH }
};

const savedLanguage = localStorage.getItem('mal_dashboard_lang') || 'es';

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: savedLanguage,
    fallbackLng: 'es',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;