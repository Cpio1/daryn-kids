"use client";

import { Baby, Clock, Languages, Sparkles, Users } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageProvider";
import { Reveal, SectionHeading } from "./ui";
import { Cloud, Rainbow, Star } from "./decor/Decor";

const STYLES = [
  { icon: Users, card: "bg-sky-soft", badge: "bg-sky", shape: "rounded-[28px_28px_28px_8px]" },
  { icon: Languages, card: "bg-mint-soft", badge: "bg-mint", shape: "rounded-[8px_28px_28px_28px]" },
  { icon: Baby, card: "bg-peach-soft", badge: "bg-peach", shape: "rounded-[28px]" },
  { icon: Clock, card: "bg-sun-soft", badge: "bg-sun", shape: "rounded-[28px_8px_28px_28px]" },
  { icon: Sparkles, card: "bg-lilac-soft", badge: "bg-lilac", shape: "rounded-[28px_28px_8px_28px]" },
];

export function About() {
  const { t } = useLanguage();

  return (
    <section id="about" aria-labelledby="about-title" className="relative overflow-hidden bg-cream py-12 sm:py-16 lg:py-20">
      <Cloud className="absolute -left-6 top-10 hidden w-28 opacity-90 md:block" variant={1} />
      <Star className="absolute right-[8%] top-16 hidden h-6 w-6 animate-twinkle motion-reduce:animate-none md:block" color="#FFBDAB" />

      <div className="mx-auto grid max-w-[1320px] items-center gap-10 px-4 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14 lg:px-8">
        <div className="relative">
          <SectionHeading id="about-title" eyebrow={t.about.eyebrow} title={t.about.title} align="left" eyebrowClass="bg-sky/70" />
          <Reveal delay={80}>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-ink-soft sm:text-lg">{t.about.text}</p>
          </Reveal>
          <Reveal delay={120} className="mt-8 hidden lg:block">
            <div className="relative inline-flex items-end gap-4 rounded-[32px] bg-white px-6 py-5 shadow-soft">
              <Rainbow className="w-28" />
              <p className="max-w-[14rem] pb-1 font-display text-lg font-extrabold leading-snug text-ink">{t.footer.text}</p>
            </div>
          </Reveal>
        </div>

        <ul className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-6">
          {t.about.facts.map((fact, i) => {
            const s = STYLES[i];
            const Icon = s.icon;
            // На десктопе: 3 карточки сверху, 2 широкие снизу — асимметричная мозаика
            const span = i < 3 ? "md:col-span-2" : "md:col-span-3";
            const mobileSpan = i === 4 ? "col-span-2" : "";
            return (
              <Reveal as="li" key={fact.label} delay={i * 70} className={`${span} ${mobileSpan}`}>
                <div
                  className={`group flex h-full flex-col gap-3 p-4 transition-transform duration-300 hover:-translate-y-1 sm:p-5 ${s.card} ${s.shape}`}
                >
                  <span className={`grid h-11 w-11 place-items-center rounded-2xl ${s.badge} transition-transform group-hover:rotate-6`}>
                    <Icon className="h-5 w-5 text-ink" aria-hidden />
                  </span>
                  <div>
                    <p className="font-display text-xl font-black leading-tight text-ink sm:text-2xl">{fact.value}</p>
                    <p className="mt-1 text-sm font-semibold leading-snug text-ink-soft sm:text-[15px]">{fact.label}</p>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
