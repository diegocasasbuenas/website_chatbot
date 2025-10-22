import Typography from "../atoms/text/TypographyAtom";

type NavItem = {
  id: string;
  label: string;
};

type SectionNavigationProps = {
  items: NavItem[];
  activeSection: string | null;
  className?: string;
};

export default function SectionNavigation({
  items,
  activeSection,
  className,
}: SectionNavigationProps) {
  const navClasses = [
    "flex items-center gap-4 justify-start",
    className ?? "",
  ]
    .join(" ")
    .trim();

  return (
    <nav className={navClasses}>
      {items.map(({ id, label }) => {
        const isActive = activeSection === id || (!activeSection && id === "About");

        return (
          <a
            key={id}
            href={`#${id}`}
            aria-current={isActive ? "true" : undefined}
            className={`min-w-[100px] flex justify-center items-center px-2 h-full transition-colors ${
              isActive ? "text-black bg-[#B39065]" : "text-white/60 hover:text-white"
            }`}
          >
            <Typography as="h3">{label}</Typography>
          </a>
        );
      })}
    </nav>
  );
}
