import type { APIRoute } from 'astro';

/** Пока сайт не опубликован на постоянном домене, индексацию можно закрыть: ROBOTS_DISALLOW=1 */
export const GET: APIRoute = ({ site }) => {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  const disallow = process.env.ROBOTS_DISALLOW === '1';
  const body = disallow
    ? 'User-agent: *\nDisallow: /\n'
    : `User-agent: *\nAllow: /\n\nSitemap: ${new URL(base + '/sitemap.xml', site).href}\n`;
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
