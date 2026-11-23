"use client";

import { Phone } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageProvider";
import type { SectionId } from "@/i18n/translations";
import { site, whatsappLink } from "@/data/site";
import { handleAnchorClick } from "@/lib/scroll";
import { Logo } from "./Logo";
import { InstagramIcon, WhatsAppIcon } from "./BrandIcons";
import { Cloud, Heart, Wave } from "./decor/Decor";

const NAV: Exclude<SectionId, "home">[] = ["about", "groups", "activities", "nutrition", "gallery", "documents", "contacts"];

export function Footer() {
  const { t, lang } = useLanguage();
  const year = new Date().getFullYear();

  return (
    <footer className="relative bg-ink pb-24 pt-12 text-white sm:pb-12 lg:pt-16">
      <Wave fill="#44263A" className="absolute inset-x-0 -top-6 sm:-top-10" />
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="mask-blob1 absolute -right-16 -top-10 h-56 w-56 bg-pink/10" />
        <div className="mask-blob3 absolute -left-20 bottom-0 h-48 w-48 bg-lavender/10" />
      </div>
      <Cloud className="absolute right-6 top-8 w-24 opacity-10" variant={2} />
      <Heart className="absolute left-[40%] top-10 hidden h-4 w-4 opacity-70 md:block" color="#F472B6" />

      <div className="relative mx-auto grid max-w-[1240px] gap-10 px-4 sm:px-6 md:grid-cols-[1.2fr_1fr_1fr] lg:px-8">
        <div>
          <a href="#home" onClick={(e) => handleAnchorClick(e, "home")} aria-label={t.homeLink} className="inline-flex rounded-[999px_999px_999px_10px] bg-white px-4 py-2">
            <Logo markClassName="h-9 w-9" />
          </a>
          <p className="mt-4 font-display text-lg font-extrabold">{t.kindergartenFull}</p>
          <p className="mt-1 text-white/70">{t.footer.text}</p>
        </div>

        <nav aria-label={t.footer.nav}>
          <p className="text-xs font-extrabold uppercase tracking-[0.1em] text-pink">{t.footer.nav}</p>
          <ul className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2.5">
            {NAV.map((id) => (
              <li key={id}>
                <a href={`#${id}`} onClick={(e) => handleAnchorClick(e, id)} className="font-semibold text-white/80 hover:text-white">
                  {t.nav[id]}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <p className="text-xs font-extrabold uppercase tracking-[0.1em] text-pink">{t.footer.contacts}</p>
          <ul className="mt-4 grid gap-2.5 text-white/85">
            <li>{site.address[lang]}</li>
            <li>{t.contacts.hoursValue}</li>
            <li>
              <a href={`tel:${site.phone.tel}`} className="inline-flex items-center gap-2 font-bold hover:text-pink">
                <Phone className="h-4 w-4" aria-hidden /> {site.phone.display}
              </a>
            </li>
            <li className="flex gap-2 pt-1">
              <a
                href={whatsappLink(lang)}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={t.contacts.whatsapp}
                className="mask-flower grid h-12 w-12 place-items-center bg-pink-deep text-white transition-transform hover:scale-105"
              >
                <WhatsAppIcon className="h-5 w-5" />
              </a>
              <a
                href={site.instagram.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Instagram ${site.instagram.handle}`}
                className="mask-scallop grid h-12 w-12 place-items-center bg-lavender/25 text-white transition-transform hover:scale-105"
              >
                <InstagramIcon className="h-5 w-5" />
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="relative mx-auto mt-10 max-w-[1240px] border-t border-white/10 px-4 pt-6 text-sm text-white/55 sm:px-6 lg:px-8">
        © {year} Daryn · {t.kindergartenFull}. {t.footer.rights}
      </div>
    </footer>
  );
}
