"use client";

import { useEffect, useState } from "react";

/**
 * Detecta si el dispositivo reporta un puntero "coarse" (ej. táctil)
 */
export function useIsCoarsePointer() {
  const [isCoarsePointer, setIsCoarsePointer] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined" || typeof window.matchMedia !== "function") {
      return;
    }

    const mediaQuery = window.matchMedia("(pointer: coarse)");

    const updatePointerState = (event: MediaQueryListEvent | MediaQueryList) => {
      setIsCoarsePointer(event.matches);
    };

    updatePointerState(mediaQuery);

    if (typeof mediaQuery.addEventListener === "function") {
      mediaQuery.addEventListener("change", updatePointerState);
      return () => mediaQuery.removeEventListener("change", updatePointerState);
    }

    mediaQuery.addListener(updatePointerState);
    return () => mediaQuery.removeListener(updatePointerState);
  }, []);

  return isCoarsePointer;
}
