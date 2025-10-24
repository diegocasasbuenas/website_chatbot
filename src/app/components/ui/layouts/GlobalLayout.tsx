"use client";

import { useCallback, useMemo, useState } from "react";

import useActiveSection from "@/app/hooks/useActiveSection";
import AboutSection from "../../sections/AboutSection";
import ProjectsSection from "../../sections/ProjectsSection";
import ServicesSection from "../../sections/ServicesSection";
import SkillsSection from "../../sections/SkillsSection";
import Typography from "../atoms/text/TypographyAtom";
import MobileSectionNavigation from "./MobileSectionNavigation";
import SectionNavigation from "./SectionNavigation";
import SectionWrapper from "./SectionWrapper";

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

const orderedSections = ["About", "Skills", "Projects", "Services"] as const;

export default function GlobalLayout() {
  const [scrollContainer, setScrollContainer] =
    useState<HTMLDivElement | null>(null);
  const { activeSection, register } = useActiveSection({
    root: scrollContainer,
  });
  const handleScrollRef = useCallback((node: HTMLDivElement | null) => {
    setScrollContainer(node);
  }, []);
  const resolvedSection = useMemo(() => {
    if (
      activeSection &&
      orderedSections.includes(activeSection as (typeof orderedSections)[number])
    ) {
      return activeSection as (typeof orderedSections)[number];
    }
    return orderedSections[0];
  }, [activeSection]);

  const currentIndex = orderedSections.indexOf(resolvedSection);
  const previousSectionId =
    currentIndex > 0 ? orderedSections[currentIndex - 1] : "Home";
  const nextSectionId =
    currentIndex < orderedSections.length - 1
      ? orderedSections[currentIndex + 1]
      : null;

  const activeLabel = useMemo(() => {
    const targetId = activeSection ?? resolvedSection;
    return (
      navItems.find(({ id }) => id === targetId)?.label ??
      sidebarCopy[targetId] ??
      targetId
    );
  }, [activeSection, resolvedSection]);

  const scrollToSection = useCallback((sectionId: string | null) => {
    if (!sectionId) return;
    const target = document.getElementById(sectionId);
    target?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  return (
    <section className="w-full h-screen min-h-screen max-h-screen grid grid-cols-[1fr] grid-rows-[60px_1fr] md:grid-cols-[60px_1fr] md:grid-rows-[60px_1fr] md:snap-start">
      {/* Cubo esquina superior izquierda */}
      <div className="hidden md:block"></div>
      {/* Contenedor superior */}
      <div className="flex h-full items-center justify-between border-b border-white px-4">
        <MobileSectionNavigation
          label={activeLabel}
          onNavigateUp={() => scrollToSection(previousSectionId)}
          onNavigateDown={() => scrollToSection(nextSectionId)}
          disableNavigateUp={!previousSectionId}
          disableNavigateDown={!nextSectionId}
        />
        <SectionNavigation
          items={navItems}
          activeSection={activeSection}
          className="hidden h-full w-full md:flex"
        />
      </div>
      {/* Contenedor izquierda */}
      <div className="border-r-1 border-r-white hidden md:flex md:flex-col justify-between py-8 px-2 items-center">
        <Typography variant="sidebar-label">AI Developer</Typography>
        <Typography variant="sidebar-label">
          {sidebarCopy[activeSection ?? "About"] ?? ""}
        </Typography>
        <Typography variant="sidebar-label">Diego Casasbuenas</Typography>
      </div>
      {/* Contenedor principal */}
      <div
        ref={handleScrollRef}
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
