import type { NextConfig } from "next";

/**
 * Статический экспорт для GitHub Pages.
 * Локально NEXT_PUBLIC_BASE_PATH не задан → сайт работает с корня "/".
 * В GitHub Actions задаётся NEXT_PUBLIC_BASE_PATH=/daryn-kids.
 */
const basePath = (process.env.NEXT_PUBLIC_BASE_PATH ?? "").replace(/\/+$/, "");

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  basePath: basePath || undefined,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
