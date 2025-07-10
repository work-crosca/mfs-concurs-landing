import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import ro from './translations/ro.json';
import ru from './translations/ru.json';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      ro: { translation: ro },
      ru: { translation: ru }
    },
    lng: 'ro',
    fallbackLng: 'ro',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;