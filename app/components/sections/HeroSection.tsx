import { SectionTitle, GlassButton, GlassCard, GlassInput } from "@/app/components/ui";
import { Lightning } from "@phosphor-icons/react";

export function HeroSection() {
  return (
    <section id="hero" className="min-h-screen flex flex-col items-center justify-center gap-8 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 py-8">
      <SectionTitle className="text-center">
        {/* Layout móvil y tablet: AI Developer debajo */}
        <div className="block xl:hidden">
          <span className="block">DIEGO</span>
          <span className="block">CASASBUENAS</span>
          <span className="block text-white font-general text-[clamp(24px,5vw,48px)] font-light italic leading-normal tracking-tight mt-4">
            AI Developer
          </span>
        </div>

        {/* Layout desktop: AI Developer al lado */}
        <div className="hidden xl:block">
          <span className="block">
            <span className="relative inline-block">
              DIEGO
              <span className="text-white font-general text-[clamp(48px,6vw,80px)] font-light italic leading-normal tracking-tight absolute bottom-0 left-full ml-4 whitespace-nowrap">
                AI Developer
              </span>
            </span>
          </span>
          <span className="block">CASASBUENAS</span>
        </div>
      </SectionTitle>

      {/* Input interactivo con botón de envío */}
      <div className="w-full max-w-xl flex justify-center px-4">
        <GlassInput 
          placeholder="What would Diego do as your AI copilot?"
          className="flex-1 !rounded-l-[24px] !rounded-r-none"
          fullWidth={true}
        />
        <GlassButton className="px-6 py-5 !rounded-r-[24px] !rounded-l-none ml-2 flex-shrink-0">
          <svg width="0" height="0" style={{ position: 'absolute' }}>
            <defs>
              <linearGradient id="lightning-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="19.84%" stopColor="#60FCB8" />
                <stop offset="80.16%" stopColor="#FF9A44" />
              </linearGradient>
            </defs>
          </svg>
          <Lightning 
            size={24} 
            weight="fill"
            style={{
              fill: 'url(#lightning-gradient)',
              color: 'url(#lightning-gradient)'
            }}
          />
        </GlassButton>
      </div>
    </section>
  );
}