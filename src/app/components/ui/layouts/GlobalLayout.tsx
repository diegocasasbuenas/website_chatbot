import AboutSection from "../../sections/AboutSection";
import ProjectsSection from "../../sections/ProjectsSection";
import ServicesSection from "../../sections/ServicesSection";
import SkillsSection from "../../sections/SkillsSection";
import Typography from "../atoms/text/TypographyAtom";
import SectionWrapper from "./SectionWrapper";

export default function GlobalLayout() {
  return (
    <section className="w-full min-h-screen max-h-screen grid grid-cols-[1fr] grid-rows-[60px_1fr] md:grid-cols-[60px_1fr] md:grid-rows-[60px_1fr]">
      {/* Cubo esquina superior izquierda */}
      <div className="hidden md:block"></div>
      {/* Contenedor superior */}
      <div className="border-b-1 border-b-white py-2 px-4 flex justify-between items-center">
        <a href="#">
          <Typography as="h3">Contacto</Typography>
        </a>
      </div>
      {/* Contenedor izquierda */}
      <div className="border-r-1 border-r-white hidden md:flex md:flex-col justify-between py-8 px-2 items-center">
        <Typography variant="sidebar-label">AI Engineer</Typography>
        <Typography variant="sidebar-label">Sección 1</Typography>
        <Typography variant="sidebar-label">Diego Casasbuenas</Typography>
      </div>
      {/* Contenedor principal */}
      <div className="overflow-y-auto scrollbar-none no-scrollbar">
        <SectionWrapper title="Meet Diego">
          <AboutSection />
        </SectionWrapper>
        <SectionWrapper title="Skills">
          <SkillsSection />
        </SectionWrapper>
        <SectionWrapper title="Projects">
          <ProjectsSection />
        </SectionWrapper>
        <SectionWrapper title="Services">
          <ServicesSection />
        </SectionWrapper>
      </div>
    </section>
  );
}
