'use client';

import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from 'react';

type Lang = 'en' | 'ar';

interface LanguageContextType {
  lang:       Lang;
  toggleLang: () => void;
  isArabic:   boolean;
}

const LanguageContext = createContext<LanguageContextType>({
  lang:       'en',
  toggleLang: () => {},
  isArabic:   false,
});

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>('en');

  const toggleLang = () => {
    setLang(prev => prev === 'en' ? 'ar' : 'en');
  };

  // Apply dir + lang to <html> and swap font
  useEffect(() => {
    const html = document.documentElement;
    if (lang === 'ar') {
      html.setAttribute('dir',  'rtl');
      html.setAttribute('lang', 'ar');
      html.style.setProperty('--font-active', 'var(--font-arabic)');
    } else {
      html.setAttribute('dir',  'ltr');
      html.setAttribute('lang', 'en');
      html.style.removeProperty('--font-active');
    }
  }, [lang]);

  return (
    <LanguageContext.Provider value={{ lang, toggleLang, isArabic: lang === 'ar' }}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLang = () => useContext(LanguageContext);