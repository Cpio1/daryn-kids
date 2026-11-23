"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { Camera, ChevronLeft, ChevronRight, X, ZoomIn } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageProvider";
import { site } from "@/data/site";
import { InstagramIcon } from "./BrandIcons";
import { Reveal, SectionHeading } from "./ui";
import { Cloud, Flower, Heart, MiniSun, Sparkle, Star } from "./decor/Decor";
import { btnPrimary, btnSecondary } from "@/lib/styles";

export type GalleryImage = { src: string };

/** Повторяющийся узор размеров плиток (mobile: 2 колонки, desktop: 4 колонки). */
const PAGE_SIZE = 12;

/** Размер плитки + фигурная рамка: пятно, фестончатый овал, капля, облако, волна. */
const TILE_PATTERN = [
  { span: "col-span-2 row-span-2", mask: "mask-blob3" },
  { span: "row-span-1", mask: "mask-blob2" },
  { span: "row-span-2", mask: "mask-egg" },
  { span: "row-span-1", mask: "mask-cloud" },
  { span: "col-span-2 row-span-1", mask: "mask-wave" },
  { span: "row-span-1", mask: "mask-blob1" },
];

/** Последняя «широкая» плитка растягивается на всю строку, чтобы в сетке не оставалось дыр. */
function tileSpan(i: number, count: number) {
  const isLastWide = i === count - 1 && i % TILE_PATTERN.length === 4;
  return isLastWide ? "col-span-2 row-span-1 md:col-span-3 lg:col-span-4" : TILE_PATTERN[i % TILE_PATTERN.length].span;
}

function Lightbox({
  images,
  index,
  onClose,
  onIndex,
}: {
  images: GalleryImage[];
  index: number;
  onClose: () => void;
  onIndex: (i: number) => void;
}) {
  const { t } = useLanguage();
  const closeRef = useRef<HTMLButtonElement>(null);
  const touchX = useRef<number | null>(null);
  const total = images.length;

  const prev = useCallback(() => onIndex((index - 1 + total) % total), [index, total, onIndex]);
  const next = useCallback(() => onIndex((index + 1) % total), [index, total, onIndex]);

  useEffect(() => {
    const opener = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();
    const prevOverflow = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.documentElement.style.overflow = prevOverflow;
      opener?.focus?.();
    };
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowLeft") prev();
      else if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose, prev, next]);

  const current = images[index];

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`${t.gallery.counter} ${index + 1} ${t.gallery.of} ${total}`}
      className="fixed inset-0 z-[70] flex flex-col bg-ink/95 backdrop-blur-sm"
      onClick={(e) => e.target === e.currentTarget && onClose()}
      onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
      onTouchEnd={(e) => {
        if (touchX.current === null) return;
        const dx = e.changedTouches[0].clientX - touchX.current;
        if (Math.abs(dx) > 50) (dx > 0 ? prev : next)();
        touchX.current = null;
      }}
    >
      <div className="flex items-center justify-between px-4 pb-2 pt-[max(12px,env(safe-area-inset-top))] text-white sm:px-6">
        <span className="rounded-full bg-white/10 px-3 py-1.5 text-sm font-bold tabular-nums">
          {index + 1} {t.gallery.of} {total}
        </span>
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          aria-label={t.gallery.close}
          className="grid h-12 w-12 place-items-center rounded-full bg-white text-ink shadow-pop transition-transform hover:scale-105"
        >
          <X className="h-6 w-6" />
        </button>
      </div>

      <div className="relative min-h-0 flex-1 px-2 sm:px-20" onClick={(e) => e.target === e.currentTarget && onClose()}>
        <div className="relative h-full w-full">
          <Image
            key={current.src}
            src={current.src}
            alt={`${t.gallery.photoAlt} ${index + 1}`}
            fill
            sizes="100vw"
            className="object-contain"
            priority
          />
        </div>
        {total > 1 && (
          <>
            <button
              type="button"
              onClick={prev}
              aria-label={t.gallery.prev}
              className="absolute left-2 top-1/2 hidden h-12 w-12 -translate-y-1/2 place-items-center rounded-full bg-white/90 text-ink shadow-pop transition-transform hover:scale-105 sm:left-5 sm:grid"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            <button
              type="button"
              onClick={next}
              aria-label={t.gallery.next}
              className="absolute right-2 top-1/2 hidden h-12 w-12 -translate-y-1/2 place-items-center rounded-full bg-white/90 text-ink shadow-pop transition-transform hover:scale-105 sm:right-5 sm:grid"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          </>
        )}
      </div>

      {/* Мобильные кнопки листания — внизу, под большим пальцем */}
      {total > 1 && (
        <div className="flex items-center justify-center gap-4 px-4 pb-[max(16px,env(safe-area-inset-bottom))] pt-3 sm:hidden">
          <button type="button" onClick={prev} aria-label={t.gallery.prev} className="grid h-14 w-14 place-items-center rounded-full bg-white text-ink">
            <ChevronLeft className="h-6 w-6" />
          </button>
          <button type="button" onClick={next} aria-label={t.gallery.next} className="grid h-14 w-14 place-items-center rounded-full bg-white text-ink">
            <ChevronRight className="h-6 w-6" />
          </button>
        </div>
      )}
    </div>
  );
}

