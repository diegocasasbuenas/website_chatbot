import { SectionTitle, GlassButton, GlassCard, GlassInput } from "@/app/components/ui";

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
    </section>
  );
}