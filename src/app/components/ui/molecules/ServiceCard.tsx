import { BeakerIcon } from "@heroicons/react/16/solid";
import GlassContainerAtom from "../atoms/containers/GlassContainerAtom";
import Typography from "../atoms/text/TypographyAtom";
import { ComponentType, SVGProps } from "react";

type ServiceCardProps = {
  title: string;
  description: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
};

export function ServiceCard({
  title,
  description,
  icon: Icon,
}: ServiceCardProps) {
  return (
    <GlassContainerAtom variant="card">
      <div className="flex flex-col gap-4">
        <GlassContainerAtom variant="icon">
          <Icon className="size-5" />
        </GlassContainerAtom>
        <Typography variant="accordion-title">{title}</Typography>
        <Typography variant="body">{description}</Typography>
      </div>
      <GlassContainerAtom
        variant="button"
        className="transition-colors duration-200 hover:bg-white/25 focus:outline-none focus:ring-2 focus:ring-white/40"
      >
        <a
          href={`mailto:diego.cdeaza23@gmail.com?subject=${encodeURIComponent(
            `Project Inquiry: ${title}`
          )}`}
          className="text-white font-general text-[clamp(16px,0.9vw,24px)] font-normal"
        >
          Discuss this service
        </a>
      </GlassContainerAtom>
    </GlassContainerAtom>
  );
}
