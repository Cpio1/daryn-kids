"use client";

import { useEffect, useState } from "react";
import { Menu, X, Send } from "lucide-react";
import { Logo } from "./Logo";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { WhatsAppIcon, InstagramIcon } from "./BrandIcons";
import { useLanguage } from "@/i18n/LanguageProvider";
import type { SectionId } from "@/i18n/translations";
import { handleAnchorClick } from "@/lib/scroll";
import { site, whatsappLink } from "@/data/site";

const NAV: Exclude<SectionId, "home">[] = [
  "about",
  "groups",
  "activities",
  "nutrition",
  "gallery",
  "documents",
  "contacts",
];

const ALL_SECTIONS: SectionId[] = ["home", ...NAV];

const MENU_COLORS = ["bg-sky-soft", "bg-peach-soft", "bg-mint-soft", "bg-sun-soft", "bg-lilac-soft", "bg-sky-soft", "bg-peach-soft"];

function useActiveSection() {
  const [active, setActive] = useState<SectionId>("home");

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const headerH = parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--header-h")) || 70;
      const line = headerH + window.innerHeight * 0.25;
      let current: SectionId = "home";
      for (const id of ALL_SECTIONS) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= line) current = id;
      }
      // В самом низу страницы подсвечиваем последний раздел
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4) current = "contacts";
      setActive(current);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return active;
}

export function Header() {
  const { t, lang } = useLanguage();
  const active = useActiveSection();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Блокировка прокрутки и закрытие по Escape для мобильного меню
  useEffect(() => {
    if (!open) return;
    const prev = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    const onResize = () => window.innerWidth >= 1024 && setOpen(false);
    window.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    return () => {
      document.documentElement.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
    };
  }, [open]);

  const close = () => setOpen(false);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 h-[var(--header-h)] transition-[background-color,box-shadow] duration-300 ${
        scrolled || open ? "bg-cream/95 shadow-[0_6px_24px_-14px_rgb(37_50_74/0.35)] backdrop-blur-md" : "bg-cream/70 backdrop-blur-sm"
      }`}
    >
      <a
        href="#main"
        className="absolute left-4 top-2 z-[60] -translate-y-24 rounded-full bg-ink px-4 py-2 text-sm font-bold text-white focus:translate-y-0"
      >
        {t.skipToContent}
      </a>
      <div className="mx-auto flex h-full max-w-[1320px] items-center justify-between gap-3 px-4 sm:px-6 lg:px-8">
        <a
          href="#home"
          onClick={(e) => handleAnchorClick(e, "home", close)}
          aria-label={t.homeLink}
          className="flex shrink-0 items-center gap-2 rounded-2xl"
        >
          <Logo markClassName="h-10 w-10 lg:h-11 lg:w-11" />
          <span className="hidden text-[11px] font-bold leading-tight text-ink-soft xl:block xl:max-w-[9.5rem]">
            {t.kindergartenFull}
          </span>
        </a>

        {/* Desktop navigation */}
        <nav aria-label={t.menuTitle} className="hidden lg:block">
          <ul className="flex items-center gap-0.5 xl:gap-1">
            {NAV.map((id) => {
              const isActive = active === id;
              return (
                <li key={id}>
                  <a
                    href={`#${id}`}
                    onClick={(e) => handleAnchorClick(e, id)}
                    aria-current={isActive ? "true" : undefined}
                    className={`relative block rounded-full px-2.5 py-2 text-[14px] font-bold transition-colors xl:px-3.5 xl:text-[15px] ${
                      isActive ? "bg-white text-ink shadow-soft" : "text-ink-soft hover:bg-white/70 hover:text-ink"
                    }`}
                  >
                    {t.nav[id]}
                    {isActive && <span className="absolute -bottom-0.5 left-1/2 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-sun-deep" />}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <LanguageSwitcher />
          <a
            href={whatsappLink(lang)}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden items-center gap-2 rounded-full bg-ink px-4 py-2.5 text-sm font-extrabold text-white shadow-soft transition-transform hover:-translate-y-0.5 lg:inline-flex"
          >
            <Send className="h-4 w-4" aria-hidden />
            <span>{t.navCta}</span>
          </a>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? t.menuClose : t.menuOpen}
            className="grid h-11 w-11 place-items-center rounded-full bg-sun text-ink shadow-soft lg:hidden"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile / tablet menu */}
      <div
        id="mobile-menu"
        className={`absolute inset-x-0 top-[var(--header-h)] h-[calc(100dvh-var(--header-h))] overflow-y-auto bg-cream px-4 pb-8 pt-4 transition-[opacity,transform,visibility] duration-300 sm:px-6 lg:hidden ${
          open ? "visible translate-y-0 opacity-100" : "invisible -translate-y-3 opacity-0"
        }`}
        aria-hidden={!open}
        inert={!open}
      >
        <nav aria-label={t.menuTitle} className="mx-auto max-w-xl">
          <ul className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
            {NAV.map((id, i) => (
              <li key={id}>
                <a
                  href={`#${id}`}
                  onClick={(e) => handleAnchorClick(e, id, close)}
                  aria-current={active === id ? "true" : undefined}
                  className={`flex min-h-14 items-center justify-between rounded-3xl px-5 text-lg font-extrabold text-ink ring-2 transition-transform active:scale-[0.98] ${
                    MENU_COLORS[i]
                  } ${active === id ? "ring-ink/70" : "ring-transparent"}`}
                >
                  {t.nav[id]}
                  <span className="text-sm font-bold text-ink/40">0{i + 1}</span>
                </a>
              </li>
            ))}
          </ul>
          <div className="mt-5 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
            <a
              href={whatsappLink(lang)}
              target="_blank"
              rel="noopener noreferrer"
              className="flex min-h-14 items-center justify-center gap-2 rounded-full bg-[#25D366] px-5 text-base font-extrabold text-white shadow-soft"
            >
              <WhatsAppIcon className="h-5 w-5" />
              {t.contacts.whatsapp}
            </a>
            <a
              href={site.instagram.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex min-h-14 items-center justify-center gap-2 rounded-full bg-white px-5 text-base font-extrabold text-ink shadow-soft ring-1 ring-ink/10"
            >
              <InstagramIcon className="h-5 w-5" />
              {site.instagram.handle}
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
}
