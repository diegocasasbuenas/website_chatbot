import { SectionTitle, GlassButton, GlassCard, GlassInput } from "@/app/components/ui";

export function HeroSection() {
  return (
    <section id="hero" className="min-h-screen flex flex-col items-center justify-center gap-8 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 py-8">
      <SectionTitle className="text-center">
        {/* Layout móvil y tablet: AI Developer debajo */}
        <div className="block xl:hidden">
          <span className="block">DIEGO</span>
          <span className="block">CASASBUENAS</span>
          <span 
            className="block text-white italic mt-4"
            style={{
              fontFamily: 'var(--font-general)',
              fontSize: 'clamp(24px, 4vw, 40px)',
              fontWeight: 300,
              fontStyle: 'italic',
              lineHeight: 'normal',
              letterSpacing: 'clamp(-1px, -0.2vw, -2px)'
            }}
          >
            AI Developer
          </span>
        </div>

        {/* Layout desktop: AI Developer al lado */}
        <div className="hidden xl:block">
          <span className="block">
            <span className="relative inline-block">
              DIEGO
              <span 
                className="text-white italic absolute whitespace-nowrap"
                style={{
                  fontFamily: 'var(--font-general)',
                  fontSize: 'clamp(60px, 5vw, 80px)',
                  fontWeight: 300,
                  fontStyle: 'italic',
                  lineHeight: 'normal',
                  letterSpacing: 'clamp(-3px, -0.3vw, -4px)',
                  bottom: '0',
                  left: '100%',
                  marginLeft: '16px'
                }}
              >
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