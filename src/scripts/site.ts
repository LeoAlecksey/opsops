/**
 * 1) Появление блоков при прокрутке.
 * 2) Аналитика кликов: элементы с data-track отправляют цель в Яндекс Метрику,
 *    если счётчик подключён (PUBLIC_YANDEX_METRIKA_ID). Мы фиксируем только
 *    переход на Stepik/Telegram — не запись на курс.
 */
declare global {
  interface Window { ym?: (...args: unknown[]) => void; __ymId?: number; dataLayer?: unknown[] }
}

const io = 'IntersectionObserver' in window
  ? new IntersectionObserver((entries) => {
      for (const e of entries) if (e.isIntersecting) { e.target.classList.add('is-in'); io?.unobserve(e.target); }
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.05 })
  : null;
document.querySelectorAll('.reveal').forEach((el) => (io ? io.observe(el) : el.classList.add('is-in')));

document.addEventListener('click', (ev) => {
  const el = (ev.target as HTMLElement).closest<HTMLElement>('[data-track]');
  if (!el) return;
  const goal = `${el.dataset.track}_click`; // stepik_click, telegram_click, opsdeck_click
  const params = { course: el.dataset.trackCourse, place: el.dataset.trackPlace, href: (el as HTMLAnchorElement).href };
  if (window.ym && window.__ymId) window.ym(window.__ymId, 'reachGoal', goal, params);
  (window.dataLayer ||= []).push({ event: goal, ...params });
});

export {};
