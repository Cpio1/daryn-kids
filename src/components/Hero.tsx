"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { ArrowDown, Clock, Languages, Users, Volume2, VolumeX } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageProvider";
import { whatsappLink } from "@/data/site";
import { handleAnchorClick } from "@/lib/scroll";
import { WhatsAppIcon } from "./BrandIcons";
import { HeroScene } from "./HeroScene";
import { Cloud, DashedArc, Flower, Heart, MiniSun, Sparkle, Squiggle } from "./decor/Decor";
import { btnPrimary, btnSecondary } from "@/lib/styles";
import { Mascot } from "./Mascot";

export type HeroMedia = { image: string | null; video: string | null };

function HeroVideo({ src, poster, alt }: { src: string; poster: string | null; alt: string }) {
  const { t } = useLanguage();
  const ref = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);
  const toggle = () => {
    const v = ref.current;
    if (!v) return;
    v.muted = !v.muted;
    setMuted(v.muted);
    if (!v.muted) void v.play().catch(() => undefined);
  };
  return (
    <>
      <video
        ref={ref}
        className="absolute inset-0 h-full w-full object-cover"
        src={src}
        poster={poster ?? undefined}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        aria-label={alt}
      />
      <button
        type="button"
        onClick={toggle}
        aria-pressed={!muted}
        aria-label={muted ? t.hero.soundOn : t.hero.soundOff}
        className="absolute bottom-[14%] right-[16%] z-10 grid h-11 w-11 place-items-center rounded-full bg-white/90 text-ink shadow-pop backdrop-blur transition-transform hover:scale-105"
      >
        {muted ? <VolumeX className="h-5 w-5" aria-hidden /> : <Volume2 className="h-5 w-5" aria-hidden />}
      </button>
    </>
  );
}

function HeroArt({ media, alt }: { media: HeroMedia; alt: string }) {
  if (media.video) return <HeroVideo src={media.video} poster={media.image} alt={alt} />;
  if (media.image) {
    return (
      <Image
        src={media.image}
        alt={alt}
        fill
        priority
        sizes="(min-width: 1024px) 46vw, 92vw"
        className="object-cover object-[center_35%]"
      />
    );
  }
  return <HeroScene className="absolute inset-0 h-full w-full" />;
}

