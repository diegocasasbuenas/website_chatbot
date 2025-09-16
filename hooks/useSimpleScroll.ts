"use client";

import { useEffect, useState, useRef } from "react";

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

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Ejecutar inmediatamente
    
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return { scrollProgress, scrollRef };
}