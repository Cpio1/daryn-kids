"use client";

import { CalendarDays, Clock3, MessageCircleQuestion } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageProvider";
import { whatsappLink } from "@/data/site";
import { Reveal, SectionHeading } from "./ui";
import { Sparkle } from "./decor/Decor";

/**
 * Раздел питания намеренно нейтральный: меню и режим питания пока не предоставлены.
 * Когда данные появятся, обновите тексты в src/i18n/translations.ts (nutrition.cards).
 */

function FoodIllustration({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 260 220" className={className} aria-hidden>
      {/* тарелка */}
      <ellipse cx="130" cy="150" rx="104" ry="44" fill="#fff" />
      <ellipse cx="130" cy="146" rx="80" ry="31" fill="#FFF4D6" />
      {/* яблоко */}
      <g transform="translate(92 92)">
        <path d="M0 18c-20-12-40 4-34 28 5 20 20 30 34 22 14 8 29-2 34-22 6-24-14-40-34-28z" fill="#FF8C7A" />
        <path d="M-2 14c0-10 4-16 10-20" stroke="#8B5E3C" strokeWidth="4" fill="none" strokeLinecap="round" />
        <path d="M8 2c10-6 18-2 20 4-10 4-16 2-20-4z" fill="#7FD39C" />
        <ellipse cx="-14" cy="34" rx="5" ry="8" fill="#fff" opacity="0.45" />
      </g>
      {/* морковка */}
      <g transform="translate(170 104) rotate(28)">
        <path d="M-12 0h24L2 62a2 2 0 0 1-4 0z" fill="#FFA64D" />
        <path d="M-6 16h8M-4 30h6M-2 44h4" stroke="#F08A2B" strokeWidth="3" strokeLinecap="round" />
        <path d="M0 0c-6-12-14-16-20-14 4 8 10 12 20 14zM0 0c2-14 8-20 14-20-1 9-6 15-14 20zM0 0c-1-14 2-22 6-26 2 10 0 18-6 26z" fill="#6CC98C" />
      </g>
      {/* груша / банан */}
      <g transform="translate(130 74)">
        <path d="M0 0c-10 0-12 14-14 24-4 18 4 30 14 30s18-12 14-30c-2-10-4-24-14-24z" fill="#BCEBCB" />
        <path d="M0 0v-10" stroke="#8B5E3C" strokeWidth="3" strokeLinecap="round" />
      </g>
      {/* ягодки */}
      {[
        [62, 150],
        [74, 160],
        [196, 156],
      ].map(([x, y]) => (
        <circle key={`${x}${y}`} cx={x} cy={y} r="8" fill="#B79CF2" />
      ))}
      {/* пар */}
      <path d="M40 60c-8-10 8-14 0-26M226 70c-8-10 8-14 0-26" stroke="#8ED8F8" strokeWidth="4" fill="none" strokeLinecap="round" opacity="0.7" />
    </svg>
  );
}

const CARD_STYLES = [
  { icon: Clock3, cls: "bg-white", iconCls: "bg-sun" },
  { icon: CalendarDays, cls: "bg-white", iconCls: "bg-mint" },
  { icon: MessageCircleQuestion, cls: "bg-white", iconCls: "bg-peach" },
];

export function Nutrition() {
  const { t, lang } = useLanguage();

  return (
    <section id="nutrition" aria-labelledby="nutrition-title" className="relative overflow-hidden bg-cream py-12 sm:py-16 lg:py-20">
      <div className="mx-auto max-w-[1240px] px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-[40px] bg-gradient-to-br from-sun-soft via-[#FFF0C4] to-peach-soft px-5 py-8 sm:px-10 sm:py-12 lg:rounded-[56px] lg:px-14 lg:py-14">
          {/* мягкие формы на фоне */}
          <div aria-hidden className="blob-c absolute -right-16 -top-16 h-56 w-56 bg-white/40" />
          <div aria-hidden className="blob-a absolute -bottom-20 left-1/3 hidden h-48 w-64 bg-mint/40 md:block" />
          <Sparkle className="absolute right-[42%] top-8 hidden h-5 w-5 lg:block" color="#FF9F43" />

          <div className="relative grid items-center gap-8 md:grid-cols-[1.6fr_0.6fr] md:gap-8 lg:grid-cols-[1.5fr_0.5fr] lg:gap-10">
            <div>
              <SectionHeading
                id="nutrition-title"
                eyebrow={t.nutrition.eyebrow}
                title={t.nutrition.title}
                text={t.nutrition.text}
                align="left"
                eyebrowClass="bg-white"
              />

              <ul className="mt-6 grid grid-cols-1 gap-3 min-[540px]:grid-cols-3 md:grid-cols-1 lg:grid-cols-3">
                {t.nutrition.cards.map((c, i) => {
                  const s = CARD_STYLES[i];
                  const Icon = s.icon;
                  return (
                    <Reveal as="li" key={c.title} delay={i * 80}>
                      <div className={`flex h-full items-start gap-3 rounded-[24px] p-4 shadow-soft min-[540px]:flex-col md:flex-row lg:flex-col ${s.cls}`}>
                        <span className={`grid h-10 w-10 shrink-0 place-items-center rounded-full ${s.iconCls}`}>
                          <Icon className="h-5 w-5 text-ink" aria-hidden />
                        </span>
                        <div>
                          <h3 className="font-extrabold leading-snug text-ink">{c.title}</h3>
                          <p className="mt-1 text-sm leading-relaxed text-ink-soft">{c.text}</p>
                        </div>
                      </div>
                    </Reveal>
                  );
                })}
              </ul>

              <a
                href={whatsappLink(lang)}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex min-h-12 items-center gap-2 rounded-full bg-ink px-5 text-sm font-extrabold text-white shadow-soft transition-transform hover:-translate-y-0.5"
              >
                <MessageCircleQuestion className="h-4 w-4" aria-hidden />
                {t.nutrition.ask}
              </a>
            </div>

            <Reveal delay={120} className="order-first md:order-none">
              <div className="relative mx-auto aspect-square w-28 min-[390px]:w-32 md:w-full md:max-w-[220px] lg:max-w-[300px]">
                <div className="blob-b absolute inset-0 bg-white/70" />
                <FoodIllustration className="relative h-full w-full p-3 sm:p-5" />
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
