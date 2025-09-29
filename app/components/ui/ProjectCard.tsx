"use client";

import { KeyboardEvent, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
  const cardHeight = supportsHover ? 531 : 420;

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
        height: `${cardHeight}px`,
        aspectRatio: supportsHover ? '400/531' : '3/4',
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
      animate={{
        scale: supportsHover ? 1 : isActive ? 1.02 : 1,
        boxShadow: supportsHover
          ? '0 4px 8px 0 rgba(0, 0, 0, 0.15)'
          : isActive
            ? '0 12px 24px rgba(0, 0, 0, 0.35)'
            : '0 4px 8px 0 rgba(0, 0, 0, 0.15)'
      }}
      whileTap={supportsHover ? undefined : { scale: 0.98 }}
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

      <AnimatePresence>
        {!supportsHover && isActive && (
          <motion.div
            key="mobile-overlay"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="absolute inset-0 bg-black/65 backdrop-blur-sm p-6 flex flex-col justify-end"
          >
            <motion.h3
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2, delay: 0.05 }}
              className="text-white font-satoshi text-2xl font-semibold mb-3"
            >
              {title}
            </motion.h3>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2, delay: 0.1 }}
              className="text-white/90 font-general text-base leading-relaxed"
            >
              {description}
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
