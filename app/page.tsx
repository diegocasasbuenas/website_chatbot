"use client";

import { motion } from "framer-motion";

export default function Home() {
  return (
    <main>
      <motion.section 
        id="hero" 
        className="flex items-center justify-center h-screen"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.3 }}
      >
        <h1 className="text-5xl">Hero Section</h1>
      </motion.section>

      <motion.section 
        id="about" 
        className="flex items-center justify-center h-screen"
        initial={{ opacity: 0, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-3xl">About Me</h2>
      </motion.section>

      <motion.section 
        id="skills" 
        className="flex items-center justify-center h-screen"
        initial={{ opacity: 0, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-3xl">Skills</h2>
      </motion.section>

      <motion.section 
        id="projects" 
        className="flex items-center justify-center h-screen"
        initial={{ opacity: 0, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-3xl">Projects</h2>
      </motion.section>

      <motion.section 
        id="services" 
        className="flex items-center justify-center h-screen"
        initial={{ opacity: 0, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-3xl">Services</h2>
      </motion.section>
    </main>
  );
}
