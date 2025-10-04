import { ElementType, ReactNode } from "react";

const generalStyle = `bg-linear-glass-bg border rounded-3xl border-[rgba(255,255,255,0.25)] shadow-[0_4px_8px_0_rgba(0,0,0,0.15)] backdrop-blur-[12px]`;

type GlassContainerVariant = "icon" | "input" | "card";

const variantStyles: Record<GlassContainerVariant, string> = {
  icon: `${generalStyle} cursor-pointer w-12 h-12 flex justify-center items-center`,
  input: `${generalStyle}`,
  card: `${generalStyle}`,
};

type GlassContainerProps = {
  variant?: GlassContainerVariant;
  children: ReactNode;
  className?: string;
};

export default function GlassConatainer(props: GlassContainerProps) {
  const { children, variant, className, ...rest } = props;
  const variantClasses = variant ? variantStyles[variant] : "";
  const combinedClasses = `${variantClasses} ${className ?? ""}`.trim();

  return <div className={combinedClasses}>{children}</div>;
}
