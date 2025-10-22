"use client";

import useActiveSection from "@/app/hooks/useActiveSection";
import AboutSection from "../../sections/AboutSection";
import ProjectsSection from "../../sections/ProjectsSection";
import ServicesSection from "../../sections/ServicesSection";
import SkillsSection from "../../sections/SkillsSection";
import Typography from "../atoms/text/TypographyAtom";
import SectionWrapper from "./SectionWrapper";
import { useRef } from "react";

const navItems = [
  { id: "Home", label: "Home" },
  { id: "About", label: "Meet Diego" },
  { id: "Skills", label: "Skills" },
  { id: "Projects", label: "Projects" },
  { id: "Services", label: "Services" },
];

const sidebarCopy: Record<string, string> = {
  Home: "Home",
  About: "Meet Diego",
  Skills: "Skills",
  Projects: "Projects",
  Services: "Services",
};

export default function GlobalLayout() {
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const { activeSection, register } = useActiveSection({ rootRef: scrollRef });

  return (
    <section className="w-full h-screen min-h-screen max-h-screen grid grid-cols-[1fr] grid-rows-[60px_1fr] md:grid-cols-[60px_1fr] md:grid-rows-[60px_1fr] md:snap-start">
      {/* Cubo esquina superior izquierda */}
      <div className="hidden md:block"></div>
      {/* Contenedor superior */}
      <div className="border-b-1 border-b-white x-4 flex justify-start items-center gap-4">
        {navItems.map(({ id, label }) => {
          const isActive =
            activeSection === id || (!activeSection && id === "About");
          return (
            <a
              key={id}
              href={`#${id}`}
              aria-current={isActive ? "true" : undefined}
              className={`min-w-[100px] flex justify-center items-center px-2 h-full transition-colors ${
                isActive
                  ? "text-black bg-[#B39065]"
                  : "text-white/60 hover:text-white"
              }`}
            >
              <Typography as="h3">{label}</Typography>
            </a>
          );
        })}
      </div>
      {/* Contenedor izquierda */}
      <div className="border-r-1 border-r-white hidden md:flex md:flex-col justify-between py-8 px-2 items-center">
        <Typography variant="sidebar-label">AI Engineer</Typography>
        <Typography variant="sidebar-label">
          {sidebarCopy[activeSection ?? "About"] ?? ""}
        </Typography>
        <Typography variant="sidebar-label">Diego Casasbuenas</Typography>
      </div>
      {/* Contenedor principal */}
      <div
        ref={scrollRef}
        className="flex flex-col md:snap-y md:snap-mandatory scroll-smooth overflow-y-auto scrollbar-none no-scrollbar gap-15 md:gap-0"
      >
        <SectionWrapper id="About" title="Meet Diego" register={register}>
          <AboutSection />
        </SectionWrapper>
        <SectionWrapper id="Skills" title="Skills" register={register}>
          <SkillsSection />
        </SectionWrapper>
        <SectionWrapper id="Projects" title="Projects" register={register}>
          <ProjectsSection />
        </SectionWrapper>
        <SectionWrapper id="Services" title="Services" register={register}>
          <ServicesSection />
        </SectionWrapper>
      </div>
    </section>
  );
}
