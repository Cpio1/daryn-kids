"use client";

import { Footprints, Globe, HandHeart, HeartHandshake, MessageCircleHeart, Music, Palette, PersonStanding, Send } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageProvider";
import type { ActivityId } from "@/i18n/translations";
import { whatsappLink } from "@/data/site";
import { btnPrimary } from "@/lib/styles";
import { Reveal, SectionHeading } from "./ui";
import { Cloud, Heart, Shape, Sparkle, Star, Wave } from "./decor/Decor";
import type { ShapeName } from "./decor/shapes";
import { Mascot } from "./Mascot";

type ActivityStyle = { id: ActivityId; icon: LucideIcon; card: string; badge: ShapeName; badgeFill: string; shape: string };

const ACTIVITIES: ActivityStyle[] = [
  { id: "choreography", icon: Music, card: "bg-white", badge: "flower", badgeFill: "#FBCFE8", shape: "petal-a" },
  { id: "gymnastics", icon: PersonStanding, card: "bg-mint-soft", badge: "star", badgeFill: "#BFEAD5", shape: "petal-b" },
  { id: "english", icon: Globe, card: "bg-sky-soft", badge: "cloud", badgeFill: "#A7DBF5", shape: "petal-c" },
  { id: "speech", icon: MessageCircleHeart, card: "bg-blush", badge: "heart", badgeFill: "#F9A8D4", shape: "petal-d" },
  { id: "motor", icon: Footprints, card: "bg-white", badge: "blob1", badgeFill: "#FFE08A", shape: "petal-a" },
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
      className="relative overflow-hidden bg-gradient-to-b from-white via-sky-soft/70 to-cream pb-12 pt-[92px] sm:pb-14 sm:pt-[108px] lg:pb-16 lg:pt-12"
    >
      {/* фон: мягкие пятна + облако + звёздочка */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="mask-blob2 absolute -left-20 top-1/3 hidden h-64 w-64 bg-mint-soft md:block" />
        <div className="mask-blob1 absolute -right-16 bottom-10 h-40 w-40 bg-butter-soft sm:h-56 sm:w-56" />
      </div>
      <Cloud className="absolute left-[4%] top-8 hidden w-20 animate-drift motion-reduce:animate-none lg:block" variant={2} tint="#FFFFFF" />
      <Star className="absolute left-[22%] top-24 hidden h-4 w-4 animate-twinkle motion-reduce:animate-none lg:block" color="#F472B6" />

      <div className="relative mx-auto max-w-[1320px] px-4 sm:px-6 lg:px-8">
        {/* маскот рисует: справа от заголовка на десктопе, в углу на телефоне */}
        <Mascot
          name="activities"
          motion="bounce"
          delay={300}
          className="absolute -top-[84px] right-3 h-[80px] sm:-top-[100px] sm:right-6 sm:h-[96px] lg:right-[5%] lg:-top-6 lg:h-[118px] xl:right-[11%] xl:h-[145px]"
        />
        <SectionHeading
          id="activities-title"
          compact
          eyebrow={t.activities.eyebrow}
          title={t.activities.title}
          text={t.activities.text}
          eyebrowClass="bg-mint"
        />

        <ul className="mt-6 grid grid-cols-1 gap-2.5 min-[360px]:grid-cols-2 sm:gap-3 md:grid-cols-3 lg:mt-8 lg:grid-cols-5 lg:gap-3.5 xl:gap-4">
          {ACTIVITIES.map(({ id, icon: Icon, card, badge, badgeFill, shape }, i) => {
            const item = t.activities.items[id];
            return (
              <Reveal as="li" key={id} delay={(i % 5) * 60}>
                <div
                  className={`group relative flex h-full flex-col gap-2 overflow-hidden p-3.5 shadow-soft ring-1 ring-pink/15 transition-all duration-300 hover:-translate-y-1 hover:shadow-pop sm:p-4 xl:p-5 ${card} ${shape}`}
                >
                  <span className="relative grid h-11 w-11 shrink-0 place-items-center transition-transform duration-300 group-hover:-rotate-12 group-hover:scale-110 sm:h-12 sm:w-12">
                    <Shape name={badge} fill={badgeFill} className="absolute inset-0 h-full w-full" />
                    <Icon className="relative h-5 w-5 text-ink sm:h-[22px] sm:w-[22px]" aria-hidden strokeWidth={2.2} />
                  </span>
                  <div className="min-w-0">
                    <h3 className="font-display text-[15px] font-black leading-snug text-ink sm:text-base xl:text-[17px]">{item.title}</h3>
                    <p className="mt-1 text-[13px] leading-snug text-ink-soft sm:text-sm">{item.text}</p>
                  </div>
                  <span className="absolute right-3 top-2.5 font-display text-[11px] font-black text-pink/60">0{i + 1}</span>
                </div>
              </Reveal>
            );
          })}

          {/* последняя карточка — завершает сетку и ведёт в WhatsApp */}
          <Reveal as="li" delay={240} className="min-[360px]:col-span-2 md:col-span-1 lg:col-span-2">
            <div className="petal-d relative flex h-full flex-col justify-between gap-3 overflow-hidden bg-gradient-to-br from-ink to-[#6B3157] p-4 text-white xl:p-5">
              <Heart className="absolute right-3 top-3 h-5 w-5 animate-bob motion-reduce:animate-none" color="#F472B6" />
              <Sparkle className="absolute bottom-4 right-6 h-4 w-4" color="#FFD166" />
              <p className="pr-6 text-sm font-semibold leading-snug text-white/90">{t.activities.note}</p>
              <a
                href={whatsappLink(lang)}
                target="_blank"
                rel="noopener noreferrer"
                className={`${btnPrimary} min-h-11 self-start px-4 text-sm`}
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
