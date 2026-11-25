import type { CSSProperties } from "react";
import { asset } from "@/lib/basePath";

/**
 * Маскоты Daryn (мальчики). Файлы: public/mascots/0X_<name>.png —
 * исправленные PNG без изменений (1161×1355, прозрачный фон).
 *
 * Персонаж занимает центральную часть холста, вокруг — прозрачные поля.
 * Чтобы раскладка секций не зависела от этих полей, контейнер получает
 * пропорции контура персонажа (BOX, в пикселях исходника, с запасом),
 * а PNG целиком (object-fit: contain, без растяжения) сдвигается так,
 * чтобы персонаж точно заполнил контейнер. Сам файл не обрезается и не
 * изменяется; за пределами контейнера остаются только полностью
 * прозрачные пиксели.
 */
export type MascotName = "hero" | "about" | "groups" | "activities" | "nutrition" | "gallery" | "documents" | "contacts";

const FILES: Record<MascotName, string> = {
  hero: "01_hero.png",
  about: "02_about.png",
  groups: "03_groups.png",
  activities: "04_activities.png",
  nutrition: "05_nutrition.png",
  gallery: "06_gallery.png",
  documents: "07_documents.png",
  contacts: "08_contacts.png",
};

/** Размер исходного PNG */
const SRC_W = 1161;
const SRC_H = 1355;

/** Контур персонажа в исходнике: [x, y, ширина, высота] */
const BOX: Record<MascotName, [number, number, number, number]> = {
  hero: [244, 293, 670, 770],
  about: [259, 285, 680, 828],
  groups: [292, 301, 584, 750],
  activities: [284, 279, 599, 827],
  nutrition: [230, 291, 711, 793],
  gallery: [267, 316, 605, 720],
  documents: [235, 325, 721, 705],
  contacts: [266, 292, 643, 911],
};

const pct = (v: number) => `${(v * 100).toFixed(4)}%`;

type Props = {
  name: MascotName;
  /** Позиция и размер контейнера (высоту задавайте классами h-*) */
  className?: string;
  motion?: "sway" | "bounce";
  /** задержка анимации, чтобы маскоты двигались не синхронно */
  delay?: number;
  flip?: boolean;
};

export function Mascot({ name, className = "", motion = "sway", delay = 0, flip = false }: Props) {
  const [x, y, w, h] = BOX[name];
  const imgStyle: CSSProperties = {
    position: "absolute",
    left: pct(-x / w),
    top: pct(-y / h),
    width: pct(SRC_W / w),
    height: pct(SRC_H / h),
    maxWidth: "none",
    objectFit: "contain",
  };
  return (
    <div aria-hidden className={`mascot pointer-events-auto select-none ${className}`}>
      <div
        className={`relative h-full mascot-shadow motion-reduce:animate-none ${motion === "sway" ? "mascot-anim-sway" : "mascot-anim-bounce"}`}
        style={{ animationDelay: `${delay}ms` }}
      >
        <div
          className={`mascot-hover relative h-full overflow-hidden ${flip ? "-scale-x-100" : ""}`}
          style={{ aspectRatio: `${w} / ${h}` }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={asset(`/mascots/${FILES[name]}`)}
            alt=""
            width={SRC_W}
            height={SRC_H}
            loading={name === "hero" ? "eager" : "lazy"}
            decoding="async"
            draggable={false}
            className="pointer-events-none"
            style={imgStyle}
          />
        </div>
      </div>
    </div>
  );
}
