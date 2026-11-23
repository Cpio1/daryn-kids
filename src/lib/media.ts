import "server-only";
import fs from "node:fs";
import path from "node:path";
import { asset } from "./basePath";

const PUBLIC_DIR = path.join(process.cwd(), "public");
const IMAGE_EXT = /\.(png|jpe?g|webp|avif)$/i;

function exists(rel: string) {
  try {
    return fs.statSync(path.join(PUBLIC_DIR, rel)).isFile();
  } catch {
    return false;
  }
}

/** Главное фото/видео: показываются, только если файлы реально лежат в public/images. */
export function getHeroMedia() {
  // ищем main-page.* в public/images/, затем в public/images/gallery/
  const names = ["main-page.png", "main-page.jpg", "main-page.jpeg", "main-page.webp"];
  const image = ["images", "images/gallery"].flatMap((dir) => names.map((n) => `${dir}/${n}`)).find((rel) => exists(rel));
  return {
    image: image ? asset(`/${image}`) : null,
    video: exists("images/main-page2.mp4") ? asset("/images/main-page2.mp4") : null,
  };
}

/** Фото или видео для раздела «О нас»: public/images/about.(jpg|png|webp) и/или about.mp4. */
export function getAboutMedia() {
  const image = ["about.jpg", "about.jpeg", "about.png", "about.webp"].find((f) => exists(`images/${f}`));
  return {
    image: image ? asset(`/images/${image}`) : null,
    video: exists("images/about.mp4") ? asset("/images/about.mp4") : null,
  };
}

/** Фотографии комнаты развития моторики: public/images/motorika/ */
export function getMotorImages() {
  return listImages("motorika");
}

/** Все изображения из public/images/gallery, отсортированные по имени файла. */
export function getGalleryImages() {
  return listImages("gallery");
}

function listImages(folder: string) {
  const dir = path.join(PUBLIC_DIR, "images", folder);
  try {
    return fs
      .readdirSync(dir)
      .filter((f) => IMAGE_EXT.test(f) && !f.startsWith("."))
      .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))
      .map((f) => ({ src: asset(`/images/${folder}/${encodeURIComponent(f)}`) }));
  } catch {
    return [];
  }
}
