import { ReactNode } from 'react';

interface SectionLayoutProps {
  children: ReactNode;
  sectionName: string;
  className?: string;
}

export function SectionLayout({ children, sectionName, className = '' }: SectionLayoutProps) {
  return (
    <section className={`min-h-screen w-full grid grid-cols-[clamp(40px,8vw,60px)_1fr] grid-rows-[clamp(40px,8vw,60px)_1fr] ${className}`}>
      {/* Esquina superior izquierda - vacía */}
      <div className=""></div>
      
      {/* Línea horizontal superior */}
      <div className="border-b border-white"></div>
      
      {/* Contenedor de textos en el espacio izquierdo */}
      <div className="relative border-r border-white flex flex-col justify-between items-center py-[clamp(20px,4vw,60px)] overflow-hidden">
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
          <span className="inline sm:hidden">D. CASASBUENAS</span>
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