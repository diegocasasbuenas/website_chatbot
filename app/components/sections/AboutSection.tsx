import { SectionLayout, SectionTitleWrapper } from "@/app/components/layout";
import { Accordion } from "@/app/components/ui";
import { aboutAccordionData } from "@/app/constants/content";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";

export function AboutSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <SectionLayout sectionName="ABOUT ME" id="about">
      {/* Contenido principal */}
      <div ref={ref} className="flex-1 flex items-center justify-center">
        <div className="w-full grid grid-cols-1 lg:grid-cols-[auto_1fr] gap-16 lg:gap-24 items-start">
          
          {/* Imagen de Diego - Lado izquierdo */}
          <motion.div 
            className="flex justify-center lg:justify-start"
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="relative w-72 md:w-80 lg:w-[300px] xl:w-[350px] 2xl:w-[400px]">
              <Image
                src="/images/Portrait.png"
                alt="Diego Casasbuenas"
                width={450}
                height={600}
                className="w-full h-auto object-cover rounded-lg"
                priority
              />
            </div>
          </motion.div>

          {/* Acordeón - Lado derecho */}
          <div className="flex justify-center lg:justify-start">
            <div className="w-full">
              <Accordion items={aboutAccordionData} isInView={isInView} />
            </div>
          </div>
          
        </div>
      </div>

      {/* Título en la esquina inferior izquierda */}
      <SectionTitleWrapper>Meet Diego</SectionTitleWrapper>
    </SectionLayout>
  );
}
