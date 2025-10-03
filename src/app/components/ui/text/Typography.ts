import {
  ComponentPropsWithRef,
  ElementType,
  ReactNode,
  createElement,
} from "react";

type TypographyVariant = "title" | "subtitle" | "body";

const variantStyles: Record<TypographyVariant, string> = {
  title:
    "text-white font-satoshi text-[168px] font-black uppercase tracking-[-8.4px] leading-none text-center",
  subtitle:
    "text-white font-satoshi text-[168px] font-bold tracking-[-8.4px] leading-none text-center",
  body: "text-base",
};

const variantElements: Record<TypographyVariant, ElementType> = {
  title: "h1",
  subtitle: "h2",
  body: "p",
};

type TypographyProps<T extends ElementType> = {
  as?: T;
  variant?: TypographyVariant;
  children: ReactNode;
  className?: string;
} & Omit<ComponentPropsWithRef<T>, "as" | "children" | "className" | "variant">;

function Typography<T extends ElementType = "h1">(props: TypographyProps<T>) {
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

export default Typography;
