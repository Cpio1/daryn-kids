"use client";

import { Download, ExternalLink, FileImage, FileText, FolderOpen, HardDrive, Link2, ScrollText, ShieldCheck } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageProvider";
import { documentCategories, documents, type DocumentCategory, type DocumentType } from "@/data/documents";
import { Reveal, SectionHeading } from "./ui";
import { Sparkle } from "./decor/Decor";
import { asset } from "@/lib/basePath";

const CATEGORY_STYLE: Record<DocumentCategory, { icon: LucideIcon; card: string; iconBg: string; shape: string }> = {
  licenses: { icon: ShieldCheck, card: "bg-sky-soft", iconBg: "bg-sky", shape: "rounded-[36px_36px_36px_12px]" },
  founding: { icon: ScrollText, card: "bg-peach-soft", iconBg: "bg-peach", shape: "rounded-[36px]" },
  other: { icon: FolderOpen, card: "bg-mint-soft", iconBg: "bg-mint", shape: "rounded-[12px_36px_36px_36px]" },
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
      <Sparkle className="absolute right-[10%] top-14 hidden h-6 w-6 md:block" color="#FFD65A" />

      <div className="relative mx-auto max-w-[1240px] px-4 sm:px-6 lg:px-8">
        <SectionHeading id="documents-title" eyebrow={t.documents.eyebrow} title={t.documents.title} text={t.documents.text} eyebrowClass="bg-lilac" />

        <div className="mt-10 grid gap-4 md:grid-cols-3 lg:mt-12 lg:gap-6">
          {documentCategories.map((cat, ci) => {
            const style = CATEGORY_STYLE[cat];
            const Icon = style.icon;
            const items = documents.filter((d) => d.category === cat);
            return (
              <Reveal as="article" key={cat} delay={ci * 90}>
                <div className={`flex h-full flex-col p-5 sm:p-6 ${style.card} ${style.shape}`}>
                  <div className="flex items-center gap-3">
                    <span className={`grid h-12 w-12 shrink-0 place-items-center rounded-2xl ${style.iconBg}`}>
                      <Icon className="h-6 w-6 text-ink" aria-hidden />
                    </span>
                    <h3 className="font-display text-lg font-extrabold leading-snug text-ink">{t.documents.categories[cat]}</h3>
                  </div>

                  {items.length === 0 ? (
                    <p className="mt-5 rounded-2xl border-2 border-dashed border-ink/15 bg-white/60 px-4 py-4 text-sm font-semibold text-ink-soft">
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
                          <li key={doc.id} className="rounded-2xl bg-white p-3.5 shadow-soft">
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
                                className="inline-flex min-h-10 items-center gap-1.5 rounded-full bg-ink px-4 text-sm font-extrabold text-white"
                              >
                                <ExternalLink className="h-4 w-4" aria-hidden />
                                {t.documents.open}
                              </a>
                              {isFile && (
                                <a
                                  href={href}
                                  download
                                  aria-label={`${t.documents.download}: ${title}`}
                                  className="inline-flex min-h-10 items-center gap-1.5 rounded-full bg-sun px-4 text-sm font-extrabold text-ink"
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
