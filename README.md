# OpsOps Expertise — сайт курсов

Сайт образовательного бренда **SYSOPS · DEVOPS · OPSOPS EXPERTISE**: каталог курсов на Stepik, посадочные страницы курсов, маршруты обучения, страница OpsDeck и сообщество в Telegram.

Стек: **Astro 5 + TypeScript**, чистый CSS, без backend. Каждая страница — статический HTML (хорошо для SEO и GitHub Pages). JavaScript только там, где нужен: фильтры каталога, мобильное меню, аналитика кликов.

## Быстрый старт

```bash
npm ci
npm run dev        # http://localhost:4321
npm run build      # статический сайт в dist/
npm run preview    # посмотреть собранный dist/
npm run check      # проверка типов
```

Нужен Node.js 20+.

## Структура

```
src/
  data/
    courses/*.json   ← один файл = один курс
    paths.ts         ← маршруты обучения
    site.ts          ← название, ссылки, дата сверки цен
    types.ts         ← схема данных
  components/        ← карточки, обложки, FAQ, шапка, подвал
  layouts/Base.astro ← SEO-метаданные, OG, JSON-LD, аналитика
  pages/             ← главная, каталог, курс, маршруты, OpsDeck, сообщество, 404, sitemap, robots
  styles/global.css  ← дизайн-токены и базовые стили
public/
  images/opsdeck/    ← скриншоты из репозитория OpsDeck (MIT)
  og/                ← картинки для соцсетей 1200×630
scripts/og.mjs       ← генерация OG-картинок
```

## Как добавить курс

1. Скопируйте любой файл из `src/data/courses/` под новым именем, например `linux-basics.json`.
2. Заполните поля (`slug`, `stepikId`, `status`, программа в `modules` и т. д.). Схема — в `src/data/types.ts`.
   - `status: "open"` — открыт для записи, кнопка ведёт на Stepik;
   - `status: "soon"` — в разработке, кнопка ведёт в Telegram;
   - `status: "private"` — закрытый курс: страница есть, но ссылки-приглашения не публикуются.
3. Если курс должен войти в маршрут — добавьте его в `src/data/paths.ts`.
4. Обновите OG-картинки: `npm i -D playwright && npm run og` (один раз понадобится `npx playwright install chromium`).
5. `npm run build` — страница `/courses/<slug>/` появится сама.

Цены меняются на Stepik — при обновлении поменяйте `price` в JSON и `dataCheckedAt` в `src/data/site.ts`.

## Публикация на GitHub Pages

1. Создайте репозиторий на GitHub и отправьте туда код (ветка `main`).
2. **Settings → Pages → Build and deployment → Source: GitHub Actions.**
3. Каждый push в `main` собирает и публикует сайт (`.github/workflows/deploy.yml`).

Пока домена нет, сайт будет доступен по адресу `https://<owner>.github.io/<repo>/` — base path подставляется автоматически.

### Подключение своего домена

1. **Settings → Secrets and variables → Actions → Variables → New variable:** `CUSTOM_DOMAIN` = `ваш-домен.ru`.
2. У регистратора DNS:
   - для домена второго уровня (`opsops.ru`) — четыре A-записи на `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153` (и при желании AAAA `2606:50c0:8000::153` … `2606:50c0:8003::153`);
   - для поддомена (`learn.opsops.ru`) — CNAME на `<owner>.github.io`.
3. **Settings → Pages → Custom domain** — укажите тот же домен, дождитесь проверки DNS и включите **Enforce HTTPS**.
4. Перезапустите workflow (Actions → Deploy to GitHub Pages → Run workflow). Сборка переключится на base `/`, в `dist/` появится `CNAME`, а canonical, sitemap и OG-ссылки — на новый домен.

Рекомендуется также подтвердить домен в **Settings → Pages → Verified domains** профиля/организации — это защищает от перехвата домена.

### Переменные сборки

| Переменная (Actions → Variables) | Что делает |
|---|---|
| `CUSTOM_DOMAIN` | Собственный домен. Без неё — адрес `*.github.io/<repo>/` |
| `YANDEX_METRIKA_ID` | Номер счётчика Яндекс Метрики. Без неё счётчик не подключается |
| `ROBOTS_DISALLOW` | `1` — закрыть сайт от индексации (например, на время проверки) |

## Аналитика

Ссылки на Stepik, Telegram и OpsDeck помечены `data-track`. Если подключена Метрика, отправляются цели `stepik_click`, `telegram_click`, `opsdeck_click` с параметрами `course` и `place`. Это **переходы**, а не записи на курс — Stepik не передаёт сайту факт записи.

Перед подключением Метрики стоит добавить на сайт уведомление об использовании cookie и политику обработки данных (152-ФЗ).

## Источники данных

- Названия, описания, цены, нагрузка, аудитория, требования, навыки и программы курсов взяты из публичного API Stepik **3 ноября 2026**.
- Сведения об OpsDeck — из README репозитория [LeoAlecksey/opsdeck](https://github.com/LeoAlecksey/opsdeck) (версия 0.8.4), скриншоты — из `site/img/ru` того же репозитория (MIT).
- Уровень сложности и направление курса — наша классификация на основе требований курса.
