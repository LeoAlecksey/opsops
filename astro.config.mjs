// @ts-check
import { defineConfig } from 'astro/config';

/**
 * Адрес сайта задаётся переменными окружения при сборке (см. .github/workflows/deploy.yml):
 *   SITE_URL  — https://example.ru  или  https://<owner>.github.io
 *   BASE_PATH — "/" для собственного домена или "/<repo>/" для адреса GitHub Pages проекта
 * Локально по умолчанию: http://localhost:4321 и "/".
 */
const site = process.env.SITE_URL || 'http://localhost:4321';
const base = process.env.BASE_PATH || '/';

export default defineConfig({
  site,
  base,
  trailingSlash: 'always',
  build: { format: 'directory', assets: '_assets' },
  compressHTML: true,
});
