"use client";

import { BookOpen, CalendarHeart, MessageCircle } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageProvider";
import { groups, whatsappLink, type GroupTheme } from "@/data/site";
import { btnPrimary } from "@/lib/styles";
import { Reveal, SectionHeading } from "./ui";
import { Cloud, Flower, Heart, MiniSun, Shape, Sparkle, Star, Wave } from "./decor/Decor";
import type { ShapeName } from "./decor/shapes";

type Theme = {
  band: string;
  ring: string;
  badge: ShapeName;
  chip: string;
  shape: string;
  Decor: () => React.ReactNode;
};

const THEMES: Record<GroupTheme, Theme> = {
  // «Еркетай» — лавандово-розовое облачное небо
  sky: {
    band: "bg-gradient-to-br from-sky via-sky-soft to-mint-soft",
    ring: "ring-sky",
    badge: "flower",
    chip: "bg-sky-soft",
    shape: "petal-a",
    Decor: () => (
      <>
        <Cloud className="absolute right-4 top-3 w-20 sm:w-24" variant={3} tint="#FFFFFF" />
        <Heart className="absolute right-[34%] top-5 hidden h-4 w-4 animate-bob motion-reduce:animate-none min-[420px]:block" color="#F472B6" />
        <Star className="absolute bottom-5 right-6 h-4 w-4" color="#FFD166" />
      </>
    ),
  },
  // «Құлыншақ» — персиково-розовое солнечное утро
  peach: {
    band: "bg-gradient-to-br from-butter via-butter-soft to-peach-soft",
    ring: "ring-butter",
    badge: "scallop",
    chip: "bg-butter-soft",
    shape: "petal-b",
    Decor: () => (
      <>
        <MiniSun className="absolute right-4 top-3 h-16 w-16 animate-spin-slow motion-reduce:animate-none sm:h-20 sm:w-20" />
        <Flower className="absolute right-[34%] top-6 hidden h-6 w-6 min-[420px]:block" color="#FFFFFF" center="#F472B6" />
        <Sparkle className="absolute bottom-5 right-6 h-5 w-5" color="#F472B6" />
      </>
    ),
  },
};

export function Groups() {
  const { t, lang } = useLanguage();

  return (
    <section id="groups" aria-labelledby="groups-title" className="relative bg-white">
      <Wave fill="#FFFFFF" className="absolute -top-6 sm:-top-10" />
      <Heart className="absolute left-[5%] top-16 hidden h-5 w-5 md:block" color="#A7DBF5" />
      <Star className="absolute right-[6%] top-24 hidden h-5 w-5 animate-twinkle motion-reduce:animate-none md:block" />

      <div className="relative mx-auto max-w-[1180px] px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
        <SectionHeading id="groups-title" eyebrow={t.groups.eyebrow} title={t.groups.title} text={t.groups.text} eyebrowClass="bg-butter-soft" />

        <div className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-6 lg:mt-12 lg:max-w-none lg:grid-cols-2 lg:gap-10">
          {groups.map((group, i) => {
            const th = THEMES[group.theme];
            return (
              <Reveal as="article" key={group.id} delay={i * 120} className={i === 1 ? "lg:mt-8" : ""}>
                <div className={`relative h-full overflow-hidden bg-white shadow-soft ring-2 transition-transform duration-300 hover:-translate-y-1 ${th.ring} ${th.shape}`}>
                  {/* цветная «шапка» с волнистым краем */}
                  <div aria-hidden className={`absolute inset-x-0 top-0 h-[104px] sm:h-[116px] ${th.band}`} />
                  <Wave fill="#FFFFFF" className="absolute inset-x-0 top-[84px] sm:top-[86px]" />
                  <th.Decor />

                  <div className="relative px-5 pb-6 pt-5 min-[375px]:px-6 sm:px-8 sm:pb-8 sm:pt-6">
                    <div className="flex items-center gap-3 min-[375px]:gap-4 sm:gap-5">
                      <div className="relative grid h-[84px] w-[84px] shrink-0 place-items-center min-[375px]:h-24 min-[375px]:w-24 sm:h-28 sm:w-28">
                        <Shape name={th.badge} fill="#FFFFFF" className="absolute inset-0 h-full w-full drop-shadow-[0_8px_14px_rgb(190_24_93/0.22)]" />
                        <span className="relative text-center">
                          <span className="block font-display text-2xl font-black leading-none text-pink-deep sm:text-[1.8rem]">{group.ageShort}</span>
                          <span className="mt-0.5 block text-xs font-extrabold text-ink-soft">{t.groups.years}</span>
                        </span>
                      </div>
                      <div className="min-w-0 pr-14 sm:pr-20">
                        <p className="inline-block rounded-full bg-white/85 px-2.5 py-0.5 text-[11px] font-extrabold uppercase tracking-[0.08em] text-pink-ink sm:text-[13px]">
                          {group.level[lang]}
                        </p>
                        <h3 className="mt-1 font-display text-[1.35rem] font-black leading-tight text-ink min-[375px]:text-[1.6rem] sm:text-[2rem]">
                          «{group.name}»
                        </h3>
                      </div>
                    </div>

                    <dl className="mt-6 grid gap-2.5 sm:grid-cols-2">
                      <div className={`flex items-center gap-3 rounded-[22px_22px_22px_6px] px-4 py-3 ${th.chip}`}>
                        <CalendarHeart className="h-5 w-5 shrink-0 text-pink-ink" aria-hidden />
                        <div>
                          <dt className="text-xs font-bold text-ink-soft">{t.groups.ageLabel}</dt>
                          <dd className="font-extrabold text-ink">{group.age[lang]}</dd>
                        </div>
                      </div>
                      <div className={`flex items-center gap-3 rounded-[22px_22px_6px_22px] px-4 py-3 ${th.chip}`}>
                        <BookOpen className="h-5 w-5 shrink-0 text-pink-ink" aria-hidden />
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
                      className={`${btnPrimary} relative mt-6 min-h-12 px-5 text-sm`}
                    >
                      <MessageCircle className="h-4 w-4" aria-hidden />
                      {t.groups.ask}
                    </a>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
