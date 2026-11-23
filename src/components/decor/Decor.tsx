/** Декоративные SVG-элементы. Все aria-hidden и pointer-events-none. */
import { SHAPES, type ShapeName } from "./shapes";

type DecorProps = { className?: string };

const base = "pointer-events-none select-none";

export function Cloud({ className = "", variant = 1, tint = "#FFFFFF" }: DecorProps & { variant?: 1 | 2 | 3; tint?: string }) {
  const paths: Record<1 | 2 | 3, string> = {
    1: "M24 52c-9 0-16-6-16-14s7-14 15-14c2-10 11-17 22-17 12 0 21 8 23 19 9 0 16 6 16 13s-7 13-16 13H24z",
    2: "M18 50C9 50 3 44 3 37c0-8 7-13 14-13 1-8 8-14 17-14 7 0 12 3 15 9 3-3 7-5 12-5 9 0 16 7 16 15v1c7 1 12 5 12 11s-6 9-13 9H18z",
    3: "M14 46c-6 0-11-4-11-10s5-10 11-10c1-7 7-12 14-12 6 0 10 3 13 7 2-1 4-2 7-2 7 0 12 5 13 11 6 0 10 4 10 8s-4 8-10 8H14z",
  };
  return (
    <svg viewBox="0 0 92 60" className={`${base} ${className}`} aria-hidden>
      <path d={paths[variant]} fill={tint} />
      <path d={paths[variant]} fill="none" stroke="#F472B6" strokeOpacity="0.28" strokeWidth="2" />
    </svg>
  );
}

export function Star({ className = "", color = "#FFD166" }: DecorProps & { color?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={`${base} ${className}`} aria-hidden>
      <path
        d="M12 2.5l2.6 5.6 6.1.7-4.5 4.2 1.2 6-5.4-3-5.4 3 1.2-6L3.3 8.8l6.1-.7L12 2.5z"
        fill={color}
        stroke={color}
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Sparkle({ className = "", color = "#C4B5FD" }: DecorProps & { color?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={`${base} ${className}`} aria-hidden>
      <path d="M12 1c.8 5.5 2.5 8.5 11 11-8.5 2.5-10.2 5.5-11 11-.8-5.5-2.5-8.5-11-11 8.5-2.5 10.2-5.5 11-11z" fill={color} />
    </svg>
  );
}

export function Heart({ className = "", color = "#F472B6" }: DecorProps & { color?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={`${base} ${className}`} aria-hidden>
      <path d="M12 21s-8.5-5.3-8.5-11.2C3.5 6.7 5.8 4.5 8.6 4.5c1.6 0 2.8.8 3.4 2 .6-1.2 1.8-2 3.4-2 2.8 0 5.1 2.2 5.1 5.3C20.5 15.7 12 21 12 21z" fill={color} />
      <ellipse cx="8.2" cy="8.6" rx="1.6" ry="1.1" fill="#fff" opacity="0.55" transform="rotate(-30 8.2 8.6)" />
    </svg>
  );
}

export function Flower({ className = "", color = "#FBCFE8", center = "#FFB6A3" }: DecorProps & { color?: string; center?: string }) {
  return (
    <svg viewBox="0 0 40 40" className={`${base} ${className}`} aria-hidden>
      {[0, 72, 144, 216, 288].map((r) => (
        <ellipse key={r} cx="20" cy="10.5" rx="6.5" ry="9" fill={color} transform={`rotate(${r} 20 20)`} />
      ))}
      <circle cx="20" cy="20" r="6" fill={center} />
      <circle cx="18" cy="18" r="1.6" fill="#fff" opacity="0.7" />
    </svg>
  );
}

/** Маленькое солнышко в розово-персиковых тонах. */
export function MiniSun({ className = "" }: DecorProps) {
  return (
    <svg viewBox="0 0 40 40" className={`${base} ${className}`} aria-hidden>
      {Array.from({ length: 8 }, (_, i) => (
        <rect key={i} x="18.5" y="1" width="3" height="7" rx="1.5" fill={i % 2 ? "#F472B6" : "#FFB6A3"} transform={`rotate(${i * 45} 20 20)`} />
      ))}
      <circle cx="20" cy="20" r="10" fill="#FFD3B8" />
      <circle cx="16.5" cy="19" r="1.3" fill="#44263A" />
      <circle cx="23.5" cy="19" r="1.3" fill="#44263A" />
      <path d="M16.5 23q3.5 3 7 0" stroke="#44263A" strokeWidth="1.3" fill="none" strokeLinecap="round" />
    </svg>
  );
}

export function Rainbow({ className = "" }: DecorProps) {
  const arcs = [
    { r: 46, c: "#F472B6" },
    { r: 38, c: "#FFE08A" },
    { r: 30, c: "#BFEAD5" },
    { r: 22, c: "#A7DBF5" },
  ];
  return (
    <svg viewBox="0 0 104 56" className={`${base} ${className}`} aria-hidden>
      {arcs.map(({ r, c }) => (
        <path key={r} d={`M${52 - r} 52a${r} ${r} 0 0 1 ${r * 2} 0`} fill="none" stroke={c} strokeWidth="7" strokeLinecap="round" />
      ))}
    </svg>
  );
}

export function Squiggle({ className = "", color = "#F472B6" }: DecorProps & { color?: string }) {
  return (
    <svg viewBox="0 0 80 16" preserveAspectRatio="none" className={`${base} ${className}`} aria-hidden>
      <path d="M2 8c6-8 12-8 18 0s12 8 18 0 12-8 18 0 12 8 18 0" fill="none" stroke={color} strokeWidth="4" strokeLinecap="round" />
    </svg>
  );
}

/** Пунктирная дуга-«траектория» — связывает элементы композиции. */
export function DashedArc({ className = "", color = "#F472B6" }: DecorProps & { color?: string }) {
  return (
    <svg viewBox="0 0 120 60" className={`${base} ${className}`} aria-hidden>
      <path d="M4 52C24 10 70 0 116 22" fill="none" stroke={color} strokeWidth="2.5" strokeDasharray="2 7" strokeLinecap="round" />
    </svg>
  );
}

/** Волна-разделитель между секциями. fill — цвет следующей секции. */
export function Wave({ className = "", fill = "#FFF9F4", flip = false }: DecorProps & { fill?: string; flip?: boolean }) {
  return (
    <svg
      viewBox="0 0 1440 60"
      preserveAspectRatio="none"
      className={`${base} block h-6 w-full sm:h-10 ${flip ? "rotate-180" : ""} ${className}`}
      aria-hidden
    >
      <path d="M0 32c120-22 240-30 360-14s240 34 360 22 240-38 360-34 240 22 360 26v28H0z" fill={fill} />
    </svg>
  );
}

/** Фигурная подложка (цветок, облако, сердце, капля и др.) — для иконок и бейджей. */
export function Shape({
  name,
  className = "",
  fill = "#FBCFE8",
  stroke,
}: DecorProps & { name: ShapeName; fill?: string; stroke?: string }) {
  return (
    <svg viewBox="0 0 100 100" preserveAspectRatio="none" className={`${base} ${className}`} aria-hidden>
      <path d={SHAPES[name]} fill={fill} stroke={stroke} strokeWidth={stroke ? 3 : undefined} vectorEffect="non-scaling-stroke" />
    </svg>
  );
}
