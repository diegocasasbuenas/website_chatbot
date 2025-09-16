"use client";

import { useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export function useFramerScroll() {
  const containerRef = useRef<HTMLElement>(null);
  
  // useScroll de Framer Motion maneja automáticamente el scroll progress
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Transformar el scroll progress a una escala de secciones (0-4)
  const currentSection = useTransform(
    scrollYProgress,
    [0, 0.2, 0.4, 0.6, 0.8, 1],
    [0, 1, 2, 3, 4, 4]
  );

  return {
    containerRef,
    scrollProgress: scrollYProgress,
    currentSection
  };
}