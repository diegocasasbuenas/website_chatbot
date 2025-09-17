"use client";

import { motion } from "framer-motion";
import { Icon } from "@phosphor-icons/react";
import * as PhosphorIcons from "@phosphor-icons/react";
import { GlassCard } from "./GlassCard";

interface ServiceCardProps {
  title: string;
  description: string;
  iconName: string;
  index: number;
}

export function ServiceCard({ title, description, iconName, index }: ServiceCardProps) {
  // Obtener el icono dinámicamente
  const IconComponent = (PhosphorIcons as any)[iconName] || PhosphorIcons.Question;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ 
        duration: 0.6, 
        delay: index * 0.1,
        ease: "easeOut"
      }}
      whileHover={{ 
        y: -5,
        transition: { duration: 0.2 }
      }}
      className="h-full"
    >
      <GlassCard padding="lg" className="h-full flex flex-col">
        {/* Icono */}
        <div className="mb-6">
          <IconComponent 
            size={48} 
            className="text-white/80" 
            weight="duotone"
          />
        </div>

        {/* Título */}
        <h3 
          className="mb-4 text-white"
          style={{
            fontFamily: '"Satoshi Variable"',
            fontSize: '24px',
            fontWeight: 500,
            lineHeight: 'normal'
          }}
        >
          {title}
        </h3>

        {/* Descripción */}
        <p 
          className="text-white flex-1"
          style={{
            fontFamily: '"General Sans Variable"',
            fontSize: '16px',
            fontWeight: 500,
            lineHeight: 'normal'
          }}
        >
          {description}
        </p>
      </GlassCard>
    </motion.div>
  );
}