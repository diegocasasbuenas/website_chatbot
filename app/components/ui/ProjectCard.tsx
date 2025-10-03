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
  variant?: 'mobile' | 'desktop' | 'wide';
  githubUrl?: string;
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
  variant = 'desktop',
  githubUrl,
}: ProjectCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const showColor = supportsHover ? isHovered : isActive;
  const resolvedVariant = variant;

  const widthStyle = (() => {
    switch (resolvedVariant) {
      case 'mobile':
        return { width: '100%', maxWidth: '100%', aspectRatio: '3 / 4', imageSizes: '100vw' };
      case 'wide':
        return {
          width: 'clamp(320px, 24vw, 620px)',
          maxWidth: 'min(24vw, 640px)',
          aspectRatio: supportsHover ? '400 / 531' : '3 / 4',
          imageSizes: '(max-width: 768px) 90vw, (max-width: 1440px) 32vw, (max-width: 1920px) 24vw, 640px',
        };
      case 'desktop':
      default:
        return {
          width: supportsHover ? 'clamp(260px, 28vw, 520px)' : 'clamp(220px, 38vw, 360px)',
          maxWidth: supportsHover ? 'min(28vw, 540px)' : 'min(38vw, 380px)',
          aspectRatio: supportsHover ? '400 / 531' : '3 / 4',
          imageSizes: supportsHover
            ? '(max-width: 768px) 90vw, (max-width: 1280px) 40vw, (max-width: 1920px) 28vw, 540px'
            : '(max-width: 768px) 90vw, (max-width: 1280px) 50vw, 360px',
        };
    }
  })();

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
      className="relative w-full overflow-hidden rounded-[24px] cursor-pointer"
      style={{
        width: widthStyle.width,
        maxWidth: widthStyle.maxWidth,
        aspectRatio: widthStyle.aspectRatio,
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
      {/* Imagen envolviendo anchor si hay URL */}
      <div className="relative w-full h-full">
        <Image
          src={image}
          alt={title}
          fill
          className={`object-cover transition-all duration-500 ${
            showColor ? 'grayscale-0' : 'grayscale'
          }`}
          sizes={widthStyle.imageSizes}
        />
        {!supportsHover && githubUrl && isActive && (
          <a
            href={githubUrl}
            target="_blank"
            rel="noreferrer"
            className="absolute inset-0"
          >
            <span className="sr-only">View {title} on GitHub</span>
          </a>
        )}
        {supportsHover && githubUrl && (
          <a
            href={githubUrl}
            target="_blank"
            rel="noreferrer"
            className="absolute inset-0"
          >
            <span className="sr-only">View {title} on GitHub</span>
          </a>
        )}
      </div>

      <AnimatePresence>
        {!supportsHover && isActive && (
          <motion.div
            key="mobile-overlay"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="absolute inset-0 flex flex-col justify-end"
          >
            <div
              className="absolute inset-0"
              style={{
                background:
                  'linear-gradient(180deg, rgba(0,0,0,0.05) 5%, rgba(0,0,0,0.35) 50%, rgba(0,0,0,0.75) 100%)'
              }}
            />
            <div className="relative p-6 pt-16">
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
              {githubUrl && (
                <motion.a
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2, delay: 0.15 }}
                  href={githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center mt-4 px-4 py-2 rounded-full bg-white/20 text-white text-sm font-medium hover:bg-white/30 transition"
                >
                  View on GitHub
                </motion.a>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
