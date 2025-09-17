"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

interface ProjectCardProps {
  title: string;
  description: string;
  image: string;
  index: number;
}

export function ProjectCard({ title, description, image, index }: ProjectCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className="relative w-full max-w-[400px] overflow-hidden rounded-[24px] cursor-pointer"
      style={{
        height: '531px',
        aspectRatio: '400/531',
        boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.15)',
        backdropFilter: 'blur(12px)'
      }}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ 
        duration: 0.6, 
        delay: index * 0.2,
        ease: "easeOut"
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      {/* Imagen con filtro de escala de grises */}
      <div className="relative w-full h-full">
        <Image
          src={image}
          alt={title}
          fill
          className={`object-cover transition-all duration-500 ${
            isHovered ? 'grayscale-0' : 'grayscale'
          }`}
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </div>
    </motion.div>
  );
}