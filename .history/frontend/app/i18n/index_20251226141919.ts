import { pt, type Translations } from "./pt";
import { en } from "./en";

export type Language = "pt" | "en";

export const translations: Record<Language, Translations> = {
  pt,
  en,
};

export function getTranslations(lang: Language): Translations {
  return translations[lang] || translations.pt;
}

export function getLanguageFromPath(pathname: string): Language {
  if (pathname.startsWith("/en")) {
    return "en";
  }
  return "pt";
}

export function getLocalizedPath(path: string, lang: Language): string {
  // Remove any existing language prefix
  const cleanPath = path.replace(/^\/(en|pt)/, "") || "/";
  
  if (lang === "en") {
    return `/en${cleanPath === "/" ? "" : cleanPath}`;
  }
  return cleanPath;
}

export { pt, en };
export type { Translations };
