"use client";

import { motion } from "framer-motion";
import { Icon } from "@phosphor-icons/react";
import * as PhosphorIcons from "@phosphor-icons/react";
import { GlassCard } from "./GlassCard";
import { socialLinks } from "@/app/constants/content";

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
        <h3 className="mb-4 text-white font-satoshi text-2xl font-medium leading-normal">
          {title}
        </h3>

        {/* Descripción */}
        <p className="text-white flex-1 font-general text-base font-medium leading-normal">
          {description}
        </p>

        <a
          href={`${socialLinks.email}${socialLinks.email.includes('?') ? '&' : '?'}subject=${encodeURIComponent(`Project Inquiry: ${title}`)}`}
          className="mt-6 inline-flex items-center justify-center rounded-full bg-white/15 px-4 py-2 text-sm font-general font-semibold text-white transition-colors duration-200 hover:bg-white/25 focus:outline-none focus:ring-2 focus:ring-white/40"
        >
          Discuss this service
        </a>
      </GlassCard>
    </motion.div>
  );
}
