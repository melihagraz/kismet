import { getLocales } from 'expo-localization';
import { I18n } from 'i18n-js';
import tr from './tr';
import en from './en';

const i18n = new I18n({ tr, en });

const deviceLang = getLocales()[0]?.languageCode ?? 'en';
i18n.locale = deviceLang === 'tr' ? 'tr' : 'en';
i18n.enableFallback = true;
i18n.defaultLocale = 'en';

export default i18n;
export type LangKey = 'tr' | 'en';
