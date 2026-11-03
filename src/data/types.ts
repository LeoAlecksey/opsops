export type CourseStatus = 'open' | 'soon' | 'private';
export type CourseLevel = 'start' | 'middle' | 'advanced';

export interface CourseModule {
  title: string;
  lessons: string[];
}

export interface FaqItem { q: string; a: string }

export interface Course {
  /** Часть URL: /courses/<slug>/ */
  slug: string;
  /** ID курса на Stepik (null — курс ещё не опубликован) */
  stepikId: number | null;
  /** Своя ссылка на Stepik (например короткая stepik.org/a/<id>); по умолчанию /course/<id>/promo */
  stepikLink?: string;
  /** open — открыт для записи; soon — готовится или ещё не опубликован на Stepik (ссылка на Stepik не показывается); private — закрытый, приглашения не публикуем */
  status: CourseStatus;
  /** Порядок в каталоге */
  order: number;
  /** Показывать на главной */
  featured: boolean;
  title: string;
  /** Короткое имя для карточек и меню */
  shortTitle: string;
  /** Сильный заголовок посадочной страницы */
  headline: string;
  /** Краткое описание (с Stepik) */
  summary: string;
  /** Подробное описание — абзацы */
  description: string[];
  category: string;
  level: CourseLevel;
  /** Цена на Stepik на дату SITE.dataCheckedAt, строкой как на Stepik */
  price: string | null;
  workload: string | null;
  audience: string;
  requirements: string[];
  skills: string[];
  technologies: string[];
  modules: CourseModule[];
  hasFinalProject: boolean;
  /** Обложка генерируется из глифа и акцента */
  cover: { glyph: string; accent: 'teal' | 'green' | 'blue' | 'amber' | 'violet' | 'cyan' };
  seo: { title: string; description: string; keywords: string[] };
  faq: FaqItem[];
}

export interface LearningPath {
  slug: string;
  title: string;
  /** Для кого маршрут */
  forWhom: string;
  startLevel: string;
  prerequisites: string[];
  /** slug курсов в рекомендуемом порядке */
  steps: { course: string; why: string }[];
  skills: string[];
  next: string;
  /** Честная пометка о полноте маршрута */
  note?: string;
}

export const LEVEL_LABEL: Record<CourseLevel, string> = {
  start: 'С нуля',
  middle: 'Средний',
  advanced: 'Продвинутый',
};

export const STATUS_LABEL: Record<CourseStatus, string> = {
  open: 'Открыт для записи',
  soon: 'Скоро открытие',
  private: 'Закрытый курс',
};
