/**
 * Временный векторный логотип Daryn 🌞.
 * Чтобы заменить на настоящий файл: положите его в public/images/logo.svg (или .png)
 * и передайте путь в LOGO_SRC — компонент покажет файл вместо SVG.
 */
import Image from "next/image";
import { asset } from "@/lib/basePath";

export const LOGO_SRC: string | null = null; // например "/images/logo.svg"

type SunMarkProps = { className?: string; title?: string };

export function SunMark({ className, title }: SunMarkProps) {
  const rays = Array.from({ length: 12 }, (_, i) => i * 30);
  return (
    <svg
      viewBox="0 0 64 64"
      className={className}
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : true}
      aria-label={title}
    >
      <g className="sun-rays">
        {rays.map((deg, i) => (
          <rect
            key={deg}
            x={29.4}
            y={i % 2 ? 3 : 1.5}
            width={5.2}
            height={i % 2 ? 8 : 10}
            rx={2.6}
            fill={i % 2 ? "#F472B6" : "#FFB6A3"}
            transform={`rotate(${deg} 32 32)`}
          />
        ))}
      </g>
      <g transform="translate(32 32)">
        <circle r={18} fill="#FFD3B8" />
        <circle r={18} fill="url(#daryn-sun-shine)" />
        <circle cx={-6.5} cy={-3} r={2.4} fill="#44263A" />
        <circle cx={6.5} cy={-3} r={2.4} fill="#44263A" />
        <circle cx={-5.8} cy={-3.8} r={0.8} fill="#fff" />
        <circle cx={7.2} cy={-3.8} r={0.8} fill="#fff" />
        <circle cx={-11} cy={3.5} r={3} fill="#F9A8D4" opacity={0.95} />
        <circle cx={11} cy={3.5} r={3} fill="#F9A8D4" opacity={0.95} />
        <path d="M-6 4.5 Q0 11 6 4.5" stroke="#44263A" strokeWidth={2.4} fill="none" strokeLinecap="round" />
      </g>
      <defs>
        <radialGradient id="daryn-sun-shine" cx="0.35" cy="0.3" r="0.8">
          <stop offset="0" stopColor="#FFF4EA" stopOpacity="0.95" />
          <stop offset="0.6" stopColor="#FFD3B8" stopOpacity="0" />
        </radialGradient>
      </defs>
    </svg>
  );
}

type LogoProps = { className?: string; markClassName?: string; withText?: boolean };

export function Logo({ className = "", markClassName = "h-10 w-10", withText = true }: LogoProps) {
  return (
    <span className={`inline-flex items-center gap-2 ${className}`}>
      {LOGO_SRC ? (
        <Image src={asset(LOGO_SRC)} alt="Daryn" width={48} height={48} className={markClassName} />
      ) : (
        <SunMark className={`${markClassName} shrink-0`} />
      )}
      {withText && (
        <span className="font-display text-[1.35rem] font-black leading-none tracking-tight text-ink">
          Dar<span className="text-pink-deep">y</span>n
        </span>
      )}
    </span>
  );
}
