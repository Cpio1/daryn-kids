"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { Camera, ChevronLeft, ChevronRight, X, ZoomIn } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageProvider";
import { site } from "@/data/site";
import { InstagramIcon } from "./BrandIcons";
import { Reveal, SectionHeading } from "./ui";
import { Cloud, MiniSun, Star } from "./decor/Decor";

export type GalleryImage = { src: string };

/** Повторяющийся узор размеров плиток (mobile: 2 колонки, desktop: 4 колонки). */
const PAGE_SIZE = 12;

const TILE_PATTERN = [
  "col-span-2 row-span-2 rounded-[36px_36px_36px_12px]",
  "row-span-1 rounded-[28px]",
  "row-span-2 rounded-[28px_28px_12px_28px]",
  "row-span-1 rounded-[12px_28px_28px_28px]",
  "col-span-2 row-span-1 rounded-[28px]",
  "row-span-1 rounded-[28px_12px_28px_28px]",
];

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
      className="fixed inset-0 z-[70] flex flex-col bg-ink/92 backdrop-blur-sm"
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
  const tiles = ["bg-sky-soft", "bg-peach-soft", "bg-mint-soft", "bg-sun-soft"];
  return (
    <Reveal className="mt-10 lg:mt-12">
      <div className="relative grid items-center gap-8 overflow-hidden rounded-[40px] bg-white p-6 shadow-soft ring-1 ring-ink/5 sm:p-10 lg:grid-cols-[1fr_1.1fr] lg:p-12">
        <div className="relative z-10 text-center lg:text-left">
          <span className="mx-auto grid h-16 w-16 place-items-center rounded-[22px] bg-sun lg:mx-0">
            <Camera className="h-8 w-8 text-ink" aria-hidden />
          </span>
          <h3 className="mt-4 font-display text-xl font-extrabold text-ink sm:text-2xl">{t.gallery.emptyTitle}</h3>
          <p className="mx-auto mt-2 max-w-md text-base leading-relaxed text-ink-soft lg:mx-0">{t.gallery.emptyText}</p>
          <a
            href={site.instagram.url}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex min-h-12 items-center gap-2 rounded-full bg-gradient-to-r from-[#f58529] via-[#dd2a7b] to-[#8134af] px-6 text-sm font-extrabold text-white shadow-soft transition-transform hover:-translate-y-0.5"
          >
            <InstagramIcon className="h-5 w-5" />
            {t.gallery.instagram}
          </a>
        </div>
        {/* Пустые «рамки» будущих фото — без чужих изображений */}
        <div aria-hidden className="hidden grid-cols-3 grid-rows-[repeat(2,72px)] min-[480px]:grid gap-2.5 sm:grid-rows-[repeat(2,110px)] sm:gap-3">
          {tiles.map((cls, i) => (
            <div
              key={cls}
              className={`grid place-items-center ${cls} ${i === 0 ? "col-span-2 rounded-[28px_28px_28px_10px]" : i === 3 ? "col-span-2 rounded-[10px_28px_28px_28px]" : "rounded-[24px]"}`}
            >
              {i === 0 ? <MiniSun className="h-10 w-10" /> : i === 2 ? <Star className="h-7 w-7" color="#FFBDAB" /> : <Camera className="h-6 w-6 text-ink/20" />}
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
      className="relative overflow-hidden bg-gradient-to-b from-cream via-mint-soft/60 to-cream py-12 sm:py-16 lg:py-20"
    >
      <Cloud className="absolute left-[3%] top-10 hidden w-24 animate-drift motion-reduce:animate-none md:block" variant={1} />
      <div className="relative mx-auto max-w-[1320px] px-4 sm:px-6 lg:px-8">
        <SectionHeading id="gallery-title" eyebrow={t.gallery.eyebrow} title={t.gallery.title} text={t.gallery.text} eyebrowClass="bg-sky/70" />

        {images.length === 0 ? (
          <EmptyGallery />
        ) : (
          <ul className="mt-10 grid grid-flow-dense auto-rows-[132px] grid-cols-2 gap-2.5 min-[480px]:auto-rows-[170px] sm:gap-3 md:grid-cols-3 lg:mt-12 lg:auto-rows-[190px] lg:grid-cols-4 lg:gap-4">
            {visible.map((img, i) => (
              <li key={img.src} className={`relative overflow-hidden ${TILE_PATTERN[i % TILE_PATTERN.length]}`}>
                <button
                  type="button"
                  onClick={() => setOpenIndex(i)}
                  aria-label={`${t.gallery.open}: ${i + 1}`}
                  className="group absolute inset-0 overflow-hidden rounded-[inherit] bg-sky-soft"
                >
                  <Image
                    src={img.src}
                    alt={`${t.gallery.photoAlt} ${i + 1}`}
                    fill
                    sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
                    className="object-cover object-[center_30%] transition-transform duration-500 group-hover:scale-105"
                  />
                  <span className="absolute inset-0 grid place-items-center bg-ink/0 opacity-0 transition-all duration-300 group-hover:bg-ink/25 group-hover:opacity-100 group-focus-visible:bg-ink/25 group-focus-visible:opacity-100">
                    <span className="grid h-12 w-12 place-items-center rounded-full bg-white text-ink">
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
              className="inline-flex min-h-12 items-center gap-2 rounded-full bg-white px-6 text-sm font-extrabold text-ink shadow-soft ring-1 ring-ink/10 transition-transform hover:-translate-y-0.5"
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
