import { ReactNode } from "react";
import Typography from "../atoms/text/TypographyAtom";

type SectionWrapperProps = {
  id: string;
  title: string;
  children: ReactNode;
};

export default function SectionWrapper({
  id,
  title,
  children,
}: SectionWrapperProps) {
  return (
    <section
      id={id}
      className="w-full md:min-h-full md:h-full flex flex-col-reverse md:flex-col gap-8 items-center md:items-start p-4 md:p-15 md:snap-start"
    >
      {children}
      <Typography variant="subtitle">
        {title}
      </Typography>
    </section>
  );
}