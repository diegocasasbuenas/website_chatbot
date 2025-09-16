"use client";

import { HeroSection } from "@/app/components/sections/HeroSection";
import { AboutSection } from "@/app/components/sections/AboutSection";
import { SkillsSection } from "@/app/components/sections/SkillsSection";
import { ProjectsSection } from "@/app/components/sections/ProjectsSection";
import { ServicesSection } from "@/app/components/sections/ServicesSection";

/**
 * Página principal con arquitectura modular
 * 
 * Cada sección es un componente independiente con:
 * - Su propio contenido y configuración
 * - Animaciones específicas
 * - Diseño responsivo
 * - Reutilización de componentes base
 */
export default function Home() {
  return (
    <main>
      <HeroSection />
      <AboutSection />
      <SkillsSection />
      <ProjectsSection />
      <ServicesSection />
    </main>
  );
}
