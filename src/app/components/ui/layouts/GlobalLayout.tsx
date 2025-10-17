import AboutSection from "../../sections/AboutSection";
import ProjectsSection from "../../sections/ProjectsSection";
import ServicesSection from "../../sections/ServicesSection";
import SkillsSection from "../../sections/SkillsSection";
import Typography from "../atoms/text/TypographyAtom";
import SectionWrapper from "./SectionWrapper";

export default function GlobalLayout() {
  return (
    <section className="w-full h-screen min-h-screen max-h-screen grid grid-cols-[1fr] grid-rows-[60px_1fr] md:grid-cols-[60px_1fr] md:grid-rows-[60px_1fr] md:snap-start">
      {/* Cubo esquina superior izquierda */}
      <div className="hidden md:block"></div>
      {/* Contenedor superior */}
      <div className="border-b-1 border-b-white x-4 flex justify-start items-center gap-4">
        <a
          href="#Home"
          className="min-w-[100px] flex justify-center items-center px-2 h-full"
        >
          <Typography as="h3">Home</Typography>
        </a>
        <a
          href="#About"
          className="min-w-[100px] flex justify-center items-center px-2 h-full"
        >
          <Typography as="h3">Meet Diego</Typography>
        </a>
        <a
          href="#Skills"
          className="min-w-[100px] flex justify-center items-center px-2 h-full"
        >
          <Typography as="h3">Skills</Typography>
        </a>
        <a
          href="#Projects"
          className="min-w-[100px] flex justify-center items-center px-2 h-full"
        >
          <Typography as="h3">Projects</Typography>
        </a>
        <a
          href="#Services"
          className="min-w-[100px] flex justify-center items-center px-2 h-full"
        >
          <Typography as="h3">Services</Typography>
        </a>
      </div>
      {/* Contenedor izquierda */}
      <div className="border-r-1 border-r-white hidden md:flex md:flex-col justify-between py-8 px-2 items-center">
        <Typography variant="sidebar-label">AI Engineer</Typography>
        <Typography variant="sidebar-label">Sección 1</Typography>
        <Typography variant="sidebar-label">Diego Casasbuenas</Typography>
      </div>
      {/* Contenedor principal */}
      <div className="flex flex-col md:snap-y md:snap-mandatory scroll-smooth overflow-y-auto scrollbar-none no-scrollbar gap-15 md:gap-0">
        <SectionWrapper id="About" title="Meet Diego">
          <AboutSection />
        </SectionWrapper>
        <SectionWrapper id="Skills" title="Skills">
          <SkillsSection />
        </SectionWrapper>
        <SectionWrapper id="Projects" title="Projects">
          <ProjectsSection />
        </SectionWrapper>
        <SectionWrapper id="Services" title="Services">
          <ServicesSection />
        </SectionWrapper>
      </div>
    </section>
  );
}
