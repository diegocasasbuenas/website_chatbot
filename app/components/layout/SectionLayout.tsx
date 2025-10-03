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
    if (typeof window === 'undefined') return;

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
      className={`min-h-[100dvh] w-full grid grid-cols-1 grid-rows-[auto_1fr] md:[grid-template-columns:clamp(40px,7vw,60px)_1fr] md:[grid-template-rows:clamp(40px,7vw,60px)_1fr] ${className}`}
    >
      {/* Esquina superior izquierda - vacía */}
      <div className="hidden md:block"></div>
      
      {/* Línea horizontal superior con botones de acción */}
      <div className="border-b border-white relative flex items-center justify-between md:justify-end gap-3 px-[clamp(16px,3vw,48px)] md:min-h-[48px] md:max-h-[60px]">
        {/* Menú hamburger - solo visual, igual al del hero */}
        <button
          className="order-1 md:order-2 w-10 h-10 flex items-center justify-center text-white/70 hover:text-white hover:scale-110 transition-all duration-200 cursor-pointer"
          title="Menú"
        >
          <List size={20} weight="regular" />
        </button>

        {/* Botón de contacto rápido */}
        <button
          className="order-2 md:order-1 ml-auto md:ml-0 px-3 py-1.5 text-white/70 hover:text-white hover:scale-105 transition-all duration-200 cursor-pointer font-general text-sm font-bold uppercase tracking-wide"
          onClick={() => {
            if (typeof window === 'undefined') return;
            window.location.href = socialLinks.email;
          }}
          title="Contactar por email"
        >
          CONTACT
        </button>
      </div>
      
      {/* Contenedor de textos en el espacio izquierdo */}
      <div className="hidden md:flex relative border-r border-white py-[clamp(18px,4vw,96px)] px-[clamp(6px,1.4vw,12px)] overflow-hidden">
        <div className="flex flex-col items-center justify-between w-full h-full">
          {/* Navegación rápida entre secciones - Solo visible en desktop */}
          <div className="hidden lg:flex flex-col gap-0.5">
            {sectionsConfig.map((section) => (
              <div key={section.id} className="relative group">
                <button
                  onClick={() => scrollToSection(section.id)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 cursor-pointer ${
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
          <div className="flex-1 flex items-center justify-center w-full">
            <div
              className="text-white font-general font-light uppercase tracking-[0.22em]"
              style={{
                writingMode: 'vertical-rl',
                textOrientation: 'mixed',
                transform: 'rotate(180deg)',
                fontSize: 'clamp(9px, 1.3vw, 13px)'
              }}
            >
              {sectionName}
            </div>
          </div>

          {/* DIEGO CASASBUENAS */}
          <div className="flex justify-center w-full mt-[clamp(12px,2vw,24px)]">
            <div
              className="text-white font-satoshi font-black uppercase tracking-[0.22em]"
              style={{
                writingMode: 'vertical-rl',
                textOrientation: 'mixed',
                transform: 'rotate(180deg)',
                fontSize: 'clamp(9px, 1.3vw, 13px)'
              }}
            >
              DIEGO CASASBUENAS
            </div>
          </div>
        </div>
      </div>
      
      {/* Contenido principal de la sección */}
      <div className="relative flex flex-col p-[clamp(16px,4.5vw,110px)]">
        <div className="md:hidden mb-5 w-full flex justify-center">
          <h2 className="text-white text-[clamp(20px,5.5vw,36px)] font-[900] tracking-[-1px] text-center" style={{ fontFamily: 'var(--font-satoshi)', lineHeight: '95%' }}>
            {sectionName}
          </h2>
        </div>
        {children}
      </div>
    </section>
  );
}
