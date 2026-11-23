"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { ArrowDown, Clock, Languages, Users, Volume2, VolumeX } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageProvider";
import { whatsappLink } from "@/data/site";
import { handleAnchorClick } from "@/lib/scroll";
import { WhatsAppIcon } from "./BrandIcons";
import { HeroScene } from "./HeroScene";
import { Cloud, MiniSun, Sparkle, Star, Squiggle } from "./decor/Decor";

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
        className="absolute bottom-4 right-4 z-10 grid h-11 w-11 place-items-center rounded-full bg-white/90 text-ink shadow-pop backdrop-blur transition-transform hover:scale-105"
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
    { icon: Users, label: t.hero.chipGroups, cls: "bg-sky-soft" },
    { icon: Languages, label: t.hero.chipLangs, cls: "bg-mint-soft" },
    { icon: Clock, label: t.hero.chipHours, cls: "bg-peach-soft" },
  ];

  return (
    <section
      id="home"
      aria-labelledby="hero-title"
      className="relative isolate overflow-hidden bg-gradient-to-b from-sun-soft/60 via-cream to-cream pt-[var(--header-h)] lg:flex lg:min-h-[min(100dvh,980px)] lg:items-center"
    >
      {/* Фон: мягкие пятна и декор (меньше на телефоне) */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="blob-a absolute -left-16 top-24 h-44 w-44 bg-sky/30 blur-2xl sm:h-64 sm:w-64" />
        <div className="blob-b absolute -right-10 top-10 h-40 w-40 bg-peach/35 blur-2xl sm:h-72 sm:w-72" />
        <div className="blob-c absolute bottom-0 left-1/3 hidden h-56 w-72 bg-mint/35 blur-3xl md:block" />
        <div className="dotted-bg absolute inset-0 opacity-60 [mask-image:linear-gradient(to_bottom,black,transparent_70%)]" />
        <Cloud className="absolute left-[6%] top-[calc(var(--header-h)+18px)] hidden w-24 animate-drift opacity-90 motion-reduce:animate-none md:block lg:w-28" variant={2} />
        <Cloud className="absolute right-[44%] top-[calc(var(--header-h)+40px)] hidden w-16 animate-drift opacity-80 motion-reduce:animate-none lg:block" variant={3} />
        <Star className="absolute left-[46%] top-[22%] hidden h-6 w-6 animate-twinkle motion-reduce:animate-none lg:block" />
        <Sparkle className="absolute bottom-[14%] left-[4%] hidden h-5 w-5 animate-twinkle motion-reduce:animate-none md:block" color="#FFBDAB" />
        <Star className="absolute right-5 top-[calc(var(--header-h)+14px)] h-4 w-4 animate-twinkle motion-reduce:animate-none sm:right-10 md:hidden" color="#8ED8F8" />
      </div>

      <div className="mx-auto grid w-full max-w-[1320px] grid-cols-1 gap-x-12 px-4 pb-10 pt-5 [grid-template-areas:'title'_'art'_'body'] sm:px-6 sm:pt-8 md:grid-cols-[1.1fr_0.9fr] md:gap-x-8 md:pb-14 md:[grid-template-areas:'title_art'_'body_art'] lg:grid-cols-[1.05fr_1fr] lg:gap-x-12 lg:px-8 lg:pb-16 lg:pt-6 xl:gap-x-16">
        {/* Заголовок */}
        <div className="[grid-area:title] md:self-end">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/90 px-3 py-1.5 text-[13px] font-extrabold text-ink shadow-soft ring-1 ring-ink/5 sm:text-sm">
            <MiniSun className="h-5 w-5 animate-spin-slow motion-reduce:animate-none" />
            {t.hero.badge}
          </span>
          <h1
            id="hero-title"
            className="mt-4 font-display text-[2.05rem] font-black leading-[1.12] tracking-tight text-ink min-[390px]:text-[2.3rem] sm:text-5xl md:text-[2.6rem] lg:mt-6 lg:text-[3.35rem] xl:text-[3.8rem]"
          >
            <span className="relative inline-block">
              {t.hero.titleA}
              <Squiggle className="absolute -bottom-2.5 left-0 h-2.5 w-[5.5rem] sm:-bottom-3 sm:h-3 sm:w-[8rem] lg:w-[9.5rem]" color="#FFD65A" />
            </span>{" "}
            <span className="block bg-gradient-to-r from-sky-deep via-[#5aa9e6] to-peach-deep bg-clip-text pb-1 text-transparent">
              {t.hero.titleB}
            </span>
          </h1>
        </div>

        {/* Иллюстрация / фото */}
        <div className="relative mt-5 [grid-area:art] sm:mt-8 md:mt-0 md:self-center">
          <div className="relative mx-auto w-full max-w-[300px] min-[375px]:max-w-[320px] min-[430px]:max-w-[370px] sm:max-w-[420px] md:max-w-[400px] lg:max-w-[560px]">
            <div className="arch relative aspect-[4/3] overflow-hidden bg-sky-soft shadow-pop ring-[6px] ring-white sm:aspect-[6/5] lg:aspect-[11/10]">
              <HeroArt media={media} alt={t.hero.imageAlt} />
            </div>
            {/* Плашки поверх фона, но вне ключевых частей рисунка */}
            <div className="absolute -bottom-4 -left-8 hidden rotate-[-4deg] rounded-[22px] bg-white px-4 py-3 shadow-pop lg:block">
              <p className="font-display text-2xl font-black text-sky-deep">2+</p>
              <p className="text-xs font-bold text-ink-soft">{t.about.facts[2].label}</p>
            </div>
            <Star className="absolute -right-2 -top-3 h-9 w-9 animate-float motion-reduce:animate-none sm:-right-4 sm:h-11 sm:w-11" />
            <Sparkle className="absolute -left-3 top-8 hidden h-6 w-6 sm:block" color="#FF9F43" />
          </div>
        </div>

        {/* Текст и кнопки */}
        <div className="mt-6 [grid-area:body] sm:mt-8 md:mt-6 md:self-start lg:mt-7">
          <p className="max-w-xl text-[1.02rem] leading-relaxed text-ink-soft sm:text-lg">{t.hero.text}</p>

          <div className="mt-6 flex flex-col gap-3 min-[480px]:flex-row min-[480px]:flex-wrap">
            <a
              href={whatsappLink(lang)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-14 items-center justify-center gap-2.5 rounded-full bg-[#25D366] px-7 text-base font-extrabold text-white shadow-[0_14px_30px_-12px_rgb(37_211_102/0.7)] transition-transform hover:-translate-y-0.5 active:translate-y-0"
            >
              <WhatsAppIcon className="h-6 w-6" />
              {t.hero.whatsapp}
            </a>
            <a
              href="#groups"
              onClick={(e) => handleAnchorClick(e, "groups")}
              className="inline-flex min-h-14 items-center justify-center gap-2 rounded-full bg-white px-6 text-base font-extrabold text-ink shadow-soft ring-1 ring-ink/10 transition-transform hover:-translate-y-0.5"
            >
              {t.hero.more}
              <ArrowDown className="h-4 w-4" aria-hidden />
            </a>
          </div>

          <ul className="mt-6 flex flex-wrap gap-2">
            {chips.map(({ icon: Icon, label, cls }) => (
              <li key={label} className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[13px] font-bold text-ink sm:text-sm ${cls}`}>
                <Icon className="h-4 w-4 text-ink-soft" aria-hidden />
                {label}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
