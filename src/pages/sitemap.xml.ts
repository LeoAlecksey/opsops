import type { APIRoute } from 'astro';
import { courses } from '../data/courses';
import { SITE } from '../data/site';

export const GET: APIRoute = ({ site }) => {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  const pages = ['/', '/courses/', '/paths/', '/opsdeck/', '/community/', ...courses.map((c) => `/courses/${c.slug}/`)];
  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages.map((p) => `  <url><loc>${new URL(base + p, site).href}</loc><lastmod>${SITE.dataCheckedAt}</lastmod></url>`).join('\n')}
</urlset>`;
  return new Response(body, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
};
