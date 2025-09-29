"use client";

import { KeyboardEvent, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

interface ProjectCardProps {
  title: string;
  description: string;
  image: string;
  index: number;
  isActive: boolean;
  onToggle: () => void;
  supportsHover: boolean;
  onHighlightChange?: (isHighlighted: boolean) => void;
}

export function ProjectCard({
  title,
  description,
  image,
  index,
  isActive,
  onToggle,
  supportsHover,
  onHighlightChange,
}: ProjectCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const showColor = supportsHover ? isHovered : isActive;

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      onToggle();
    }
  };

  const handleHighlightChange = (highlighted: boolean) => {
    if (!supportsHover) return;
    setIsHovered(highlighted);
    onHighlightChange?.(highlighted);
  };

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
      onHoverStart={supportsHover ? () => handleHighlightChange(true) : undefined}
      onHoverEnd={supportsHover ? () => handleHighlightChange(false) : undefined}
      onFocus={supportsHover ? () => handleHighlightChange(true) : undefined}
      onBlur={supportsHover ? () => handleHighlightChange(false) : undefined}
      onClick={onToggle}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={0}
      aria-pressed={isActive}
    >
      {/* Imagen con filtro de escala de grises */}
      <div className="relative w-full h-full">
        <Image
          src={image}
          alt={title}
          fill
          className={`object-cover transition-all duration-500 ${
            showColor ? 'grayscale-0' : 'grayscale'
          }`}
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </div>

      {!supportsHover && isActive && (
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm p-6 flex flex-col justify-end">
          <h3 className="text-white font-satoshi text-2xl font-semibold mb-3">
            {title}
          </h3>
          <p className="text-white/90 font-general text-base leading-relaxed">
            {description}
          </p>
        </div>
      )}
    </motion.div>
  );
}
