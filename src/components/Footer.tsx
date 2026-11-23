"use client";

import { Phone } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageProvider";
import type { SectionId } from "@/i18n/translations";
import { site, whatsappLink } from "@/data/site";
import { handleAnchorClick } from "@/lib/scroll";
import { Logo } from "./Logo";
import { InstagramIcon, WhatsAppIcon } from "./BrandIcons";
import { Cloud, Star } from "./decor/Decor";

const NAV: Exclude<SectionId, "home">[] = ["about", "groups", "activities", "nutrition", "gallery", "documents", "contacts"];

export function Footer() {
  const { t, lang } = useLanguage();
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden bg-ink pb-24 pt-12 text-white sm:pb-12 lg:pt-16">
      <Cloud className="absolute -right-6 top-6 w-28 opacity-10" variant={2} />
      <Star className="absolute left-[40%] top-10 hidden h-4 w-4 opacity-60 md:block" />

      <div className="relative mx-auto grid max-w-[1240px] gap-10 px-4 sm:px-6 md:grid-cols-[1.2fr_1fr_1fr] lg:px-8">
        <div>
          <a href="#home" onClick={(e) => handleAnchorClick(e, "home")} aria-label={t.homeLink} className="inline-flex rounded-2xl bg-white px-3 py-2">
            <Logo markClassName="h-9 w-9" />
          </a>
          <p className="mt-4 font-display text-lg font-extrabold">{t.kindergartenFull}</p>
          <p className="mt-1 text-white/70">{t.footer.text}</p>
        </div>

        <nav aria-label={t.footer.nav}>
          <p className="text-xs font-extrabold uppercase tracking-[0.1em] text-sun">{t.footer.nav}</p>
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
          <p className="text-xs font-extrabold uppercase tracking-[0.1em] text-sun">{t.footer.contacts}</p>
          <ul className="mt-4 grid gap-2.5 text-white/85">
            <li>{site.address[lang]}</li>
            <li>{t.contacts.hoursValue}</li>
            <li>
              <a href={`tel:${site.phone.tel}`} className="inline-flex items-center gap-2 font-bold hover:text-sun">
                <Phone className="h-4 w-4" aria-hidden /> {site.phone.display}
              </a>
            </li>
            <li className="flex gap-2 pt-1">
              <a
                href={whatsappLink(lang)}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={t.contacts.whatsapp}
                className="grid h-11 w-11 place-items-center rounded-full bg-[#25D366] text-white"
              >
                <WhatsAppIcon className="h-5 w-5" />
              </a>
              <a
                href={site.instagram.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Instagram ${site.instagram.handle}`}
                className="grid h-11 w-11 place-items-center rounded-full bg-white/10 text-white hover:bg-white/20"
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
