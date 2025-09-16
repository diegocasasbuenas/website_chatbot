import { SECTIONS, type SectionIndex } from "@/app/constants/sections";

export interface BlobConfig {
  center: [number, number];
  deformation: number;
  radius: number;
  visibility: number;
}

export interface SectionBlobConfig {
  green: BlobConfig;
  orange: BlobConfig;
  blend: number;
}

export const SECTION_CONFIGS: Record<SectionIndex, SectionBlobConfig> = {
  [SECTIONS.HERO]: {
    green: { center: [0.2, 0.7], deformation: 0.1, radius: 0.33, visibility: 1.0 },
    orange: { center: [0.8, 0.3], deformation: 0.1, radius: 0.33, visibility: 1.0 },
    blend: 0.0
  },
  [SECTIONS.ABOUT]: {
    green: { center: [0.3, 0.6], deformation: 0.15, radius: 0.3, visibility: 0.6 },
    orange: { center: [0.7, 0.4], deformation: 0.1, radius: 0.25, visibility: 0.6 },
    blend: 0.1
  },
  [SECTIONS.SKILLS]: {
    green: { center: [0.4, 0.5], deformation: 0.2, radius: 0.32, visibility: 0.5 },
    orange: { center: [0.6, 0.5], deformation: 0.2, radius: 0.32, visibility: 0.5 },
    blend: 0.6
  },
  [SECTIONS.PROJECTS]: {
    green: { center: [0.6, 0.4], deformation: 0.15, radius: 0.28, visibility: 0.6 },
    orange: { center: [0.4, 0.6], deformation: 0.1, radius: 0.25, visibility: 0.6 },
    blend: 0.1
  },
  [SECTIONS.SERVICES]: {
    green: { center: [0.7, 0.3], deformation: 0.1, radius: 0.3, visibility: 0.7 },
    orange: { center: [0.3, 0.7], deformation: 0.1, radius: 0.3, visibility: 0.2 },
    blend: 0.0
  }
};