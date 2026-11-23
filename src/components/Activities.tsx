"use client";

import { Globe, HandHeart, HeartHandshake, MessageCircleHeart, Music, Palette, PersonStanding, Send } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageProvider";
import type { ActivityId } from "@/i18n/translations";
import { whatsappLink } from "@/data/site";
import { btnPrimary } from "@/lib/styles";
import { Reveal, SectionHeading } from "./ui";
import { Cloud, Heart, Shape, Sparkle, Star, Wave } from "./decor/Decor";
import type { ShapeName } from "./decor/shapes";

type ActivityStyle = { id: ActivityId; icon: LucideIcon; card: string; badge: ShapeName; badgeFill: string; shape: string };

const ACTIVITIES: ActivityStyle[] = [
  { id: "choreography", icon: Music, card: "bg-white", badge: "flower", badgeFill: "#FBCFE8", shape: "petal-a" },
  { id: "gymnastics", icon: PersonStanding, card: "bg-mint-soft", badge: "star", badgeFill: "#BFEAD5", shape: "petal-b" },
  { id: "english", icon: Globe, card: "bg-sky-soft", badge: "cloud", badgeFill: "#A7DBF5", shape: "petal-c" },
  { id: "speech", icon: MessageCircleHeart, card: "bg-blush", badge: "heart", badgeFill: "#F9A8D4", shape: "petal-d" },
  { id: "massage", icon: HandHeart, card: "bg-butter-soft", badge: "egg", badgeFill: "#FFE08A", shape: "petal-b" },
  { id: "sensory", icon: Palette, card: "bg-lavender-soft", badge: "scallop", badgeFill: "#DDD6FE", shape: "petal-a" },
  { id: "psychologist", icon: HeartHandshake, card: "bg-peach-soft", badge: "blob2", badgeFill: "#FFB6A3", shape: "petal-c" },
];

export function Activities() {
  const { t, lang } = useLanguage();

  return (
    <section
      id="activities"
      aria-labelledby="activities-title"
      className="relative overflow-hidden bg-gradient-to-b from-white via-sky-soft/70 to-cream py-12 sm:py-16 lg:py-20"
    >
      {/* фон: мягкие пятна + облако + звёздочки */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="mask-blob2 absolute -left-20 top-1/3 hidden h-64 w-64 bg-mint-soft md:block" />
        <div className="mask-blob1 absolute -right-16 bottom-10 h-40 w-40 bg-butter-soft sm:h-56 sm:w-56" />
      </div>
      <Cloud className="absolute right-[4%] top-8 hidden w-24 animate-drift motion-reduce:animate-none md:block" variant={2} tint="#FFFFFF" />
      <Star className="absolute left-[6%] top-24 hidden h-5 w-5 animate-twinkle motion-reduce:animate-none md:block" color="#F472B6" />

      <div className="relative mx-auto max-w-[1320px] px-4 sm:px-6 lg:px-8">
        <SectionHeading
          id="activities-title"
          eyebrow={t.activities.eyebrow}
          title={t.activities.title}
          text={t.activities.text}
          eyebrowClass="bg-mint"
        />

        <ul className="mt-10 grid grid-cols-1 gap-3 min-[480px]:grid-cols-2 sm:gap-4 lg:mt-12 lg:grid-cols-4 lg:gap-5 lg:pb-6">
          {ACTIVITIES.map(({ id, icon: Icon, card, badge, badgeFill, shape }, i) => {
            const item = t.activities.items[id];
            // «лесенка» на десктопе: чётные колонки чуть ниже
            const stagger = i % 2 ? "lg:translate-y-6" : "";
            return (
              <Reveal as="li" key={id} delay={(i % 4) * 70} className={stagger}>
                <div
                  className={`group relative flex h-full items-start gap-4 overflow-hidden p-4 shadow-soft ring-1 ring-pink/15 transition-all duration-300 hover:-translate-y-1 hover:shadow-pop min-[480px]:flex-col sm:p-5 lg:p-6 ${card} ${shape}`}
                >
                  <span className="relative grid h-14 w-14 shrink-0 place-items-center transition-transform duration-300 group-hover:-rotate-12 group-hover:scale-110 sm:h-16 sm:w-16">
                    <Shape name={badge} fill={badgeFill} className="absolute inset-0 h-full w-full" />
                    <Icon className="relative h-6 w-6 text-ink sm:h-7 sm:w-7" aria-hidden strokeWidth={2.2} />
                  </span>
                  <div className="min-w-0">
                    <h3 className="font-display text-[1.05rem] font-black leading-snug text-ink sm:text-lg">{item.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-ink-soft sm:text-[15px]">{item.text}</p>
                  </div>
                  <span className="absolute right-4 top-3 font-display text-xs font-black text-pink/60">0{i + 1}</span>
                </div>
              </Reveal>
            );
          })}

          {/* 8-я карточка — завершает сетку и ведёт в WhatsApp */}
          <Reveal as="li" delay={210} className="lg:translate-y-6">
            <div className="petal-d relative flex h-full flex-col justify-between gap-4 overflow-hidden bg-gradient-to-br from-ink to-[#6B3157] p-5 text-white lg:p-6">
              <Heart className="absolute right-4 top-4 h-6 w-6 animate-bob motion-reduce:animate-none" color="#F472B6" />
              <Sparkle className="absolute bottom-5 right-8 h-4 w-4" color="#FFD166" />
              <p className="pr-8 text-[15px] font-semibold leading-relaxed text-white/90">{t.activities.note}</p>
              <a
                href={whatsappLink(lang)}
                target="_blank"
                rel="noopener noreferrer"
                className={`${btnPrimary} min-h-12 self-start px-5 text-sm`}
              >
                <Send className="h-4 w-4" aria-hidden />
                WhatsApp
              </a>
            </div>
          </Reveal>
        </ul>
      </div>
      <Wave fill="#FFF9F4" className="absolute inset-x-0 bottom-0" />
    </section>
  );
}
