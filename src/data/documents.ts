import type { Localized } from "./site";

/**
 * Документы детского сада.
 *
 * Как добавить документ:
 * 1. PDF или изображение положите в папку `public/documents/`
 *    и укажите href: "/documents/имя-файла.pdf".
 * 2. Для Google Drive укажите полную ссылку в href и type: "drive".
 *
 * Пример:
 * {
 *   id: "license-1",
 *   category: "licenses",
 *   type: "pdf",
 *   title: { kk: "Білім беру қызметіне лицензия", ru: "Лицензия на образовательную деятельность" },
 *   href: "/documents/license.pdf",
 * },
 *
 * Не добавляйте вымышленные документы и номера.
 */

export type DocumentCategory = "licenses" | "founding" | "other";
export type DocumentType = "pdf" | "image" | "drive" | "link";

export type DocumentItem = {
  id: string;
  category: DocumentCategory;
  type: DocumentType;
  title: Localized;
  href: string;
};

export const documentCategories: DocumentCategory[] = ["licenses", "founding", "other"];

export const documents: DocumentItem[] = [];
