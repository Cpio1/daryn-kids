/** Векторная иллюстрация «Розовый мир Daryn» для главного экрана (если нет main-page.png). */
export function HeroScene({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 480 400" className={className} aria-hidden preserveAspectRatio="xMidYMid slice">
      <defs>
        <linearGradient id="hs-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#BFE6FA" />
          <stop offset="0.6" stopColor="#E6F4FC" />
          <stop offset="1" stopColor="#FFF9F4" />
        </linearGradient>
        <linearGradient id="hs-hill1" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#9FDDBD" />
          <stop offset="1" stopColor="#6CC99A" />
        </linearGradient>
        <linearGradient id="hs-hill2" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#DDF4E8" />
          <stop offset="1" stopColor="#BFEAD5" />
        </linearGradient>
      </defs>

      <rect width="480" height="400" fill="url(#hs-sky)" />

      {/* Радуга */}
      <g fill="none" strokeLinecap="round" strokeWidth="11" opacity="0.9">
        <path d="M40 250a120 120 0 0 1 240 0" stroke="#F9A8D4" />
        <path d="M52 250a108 108 0 0 1 216 0" stroke="#FFE08A" />
        <path d="M64 250a96 96 0 0 1 192 0" stroke="#BFEAD5" />
        <path d="M76 250a84 84 0 0 1 168 0" stroke="#A7DBF5" />
      </g>

      {/* Солнышко */}
      <g transform="translate(352 112)">
        <g className="hero-sun-rays">
          {Array.from({ length: 12 }, (_, i) => (
            <rect key={i} x="-4" y="-66" width="8" height={i % 2 ? 16 : 22} rx="4" fill={i % 2 ? "#FFB43D" : "#FFD166"} transform={`rotate(${i * 30})`} />
          ))}
        </g>
        <circle r="40" fill="#FFE08A" />
        <circle r="40" fill="#FFF4EA" opacity="0.55" transform="translate(-8 -8) scale(0.6)" />
        <circle cx="-13" cy="-6" r="4.5" fill="#44263A" />
        <circle cx="13" cy="-6" r="4.5" fill="#44263A" />
        <circle cx="-22" cy="8" r="6" fill="#F9A8D4" />
        <circle cx="22" cy="8" r="6" fill="#F9A8D4" />
        <path d="M-12 9q12 14 24 0" stroke="#44263A" strokeWidth="4" fill="none" strokeLinecap="round" />
      </g>

      {/* Облака */}
      <g className="animate-drift motion-reduce:animate-none">
        <path d="M70 92c-12 0-20-7-20-16s9-16 19-16c3-12 13-20 26-20 14 0 24 9 27 21 11 0 19 7 19 15s-8 16-19 16H70z" fill="#fff" />
      </g>
      <g className="animate-drift motion-reduce:animate-none" style={{ animationDelay: "-9s" }}>
        <path d="M232 60c-8 0-14-5-14-11s6-11 13-11c2-8 9-13 18-13 9 0 16 6 18 14 7 0 13 5 13 11s-6 10-13 10h-35z" fill="#FFF7FB" />
      </g>

      {/* Сердечки в небе */}
      {[
        [196, 120, 0.7, "#F472B6"],
        [438, 210, 0.55, "#FFD166"],
        [28, 160, 0.5, "#FFB6A3"],
      ].map(([x, y, s, c]) => (
        <path
          key={`${x}`}
          d="M0 14s-12-7.5-12-15.8C-12-6.2-8.8-9.3-4.8-9.3c2.2 0 3.9 1.1 4.8 2.8.9-1.7 2.6-2.8 4.8-2.8 4 0 7.2 3.1 7.2 7.5C12 6.5 0 14 0 14z"
          fill={c as string}
          transform={`translate(${x} ${y}) scale(${s})`}
        />
      ))}

      {/* Холмы */}
      <path d="M-10 300c80-50 170-60 260-30s170 20 240-10v150H-10z" fill="url(#hs-hill2)" />
      <path d="M-10 330c90-30 160-24 250 0s170 20 250-6v86H-10z" fill="url(#hs-hill1)" />

      {/* Сакура */}
      <g transform="translate(66 250)">
        <rect x="-5" y="20" width="10" height="46" rx="4" fill="#B9798F" />
        <circle cx="0" cy="10" r="30" fill="#F9A8D4" />
        <circle cx="-16" cy="22" r="18" fill="#F472B6" />
        <circle cx="16" cy="20" r="20" fill="#FBCFE8" />
        <circle cx="-8" cy="2" r="4" fill="#fff" />
        <circle cx="12" cy="12" r="4" fill="#fff" />
        <circle cx="-18" cy="20" r="3" fill="#fff" opacity="0.8" />
      </g>

      {/* Здание детского сада */}
      <g transform="translate(178 196)">
        <rect x="0" y="52" width="150" height="104" rx="14" fill="#FFE6DE" />
        <rect x="0" y="52" width="150" height="16" rx="8" fill="#FFB6A3" opacity="0.6" />
        <path d="M-12 60L75 0l87 60z" fill="#F472B6" stroke="#DB2777" strokeWidth="6" strokeLinejoin="round" />
        <path d="M75 26c-6-6-15 0-9 7l9 8 9-8c6-7-3-13-9-7z" fill="#fff" />
        {/* окна */}
        <rect x="16" y="80" width="32" height="30" rx="10" fill="#E6F4FC" stroke="#fff" strokeWidth="4" />
        <rect x="102" y="80" width="32" height="30" rx="10" fill="#E6F4FC" stroke="#fff" strokeWidth="4" />
        {/* дверь */}
        <path d="M58 156v-38a17 17 0 0 1 34 0v38z" fill="#A7DBF5" stroke="#fff" strokeWidth="4" />
        <circle cx="84" cy="138" r="2.5" fill="#44263A" />
        {/* флажки */}
        <path d="M6 70q69 18 138 0" stroke="#44263A" strokeWidth="1.5" fill="none" opacity="0.3" />
        {[18, 44, 70, 96, 122].map((x, i) => (
          <path key={x} d={`M${x} ${73 + (i === 2 ? 4 : i % 2 ? 3 : 1)}l7 0-3.5 9z`} fill={["#F472B6", "#A7DBF5", "#FFE08A", "#BFEAD5", "#F472B6"][i]} />
        ))}
      </g>

      {/* Дети */}
      <g transform="translate(348 286)">
        <path d="M-4 56l-6 24M8 56l4 24" stroke="#44263A" strokeWidth="5" strokeLinecap="round" />
        <path d="M-16 58c0-20 6-32 18-32s18 12 18 32z" fill="#A7DBF5" />
        <circle cx="2" cy="12" r="15" fill="#FFDCC8" />
        <path d="M-13 9c0-12 8-17 15-17s15 5 15 15c-5-4-12-6-30 2z" fill="#5A3B2A" />
        <circle cx="-3" cy="13" r="1.8" fill="#44263A" />
        <circle cx="7" cy="13" r="1.8" fill="#44263A" />
        <path d="M-2 19q4 4 8 0" stroke="#44263A" strokeWidth="1.8" fill="none" strokeLinecap="round" />
        <path d="M20 40l20 6" stroke="#FFDCC8" strokeWidth="6" strokeLinecap="round" />
      </g>
      <g transform="translate(400 296)">
        <path d="M-4 50l-4 20M8 50l4 20" stroke="#44263A" strokeWidth="5" strokeLinecap="round" />
        <path d="M-16 52l8-30h20l8 30z" fill="#FFE08A" />
        <circle cx="2" cy="8" r="14" fill="#F2C9A6" />
        <path d="M-12 6c-2-12 6-18 14-18s16 6 14 18c-3-6-10-9-14-9s-11 3-14 9z" fill="#2E2A3A" />
        <circle cx="-14" cy="4" r="5" fill="#2E2A3A" />
        <circle cx="18" cy="4" r="5" fill="#2E2A3A" />
        <circle cx="-14" cy="-2" r="3" fill="#F472B6" />
        <circle cx="-3" cy="9" r="1.7" fill="#44263A" />
        <circle cx="7" cy="9" r="1.7" fill="#44263A" />
        <path d="M-2 15q4 4 8 0" stroke="#44263A" strokeWidth="1.8" fill="none" strokeLinecap="round" />
      </g>

      {/* Воздушные шары */}
      <g className="animate-float motion-reduce:animate-none">
        <path d="M150 190q6 30-2 60" stroke="#44263A" strokeWidth="1.5" fill="none" opacity="0.45" />
        <ellipse cx="150" cy="172" rx="16" ry="20" fill="#F472B6" />
        <path d="M146 192h8l-4 5z" fill="#F472B6" />
        <path d="M168 196q-2 28 -14 54" stroke="#44263A" strokeWidth="1.5" fill="none" opacity="0.45" />
        <ellipse cx="170" cy="180" rx="14" ry="17" fill="#A7DBF5" />
      </g>

      {/* Цветы */}
      {[
        [120, 352, "#FFFFFF"],
        [300, 368, "#FFE08A"],
        [444, 360, "#A7DBF5"],
        [30, 372, "#FFFFFF"],
      ].map(([x, y, c]) => (
        <g key={`${x}`} transform={`translate(${x} ${y})`}>
          {[0, 72, 144, 216, 288].map((r) => (
            <circle key={r} cx="0" cy="-6" r="5" fill={c as string} transform={`rotate(${r})`} />
          ))}
          <circle r="3.5" fill="#DB2777" />
        </g>
      ))}
    </svg>
  );
}
