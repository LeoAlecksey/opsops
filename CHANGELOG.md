# Changelog

## 0.1.0 — 2026-11-03
- Первая версия сайта на Astro 5 + TypeScript для GitHub Pages.
- Страницы: главная, каталог с поиском и фильтрами, 7 страниц курсов, маршруты обучения, OpsDeck, сообщество, 404.
- Данные шести курсов сверены с публичным API Stepik; курс «Инженер L1» — в статусе «в разработке».
- SEO: canonical, Open Graph с отдельной картинкой для каждой страницы курса, JSON-LD (Organization, Course, FAQPage, BreadcrumbList, SoftwareApplication), sitemap.xml, robots.txt.
- GitHub Actions: публикация на Pages, поддержка собственного домена через переменную `CUSTOM_DOMAIN`, проверка сборки на pull request.
- Аналитика переходов на Stepik/Telegram/OpsDeck (Яндекс Метрика, подключается переменной).
