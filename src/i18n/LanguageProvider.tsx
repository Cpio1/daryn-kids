"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import type { Lang } from "@/data/site";
import { DEFAULT_LANG, LANG_STORAGE_KEY, LANGS, dictionaries, type Dictionary } from "./translations";

type LanguageContextValue = {
  lang: Lang;
  t: Dictionary;
  setLang: (lang: Lang) => void;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

function readStoredLang(): Lang | null {
  try {
    const value = window.localStorage.getItem(LANG_STORAGE_KEY);
    return value && (LANGS as string[]).includes(value) ? (value as Lang) : null;
  } catch {
    return null;
  }
}

/**
 * Язык выбирает только пользователь. Никакого определения по браузеру
 * или геолокации: по умолчанию казахский, затем — сохранённый выбор.
 */
export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>(DEFAULT_LANG);

  useEffect(() => {
    const stored = readStoredLang();
    if (stored && stored !== DEFAULT_LANG) setLangState(stored);
    // Снимаем скрытие, выставленное скриптом в <head>, когда язык применён.
    requestAnimationFrame(() => document.documentElement.classList.remove("lang-pending"));
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const setLang = useCallback((next: Lang) => {
    setLangState(next);
    try {
      window.localStorage.setItem(LANG_STORAGE_KEY, next);
    } catch {
      /* localStorage недоступен — язык действует до перезагрузки */
    }
  }, []);

  const value = useMemo(() => ({ lang, t: dictionaries[lang], setLang }), [lang, setLang]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used inside LanguageProvider");
  return ctx;
}

/** Скрипт для <head>: прячет страницу, пока не применён сохранённый не-казахский язык. */
export const langBootScript = `(function(){try{var d=document.documentElement;d.classList.add('js');var l=localStorage.getItem('${LANG_STORAGE_KEY}');if(l&&l!=='${DEFAULT_LANG}'&&(${JSON.stringify(LANGS)}).indexOf(l)>-1){d.classList.add('lang-pending');d.lang=l;setTimeout(function(){d.classList.remove('lang-pending')},1500);}}catch(e){document.documentElement.classList.add('js');}})();`;
