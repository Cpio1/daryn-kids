import { asset } from "@/lib/basePath";

/**
 * Маскоты Daryn (мальчики). Файлы: public/mascots/<name>.webp
 * (обрезанные копии исходников из public/daryn-boy-mascots/mascots/).
 */
export type MascotName = "hero" | "about" | "groups" | "activities" | "nutrition" | "gallery" | "documents" | "contacts";

const SIZES: Record<MascotName, [number, number]> = {
  hero: [368, 399],
  about: [299, 389],
  groups: [315, 372],
  activities: [343, 397],
  nutrition: [362, 369],
  gallery: [373, 407],
  documents: [308, 413],
  contacts: [330, 406],
};

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
  const [w, h] = SIZES[name];
  return (
    <div aria-hidden className={`mascot pointer-events-auto select-none ${className}`}>
      <div
        className={`relative h-full mascot-shadow motion-reduce:animate-none ${motion === "sway" ? "mascot-anim-sway" : "mascot-anim-bounce"}`}
        style={{ animationDelay: `${delay}ms` }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={asset(`/mascots/${name}.webp`)}
          alt=""
          width={w}
          height={h}
          loading={name === "hero" ? "eager" : "lazy"}
          decoding="async"
          draggable={false}
          className={`mascot-hover h-full w-auto max-w-none drop-shadow-[0_10px_14px_rgb(68_38_58/0.15)] ${flip ? "-scale-x-100" : ""}`}
        />
      </div>
    </div>
  );
}