export function Hero({ media }: { media: HeroMedia }) {
  const { t, lang } = useLanguage();

  const chips = [
    { icon: Users, label: t.hero.chipGroups, cls: "bg-sky-soft rounded-[999px_999px_999px_8px]" },
    { icon: Languages, label: t.hero.chipLangs, cls: "bg-mint-soft rounded-full" },
    { icon: Clock, label: t.hero.chipHours, cls: "bg-butter-soft rounded-[999px_999px_8px_999px]" },
  ];

  return (
    <section
      id="home"
      aria-labelledby="hero-title"
      className="relative isolate overflow-hidden bg-gradient-to-br from-sky-soft via-cream to-pink-soft/50 pt-[var(--header-h)] lg:flex lg:min-h-[min(100dvh,980px)] lg:items-center"
    >
      {/* Фон: мягкие пятна, облака, сердечки (на телефоне — меньше) */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="blob-a absolute -left-16 top-24 h-44 w-44 bg-mint/50 blur-2xl sm:h-64 sm:w-64" />
        <div className="blob-b absolute -right-10 top-10 h-40 w-40 bg-butter/45 blur-2xl sm:h-72 sm:w-72" />
        <div className="blob-c absolute bottom-0 left-1/3 hidden h-56 w-72 bg-pink/20 blur-3xl md:block" />
        <div className="dotted-bg absolute inset-0 opacity-60 [mask-image:linear-gradient(to_bottom,black,transparent_70%)]" />
        <Cloud className="absolute left-[6%] top-[calc(var(--header-h)+18px)] hidden w-24 animate-drift opacity-90 motion-reduce:animate-none md:block lg:w-28" variant={2} tint="#FFF7FB" />
        <Cloud className="absolute right-[44%] top-[calc(var(--header-h)+40px)] hidden w-16 animate-drift opacity-80 motion-reduce:animate-none lg:block" variant={3} tint="#FFE6DE" />
        <Heart className="absolute left-[44%] top-[24%] hidden h-5 w-5 animate-bob motion-reduce:animate-none lg:block" color="#F9A8D4" />
        <Flower className="absolute bottom-[12%] left-[3%] hidden h-8 w-8 animate-bob motion-reduce:animate-none md:block" color="#BFEAD5" center="#FFD166" />
        <Heart className="absolute right-5 top-[calc(var(--header-h)+14px)] h-4 w-4 sm:right-10 md:hidden" color="#F472B6" />
      </div>

      <div className="mx-auto grid w-full max-w-[1320px] grid-cols-1 gap-x-12 px-4 pb-10 pt-5 [grid-template-areas:'title'_'art'_'body'] sm:px-6 sm:pt-8 md:grid-cols-[1.1fr_0.9fr] md:gap-x-8 md:pb-14 md:[grid-template-areas:'title_art'_'body_art'] lg:grid-cols-[1.05fr_1fr] lg:gap-x-12 lg:px-8 lg:pb-16 lg:pt-6 xl:gap-x-16">
        {/* Заголовок */}
        <div className="relative [grid-area:title] md:self-end">
          <Mascot
            name="hero"
            motion="bounce"
            className="absolute -top-1 right-0 h-[84px] min-[390px]:h-[92px] sm:right-2 sm:h-[120px] md:-top-2 md:right-0 md:h-[110px] lg:hidden"
          />
          <span className="inline-flex items-center gap-2 rounded-[999px_999px_999px_6px] bg-white/90 px-3 py-1.5 text-[13px] font-extrabold text-ink shadow-soft ring-1 ring-pink/20 sm:text-sm">
            <MiniSun className="h-5 w-5 animate-spin-slow motion-reduce:animate-none" />
            {t.hero.badge}
          </span>
          <h1
            id="hero-title"
            className="mt-4 font-display text-[2.05rem] font-black leading-[1.12] tracking-tight text-ink min-[390px]:text-[2.3rem] sm:text-5xl md:text-[2.6rem] lg:mt-6 lg:text-[3.35rem] xl:text-[3.8rem]"
          >
            <span className="relative inline-block">
              {t.hero.titleA}
              <Squiggle className="absolute -bottom-2.5 left-0 h-2.5 w-[5.5rem] sm:-bottom-3 sm:h-3 sm:w-[8rem] lg:w-[9.5rem]" color="#FFD166" />
            </span>{" "}
            <span className="block bg-gradient-to-r from-pink-deep via-[#e0479a] to-sky-deep bg-clip-text pb-1 text-transparent">
              {t.hero.titleB}
            </span>
          </h1>
        </div>

        {/* Иллюстрация / фото в органической рамке */}
        <div className="relative mt-6 [grid-area:art] sm:mt-8 md:mt-0 md:self-center">
          <div className="relative mx-auto w-full max-w-[290px] min-[375px]:max-w-[310px] min-[430px]:max-w-[360px] sm:max-w-[410px] md:max-w-[390px] lg:max-w-[540px]">
            {/* подложки разной формы за фото */}
            <div aria-hidden className="mask-blob1 absolute -inset-3 rotate-[-8deg] bg-sky sm:-inset-4" />
            <div aria-hidden className="mask-scallop absolute -right-3 -top-4 h-20 w-20 bg-butter sm:-right-6 sm:h-28 sm:w-28" />
            <div aria-hidden className="mask-egg absolute -bottom-3 -left-2 h-14 w-12 rotate-[-20deg] bg-mint sm:h-20 sm:w-16" />
            <div className="shape-shadow relative">
              <div className="mask-blob3 relative aspect-[4/3] bg-lavender-soft sm:aspect-[6/5] lg:aspect-[11/10]">
                <HeroArt media={media} alt={t.hero.imageAlt} />
              </div>
            </div>
            {/* плашка-облачко */}
            <div className="absolute -bottom-5 -left-10 hidden lg:block">
              <div className="relative h-[136px] w-[240px]">
                <Cloud className="absolute inset-0 h-full w-full drop-shadow-[0_12px_18px_rgb(190_24_93/0.22)]" variant={2} tint="#FFFFFF" />
                <div className="absolute inset-x-0 top-[37%] text-center">
                  <p className="font-display text-xl font-black leading-none text-pink-deep">2+</p>
                  <p className="mx-auto mt-0.5 max-w-[150px] text-[11px] font-bold leading-tight text-ink-soft">{t.about.facts[2].label}</p>
                </div>
              </div>
            </div>
            <Heart className="absolute -right-1 bottom-6 h-8 w-8 animate-bob motion-reduce:animate-none sm:h-10 sm:w-10" color="#DB2777" />
            <Sparkle className="absolute -left-4 top-6 hidden h-6 w-6 sm:block" color="#2B8CC4" />
            <DashedArc className="absolute -top-8 left-6 hidden w-28 lg:block" color="#F472B6" />
          </div>
        </div>

        {/* Текст и кнопки */}
        <div className="relative mt-6 [grid-area:body] sm:mt-8 md:mt-6 md:self-start lg:mt-7 lg:pr-[128px] xl:pr-[150px]">
          <Mascot
            name="hero"
            motion="bounce"
            className="absolute -bottom-3 -right-4 hidden h-[150px] lg:block xl:-right-6 xl:h-[178px]"
          />
          <p className="max-w-xl text-[1.02rem] leading-relaxed text-ink-soft sm:text-lg">{t.hero.text}</p>

          <div className="mt-6 flex flex-col gap-3 min-[480px]:flex-row min-[480px]:flex-wrap">
            <a
              href={whatsappLink(lang)}
              target="_blank"
              rel="noopener noreferrer"
              className={`${btnPrimary} min-h-14 px-6 text-base lg:min-h-[52px] lg:px-5 lg:text-[15px]`}
            >
              <WhatsAppIcon className="h-6 w-6" />
              {t.hero.whatsapp}
            </a>
            <a
              href="#groups"
              onClick={(e) => handleAnchorClick(e, "groups")}
              className={`${btnSecondary} min-h-14 px-6 text-base lg:min-h-[52px] lg:px-5 lg:text-[15px]`}
            >
              {t.hero.more}
              <ArrowDown className="h-4 w-4" aria-hidden />
            </a>
          </div>

          <ul className="mt-6 flex flex-wrap gap-2">
            {chips.map(({ icon: Icon, label, cls }) => (
              <li key={label} className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-[13px] font-bold text-ink sm:text-sm ${cls}`}>
                <Icon className="h-4 w-4 text-pink-ink" aria-hidden />
                {label}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
