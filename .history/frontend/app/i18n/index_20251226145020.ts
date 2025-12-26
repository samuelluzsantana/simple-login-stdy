import { pt, type Translations } from "./pt";
import { en } from "./en";

export type Language = "pt" | "en";

// Lista de idiomas suportados (adicione novos idiomas aqui)
export const supportedLanguages: Language[] = ["pt", "en"];

// Idioma padrão quando nenhum prefixo é fornecido
export const defaultLanguage: Language = "pt";

export const translations: Record<Language, Translations> = {
  pt,
  en,
};

/**
 * Verifica se uma string é um idioma válido/suportado
 */
export function isValidLanguage(lang: string): lang is Language {
  return supportedLanguages.includes(lang as Language);
}

export function getTranslations(lang: Language): Translations {
  return translations[lang] || translations[defaultLanguage];
}

export function getLanguageFromPath(pathname: string): Language {
  // Extrai o primeiro segmento do path
  const segments = pathname.split("/").filter(Boolean);
  const firstSegment = segments[0];

  // Verifica se o primeiro segmento é um idioma válido
  if (firstSegment && isValidLanguage(firstSegment)) {
    return firstSegment;
  }

  return defaultLanguage;
}

export function getLocalizedPath(path: string, lang: Language): string {
  // Remove any existing language prefix
  const cleanPath = path.replace(/^\/(en|pt)/, "") || "/";

  if (lang !== defaultLanguage) {
    return `/${lang}${cleanPath === "/" ? "" : cleanPath}`;
  }
  return cleanPath;
}

export { pt, en };
export type { Translations };
