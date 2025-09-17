import { SectionLayout, SectionTitleWrapper } from "@/app/components/layout";

export function ProjectsSection() {
  return (
    <SectionLayout sectionName="PROJECTS">
      {/* Contenido principal centrado */}
      <div className="flex-1 flex items-center justify-center">
        <div className="text-white text-center">
          <p className="text-lg font-general font-light max-w-2xl">
            Content for Projects section goes here...
          </p>
        </div>
      </div>

      {/* Título en la esquina inferior izquierda */}
      <SectionTitleWrapper>Projects</SectionTitleWrapper>
    </SectionLayout>
  );
}