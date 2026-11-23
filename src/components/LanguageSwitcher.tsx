"use client";

import { useLanguage } from "@/i18n/LanguageProvider";
import { LANGS, dictionaries } from "@/i18n/translations";

export function LanguageSwitcher({ className = "" }: { className?: string }) {
  const { lang, setLang, t } = useLanguage();

  return (
    <div
      role="group"
      aria-label={t.langSwitch}
      className={`relative inline-flex shrink-0 rounded-full bg-white p-1 shadow-soft ring-1 ring-ink/10 ${className}`}
    >
      {LANGS.map((code) => {
        const active = code === lang;
        return (
          <button
            key={code}
            type="button"
            lang={code}
            onClick={() => setLang(code)}
            aria-pressed={active}
            aria-label={dictionaries[code].langName}
            className={`min-w-10 rounded-full px-2.5 py-1.5 text-sm font-extrabold transition-colors ${
              active ? "bg-sun text-ink shadow-sm" : "text-ink-soft hover:text-ink"
            }`}
          >
            {dictionaries[code].langShort}
          </button>
        );
      })}
    </div>
  );
}
