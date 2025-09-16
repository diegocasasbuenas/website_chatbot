export const SECTIONS = {
  HERO: 0,
  ABOUT: 1,
  SKILLS: 2,
  PROJECTS: 3,
  SERVICES: 4,
} as const;

export const TOTAL_SECTIONS = Object.keys(SECTIONS).length;

export type SectionIndex = typeof SECTIONS[keyof typeof SECTIONS];