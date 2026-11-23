import type { Metadata, Viewport } from "next";
import { Nunito } from "next/font/google";
import { LanguageProvider, langBootScript } from "@/i18n/LanguageProvider";
import { site } from "@/data/site";
import { BASE_PATH } from "@/lib/basePath";
import "./globals.css";

// Nunito содержит cyrillic-ext: Ә Ғ Қ Ң Ө Ұ Ү Һ І отображаются корректно
const nunito = Nunito({
  subsets: ["latin", "cyrillic", "cyrillic-ext"],
  weight: ["400", "600", "700", "800", "900", "1000"],
  variable: "--font-nunito",
  display: "swap",
});

const title = "Дарын — бөбекжай-балабақша Алматыда | Daryn";
const description =
  "«Дарын» бөбекжай-балабақшасы — Алматы, Бостандық ауданы, Қазақфильм ш/а. Екі топ: «Еркетай» (2–3 жас) және «Құлыншақ» (4–5 жас), қазақ және орыс тілдерінде оқыту. Ясли-детский сад «Дарын»: две группы, обучение на казахском и русском языках, Пн–Пт 08:00–18:30.";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title,
  description,
  applicationName: "Daryn",
  keywords: ["Дарын", "Daryn", "балабақша Алматы", "детский сад Алматы", "Казахфильм", "Бостандыкский район", "ясли"],
  openGraph: {
    type: "website",
    locale: "kk_KZ",
    alternateLocale: ["ru_RU"],
    siteName: "Daryn",
    title,
    description,
    url: `${BASE_PATH}/`,
    images: [{ url: `${site.url}${BASE_PATH}/og-image.png`, width: 1200, height: 630, alt: "Daryn" }],
  },
  twitter: { card: "summary_large_image", title, description, images: [`${site.url}${BASE_PATH}/og-image.png`] },
  alternates: { canonical: `${BASE_PATH}/` },
  formatDetection: { telephone: false },
  other: { "color-scheme": "only light", "supported-color-schemes": "light" },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#FFF9ED",
  colorScheme: "only light",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="kk" className={nunito.variable} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: langBootScript }} />
      </head>
      <body className="min-h-dvh bg-cream text-ink antialiased">
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
