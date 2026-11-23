"use client";

import { Download, ExternalLink, FileImage, FileText, FolderOpen, HardDrive, Link2, ScrollText, ShieldCheck } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageProvider";
import { documentCategories, documents, type DocumentCategory, type DocumentType } from "@/data/documents";
import { Reveal, SectionHeading } from "./ui";
import { Flower, Heart, Shape, Sparkle } from "./decor/Decor";
import type { ShapeName } from "./decor/shapes";
import { asset } from "@/lib/basePath";

/** Карточки-«папки»: у каждой своя вкладка, цвет и фигурный бейдж. */
const CATEGORY_STYLE: Record<
  DocumentCategory,
  { icon: LucideIcon; card: string; tab: string; tabPos: string; badge: ShapeName; badgeFill: string; shape: string }
> = {
  licenses: { icon: ShieldCheck, card: "bg-sky-soft", tab: "bg-sky-soft", tabPos: "left-6", badge: "scallop", badgeFill: "#A7DBF5", shape: "rounded-[10px_34px_34px_34px]" },
  founding: { icon: ScrollText, card: "bg-butter-soft", tab: "bg-butter-soft", tabPos: "left-1/2 -translate-x-1/2", badge: "flower", badgeFill: "#FFE08A", shape: "rounded-[34px]" },
  other: { icon: FolderOpen, card: "bg-mint-soft", tab: "bg-mint-soft", tabPos: "right-6", badge: "cloud", badgeFill: "#BFEAD5", shape: "rounded-[34px_10px_34px_34px]" },
};

const TYPE_ICON: Record<DocumentType, LucideIcon> = {
  pdf: FileText,
  image: FileImage,
  drive: HardDrive,
  link: Link2,
};

export function Documents() {
  const { t, lang } = useLanguage();

  return (
    <section id="documents" aria-labelledby="documents-title" className="relative overflow-hidden bg-white py-12 sm:py-16 lg:py-20">
      <div aria-hidden className="dotted-bg absolute inset-0 opacity-50 [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)]" />
      <div aria-hidden className="mask-blob2 pointer-events-none absolute -left-20 bottom-0 h-48 w-48 bg-lavender-soft sm:h-64 sm:w-64" />
      <Sparkle className="absolute right-[10%] top-14 hidden h-6 w-6 md:block" color="#F472B6" />
      <Flower className="absolute left-[8%] top-20 hidden h-7 w-7 md:block" color="#FFE08A" center="#F472B6" />

      <div className="relative mx-auto max-w-[1240px] px-4 sm:px-6 lg:px-8">
        <SectionHeading id="documents-title" eyebrow={t.documents.eyebrow} title={t.documents.title} text={t.documents.text} eyebrowClass="bg-lavender" />

        <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3 md:gap-5 lg:mt-14 lg:gap-6">
          {documentCategories.map((cat, ci) => {
            const style = CATEGORY_STYLE[cat];
            const Icon = style.icon;
            const items = documents.filter((d) => d.category === cat);
            return (
              <Reveal as="article" key={cat} delay={ci * 90}>
                <div className={`relative flex h-full flex-col p-5 shadow-soft transition-transform duration-300 hover:-translate-y-1 sm:p-6 ${style.card} ${style.shape}`}>
                  {/* вкладка папки */}
                  <span aria-hidden className={`absolute -top-3.5 h-6 w-24 rounded-t-[16px] ${style.tab} ${style.tabPos}`} />
                  {ci === 1 && <Heart className="absolute right-5 top-5 h-4 w-4" color="#F472B6" />}
                  <div className="flex items-center gap-3">
                    <span className="relative grid h-12 w-12 shrink-0 place-items-center">
                      <Shape name={style.badge} fill={style.badgeFill} className="absolute inset-0 h-full w-full" />
                      <Icon className="relative h-6 w-6 text-ink" aria-hidden />
                    </span>
                    <h3 className="font-display text-lg font-extrabold leading-snug text-ink">{t.documents.categories[cat]}</h3>
                  </div>

                  {items.length === 0 ? (
                    <p className="mt-5 rounded-[20px_20px_20px_6px] border-2 border-dashed border-pink/40 bg-white/70 px-4 py-4 text-sm font-semibold text-ink-soft">
                      {t.documents.soon}
                    </p>
                  ) : (
                    <ul className="mt-5 grid gap-2.5">
                      {items.map((doc) => {
                        const TypeIcon = TYPE_ICON[doc.type];
                        const isFile = doc.type === "pdf" || doc.type === "image";
                        const title = doc.title[lang];
                        const href = asset(doc.href);
                        return (
                          <li key={doc.id} className="rounded-[22px_22px_22px_8px] bg-white p-3.5 shadow-soft">
                            <div className="flex items-start gap-3">
                              <TypeIcon className="mt-0.5 h-5 w-5 shrink-0 text-ink-soft" aria-hidden />
                              <div className="min-w-0 flex-1">
                                <p className="break-words text-[15px] font-bold leading-snug text-ink">{title}</p>
                                <p className="text-xs font-semibold text-ink-soft">{t.documents.types[doc.type]}</p>
                              </div>
                            </div>
                            <div className="mt-3 flex flex-wrap gap-2">
                              <a
                                href={href}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label={`${t.documents.open}: ${title}`}
                                className="inline-flex min-h-10 items-center gap-1.5 rounded-full bg-pink-deep px-4 text-sm font-extrabold text-white transition-colors hover:bg-[#c41f6a]"
                              >
                                <ExternalLink className="h-4 w-4" aria-hidden />
                                {t.documents.open}
                              </a>
                              {isFile && (
                                <a
                                  href={href}
                                  download
                                  aria-label={`${t.documents.download}: ${title}`}
                                  className="inline-flex min-h-10 items-center gap-1.5 rounded-full bg-white px-4 text-sm font-extrabold text-pink-ink ring-2 ring-pink/50 transition-colors hover:bg-blush"
                                >
                                  <Download className="h-4 w-4" aria-hidden />
                                  {t.documents.download}
                                </a>
                              )}
                            </div>
                          </li>
                        );
                      })}
                    </ul>
                  )}
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
