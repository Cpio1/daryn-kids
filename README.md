# Daryn 🌞 — сайт ясли-детского сада «Дарын»

Двуязычный (KZ / RU) адаптивный лендинг на **Next.js 16 (App Router) + React 19 + TypeScript + Tailwind CSS v4**.

## Запуск

```bash
npm install
npm run dev          # http://localhost:3000 (без префикса /daryn-kids)
npm run build        # статическая сборка в папку out/
npm run build:pages  # сборка как для GitHub Pages (с префиксом /daryn-kids)
npm run typecheck    # проверка TypeScript
```

Требуется Node.js 20.9+.

Сайт собирается как полностью статический (`output: "export"`), сервер не нужен.
Готовая сборка лежит в `out/`. Чтобы посмотреть обычную сборку: `npm run build && npm run preview` → http://localhost:4173.

## Публикация на GitHub Pages

Сайт: **https://cpio1.github.io/daryn-kids/**

Публикация автоматическая: каждый `git push` в ветку `main` запускает workflow `.github/workflows/deploy.yml`.
Он собирает сайт с `NEXT_PUBLIC_BASE_PATH=/daryn-kids` и публикует `out/` через GitHub Pages Actions.

Один раз в репозитории: **Settings → Pages → Build and deployment → Source: GitHub Actions**.

Ход сборки: вкладка **Actions** → «Deploy to GitHub Pages». Можно запустить вручную: **Run workflow**.

### Пути к файлам
На GitHub Pages сайт живёт по адресу `/daryn-kids/`, поэтому пути к файлам из `public/` в коде
оборачиваются в `asset()` из `src/lib/basePath.ts` (фото, видео, документы и логотип уже обёрнуты).
Если добавляете новый `<img>`, `<video>` или ссылку на файл из `public/`, используйте `asset("/images/...")`.
Якорные ссылки (`#about`) и внешние ссылки менять не нужно.

## Где что менять

| Что | Файл |
| --- | --- |
| Телефон, WhatsApp, Instagram, адрес, часы работы, координаты карты | `src/data/site.ts` |
| Группы (название, возраст, язык обучения) | `src/data/site.ts` → `groups` |
| Все тексты интерфейса на казахском и русском | `src/i18n/translations.ts` |
| Документы | `src/data/documents.ts` |
| Логотип | `src/components/Logo.tsx` (`LOGO_SRC`) и `src/app/icon.svg` (favicon) |

## Медиафайлы

### Главный экран
- `public/images/main-page.png` (или `.jpg` / `.webp`) — фото главного экрана.
- `public/images/main-page2.mp4` — видео главного экрана (без звука при загрузке, есть кнопка включения звука).

Если файлов нет, показывается векторная иллюстрация. Файлы подхватываются при сборке — после добавления сделайте `git push`, и сайт пересоберётся.

### Галерея
Положите фотографии в `public/images/gallery/` (`.jpg`, `.jpeg`, `.png`, `.webp`, `.avif`).
Они появятся автоматически, в порядке имён файлов (удобно: `01.jpg`, `02.jpg`, …).
Если папка пуста, показывается аккуратное пустое состояние со ссылкой на Instagram.
Первые 12 фото видны сразу, остальные — по кнопке «Показать ещё». Просмотр — в модальном окне (стрелки, свайп, Escape).

На GitHub Pages изображения не сжимаются автоматически, поэтому сохраняйте фото в JPEG/WebP шириной до 1600–2000 px и весом до ~500 КБ.

### Документы
1. Положите PDF или изображение в `public/documents/`.
2. Добавьте запись в `src/data/documents.ts`:

```ts
{
  id: "license-1",
  category: "licenses",           // licenses | founding | other
  type: "pdf",                    // pdf | image | drive | link
  title: { kk: "Лицензия", ru: "Лицензия" },
  href: "/documents/license.pdf", // или ссылка на Google Drive (type: "drive")
},
```

Для PDF и изображений появятся кнопки «Открыть» и «Скачать», для Google Drive и ссылок — «Открыть».

### Логотип
Положите файл в `public/images/logo.svg` (или `.png`) и укажите путь в `LOGO_SRC` в `src/components/Logo.tsx`.
Favicon — `src/app/icon.svg` (можно заменить своим SVG).

## Карта 2ГИС

Точный адрес в 2ГИС пока не подтверждён, поэтому в `src/data/site.ts` стоит `coordinates: null`:
вместо карты показывается карточка с адресом и кнопкой «Открыть в 2ГИС» (поиск по адресу).

Когда точка будет проверена в 2ГИС, укажите координаты:

```ts
coordinates: { lat: 43.xxxxx, lon: 76.xxxxx },
```

Тогда на сайте появится интерактивная карта 2ГИС с меткой, а кнопка маршрута будет строить путь прямо до этой точки.
Можно также указать `twoGisFirmUrl` — ссылку на карточку организации в 2ГИС.

## Важные правила проекта

- **Только светлая тема**: `color-scheme: only light`, нет `dark:` классов и реакции на `prefers-color-scheme`.
- **Язык**: по умолчанию казахский. Язык меняется только кнопками KZ / RU и сохраняется в `localStorage` (`daryn-lang`). Определение по браузеру или геолокации не используется.
- Переход по меню учитывает высоту фиксированной шапки (`scroll-margin-top` + CSS-переменная `--header-h`).
- Не добавляйте вымышленные данные: меню, цены, отзывы, лицензии, номера документов.
