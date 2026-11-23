"use client";

import { Globe, HandHeart, HeartHandshake, MessageCircleHeart, Music, Palette, PersonStanding, Send } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageProvider";
import type { ActivityId } from "@/i18n/translations";
import { whatsappLink } from "@/data/site";
import { Reveal, SectionHeading } from "./ui";
import { Cloud, Sparkle, Star } from "./decor/Decor";

const ACTIVITIES: { id: ActivityId; icon: LucideIcon; card: string; icon_bg: string; shape: string }[] = [
  { id: "choreography", icon: Music, card: "bg-peach-soft", icon_bg: "bg-peach", shape: "rounded-[32px_32px_32px_10px]" },
  { id: "gymnastics", icon: PersonStanding, card: "bg-mint-soft", icon_bg: "bg-mint", shape: "rounded-[10px_32px_32px_32px]" },
  { id: "english", icon: Globe, card: "bg-sky-soft", icon_bg: "bg-sky", shape: "rounded-[32px]" },
  { id: "speech", icon: MessageCircleHeart, card: "bg-sun-soft", icon_bg: "bg-sun", shape: "rounded-[32px_10px_32px_32px]" },
  { id: "massage", icon: HandHeart, card: "bg-lilac-soft", icon_bg: "bg-lilac", shape: "rounded-[32px_32px_10px_32px]" },
  { id: "sensory", icon: Palette, card: "bg-mint-soft", icon_bg: "bg-mint", shape: "rounded-[32px]" },
  { id: "psychologist", icon: HeartHandshake, card: "bg-peach-soft", icon_bg: "bg-peach", shape: "rounded-[10px_32px_32px_32px]" },
];

export function Activities() {
  const { t, lang } = useLanguage();

  return (
    <section
      id="activities"
      aria-labelledby="activities-title"
      className="relative overflow-hidden bg-gradient-to-b from-white via-sky-soft/50 to-cream py-12 sm:py-16 lg:py-20"
    >
      <Cloud className="absolute right-[4%] top-8 hidden w-24 animate-drift motion-reduce:animate-none md:block" variant={2} />
      <Star className="absolute left-[6%] top-24 hidden h-5 w-5 animate-twinkle motion-reduce:animate-none md:block" />

      <div className="relative mx-auto max-w-[1320px] px-4 sm:px-6 lg:px-8">
        <SectionHeading
          id="activities-title"
          eyebrow={t.activities.eyebrow}
          title={t.activities.title}
          text={t.activities.text}
          eyebrowClass="bg-mint"
        />

        <ul className="mt-10 grid grid-cols-1 gap-3 min-[480px]:grid-cols-2 sm:gap-4 lg:mt-12 lg:grid-cols-4 lg:gap-5">
          {ACTIVITIES.map(({ id, icon: Icon, card, icon_bg, shape }, i) => {
            const item = t.activities.items[id];
            return (
              <Reveal as="li" key={id} delay={(i % 4) * 70}>
                <div
                  className={`group relative flex h-full items-start gap-4 p-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-pop min-[480px]:flex-col sm:p-5 lg:p-6 ${card} ${shape}`}
                >
                  <span
                    className={`grid h-12 w-12 shrink-0 place-items-center rounded-[18px] transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-105 sm:h-14 sm:w-14 ${icon_bg} ${
                      i % 2 ? "blob-a" : "blob-b"
                    }`}
                  >
                    <Icon className="h-6 w-6 text-ink sm:h-7 sm:w-7" aria-hidden strokeWidth={2.2} />
                  </span>
                  <div className="min-w-0">
                    <h3 className="font-display text-[1.05rem] font-extrabold leading-snug text-ink sm:text-lg">{item.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-ink-soft sm:text-[15px]">{item.text}</p>
                  </div>
                  <span className="absolute right-4 top-4 font-display text-xs font-black text-ink/25">0{i + 1}</span>
                </div>
              </Reveal>
            );
          })}

          {/* 8-я карточка — завершает сетку и ведёт в WhatsApp */}
          <Reveal as="li" delay={210}>
            <div className="relative flex h-full flex-col justify-between gap-4 overflow-hidden rounded-[32px] bg-ink p-5 text-white lg:p-6">
              <Sparkle className="absolute right-4 top-4 h-6 w-6" color="#FFD65A" />
              <p className="pr-8 text-[15px] font-semibold leading-relaxed text-white/90">{t.activities.note}</p>
              <a
                href={whatsappLink(lang)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-12 items-center justify-center gap-2 self-start rounded-full bg-sun px-5 text-sm font-extrabold text-ink transition-transform hover:-translate-y-0.5"
              >
                <Send className="h-4 w-4" aria-hidden />
                WhatsApp
              </a>
            </div>
          </Reveal>
        </ul>
      </div>
    </section>
  );
}
