/** Декоративные SVG-элементы. Все aria-hidden и pointer-events-none. */

type DecorProps = { className?: string };

const base = "pointer-events-none select-none";

export function Cloud({ className = "", variant = 1 }: DecorProps & { variant?: 1 | 2 | 3 }) {
  const paths: Record<1 | 2 | 3, string> = {
    1: "M24 52c-9 0-16-6-16-14s7-14 15-14c2-10 11-17 22-17 12 0 21 8 23 19 9 0 16 6 16 13s-7 13-16 13H24z",
    2: "M18 50C9 50 3 44 3 37c0-8 7-13 14-13 1-8 8-14 17-14 7 0 12 3 15 9 3-3 7-5 12-5 9 0 16 7 16 15v1c7 1 12 5 12 11s-6 9-13 9H18z",
    3: "M14 46c-6 0-11-4-11-10s5-10 11-10c1-7 7-12 14-12 6 0 10 3 13 7 2-1 4-2 7-2 7 0 12 5 13 11 6 0 10 4 10 8s-4 8-10 8H14z",
  };
  return (
    <svg viewBox="0 0 92 60" className={`${base} ${className}`} aria-hidden>
      <path d={paths[variant]} fill="#fff" />
      <path d={paths[variant]} fill="none" stroke="#8ED8F8" strokeOpacity="0.35" strokeWidth="2" />
    </svg>
  );
}

export function Star({ className = "", color = "#FFD65A" }: DecorProps & { color?: string }) {
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

export function Sparkle({ className = "", color = "#8ED8F8" }: DecorProps & { color?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={`${base} ${className}`} aria-hidden>
      <path d="M12 1c.8 5.5 2.5 8.5 11 11-8.5 2.5-10.2 5.5-11 11-.8-5.5-2.5-8.5-11-11 8.5-2.5 10.2-5.5 11-11z" fill={color} />
    </svg>
  );
}

export function MiniSun({ className = "" }: DecorProps) {
  return (
    <svg viewBox="0 0 40 40" className={`${base} ${className}`} aria-hidden>
      {Array.from({ length: 8 }, (_, i) => (
        <rect key={i} x="18.5" y="1" width="3" height="7" rx="1.5" fill="#FFB43D" transform={`rotate(${i * 45} 20 20)`} />
      ))}
      <circle cx="20" cy="20" r="10" fill="#FFD65A" />
    </svg>
  );
}

export function Rainbow({ className = "" }: DecorProps) {
  const arcs = [
    { r: 46, c: "#FFBDAB" },
    { r: 38, c: "#FFD65A" },
    { r: 30, c: "#BCEBCB" },
    { r: 22, c: "#8ED8F8" },
  ];
  return (
    <svg viewBox="0 0 104 56" className={`${base} ${className}`} aria-hidden>
      {arcs.map(({ r, c }) => (
        <path key={r} d={`M${52 - r} 52a${r} ${r} 0 0 1 ${r * 2} 0`} fill="none" stroke={c} strokeWidth="7" strokeLinecap="round" />
      ))}
    </svg>
  );
}

export function Squiggle({ className = "", color = "#FFBDAB" }: DecorProps & { color?: string }) {
  return (
    <svg viewBox="0 0 80 16" preserveAspectRatio="none" className={`${base} ${className}`} aria-hidden>
      <path d="M2 8c6-8 12-8 18 0s12 8 18 0 12-8 18 0 12 8 18 0" fill="none" stroke={color} strokeWidth="4" strokeLinecap="round" />
    </svg>
  );
}

/** Волна-разделитель между секциями. fill — цвет следующей секции. */
export function Wave({ className = "", fill = "#FFF9ED", flip = false }: DecorProps & { fill?: string; flip?: boolean }) {
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
