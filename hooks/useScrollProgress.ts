"use client";

import { useEffect, useState, useRef } from "react";

export function useScrollProgress() {
  const [progress, setProgress] = useState(0);
  const rafRef = useRef<number | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const updateProgress = () => {
      const scrollTop = window.scrollY;
      const scrollHeight = document.documentElement.scrollHeight;
      const windowHeight = window.innerHeight;
      const docHeight = scrollHeight - windowHeight;
      
      if (docHeight <= 0) {
        setProgress(0);
        return;
      }
      
      const scrolled = scrollTop / docHeight;
      setProgress(Math.min(Math.max(scrolled, 0), 1));
    };

    const handleScroll = () => {
      // Cancelar animación anterior si existe
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
      
      // Cancelar timeout anterior si existe
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      
      // Programar actualización en el próximo frame
      rafRef.current = requestAnimationFrame(updateProgress);
      
      // También programar una actualización después del scroll-snap
      timeoutRef.current = setTimeout(() => {
        rafRef.current = requestAnimationFrame(updateProgress);
      }, 150);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    
    // Inicializar
    updateProgress();
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return progress;
}