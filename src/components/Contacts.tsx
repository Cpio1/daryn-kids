"use client";

import { Clock, MapPin, Navigation, Phone } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageProvider";
import { site, twoGisRouteLink, whatsappLink } from "@/data/site";
import { InstagramIcon, WhatsAppIcon } from "./BrandIcons";
import { Reveal, SectionHeading } from "./ui";
import { TwoGisMap } from "./TwoGisMap";
import { Heart, MiniSun, Rainbow, Shape, Sparkle } from "./decor/Decor";
import type { ShapeName } from "./decor/shapes";
import { btnPrimary, btnSecondary, btnSoft } from "@/lib/styles";

export function Contacts() {
  const { t, lang } = useLanguage();

  const rows = [
    { icon: MapPin, label: t.contacts.address, value: site.address[lang], badge: "heart" as ShapeName, fill: "#FFB6A3" },
    {
      icon: Phone,
      label: t.contacts.phone,
      value: site.phone.display,
      href: `tel:${site.phone.tel}`,
      badge: "cloud" as ShapeName,
      fill: "#A7DBF5",
    },
    {
      icon: InstagramIcon,
      label: t.contacts.instagram,
      value: site.instagram.handle,
      href: site.instagram.url,
      external: true,
      badge: "flower" as ShapeName,
      fill: "#FBCFE8",
    },
    { icon: Clock, label: t.contacts.hours, value: t.contacts.hoursValue, sub: t.contacts.weekend, badge: "scallop" as ShapeName, fill: "#BFEAD5" },
  ];

  return (
    <section
      id="contacts"
      aria-labelledby="contacts-title"
      className="relative overflow-hidden bg-gradient-to-b from-cream via-sky-soft to-lavender-soft/70 py-12 sm:py-16 lg:py-20"
    >
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="mask-blob1 absolute -right-20 top-24 hidden h-72 w-72 bg-white/50 md:block" />
        <div className="mask-blob3 absolute -left-24 bottom-0 h-48 w-48 bg-mint-soft sm:h-64 sm:w-64" />
      </div>
      <MiniSun className="absolute right-[6%] top-10 hidden h-14 w-14 animate-spin-slow motion-reduce:animate-none md:block" />
      <Rainbow className="absolute -left-6 bottom-10 hidden w-36 opacity-70 lg:block" />
      <Heart className="absolute left-[8%] top-16 hidden h-5 w-5 animate-bob motion-reduce:animate-none md:block" color="#F472B6" />

      <div className="relative mx-auto max-w-[1240px] px-4 sm:px-6 lg:px-8">
        <SectionHeading id="contacts-title" eyebrow={t.contacts.eyebrow} title={t.contacts.title} text={t.contacts.text} eyebrowClass="bg-white" />

        <div className="mt-10 grid gap-5 lg:mt-12 lg:grid-cols-[1fr_1.05fr] lg:gap-8">
          <Reveal>
            <div className="petal-b relative flex h-full flex-col bg-white p-5 shadow-soft sm:p-7">
              <Sparkle className="absolute right-5 top-5 h-5 w-5" color="#C4B5FD" />
              <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                {rows.map(({ icon: Icon, label, value, href, external, sub, badge, fill }, i) => (
                  <li key={label} className={`flex items-start gap-3.5 ${i === 0 ? "sm:col-span-2 lg:col-span-1 xl:col-span-2" : ""}`}>
                    <span className="relative grid h-12 w-12 shrink-0 place-items-center">
                      <Shape name={badge} fill={fill} className="absolute inset-0 h-full w-full" />
                      <Icon className="relative h-5 w-5 text-ink" aria-hidden />
                    </span>
                    <div className="min-w-0">
                      <p className="text-xs font-extrabold uppercase tracking-[0.08em] text-pink-ink">{label}</p>
                      {href ? (
                        <a
                          href={href}
                          {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                          className="mt-0.5 block break-words text-[15px] font-extrabold text-ink underline decoration-pink decoration-[3px] underline-offset-4 hover:decoration-pink-deep sm:text-base"
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
                  className={`${btnPrimary} min-h-14 px-6 text-base sm:col-span-2`}
                >
                  <WhatsAppIcon className="h-6 w-6" />
                  {t.contacts.whatsapp}
                </a>
                <a
                  href={`tel:${site.phone.tel}`}
                  className={`${btnSecondary} min-h-12 px-5 text-sm`}
                >
                  <Phone className="h-4 w-4" aria-hidden />
                  {t.contacts.call}
                </a>
                <a
                  href={twoGisRouteLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${btnSoft} min-h-12 px-5 text-sm`}
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
