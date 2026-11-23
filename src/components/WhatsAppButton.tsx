"use client";

import { useEffect, useState } from "react";
import { useLanguage } from "@/i18n/LanguageProvider";
import { whatsappLink } from "@/data/site";
import { WhatsAppIcon } from "./BrandIcons";

/**
 * Плавающая кнопка WhatsApp. Появляется после главного экрана (чтобы не дублировать
 * и не перекрывать главную кнопку) и прячется, когда видна большая кнопка в «Контактах».
 */
export function WhatsAppButton() {
  const { t, lang } = useLanguage();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let contactsVisible = false;
    const update = () => setVisible(window.scrollY > window.innerHeight * 0.6 && !contactsVisible);

    const contacts = document.getElementById("contacts");
    let io: IntersectionObserver | null = null;
    if (contacts && "IntersectionObserver" in window) {
      io = new IntersectionObserver(
        ([entry]) => {
          contactsVisible = entry.isIntersecting;
          update();
        },
        { threshold: 0.35 },
      );
      io.observe(contacts);
    }

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      io?.disconnect();
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <a
      href={whatsappLink(lang)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={t.whatsappFloat}
      tabIndex={visible ? 0 : -1}
      aria-hidden={!visible}
      className={`fixed bottom-[max(16px,env(safe-area-inset-bottom))] right-4 z-40 inline-flex h-14 items-center gap-2 rounded-full bg-pink-deep pl-4 pr-4 text-white shadow-[0_14px_30px_-10px_rgb(219_39_119/0.75)] transition-all duration-300 hover:-translate-y-0.5 sm:right-6 lg:bottom-6 lg:pr-5 ${
        visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-6 opacity-0"
      }`}
    >
      <span aria-hidden className="absolute inset-0 -z-10 animate-ping rounded-full bg-pink/40 [animation-duration:2.6s] [animation-iteration-count:3] motion-reduce:hidden" />
      <WhatsAppIcon className="h-7 w-7" />
      <span className="hidden text-sm font-extrabold lg:inline">{t.whatsappFloat}</span>
    </a>
  );
}
