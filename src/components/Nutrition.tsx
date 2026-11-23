"use client";

import { CalendarDays, Clock3, MessageCircleQuestion } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageProvider";
import { whatsappLink } from "@/data/site";
import { btnPrimary } from "@/lib/styles";
import { Reveal, SectionHeading } from "./ui";
import { Flower, Heart, Sparkle } from "./decor/Decor";

/**
 * Раздел питания намеренно нейтральный: меню и режим питания пока не предоставлены.
 * Когда данные появятся, обновите тексты в src/i18n/translations.ts (nutrition.cards).
 */

function FoodIllustration({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 260 220" className={className} aria-hidden>
      {/* тарелка */}
      <ellipse cx="130" cy="150" rx="104" ry="44" fill="#fff" />
      <ellipse cx="130" cy="146" rx="80" ry="31" fill="#FFF6D6" />
      {/* яблоко */}
      <g transform="translate(92 92)">
        <path d="M0 18c-20-12-40 4-34 28 5 20 20 30 34 22 14 8 29-2 34-22 6-24-14-40-34-28z" fill="#F472B6" />
        <path d="M-2 14c0-10 4-16 10-20" stroke="#8B5E3C" strokeWidth="4" fill="none" strokeLinecap="round" />
        <path d="M8 2c10-6 18-2 20 4-10 4-16 2-20-4z" fill="#86D7A4" />
        <ellipse cx="-14" cy="34" rx="5" ry="8" fill="#fff" opacity="0.45" />
      </g>
      {/* морковка */}
      <g transform="translate(170 104) rotate(28)">
        <path d="M-12 0h24L2 62a2 2 0 0 1-4 0z" fill="#FFB6A3" />
        <path d="M-6 16h8M-4 30h6M-2 44h4" stroke="#F0806A" strokeWidth="3" strokeLinecap="round" />
        <path d="M0 0c-6-12-14-16-20-14 4 8 10 12 20 14zM0 0c2-14 8-20 14-20-1 9-6 15-14 20zM0 0c-1-14 2-22 6-26 2 10 0 18-6 26z" fill="#86D7A4" />
      </g>
      {/* клубника */}
      <g transform="translate(130 74)">
        <path d="M0 4c-14 0-16 12-12 24 4 12 9 22 12 22s8-10 12-22c4-12 2-24-12-24z" fill="#DB2777" />
        <path d="M-8 4l8-8 8 8-8 4z" fill="#86D7A4" />
        {[[-5, 16], [4, 14], [0, 26], [-4, 34], [5, 30]].map(([x, y]) => (
          <circle key={`${x}${y}`} cx={x} cy={y} r="1.4" fill="#FFE3C2" />
        ))}
      </g>
      {/* ягодки */}
      {[
        [62, 150],
        [74, 160],
        [196, 156],
      ].map(([x, y]) => (
        <circle key={`${x}${y}`} cx={x} cy={y} r="8" fill="#C4B5FD" />
      ))}
      {/* пар-сердечки */}
      <path d="M40 60c-8-10 8-14 0-26M226 70c-8-10 8-14 0-26" stroke="#F9A8D4" strokeWidth="4" fill="none" strokeLinecap="round" />
    </svg>
  );
}

const CARD_STYLES: { icon: LucideIcon; shape: string; iconBg: string }[] = [
  { icon: Clock3, shape: "rounded-[28px_28px_28px_6px]", iconBg: "mask-flower bg-butter" },
  { icon: CalendarDays, shape: "rounded-[6px_28px_28px_28px]", iconBg: "mask-scallop bg-mint" },
  { icon: MessageCircleQuestion, shape: "rounded-[28px_6px_28px_28px]", iconBg: "mask-blob1 bg-peach" },
];

export function Nutrition() {
  const { t, lang } = useLanguage();

  return (
    <section id="nutrition" aria-labelledby="nutrition-title" className="relative overflow-hidden bg-cream py-12 sm:py-16 lg:py-20">
      <div className="mx-auto max-w-[1240px] px-4 sm:px-6 lg:px-8">
        {/* панель с волнистыми краями сверху и снизу */}
        <div className="shape-shadow">
          <div className="mask-wave relative overflow-hidden bg-gradient-to-br from-butter-soft via-[#FFF0DC] to-mint-soft px-5 py-12 sm:px-10 sm:py-16 lg:px-14 lg:py-16">
            <div aria-hidden className="mask-blob3 absolute -right-16 -top-10 h-56 w-56 bg-white/50" />
            <div aria-hidden className="mask-blob2 absolute -bottom-16 left-1/3 hidden h-48 w-64 bg-mint/60 md:block" />
            <Sparkle className="absolute right-[42%] top-12 hidden h-5 w-5 lg:block" color="#DB2777" />
            <Heart className="absolute left-[46%] bottom-12 hidden h-4 w-4 lg:block" color="#F472B6" />

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
                        <div className={`flex h-full items-start gap-3 bg-white/90 p-4 shadow-soft min-[540px]:flex-col md:flex-row lg:flex-col ${s.shape}`}>
                          <span className={`grid h-11 w-11 shrink-0 place-items-center ${s.iconBg}`}>
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
                  className={`${btnPrimary} mt-6 min-h-12 px-5 text-sm`}
                >
                  <MessageCircleQuestion className="h-4 w-4" aria-hidden />
                  {t.nutrition.ask}
                </a>
              </div>

              <Reveal delay={120} className="order-first md:order-none">
                <div className="relative mx-auto aspect-square w-32 min-[390px]:w-36 md:w-full md:max-w-[220px] lg:max-w-[290px]">
                  <div className="mask-scallop absolute inset-0 bg-white/80" />
                  <FoodIllustration className="relative h-full w-full p-4 sm:p-6" />
                  <Flower className="absolute -left-2 top-2 h-7 w-7 animate-bob motion-reduce:animate-none sm:h-9 sm:w-9" color="#BFEAD5" center="#FFD166" />
                  <Heart className="absolute -right-1 bottom-4 h-5 w-5 sm:h-6 sm:w-6" color="#DB2777" />
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
