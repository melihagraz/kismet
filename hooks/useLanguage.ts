import { useState, useEffect, useCallback } from 'react';
import { storage } from '../services/storage';
import i18n from '../i18n';

export type Lang = 'tr' | 'en';

export function useLanguage() {
  const [lang, setLangState] = useState<Lang>(i18n.locale as Lang);

  useEffect(() => {
    loadLanguage();
  }, []);

  const loadLanguage = async () => {
    const saved = await storage.getLanguage();
    if (saved) {
      i18n.locale = saved;
      setLangState(saved);
    }
  };

  const setLang = useCallback(async (l: Lang) => {
    i18n.locale = l;
    setLangState(l);
    await storage.setLanguage(l);
  }, []);

  const t = useCallback((key: string) => {
    return i18n.t(key);
  }, [lang]);

  return { lang, setLang, t };
}
