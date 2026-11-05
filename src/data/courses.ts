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

/** Ссылка на Stepik — только для открытых курсов (закрытые и неопубликованные не светим). */
export const stepikUrl = (c: Course) =>
  c.status === 'open' && c.stepikId ? (c.stepikLink ?? `https://stepik.org/course/${c.stepikId}/promo`) : null;

const PRACTICE_RE = /^(Практика|Итоговый практикум|Лаба|Финальный проект)/;
const TEST_RE = /^(Квиз|Контрольная точка)/;
export const lessonKind = (title: string): 'practice' | 'quiz' | 'lesson' =>
  PRACTICE_RE.test(title) ? 'practice' : TEST_RE.test(title) ? 'quiz' : 'lesson';

export const lessonCount = (c: Course) =>
  c.modules.reduce((n, m) => n + m.lessons.length, 0);

/** Практические занятия — уроки, которые на Stepik начинаются с «Практика» или «Итоговый практикум» */
export const practiceLessons = (c: Course) =>
  c.modules.flatMap((m) => m.lessons.filter((l) => lessonKind(l) === 'practice'));

/** Уроки без тестов — для подсчёта «теория + практика» */
export const contentLessons = (m: { lessons: string[] }) =>
  m.lessons.filter((l) => lessonKind(l) !== 'quiz');

/** Промокод активен на момент сборки (дата until включительно, по Москве) */
export const activePromo = (c: Course) =>
  c.promo && new Date(c.promo.until + 'T23:59:59+03:00') >= new Date() ? c.promo : null;
