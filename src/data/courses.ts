import type { Course } from './types';

/**
 * Каждый курс — отдельный JSON-файл в src/data/courses/.
 * Чтобы добавить курс, положите новый файл по образцу — компоненты менять не нужно.
 */
const files = import.meta.glob<{ default: Course }>('./courses/*.json', { eager: true });

export const courses: Course[] = Object.values(files)
  .map((m) => m.default)
  .sort((a, b) => a.order - b.order);

export const getCourse = (slug: string) => courses.find((c) => c.slug === slug);

export const stepikUrl = (c: Course) =>
  c.stepikId ? `https://stepik.org/course/${c.stepikId}/promo` : null;

export const lessonCount = (c: Course) =>
  c.modules.reduce((n, m) => n + m.lessons.length, 0);

/** Практические занятия — уроки, которые на Stepik начинаются с «Практика» или «Итоговый практикум» */
export const practiceLessons = (c: Course) =>
  c.modules.flatMap((m) => m.lessons.filter((l) => /^(Практика|Итоговый практикум)/.test(l)));

/** Уроки без квизов — для подсчёта «теория + практика» */
export const contentLessons = (m: { lessons: string[] }) =>
  m.lessons.filter((l) => !/^Квиз/.test(l));
