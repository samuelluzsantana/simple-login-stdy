import { createContext, useContext, type ReactNode } from "react";
import {
  getTranslations,
  getLanguageFromPath,
  getLocalizedPath,
  type Language,
  type Translations,
} from "../i18n";

interface LanguageContextType {
  lang: Language;
  t: Translations;
  getPath: (path: string) => string;
  switchLanguage: () => string;
}

const LanguageContext = createContext<LanguageContextType | null>(null);

interface LanguageProviderProps {
  children: ReactNode;
  pathname: string;
}

export function LanguageProvider({ children, pathname }: LanguageProviderProps) {
  const lang = getLanguageFromPath(pathname);
  const t = getTranslations(lang);

  const getPath = (path: string) => getLocalizedPath(path, lang);

  const switchLanguage = () => {
    const newLang: Language = lang === "pt" ? "en" : "pt";
    return getLocalizedPath(pathname, newLang);
  };

  return (
    <LanguageContext.Provider value={{ lang, t, getPath, switchLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
