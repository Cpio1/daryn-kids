import "server-only";
import fs from "node:fs";
import path from "node:path";

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
  const image = ["main-page.png", "main-page.jpg", "main-page.webp"].find((f) => exists(`images/${f}`));
  return {
    image: image ? `/images/${image}` : null,
    video: exists("images/main-page2.mp4") ? "/images/main-page2.mp4" : null,
  };
}

/** Все изображения из public/images/gallery, отсортированные по имени файла. */
export function getGalleryImages() {
  const dir = path.join(PUBLIC_DIR, "images", "gallery");
  try {
    return fs
      .readdirSync(dir)
      .filter((f) => IMAGE_EXT.test(f) && !f.startsWith("."))
      .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))
      .map((f) => ({ src: `/images/gallery/${encodeURIComponent(f)}` }));
  } catch {
    return [];
  }
}
