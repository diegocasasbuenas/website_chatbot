"use client";

import { ReactNode, useEffect, useRef } from "react";
import Typography from "../atoms/text/TypographyAtom";

type SectionWrapperProps = {
  id: string;
  title: string;
  children: ReactNode;
  onVisible?: (id: string) => void;
  register: (el: HTMLElement | null) => void;
};

export default function SectionWrapper({
  id,
  title,
  children,
  register,
}: SectionWrapperProps) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const element = ref.current;
    const unregister = register(element);
    return unregister;
  }, [register]);

  return (
    <section
      ref={ref}
      id={id}
      className="w-full md:min-h-full md:h-full flex flex-col-reverse md:flex-col gap-8 items-center md:items-start p-4 md:p-15 md:snap-start"
    >
      {children}
      <Typography variant="subtitle">{title}</Typography>
    </section>
  );
}
