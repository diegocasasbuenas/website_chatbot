import { SectionTitle, GlassButton, GlassCard, GlassInput } from "@/app/components/ui";
import { Lightning, List, ArrowDown, Envelope, LinkedinLogo, GithubLogo } from "@phosphor-icons/react";
import { motion } from "framer-motion";
import Image from "next/image";

export function HeroSection() {
  return (
    <section id="hero" className="min-h-screen flex flex-col px-4 lg:px-[60px] py-4 lg:py-[60px] relative">
      
      {/* Header - Logo, Language Buttons, Menu */}
      <header className="w-full flex items-center justify-between mb-8">
        {/* Logo */}
        <div className="flex-shrink-0">
          <Image
            src="/images/Logo.svg"
            alt="Diego Logo"
            width={72}
            height={38}
            className="w-auto h-8 lg:h-10"
          />
        </div>

        {/* Language Buttons */}
        <div className="hidden lg:flex items-center gap-4">
          <button className="text-white font-general text-2xl font-medium hover:opacity-80 transition-opacity cursor-pointer">
            EN
          </button>
          <button 
            className="font-general text-2xl font-medium transition-opacity cursor-pointer"
            style={{ color: 'rgba(255, 255, 255, 0.50)' }}
          >
            ES
          </button>
        </div>

        {/* Menu Icon */}
        <button className="flex-shrink-0 text-white hover:opacity-80 transition-opacity cursor-pointer">
          <List size={32} weight="regular" />
        </button>
      </header>

      {/* Main Content - Centered */}
      <div className="flex-1 flex flex-col items-center justify-center gap-8">
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
        <GlassButton className="!rounded-r-[24px] !rounded-l-none ml-2 flex-shrink-0">
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

      </div>

      {/* Bottom Left - Animated Arrow and Text */}
      <div className="absolute bottom-4 lg:bottom-[60px] left-4 lg:left-[60px] flex items-center gap-3">
        {/* Animated Arrow */}
        <motion.div
          animate={{ 
            y: [0, 8, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="text-white"
        >
          <ArrowDown size={32} weight="bold" />
        </motion.div>
        
        {/* Text */}
        <span className="text-white font-general text-base font-light">
          Meet the human behind the AI
        </span>
      </div>

      {/* Bottom Right - Social Contact Buttons */}
      <div className="absolute bottom-4 lg:bottom-[60px] right-4 lg:right-[60px] flex flex-col items-center gap-3">
        {/* Email Button */}
        <GlassButton variant="circular" className="w-12 h-12 hover:scale-110 transition-transform duration-200">
          <Envelope size={20} weight="regular" />
        </GlassButton>
        
        {/* LinkedIn Button */}
        <GlassButton variant="circular" className="w-12 h-12 hover:scale-110 transition-transform duration-200">
          <LinkedinLogo size={20} weight="regular" />
        </GlassButton>
        
        {/* GitHub Button */}
        <GlassButton variant="circular" className="w-12 h-12 hover:scale-110 transition-transform duration-200">
          <GithubLogo size={20} weight="regular" />
        </GlassButton>
      </div>

    </section>
  );
}