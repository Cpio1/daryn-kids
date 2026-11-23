/**
 * Префикс сайта (например "/daryn-kids" на GitHub Pages, "" локально).
 * Значение подставляется при сборке из NEXT_PUBLIC_BASE_PATH.
 */
export const BASE_PATH = (process.env.NEXT_PUBLIC_BASE_PATH ?? "").replace(/\/+$/, "");

/**
 * Путь к файлу из папки public/ с учётом basePath.
 * Внешние ссылки (https://, mailto:, tel:, //cdn…) и якоря возвращаются без изменений.
 */
export function asset(path: string): string {
  if (!path.startsWith("/") || path.startsWith("//")) return path;
  if (BASE_PATH && (path === BASE_PATH || path.startsWith(`${BASE_PATH}/`))) return path;
  return `${BASE_PATH}${path}`;
}
