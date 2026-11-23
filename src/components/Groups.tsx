"use client";

import { BookOpen, CalendarHeart, MessageCircle } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageProvider";
import { groups, whatsappLink, type GroupTheme } from "@/data/site";
import { Reveal, SectionHeading } from "./ui";
import { Cloud, MiniSun, Sparkle, Star, Wave } from "./decor/Decor";

const THEMES: Record<
  GroupTheme,
  { card: string; ring: string; age: string; chip: string; button: string; shape: string; Decor: () => React.ReactNode }
> = {
  sky: {
    card: "bg-gradient-to-br from-sky-soft via-white to-mint-soft",
    ring: "ring-sky/60",
    age: "bg-sky text-ink",
    chip: "bg-white/80",
    button: "bg-sky-deep text-white",
    shape: "rounded-[40px_40px_40px_14px]",
    Decor: () => (
      <>
        <Cloud className="absolute -right-4 top-4 w-24 sm:w-28" variant={3} />
        <Star className="absolute bottom-6 right-8 h-5 w-5 animate-twinkle motion-reduce:animate-none" color="#8ED8F8" />
      </>
    ),
  },
  peach: {
    card: "bg-gradient-to-br from-peach-soft via-white to-sun-soft",
    ring: "ring-peach/70",
    age: "bg-peach text-ink",
    chip: "bg-white/80",
    button: "bg-peach-deep text-white",
    shape: "rounded-[40px_40px_14px_40px]",
    Decor: () => (
      <>
        <MiniSun className="absolute -right-2 top-3 h-20 w-20 animate-spin-slow opacity-90 motion-reduce:animate-none sm:h-24 sm:w-24" />
        <Sparkle className="absolute bottom-6 right-8 h-5 w-5" color="#FF9F43" />
      </>
    ),
  },
};

export function Groups() {
  const { t, lang } = useLanguage();

  return (
    <section id="groups" aria-labelledby="groups-title" className="relative bg-white">
      <Wave fill="#FFFFFF" className="absolute -top-6 sm:-top-10" />
      <div className="relative mx-auto max-w-[1180px] px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
        <SectionHeading id="groups-title" eyebrow={t.groups.eyebrow} title={t.groups.title} text={t.groups.text} eyebrowClass="bg-peach/70" />

        <div className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-5 lg:mt-12 lg:max-w-none lg:grid-cols-2 lg:gap-8">
          {groups.map((group, i) => {
            const th = THEMES[group.theme];
            return (
              <Reveal as="article" key={group.id} delay={i * 120}>
                <div
                  className={`relative h-full overflow-hidden p-5 shadow-soft min-[375px]:p-6 ring-2 transition-transform duration-300 hover:-translate-y-1 sm:p-8 ${th.card} ${th.ring} ${th.shape}`}
                >
                  <th.Decor />
                  <div className="relative flex items-start gap-3 min-[375px]:gap-4 sm:gap-5">
                    <div className={`grid h-16 w-16 shrink-0 place-items-center rounded-[24px] min-[375px]:h-20 min-[375px]:w-20 min-[375px]:rounded-[28px] sm:h-24 sm:w-24 ${th.age}`}>
                      <span className="text-center">
                        <span className="block font-display text-2xl font-black leading-none sm:text-[1.7rem]">{group.ageShort}</span>
                        <span className="mt-1 block text-xs font-extrabold">{t.groups.years}</span>
                      </span>
                    </div>
                    <div className="min-w-0 pr-4 min-[375px]:pr-10 sm:pr-16">
                      <p className="text-sm font-extrabold uppercase tracking-[0.08em] text-ink-soft">{group.level[lang]}</p>
                      <h3 className="mt-1 font-display text-[1.35rem] min-[375px]:text-[1.65rem] font-black leading-tight text-ink sm:text-[2rem]">
                        «{group.name}»
                      </h3>
                    </div>
                  </div>

                  <dl className="relative mt-6 grid gap-2.5 sm:grid-cols-2">
                    <div className={`flex items-center gap-3 rounded-2xl px-4 py-3 ${th.chip}`}>
                      <CalendarHeart className="h-5 w-5 shrink-0 text-ink-soft" aria-hidden />
                      <div>
                        <dt className="text-xs font-bold text-ink-soft">{t.groups.ageLabel}</dt>
                        <dd className="font-extrabold text-ink">{group.age[lang]}</dd>
                      </div>
                    </div>
                    <div className={`flex items-center gap-3 rounded-2xl px-4 py-3 ${th.chip}`}>
                      <BookOpen className="h-5 w-5 shrink-0 text-ink-soft" aria-hidden />
                      <div>
                        <dt className="text-xs font-bold text-ink-soft">{t.groups.langLabel}</dt>
                        <dd className="font-extrabold leading-snug text-ink">{group.language[lang]}</dd>
                      </div>
                    </div>
                  </dl>

                  <a
                    href={whatsappLink(lang)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`relative mt-6 inline-flex min-h-12 items-center gap-2 rounded-full px-5 text-sm font-extrabold shadow-soft transition-transform hover:-translate-y-0.5 ${th.button}`}
                  >
                    <MessageCircle className="h-4 w-4" aria-hidden />
                    {t.groups.ask}
                  </a>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
