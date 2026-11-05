/** Общие данные бренда. Меняются в одном месте. */
export const SITE = {
  name: 'OpsOps Expertise',
  fullName: 'SYSOPS · DEVOPS · OPSOPS EXPERTISE',
  slogan: 'LEARN. BUILD. OPERATE.',
  tagline: 'Практическое IT-образование: от первых команд до инженерной экспертизы',
  description:
    'Практические курсы по системному администрированию, Linux, DevOps и эксплуатации инфраструктуры: Proxmox VE, Ansible, GitLab CI, K3s, ИИ в DevOps и старт карьеры в IT через техподдержку.',
  lang: 'ru',
  locale: 'ru_RU',
  telegram: 'https://t.me/sys_admin_expert',
  telegramHandle: '@sys_admin_expert',
  stepikProfile: '', // ссылка на профиль автора на Stepik — заполнить при необходимости
  opsdeckRepo: 'https://github.com/LeoAlecksey/opsdeck',
  opsdeckSite: 'https://leoalecksey.github.io/opsdeck/',
  /** Дата, на которую сверены цены и программы с Stepik */
  dataCheckedAt: '2026-11-05',
} as const;
