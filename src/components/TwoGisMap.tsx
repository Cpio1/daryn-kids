"use client";

import { useEffect, useRef, useState } from "react";
import { MapPin, Navigation } from "lucide-react";
import { site, twoGisRouteLink } from "@/data/site";
import { useLanguage } from "@/i18n/LanguageProvider";
import { Cloud, Star } from "./decor/Decor";
import { btnPrimary } from "@/lib/styles";

type DGMap = { remove: () => void };
type DGApi = {
  then: (cb: () => void) => void;
  map: (el: HTMLElement, opts: Record<string, unknown>) => DGMap & object;
  marker: (latlng: [number, number]) => { addTo: (m: unknown) => { bindPopup: (s: string) => unknown } };
};

declare global {
  interface Window {
    DG?: DGApi;
  }
}

const LOADER_SRC = "https://maps.api.2gis.ru/2.0/loader.js?pkg=basic";

function loadDG(): Promise<DGApi> {
  return new Promise((resolve, reject) => {
    if (window.DG) return window.DG.then(() => resolve(window.DG!));
    const existing = document.querySelector<HTMLScriptElement>(`script[src="${LOADER_SRC}"]`);
    const script = existing ?? document.createElement("script");
    script.addEventListener("load", () => window.DG?.then(() => resolve(window.DG!)));
    script.addEventListener("error", reject);
    if (!existing) {
      script.src = LOADER_SRC;
      script.async = true;
      document.head.appendChild(script);
    }
  });
}

/**
 * Карта 2ГИС показывается только при заданных и проверенных координатах
 * (site.coordinates). Без них — аккуратная карточка с адресом и кнопкой 2ГИС,
 * чтобы не указывать случайную точку.
 */
export function TwoGisMap() {
  const { t, lang } = useLanguage();
  const ref = useRef<HTMLDivElement>(null);
  const [failed, setFailed] = useState(false);
  const coords = site.coordinates;

  useEffect(() => {
    if (!coords || !ref.current) return;
    let map: DGMap | null = null;
    let cancelled = false;
    const el = ref.current;
    // Загружаем карту только когда блок близко к экрану
    const io = new IntersectionObserver(
      (entries) => {
        if (!entries.some((e) => e.isIntersecting)) return;
        io.disconnect();
        loadDG()
          .then((DG) => {
            if (cancelled) return;
            map = DG.map(el, { center: [coords.lat, coords.lon], zoom: 17, fullscreenControl: false, scrollWheelZoom: false });
            DG.marker([coords.lat, coords.lon]).addTo(map).bindPopup("Daryn");
          })
          .catch(() => setFailed(true));
      },
      { rootMargin: "200px" },
    );
    io.observe(el);
    return () => {
      cancelled = true;
      io.disconnect();
      map?.remove();
    };
  }, [coords]);

  if (coords && !failed) {
    return (
      <div className="petal-c relative h-full min-h-[300px] overflow-hidden bg-lavender-soft shadow-soft ring-4 ring-white">
        <div ref={ref} className="absolute inset-0" role="region" aria-label={t.contacts.mapTitle} />
      </div>
    );
  }

  return (
    <div className="shape-shadow h-full">
    <div className="mask-blob3 relative flex h-full min-h-[340px] flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-sky-soft via-white to-mint-soft px-10 py-12 text-center sm:px-14">
      <div aria-hidden className="dotted-bg absolute inset-0 opacity-70" />
      <Cloud className="absolute left-[12%] top-[12%] w-16 sm:w-20" variant={3} tint="#FFFFFF" />
      <Star className="absolute bottom-[16%] right-[14%] h-6 w-6" color="#F472B6" />
      <span className="relative grid h-16 w-16 place-items-center">
        <span aria-hidden className="mask-heart absolute inset-0 bg-pink-deep" />
        <MapPin className="relative -mt-1 h-7 w-7 text-white" aria-hidden />
      </span>
      <p className="relative mt-4 max-w-sm font-display text-base font-extrabold leading-snug text-ink sm:text-lg">{site.address[lang]}</p>
      <p className="relative mt-2 max-w-sm text-sm leading-relaxed text-ink-soft">{t.contacts.mapPending}</p>
      <a
        href={twoGisRouteLink()}
        target="_blank"
        rel="noopener noreferrer"
        className={`${btnPrimary} relative mt-5 min-h-12 px-5 text-sm`}
      >
        <Navigation className="h-4 w-4" aria-hidden />
        {t.contacts.openIn2gis}
      </a>
    </div>
    </div>
  );
}
