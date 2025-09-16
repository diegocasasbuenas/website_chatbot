"use client";

import { useEffect, useState, useRef } from "react";

/**
 * Hook para detectar el progreso de scroll de la página
 * 
 * @returns {Object} - scrollProgress: número entre 0 y 1 representando el progreso
 *                   - scrollRef: referencia para acceso directo sin re-renders
 * 
 * @example
 * const { scrollProgress } = useSimpleScroll();
 * // scrollProgress = 0 (top) a 1 (bottom)
 */
export function useSimpleScroll() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const scrollRef = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const scrollHeight = document.documentElement.scrollHeight;
      const windowHeight = window.innerHeight;
      const docHeight = scrollHeight - windowHeight;
      
      if (docHeight <= 0) {
        scrollRef.current = 0;
        setScrollProgress(0);
        return;
      }
      
      const progress = Math.min(Math.max(scrollTop / docHeight, 0), 1);
      scrollRef.current = progress;
      setScrollProgress(progress);
    };

    // Usar passive: true para mejor rendimiento
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Inicializar valor
    
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return { scrollProgress, scrollRef };
}