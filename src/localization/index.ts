import RNRestart from 'react-native-restart';
import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import {I18nManager} from 'react-native';
import en from './languages/en.json';
import ar from './languages/ar.json';
import AsyncStorage from '@react-native-async-storage/async-storage';
// the translations
// (tip move them in a JSON file and import them)
const resources = {
  ar,
  en,
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: I18nManager.isRTL ? 'ar' : 'en',
    fallbackLng: 'en',
    //  saveMissing: true,

    keySeparator: false, // we do not use keys in form messages.welcome

    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  });

i18n.on('languageChanged', async (lng) => {
  await AsyncStorage.setItem('@CACHED_LANG', lng);

  if (lng === 'ar') {
    if (!I18nManager.isRTL) {
      I18nManager.forceRTL(true);
      RNRestart.Restart();
    }
  } else {
    if (I18nManager.isRTL) {
      I18nManager.forceRTL(false);
      RNRestart.Restart();
    }
  }
  // RNRestart.Restart();
});
export default i18n;
