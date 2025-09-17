"use client";

import { useState } from 'react';
import { Plus, Minus } from '@phosphor-icons/react';
import { motion, AnimatePresence } from 'framer-motion';

interface AccordionItem {
  id: string;
  question: string;
  content: string;
}

interface AccordionProps {
  items: AccordionItem[];
  className?: string;
  isInView?: boolean;
}

export function Accordion({ items, className = '', isInView = false }: AccordionProps) {
  // Primer item siempre abierto por defecto
  const [openItem, setOpenItem] = useState<string>(items[0]?.id || '');

  const handleToggle = (itemId: string) => {
    // Si el item ya está abierto, no hacer nada (siempre debe haber uno abierto)
    if (openItem !== itemId) {
      setOpenItem(itemId);
    }
  };

  return (
    <motion.div 
      className={`w-full ${className}`}
      initial={{ opacity: 0, x: 50 }}
      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
      transition={{ duration: 0.8, delay: 0.3 }}
      style={{ willChange: 'auto' }} // Optimización de performance
    >
      {items.map((item, index) => {
        const isOpen = openItem === item.id;
        
        return (
          <motion.div 
            key={item.id} 
            className="w-full"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.5 + (index * 0.2) }}
          >
            {/* Título del acordeón */}
            <button
              onClick={() => handleToggle(item.id)}
              className="w-full flex items-center justify-between py-6 text-left group focus:outline-none"
            >
              <h3 className="text-white font-satoshi font-bold text-2xl leading-normal pr-4">
                {item.question}
              </h3>
              
              {/* Icono + o - con animación */}
              <motion.div 
                className="flex-shrink-0 w-6 h-6 flex items-center justify-center"
                animate={{ rotate: isOpen ? 180 : 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
              >
                {isOpen ? (
                  <Minus size={20} weight="regular" className="text-white" />
                ) : (
                  <Plus size={20} weight="regular" className="text-white" />
                )}
              </motion.div>
            </button>

            {/* Línea separadora de 1px */}
            {isOpen && (
              <div className="w-full h-px bg-white mb-6"></div>
            )}

            {/* Contenido del acordeón */}
            {isOpen && (
              <div className="pb-8">
                <div className="text-white font-general font-normal text-base lg:text-2xl leading-normal whitespace-pre-line">
                  {item.content}
                </div>
              </div>
            )}
          </motion.div>
        );
      })}
    </motion.div>
  );
}