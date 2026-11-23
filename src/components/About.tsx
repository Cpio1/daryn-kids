"use client";

import Image from "next/image";
import { ArrowRight, Baby, Clock, Languages, Sparkles, Users } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageProvider";
import { Reveal, SectionHeading } from "./ui";
import { Cloud, DashedArc, Flower, Heart, Rainbow, Shape, Sparkle, Star } from "./decor/Decor";
import { SunMark } from "./Logo";
import type { ShapeName } from "./decor/shapes";
import { Mascot } from "./Mascot";
import { GALLERY_TAB_EVENT, type GalleryImage } from "./Gallery";
import { handleAnchorClick } from "@/lib/scroll";

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

const MOTOR_CHIPS = ["bg-sky-soft", "bg-mint-soft", "bg-butter-soft", "bg-lavender-soft"];
const MOTOR_FRAMES = [
  "mask-egg h-[190px] w-[31%] sm:h-[250px] lg:h-[230px] xl:h-[260px] -rotate-3",
  "mask-blob1 h-[220px] w-[34%] sm:h-[290px] lg:h-[270px] xl:h-[300px] rotate-2",
  "mask-blob3 h-[180px] w-[31%] sm:h-[240px] lg:h-[220px] xl:h-[250px] -rotate-2",
];

/** Блок «Комната развития моторики»: коллаж из реальных фото + описание. */
function MotorRoom({ images }: { images: GalleryImage[] }) {
  const { t } = useLanguage();
  const m = t.about.motor;
  const photos = images.slice(0, 3);

  return (
    <Reveal className="relative mt-14 lg:mt-16">
      <div className="petal-c relative bg-white/90 p-5 pt-6 shadow-soft ring-1 ring-pink/15 sm:p-8 lg:p-10">
        {/* маскот с книгой «сидит» на краю блока */}
        <Mascot
          name="about"
          delay={600}
          className="absolute -top-[70px] right-3 h-[92px] sm:-top-[88px] sm:right-8 sm:h-[112px] lg:-top-[118px] lg:right-12 lg:h-[150px]"
        />
        <Sparkle className="absolute left-5 top-5 h-5 w-5" color="#FFD166" />

        <div className="grid items-center gap-7 lg:grid-cols-[1.05fr_1fr] lg:gap-12">
          {photos.length > 0 && (
            <div className="relative flex items-end justify-center gap-2.5 sm:gap-4">
              <div aria-hidden className="mask-blob2 absolute inset-x-4 bottom-0 top-8 bg-mint-soft" />
              {photos.map((img, i) => (
                <div key={img.src} className={`shape-shadow relative ${MOTOR_FRAMES[i].split(" ").filter((c) => !c.startsWith("mask-")).join(" ")}`}>
                  <div className={`relative h-full w-full overflow-hidden bg-sky-soft ${MOTOR_FRAMES[i].split(" ").find((c) => c.startsWith("mask-"))}`}>
                    <Image src={img.src} alt={`${m.photoAlt} ${i + 1}`} fill sizes="(min-width: 1024px) 200px, 32vw" className="object-cover object-[center_45%]" />
                  </div>
                </div>
              ))}
              <Heart className="absolute -left-1 top-2 h-6 w-6 animate-bob motion-reduce:animate-none" color="#F472B6" />
              <Star className="absolute -right-1 top-10 h-6 w-6" />
            </div>
          )}

          <div className="pr-0 lg:pr-4">
            <span className="inline-flex items-center gap-1.5 rounded-[999px_999px_999px_6px] bg-butter px-3 py-1 text-xs font-extrabold uppercase tracking-[0.08em] text-ink">
              {m.badge}
            </span>
            <h3 className="mt-3 pr-20 font-display text-[1.4rem] font-black leading-tight text-ink sm:pr-0 sm:text-[1.7rem] lg:text-[1.9rem]">
              {m.title}
            </h3>
            <p className="mt-3 text-[15px] leading-relaxed text-ink-soft sm:text-base">{m.text}</p>
            <ul className="mt-4 flex flex-wrap gap-2">
              {m.chips.map((chip, i) => (
                <li key={chip} className={`rounded-[999px_999px_999px_8px] px-3 py-1.5 text-[13px] font-bold text-ink ${MOTOR_CHIPS[i % MOTOR_CHIPS.length]}`}>
                  {chip}
                </li>
              ))}
            </ul>
            {images.length > 0 && (
              <a
                href="#gallery"
                onClick={(e) =>
                  handleAnchorClick(e, "gallery", () => window.dispatchEvent(new CustomEvent(GALLERY_TAB_EVENT, { detail: "motor" })))
                }
                className="mt-5 inline-flex items-center gap-1.5 text-sm font-extrabold text-pink-ink underline decoration-pink decoration-2 underline-offset-4 hover:decoration-pink-deep"
              >
                {m.cta}
                <ArrowRight className="h-4 w-4" aria-hidden />
              </a>
            )}
          </div>
        </div>
      </div>
    </Reveal>
  );
}

export function About({ media, motorImages }: { media: AboutMedia; motorImages: GalleryImage[] }) {
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

      <div className="relative mx-auto max-w-[1180px] px-4 sm:px-6 lg:px-8">
        <MotorRoom images={motorImages} />
      </div>
    </section>
  );
}
