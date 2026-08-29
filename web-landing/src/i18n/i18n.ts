import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import en from './en.json';
import fr from './fr.json';
import ar from './ar.json';

const resources = {
  en: { translation: en },
  fr: { translation: fr },
  ar: { translation: ar },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    debug: false,
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
    },
  });

// Helper function to update document direction and language
export const updateDocumentDirection = (lang: string) => {
  const dir = lang === 'ar' ? 'rtl' : 'ltr';
  document.documentElement.lang = lang;
  document.documentElement.dir = dir;
  
  // Update font family for Arabic
  if (lang === 'ar') {
    document.body.style.fontFamily = "'Noto Sans Arabic', 'Tahoma', sans-serif";
  } else {
    document.body.style.fontFamily = "'Inter', system-ui, sans-serif";
  }
};

// Initialize direction on load
updateDocumentDirection(i18n.language || 'en');

// Listen for language changes
i18n.on('languageChanged', (lang) => {
  updateDocumentDirection(lang);
});

export default i18n;