function EmptyGallery() {
  const { t } = useLanguage();
  // будущие «рамки» фото — разные формы, без чужих изображений
  const tiles = [
    { cls: "col-span-2 mask-blob3 bg-sky-soft", icon: <MiniSun className="h-10 w-10" /> },
    { cls: "mask-scallop bg-pink-soft", icon: <Heart className="h-6 w-6" color="#FFFFFF" /> },
    { cls: "mask-cloud bg-mint", icon: <Star className="h-6 w-6" /> },
    { cls: "col-span-2 mask-wave bg-butter-soft", icon: <Camera className="h-6 w-6 text-pink/60" /> },
  ];
  return (
    <Reveal className="mt-10 lg:mt-12">
      <div className="petal-a relative grid items-center gap-8 overflow-hidden bg-white p-6 shadow-soft ring-1 ring-pink/15 sm:p-10 lg:grid-cols-[1fr_1.1fr] lg:p-12">
        <Sparkle className="absolute right-6 top-6 h-5 w-5" color="#C4B5FD" />
        <div className="relative z-10 text-center lg:text-left">
          <span className="mask-flower mx-auto grid h-16 w-16 place-items-center bg-butter lg:mx-0">
            <Camera className="h-7 w-7 text-pink-deep" aria-hidden />
          </span>
          <h3 className="mt-4 font-display text-xl font-black text-ink sm:text-2xl">{t.gallery.emptyTitle}</h3>
          <p className="mx-auto mt-2 max-w-md text-base leading-relaxed text-ink-soft lg:mx-0">{t.gallery.emptyText}</p>
          <a
            href={site.instagram.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`${btnPrimary} mt-6 min-h-12 bg-gradient-to-r from-pink-deep via-[#e0479a] to-lavender-deep px-6 text-sm`}
          >
            <InstagramIcon className="h-5 w-5" />
            {t.gallery.instagram}
          </a>
        </div>
        <div aria-hidden className="hidden grid-cols-3 grid-rows-[repeat(2,80px)] gap-3 min-[480px]:grid sm:grid-rows-[repeat(2,112px)]">
          {tiles.map(({ cls, icon }, i) => (
            <div key={i} className={`grid place-items-center ${cls}`}>
              {icon}
            </div>
          ))}
        </div>
      </div>
    </Reveal>
  );
}

export function Gallery({ images }: { images: GalleryImage[] }) {
  const { t } = useLanguage();
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [shown, setShown] = useState(PAGE_SIZE);
  const visible = images.slice(0, shown);
  const close = useCallback(() => setOpenIndex(null), []);

  return (
    <section
      id="gallery"
      aria-labelledby="gallery-title"
      className="relative overflow-hidden bg-gradient-to-b from-cream via-mint-soft to-cream py-12 sm:py-16 lg:py-20"
    >
      <Cloud className="absolute left-[3%] top-10 hidden w-24 animate-drift motion-reduce:animate-none md:block" variant={1} tint="#FFFFFF" />
      <Flower className="absolute right-[5%] top-14 hidden h-8 w-8 animate-bob motion-reduce:animate-none md:block" color="#A7DBF5" center="#FFD166" />
      <Heart className="absolute bottom-10 left-[6%] hidden h-5 w-5 lg:block" color="#C4B5FD" />
      <div className="relative mx-auto max-w-[1320px] px-4 sm:px-6 lg:px-8">
        <SectionHeading id="gallery-title" eyebrow={t.gallery.eyebrow} title={t.gallery.title} text={t.gallery.text} eyebrowClass="bg-lavender/70" />

        {images.length === 0 ? (
          <EmptyGallery />
        ) : (
          <ul className="mt-10 grid grid-flow-dense auto-rows-[132px] grid-cols-2 gap-2.5 min-[480px]:auto-rows-[170px] sm:gap-3 md:grid-cols-3 lg:mt-12 lg:auto-rows-[190px] lg:grid-cols-4 lg:gap-4">
            {visible.map((img, i) => (
              <li key={img.src} className={`shape-shadow relative ${tileSpan(i, visible.length)}`}>
                <button
                  type="button"
                  onClick={() => setOpenIndex(i)}
                  aria-label={`${t.gallery.open}: ${i + 1}`}
                  className={`group absolute inset-0 overflow-hidden bg-mint-soft ${TILE_PATTERN[i % TILE_PATTERN.length].mask}`}
                >
                  <Image
                    src={img.src}
                    alt={`${t.gallery.photoAlt} ${i + 1}`}
                    fill
                    sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
                    className="object-cover object-[center_30%] transition-transform duration-500 group-hover:scale-105"
                  />
                  <span className="absolute inset-0 grid place-items-center bg-ink/0 opacity-0 transition-all duration-300 group-hover:bg-pink-deep/25 group-hover:opacity-100 group-focus-visible:bg-pink-deep/35 group-focus-visible:opacity-100">
                    <span className="mask-flower grid h-14 w-14 place-items-center bg-white text-pink-deep">
                      <ZoomIn className="h-5 w-5" aria-hidden />
                    </span>
                  </span>
                </button>
              </li>
            ))}
          </ul>
        )}

        {images.length > shown && (
          <div className="mt-8 flex justify-center">
            <button
              type="button"
              onClick={() => setShown((n) => n + PAGE_SIZE)}
              className={`${btnSecondary} min-h-12 px-6 text-sm`}
            >
              {t.gallery.more} ({images.length - shown})
            </button>
          </div>
        )}
      </div>

      {openIndex !== null && images.length > 0 && (
        <Lightbox images={images} index={openIndex} onClose={close} onIndex={setOpenIndex} />
      )}
    </section>
  );
}
