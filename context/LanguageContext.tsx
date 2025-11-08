import React, { createContext, useContext, useState, ReactNode } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { translations } from '../i18n';

type Language = 'en' | 'ko';
type TranslationKey = keyof typeof translations.en;

interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: TranslationKey, params?: { [key: string]: string | number }) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// FIX: Explicitly typed LanguageProvider as a React.FC with children to resolve a JSX type-checking error.
export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useLocalStorage<Language>('ohmycook-language', 'en');

  const t = (key: TranslationKey, params?: { [key: string]: string | number }): string => {
    let text = translations[language][key] || translations['en'][key];
    if (params) {
      Object.keys(params).forEach(paramKey => {
        text = text.replace(`{{${paramKey}}}`, String(params[paramKey]));
      });
    }
    return text;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
