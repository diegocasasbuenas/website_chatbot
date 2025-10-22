"use client";

import { RefObject, useCallback, useEffect, useRef, useState } from "react";

type Options = { rootRef?: RefObject<HTMLElement | null> };

type SectionEntry = {
  id: string;
  ratio: number;
};

export default function useActiveSection(options: Options = {}) {
  const { rootRef } = options;

  const entriesRef = useRef<Record<string, SectionEntry>>({});
  const observerRef = useRef<IntersectionObserver | null>(null);
  const [activeSection, setActiveSection] = useState<string | null>(null);

  useEffect(() => {
    const root = rootRef?.current ?? null;

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

        if (visible[0] && visible[0].id !== activeSection) {
          setActiveSection(visible[0].id);
        }
      },
      {
        root,
        rootMargin: "-20% 0px -40% 0px",
        threshold: [0, 0.25, 0.5, 0.75, 1],
      }
    );

    observerRef.current = observer;
    return () => observer.disconnect();
  }, [rootRef?.current, activeSection]);

  const register = useCallback((element: HTMLElement | null) => {
    if (!observerRef.current || !element) return;
    observerRef.current.observe(element);

    return () => observerRef.current?.unobserve(element);
  }, []);

  return { activeSection, register };
}