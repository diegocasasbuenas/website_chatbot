import {HTMLAttributes, ReactNode } from "react";

const generalStyle = `bg-linear-glass-bg border rounded-3xl border-[rgba(255,255,255,0.25)] shadow-[0_4px_8px_0_rgba(0,0,0,0.15)] backdrop-blur-[12px]`;

type GlassContainerAtomVariant = "icon" | "input" | "card" | "button";

const variantStyles: Record<GlassContainerAtomVariant, string> = {
  icon: `${generalStyle} cursor-pointer w-12 h-12 flex justify-center items-center`,
  input: `${generalStyle}`,
  card: `${generalStyle}`,
  button: `${generalStyle} cursor-pointer p-4 rounded-full flex justify-center items-center`,
};

type GlassContainerProps = {
  children: ReactNode;
  variant?: GlassContainerAtomVariant;
  className?: string;
} & HTMLAttributes<HTMLDivElement>;

export default function GlassContainerAtom(props: GlassContainerProps) {
  const { children, variant, className, ...rest } = props;
  const variantClasses = variant ? variantStyles[variant] : "";
  const combinedClasses = `${variantClasses} ${className ?? ""}`.trim();

  return (
    <div className={combinedClasses} {...rest}>
      {children}
    </div>
  );
}
