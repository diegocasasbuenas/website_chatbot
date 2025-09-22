import { ReactNode } from 'react';
import { List } from "@phosphor-icons/react";
import { sectionsConfig, socialLinks } from "@/app/constants/content";

interface SectionLayoutProps {
  children: ReactNode;
  sectionName: string;
  className?: string;
  id?: string;
}

export function SectionLayout({ children, sectionName, className = '', id }: SectionLayoutProps) {
  // Navigation function
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  return (
    <section 
      id={id}
      className={`min-h-screen w-full grid grid-cols-[clamp(40px,8vw,60px)_1fr] grid-rows-[clamp(40px,8vw,60px)_1fr] ${className}`}
    >
      {/* Esquina superior izquierda - vacía */}
      <div className=""></div>
      
      {/* Línea horizontal superior con botones de acción */}
      <div className="border-b border-white relative flex items-center justify-end px-[clamp(10px,2vw,20px)]">
        {/* Botones de acción */}
        <div className="flex items-center gap-3">
          {/* Botón de contacto rápido */}
          <button
            className="px-3 py-1.5 text-white/70 hover:text-white hover:scale-105 transition-all duration-200 cursor-pointer font-general text-sm font-bold uppercase tracking-wide"
            onClick={() => window.location.href = socialLinks.email}
            title="Contactar por email"
          >
            CONTACT
          </button>

          {/* Menú hamburger - solo visual, igual al del hero */}
          <button
            className="w-10 h-10 flex items-center justify-center text-white/70 hover:text-white hover:scale-110 transition-all duration-200 cursor-pointer"
            title="Menú"
          >
            <List size={20} weight="regular" />
          </button>
        </div>
      </div>
      
      {/* Contenedor de textos en el espacio izquierdo */}
      <div className="relative border-r border-white flex flex-col justify-between items-center py-[clamp(20px,4vw,60px)] overflow-visible">
        {/* Navegación rápida entre secciones - Solo visible en desktop */}
        <div className="hidden lg:flex flex-col gap-1">
          {sectionsConfig.map((section, index) => (
            <div key={section.id} className="relative group">
              <button
                onClick={() => scrollToSection(section.id)}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                  section.id === id 
                    ? 'bg-white scale-125' 
                    : 'bg-white/30 hover:bg-white/60 hover:scale-110'
                }`}
                title={section.title}
              />
              {/* Tooltip personalizado */}
              <div className="absolute left-full ml-2 top-1/2 -translate-y-1/2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 pointer-events-none z-[100]">
                <div className="bg-black/90 backdrop-blur-sm text-white text-xs font-general px-3 py-1.5 rounded-md whitespace-nowrap border border-white/20">
                  {section.title}
                  {/* Flecha del tooltip */}
                  <div className="absolute right-full top-1/2 -translate-y-1/2 border-4 border-transparent border-r-black/90"></div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Nombre de la sección */}
        <div 
          className="text-white font-general font-light tracking-[1px] sm:tracking-[2px] uppercase"
          style={{ 
            transformOrigin: 'center',
            transform: 'rotate(-90deg)',
            whiteSpace: 'nowrap',
            fontSize: 'clamp(10px, 2vw, 14px)'
          }}
        >
          {sectionName}
        </div>
        
        {/* DIEGO CASASBUENAS - Responsive */}
        <div 
          className="text-white font-satoshi font-black tracking-[0.5px] sm:tracking-[1px] uppercase"
          style={{ 
            transformOrigin: 'center',
            transform: 'rotate(-90deg)',
            whiteSpace: 'nowrap',
            fontSize: 'clamp(8px, 1.8vw, 14px)',
            maxWidth: '100%'
          }}
        >
          <span className="inline sm:hidden pl-[30px]">D. CASASBUENAS</span>
          <span className="hidden sm:inline">DIEGO CASASBUENAS</span>
        </div>
      </div>
      
      {/* Contenido principal de la sección */}
      <div className="relative flex flex-col p-[clamp(20px,4vw,60px)]">
        {children}
      </div>
    </section>
  );
}