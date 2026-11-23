/**
 * Единый файл с информацией о детском саде «Дарын».
 * Меняйте телефон, адрес, Instagram, группы и карту здесь —
 * интерфейс подхватит изменения автоматически.
 */

export type Lang = "kk" | "ru";
export type Localized = Record<Lang, string>;

export const site = {
  brand: "Daryn",
  /** Адрес сайта без basePath (домен). На GitHub Pages: https://cpio1.github.io */
  url: "https://cpio1.github.io",

  phone: {
    display: "+7 747 403 45 41",
    tel: "+77474034541",
    whatsapp: "77474034541",
  },

  instagram: {
    handle: "@daryn_bala_baksha",
    url: "https://www.instagram.com/daryn_bala_baksha/",
  },

  address: {
    kk: "Алматы қ., Бостандық ауданы, Қазақфильм ш/а, Әбілқайыр хан к-сі, 18",
    ru: "Алматы, Бостандыкский район, мкр. Казахфильм, ул. Абилхайыр-хан, 18",
  } satisfies Localized,

  /** Строка, по которой 2ГИС ищет адрес (используется для кнопки маршрута). */
  mapQuery: "Алматы, микрорайон Казахфильм, улица Абилхайыр хана, 18",

  /**
   * Координаты для карты 2ГИС.
   * Пока точка не проверена — оставьте null: вместо карты будет показана
   * карточка с адресом и кнопкой 2ГИС (случайная точка не показывается).
   * После проверки в 2ГИС укажите, например: { lat: 43.2xx, lon: 76.8xx }.
   */
  coordinates: null as { lat: number; lon: number } | null,

  /** Ссылка на карточку организации в 2ГИС, если она появится. */
  twoGisFirmUrl: null as string | null,

  hours: {
    open: "08:00",
    close: "18:30",
  },

  whatsappMessage: {
    kk: "Сәлеметсіз бе! Дарын балабақшасы туралы ақпарат алғым келеді.",
    ru: "Здравствуйте! Хотел(а) бы узнать подробнее о детском саде Дарын.",
  } satisfies Localized,
};

export type GroupTheme = "sky" | "peach";

export type Group = {
  id: string;
  name: string;
  level: Localized;
  age: Localized;
  ageShort: string;
  language: Localized;
  theme: GroupTheme;
};

/** Две группы детского сада. Не добавляйте вымышленные группы. */
export const groups: Group[] = [
  {
    id: "erketay",
    name: "Еркетай",
    level: { kk: "Ортаңғы топ", ru: "Средняя группа" },
    age: { kk: "2–3 жас", ru: "2–3 года" },
    ageShort: "2–3",
    language: { kk: "Қазақ тілінде оқыту", ru: "Обучение на казахском языке" },
    theme: "sky",
  },
  {
    id: "kulynshak",
    name: "Құлыншақ",
    level: { kk: "Ересек топ", ru: "Старшая группа" },
    age: { kk: "4–5 жас", ru: "4–5 лет" },
    ageShort: "4–5",
    language: { kk: "Орыс тілінде оқыту", ru: "Обучение на русском языке" },
    theme: "peach",
  },
];

export function whatsappLink(lang: Lang) {
  return `https://wa.me/${site.phone.whatsapp}?text=${encodeURIComponent(site.whatsappMessage[lang])}`;
}

export function twoGisRouteLink() {
  if (site.coordinates) {
    const { lat, lon } = site.coordinates;
    return `https://2gis.kz/almaty/directions/points/%7C${lon}%2C${lat}`;
  }
  if (site.twoGisFirmUrl) return site.twoGisFirmUrl;
  return `https://2gis.kz/almaty/search/${encodeURIComponent(site.mapQuery)}`;
}
