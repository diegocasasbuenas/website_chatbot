"use client";

import { useCallback, useEffect, useRef, useState } from "react";

type Options = {
  /**
   * Elemento raíz del IntersectionObserver. Puede ser null hasta que
   * el contenedor con overflow se monte.
   */
  root?: HTMLElement | null;
};

type SectionEntry = {
  id: string;
  ratio: number;
};

export default function useActiveSection(options: Options = {}) {
  const { root } = options;

  const entriesRef = useRef<Record<string, SectionEntry>>({});
  const observerRef = useRef<IntersectionObserver | null>(null);
  const pendingElementsRef = useRef<Set<HTMLElement>>(new Set());
  const [activeSection, setActiveSection] = useState<string | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(({ target, intersectionRatio }) => {
          entriesRef.current[target.id] = {
            id: target.id,
            ratio: intersectionRatio,
          };
        });

        const visible = Object.values(entriesRef.current)
          .filter((entry) => entry.ratio > 0)
          .sort((a, b) => b.ratio - a.ratio);

        if (visible[0]) {
          setActiveSection((prev) =>
            visible[0]!.id !== prev ? visible[0]!.id : prev
          );
        }
      },
      {
        root: root ?? null,
        rootMargin: "-20% 0px -40% 0px",
        threshold: [0, 0.25, 0.5, 0.75, 1],
      }
    );

    observerRef.current = observer;
    const pendingElements = pendingElementsRef.current;
    pendingElements.forEach((element) => observer.observe(element));
    pendingElements.clear();

    return () => {
      observer.disconnect();
      observerRef.current = null;
    };
  }, [root]);

  const register = useCallback((element: HTMLElement | null) => {
    if (!element) return;

    if (observerRef.current) {
      observerRef.current.observe(element);
    } else {
      pendingElementsRef.current.add(element);
    }

    return () => {
      pendingElementsRef.current.delete(element);
      observerRef.current?.unobserve(element);
    };
  }, []);

  return { activeSection, register };
}
