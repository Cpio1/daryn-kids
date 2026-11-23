"use client";

import Image from "next/image";
import { Baby, Clock, Languages, Sparkles, Users } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageProvider";
import { Reveal, SectionHeading } from "./ui";
import { Cloud, DashedArc, Flower, Heart, Rainbow, Shape, Sparkle, Star } from "./decor/Decor";
import { SunMark } from "./Logo";
import type { ShapeName } from "./decor/shapes";

export type AboutMedia = { image: string | null; video: string | null };

/** Каждая карточка — своя форма карточки и своя фигура под иконкой. */
const STYLES: { icon: LucideIcon; card: string; badge: ShapeName; badgeFill: string; shape: string }[] = [
  { icon: Users, card: "bg-white", badge: "flower", badgeFill: "#FBCFE8", shape: "petal-a" },
  { icon: Languages, card: "bg-sky-soft", badge: "cloud", badgeFill: "#A7DBF5", shape: "petal-b" },
  { icon: Baby, card: "bg-peach-soft", badge: "heart", badgeFill: "#FFB6A3", shape: "petal-c" },
  { icon: Clock, card: "bg-mint-soft", badge: "scallop", badgeFill: "#BFEAD5", shape: "petal-d" },
  { icon: Sparkles, card: "bg-lavender-soft", badge: "star", badgeFill: "#FFE08A", shape: "petal-a" },
];

/** Фото/видео «О нас» в рамке-облаке. Без файлов — иллюстрация с солнышком. */
function AboutVisual({ media, alt }: { media: AboutMedia; alt: string }) {
  return (
    <div className="relative mx-auto w-full">
      <div aria-hidden className="mask-blob2 absolute -inset-3 rotate-6 bg-butter/70" />
      <div className="shape-shadow relative">
        <div className="mask-cloud relative aspect-[5/4] bg-gradient-to-br from-sky-soft via-white to-mint-soft">
          {media.video ? (
            <video
              className="absolute inset-0 h-full w-full object-cover"
              src={media.video}
              poster={media.image ?? undefined}
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              aria-label={alt}
            />
          ) : media.image ? (
            <Image src={media.image} alt={alt} fill sizes="(min-width: 1024px) 400px, 90vw" className="object-cover object-[center_35%]" />
          ) : (
            <div aria-hidden className="absolute inset-0">
              <Rainbow className="absolute bottom-[14%] left-1/2 w-[58%] -translate-x-1/2" />
              <SunMark className="absolute left-1/2 top-[30%] h-[34%] w-[34%] -translate-x-1/2" />
              <Heart className="absolute left-[22%] top-[52%] h-[9%] w-[9%]" color="#F472B6" />
              <Heart className="absolute right-[22%] top-[46%] h-[7%] w-[7%]" color="#C4B5FD" />
              <Flower className="absolute bottom-[12%] left-[14%] h-[12%] w-[12%]" color="#fff" center="#F472B6" />
              <Flower className="absolute bottom-[14%] right-[13%] h-[10%] w-[10%]" color="#FFE08A" center="#DB2777" />
            </div>
          )}
        </div>
      </div>
      <Star className="absolute -left-2 top-4 h-7 w-7 animate-bob motion-reduce:animate-none" color="#F472B6" />
      <Sparkle className="absolute -right-1 bottom-8 h-6 w-6" color="#C4B5FD" />
    </div>
  );
}

export function About({ media }: { media: AboutMedia }) {
  const { t } = useLanguage();
  const hasMedia = Boolean(media.image || media.video);

  return (
    <section id="about" aria-labelledby="about-title" className="relative overflow-hidden bg-cream py-12 sm:py-16 lg:py-20">
      {/* фон: мягкие пятна */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="mask-blob3 absolute -right-24 top-10 hidden h-72 w-72 bg-sky-soft md:block" />
        <div className="mask-blob1 absolute -left-16 bottom-6 h-40 w-40 bg-mint-soft sm:h-56 sm:w-56" />
      </div>
      <Cloud className="absolute left-[3%] top-8 hidden w-24 opacity-90 md:block" variant={1} tint="#FFFFFF" />
      <Heart className="absolute right-[7%] top-12 hidden h-5 w-5 animate-bob motion-reduce:animate-none md:block" color="#F9A8D4" />

      <div className="relative mx-auto grid max-w-[1320px] items-center gap-10 px-4 sm:px-6 lg:grid-cols-[0.95fr_1.05fr] lg:gap-14 lg:px-8">
        <div className="relative">
          <SectionHeading id="about-title" eyebrow={t.about.eyebrow} title={t.about.title} align="left" eyebrowClass="bg-sky-soft" />
          <Reveal delay={80}>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-ink-soft sm:text-lg">{t.about.text}</p>
          </Reveal>
          <Reveal delay={120} className={`mt-7 ${hasMedia ? "block" : "hidden md:block"}`}>
            <div className="relative max-w-[300px] sm:max-w-[320px] lg:max-w-[330px]">
              <AboutVisual media={media} alt={t.hero.imageAlt} />
              <DashedArc className="absolute -right-24 top-6 hidden w-28 rotate-12 xl:block" color="#C4B5FD" />
            </div>
          </Reveal>
        </div>

        <ul className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-6">
          {t.about.facts.map((fact, i) => {
            const s = STYLES[i];
            const Icon = s.icon;
            // мозаика: 3 карточки сверху, 2 широкие снизу; лёгкий наклон на десктопе
            const span = i < 3 ? "md:col-span-2" : "md:col-span-3";
            const mobileSpan = i === 4 ? "col-span-2" : "";
            const tilt = ["lg:-rotate-1", "lg:rotate-1", "lg:-rotate-[0.5deg]", "lg:rotate-[0.6deg]", "lg:-rotate-[0.4deg]"][i];
            return (
              <Reveal as="li" key={fact.label} delay={i * 70} className={`${span} ${mobileSpan}`}>
                <div
                  className={`group relative flex h-full flex-col gap-3 p-4 shadow-soft ring-1 ring-pink/15 transition-transform duration-300 hover:-translate-y-1 hover:rotate-0 sm:p-5 ${tilt} ${s.card} ${s.shape}`}
                >
                  <span className="relative grid h-12 w-12 place-items-center transition-transform duration-300 group-hover:rotate-12 group-hover:scale-105">
                    <Shape name={s.badge} fill={s.badgeFill} className="absolute inset-0 h-full w-full" />
                    <Icon className="relative h-5 w-5 text-ink" aria-hidden />
                  </span>
                  <div>
                    <p className="whitespace-nowrap font-display text-lg font-black leading-tight text-ink min-[375px]:text-xl sm:text-2xl">{fact.value}</p>
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
