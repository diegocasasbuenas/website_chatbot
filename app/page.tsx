"use client";

import { motion } from "framer-motion";

// Configuración de animaciones reutilizable
const fadeInUp = {
  initial: { opacity: 0, y: 100 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.3 },
  transition: { duration: 0.6 }
};

const fadeIn = {
  initial: { opacity: 0 },
  whileInView: { opacity: 1 },
  viewport: { once: true, amount: 0.3 }
};

/**
 * Página principal con 5 secciones de altura completa
 * 
 * Cada sección usa scroll-snap y animaciones de Framer Motion
 * El background responde automáticamente al scroll entre secciones
 */
export default function Home() {
  return (
    <main>
      {/* Hero Section - Animación simple de fade in */}
      <motion.section 
        id="hero" 
        className="flex items-center justify-center h-screen"
        {...fadeIn}
      >
        <h1 className="text-5xl">Hero Section</h1>
      </motion.section>

      {/* About Section */}
      <motion.section 
        id="about" 
        className="flex items-center justify-center h-screen"
        {...fadeInUp}
      >
        <h2 className="text-3xl">About Me</h2>
      </motion.section>

      {/* Skills Section */}
      <motion.section 
        id="skills" 
        className="flex items-center justify-center h-screen"
        {...fadeInUp}
      >
        <h2 className="text-3xl">Skills</h2>
      </motion.section>

      {/* Projects Section */}
      <motion.section 
        id="projects" 
        className="flex items-center justify-center h-screen"
        {...fadeInUp}
      >
        <h2 className="text-3xl">Projects</h2>
      </motion.section>

      {/* Services Section */}
      <motion.section 
        id="services" 
        className="flex items-center justify-center h-screen"
        {...fadeInUp}
      >
        <h2 className="text-3xl">Services</h2>
      </motion.section>
    </main>
  );
}
