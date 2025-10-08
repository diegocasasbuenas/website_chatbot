import { ReactNode } from "react";
import Typography from "../atoms/text/TypographyAtom";

type SectionWrapperProps = {
  title: string;
  children: ReactNode;
};

export default function SectionWrapper({
  title,
  children,
}: SectionWrapperProps) {
  return (
    <section className="w-full min-h-full h-full border-1 border-red-600 flex flex-col-reverse md:flex-col gap-8 items-center md:items-start p-4 md:p-15">
      {children}
      <Typography variant="subtitle" className="">
        {title}
      </Typography>
    </section>
  );
}