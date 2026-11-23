"use client";

import { useEffect, useRef, useState } from "react";

/** Плавное появление при прокрутке. Без JS контент виден сразу. */
export function Reveal({
  children,
  className = "",
  delay = 0,
  as: Tag = "div",
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  as?: "div" | "li" | "article";
}) {
  const ref = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!("IntersectionObserver" in window)) {
      setVisible(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setVisible(true);
          io.disconnect();
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.05 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <Tag
      ref={ref as never}
      className={`reveal ${visible ? "is-visible" : ""} ${className}`}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </Tag>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  text,
  align = "center",
  eyebrowClass = "bg-sun/70",
  id,
}: {
  id?: string;
  eyebrow: string;
  title: string;
  text?: string;
  align?: "center" | "left";
  eyebrowClass?: string;
}) {
  const center = align === "center";
  return (
    <Reveal className={`${center ? "mx-auto text-center" : ""} max-w-2xl`}>
      <span
        className={`inline-block rounded-full px-3.5 py-1 text-xs font-extrabold uppercase tracking-[0.08em] text-ink sm:text-sm ${eyebrowClass}`}
      >
        {eyebrow}
      </span>
      <h2 id={id} className="mt-3 font-display text-[1.6rem] font-extrabold leading-[1.2] text-ink sm:text-3xl lg:text-[2.35rem]">
        {title}
      </h2>
      {text && <p className="mt-3 text-base leading-relaxed text-ink-soft sm:text-lg">{text}</p>}
    </Reveal>
  );
}
