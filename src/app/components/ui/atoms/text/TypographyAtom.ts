import {
  ComponentPropsWithRef,
  ElementType,
  ReactNode,
  createElement,
} from "react";

type TypographyVariant = "title" | "subtitle" | "body" | "sidebar-label" | "accordion-title";

const variantStyles: Record<TypographyVariant, string> = {
  title:
    "text-white font-satoshi text-[clamp(44px,12vw,336px)] tracking-[clamp(-8.4px,-0.5vw,-1px)] font-black uppercase leading-none text-center",
  subtitle:
    "text-white font-satoshi text-[clamp(44px,8vw,336px)] tracking-[clamp(-8.4px,-0.5vw,-1px)] font-bold leading-none text-center",
  body: "text-white font-general text-[clamp(16px,1.2vw,24px)] font-normal",
  "accordion-title": "font-satoshi text-2xl font-bold text-white",
  "sidebar-label": "font-general text-md uppercase tracking-wider text-white font-medium whitespace-nowrap [writing-mode:vertical-rl] [text-orientation:mixed] rotate-[180deg]",
};

const variantElements: Record<TypographyVariant, ElementType> = {
  title: "h1",
  subtitle: "h2",
  body: "p",
  "sidebar-label": "h3",
  "accordion-title": "h3",
};

type TypographyProps<T extends ElementType> = {
  as?: T;
  variant?: TypographyVariant;
  children: ReactNode;
  className?: string;
} & Omit<ComponentPropsWithRef<T>, "as" | "children" | "className" | "variant">;

export default function Typography<T extends ElementType = "h1">(
  props: TypographyProps<T>
) {
  const { as, children, className, variant, ...rest } = props;
  const Component = as || variantElements[variant || "title"];
  const variantClasses = variant ? variantStyles[variant] : "";
  const combinedClasses = `${variantClasses} ${className || ""}`.trim();

  return createElement(
    Component,
    { className: combinedClasses, ...rest },
    children
  );
}
