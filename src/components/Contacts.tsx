"use client";

import { Clock, MapPin, Navigation, Phone } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageProvider";
import { site, twoGisRouteLink, whatsappLink } from "@/data/site";
import { InstagramIcon, WhatsAppIcon } from "./BrandIcons";
import { Reveal, SectionHeading } from "./ui";
import { TwoGisMap } from "./TwoGisMap";
import { MiniSun, Rainbow } from "./decor/Decor";

export function Contacts() {
  const { t, lang } = useLanguage();

  const rows = [
    { icon: MapPin, label: t.contacts.address, value: site.address[lang], bg: "bg-peach" },
    {
      icon: Phone,
      label: t.contacts.phone,
      value: site.phone.display,
      href: `tel:${site.phone.tel}`,
      bg: "bg-sky",
    },
    {
      icon: InstagramIcon,
      label: t.contacts.instagram,
      value: site.instagram.handle,
      href: site.instagram.url,
      external: true,
      bg: "bg-lilac",
    },
    { icon: Clock, label: t.contacts.hours, value: t.contacts.hoursValue, sub: t.contacts.weekend, bg: "bg-mint" },
  ];

  return (
    <section
      id="contacts"
      aria-labelledby="contacts-title"
      className="relative overflow-hidden bg-gradient-to-b from-cream via-sun-soft/50 to-sky-soft/60 py-12 sm:py-16 lg:py-20"
    >
      <MiniSun className="absolute right-[6%] top-10 hidden h-14 w-14 animate-spin-slow motion-reduce:animate-none md:block" />
      <Rainbow className="absolute -left-6 bottom-10 hidden w-36 opacity-70 lg:block" />

      <div className="relative mx-auto max-w-[1240px] px-4 sm:px-6 lg:px-8">
        <SectionHeading id="contacts-title" eyebrow={t.contacts.eyebrow} title={t.contacts.title} text={t.contacts.text} eyebrowClass="bg-peach/80" />

        <div className="mt-10 grid gap-5 lg:mt-12 lg:grid-cols-[1fr_1.05fr] lg:gap-8">
          <Reveal>
            <div className="flex h-full flex-col rounded-[36px] bg-white p-5 shadow-soft sm:p-7">
              <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                {rows.map(({ icon: Icon, label, value, href, external, sub, bg }, i) => (
                  <li key={label} className={`flex items-start gap-3.5 ${i === 0 ? "sm:col-span-2 lg:col-span-1 xl:col-span-2" : ""}`}>
                    <span className={`grid h-11 w-11 shrink-0 place-items-center rounded-2xl ${bg}`}>
                      <Icon className="h-5 w-5 text-ink" aria-hidden />
                    </span>
                    <div className="min-w-0">
                      <p className="text-xs font-extrabold uppercase tracking-[0.08em] text-ink-soft">{label}</p>
                      {href ? (
                        <a
                          href={href}
                          {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                          className="mt-0.5 block break-words text-[15px] font-extrabold text-ink underline decoration-sun decoration-[3px] underline-offset-4 hover:decoration-sky-deep sm:text-base"
                        >
                          {value}
                        </a>
                      ) : (
                        <p className="mt-0.5 break-words text-[15px] font-bold leading-snug text-ink sm:text-base">{value}</p>
                      )}
                      {sub && <p className="mt-0.5 text-sm text-ink-soft">{sub}</p>}
                    </div>
                  </li>
                ))}
              </ul>

              <div className="mt-7 grid gap-3 sm:grid-cols-2">
                <a
                  href={whatsappLink(lang)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-14 items-center justify-center gap-2.5 rounded-full bg-[#25D366] px-6 text-base font-extrabold text-white shadow-[0_14px_30px_-12px_rgb(37_211_102/0.7)] transition-transform hover:-translate-y-0.5 sm:col-span-2"
                >
                  <WhatsAppIcon className="h-6 w-6" />
                  {t.contacts.whatsapp}
                </a>
                <a
                  href={`tel:${site.phone.tel}`}
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-sky-soft px-5 text-sm font-extrabold text-ink ring-1 ring-sky transition-transform hover:-translate-y-0.5"
                >
                  <Phone className="h-4 w-4" aria-hidden />
                  {t.contacts.call}
                </a>
                <a
                  href={twoGisRouteLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-mint-soft px-5 text-sm font-extrabold text-ink ring-1 ring-mint-deep/40 transition-transform hover:-translate-y-0.5"
                >
                  <Navigation className="h-4 w-4" aria-hidden />
                  {t.contacts.route}
                </a>
              </div>
            </div>
          </Reveal>

          <Reveal delay={120} className="min-h-[280px] lg:min-h-0">
            <TwoGisMap />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
