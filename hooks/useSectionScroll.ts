"use client";
import { useEffect, useState } from "react";
import { TOTAL_SECTIONS, type SectionIndex } from "@/app/constants/sections";

export function useSectionScroll() {
  const [currentSection, setCurrentSection] = useState<SectionIndex>(0);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrolled = docHeight > 0 ? scrollTop / docHeight : 0;
      
      console.log('ScrollTop:', scrollTop, 'DocHeight:', docHeight, 'Scrolled:', scrolled);
      
      setScrollProgress(scrolled);
      
      // Calcular sección basada en el scroll
      const section = Math.min(Math.floor(scrolled * TOTAL_SECTIONS), TOTAL_SECTIONS - 1) as SectionIndex;
      console.log('Section:', section);
      setCurrentSection(section);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Inicializar

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return { currentSection, scrollProgress };
}