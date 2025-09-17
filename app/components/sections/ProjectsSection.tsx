import { SectionLayout, SectionTitleWrapper } from "@/app/components/layout";
import { ProjectCard } from "@/app/components/ui";
import { projectsData } from "@/app/constants/content";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function ProjectsSection() {
  const [hoveredProject, setHoveredProject] = useState<{
    title: string;
    description: string;
  } | null>(null);

  return (
    <SectionLayout sectionName="PROJECTS">
      {/* Contenedor principal */}
      <div className="flex-1 flex items-center justify-center p-8 relative">
        {/* Overlay central para título y descripción */}
        <AnimatePresence>
          {hoveredProject && (
            <motion.div
              className="absolute inset-0 flex items-center justify-center pointer-events-none z-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="text-center text-white max-w-4xl px-8">
                {/* Título con estilos del hero */}
                <motion.h2
                  className="text-white text-[clamp(45px,7vw,120px)] sm:text-[clamp(60px,9vw,120px)] md:text-[clamp(80px,11vw,120px)] lg:text-[clamp(90px,12vw,120px)] font-[900] leading-[95%] tracking-[-1px] sm:tracking-[-2px] md:tracking-[-3px] lg:tracking-[-4px] mb-6"
                  style={{
                    fontFamily: 'var(--font-satoshi)',
                    fontWeight: 900,
                    lineHeight: '95%',
                    wordBreak: 'break-word',
                    overflowWrap: 'break-word'
                  }}
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.4, delay: 0.1 }}
                >
                  {hoveredProject.title}
                </motion.h2>
                
                {/* Descripción */}
                <motion.p
                  className="font-general text-lg md:text-xl lg:text-2xl leading-relaxed text-white/90"
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.4, delay: 0.2 }}
                >
                  {hoveredProject.description}
                </motion.p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Contenedor de proyectos con scroll */}
        <div className="w-full">
          <div 
            className="overflow-y-auto scrollbar-hide"
            style={{
              height: '70vh',
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
            }}
          >
            {/* Grid de proyectos */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-y-16 lg:gap-y-20 py-4">
              {projectsData.map((project, index) => (
                <div
                  key={project.id}
                  className={`w-full flex ${
                    index % 2 === 0 
                      ? 'md:justify-start' 
                      : 'md:justify-end'
                  } justify-center`}
                >
                  <div
                    onMouseEnter={() => setHoveredProject({
                      title: project.title,
                      description: project.description
                    })}
                    onMouseLeave={() => setHoveredProject(null)}
                  >
                    <ProjectCard
                      title={project.title}
                      description={project.description}
                      image={project.image}
                      index={index}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Título en la esquina inferior izquierda */}
      <SectionTitleWrapper>Projects</SectionTitleWrapper>
    </SectionLayout>
  );
}