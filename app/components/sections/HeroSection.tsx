import { SectionTitle, GlassButton, GlassCard, GlassInput } from "@/app/components/ui";
import { Lightning, List, ArrowDown, Envelope, LinkedinLogo, GithubLogo } from "@phosphor-icons/react";
import { motion, AnimatePresence } from "framer-motion";
import { useChat, type ChatMessage } from "@/hooks/useChat";
import { socialLinks } from "@/app/constants/content";
import Image from "next/image";

export function HeroSection() {
  // Use custom chat hook
  const {
    messages,
    inputValue,
    isLoading,
    isChatVisible,
    chatContainerRef,
    handleSubmit,
    handleInputChange,
    isSubmitDisabled
  } = useChat();

  // Navigate to next section (About)
  const handleScrollToNext = () => {
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
      aboutSection.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };
  
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

      {/* Chat Container - Appears after first message */}
      <AnimatePresence>
        {isChatVisible && (
          <motion.div
            initial={{ opacity: 0, height: 0, y: -20 }}
            animate={{ opacity: 1, height: "auto", y: 0 }}
            exit={{ opacity: 0, height: 0, y: -20 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="w-full max-w-[1440px]" // Match the width of the title with max constraint
          >
            <GlassCard className="max-h-96 overflow-y-auto scrollbar-hide" ref={chatContainerRef}>
              <div className="space-y-4">
                {messages.map((message) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[80%] p-3 rounded-2xl ${
                        message.role === 'user'
                          ? 'bg-white/20 text-white ml-4'
                          : 'bg-gradient-to-r from-green-500/20 to-orange-500/20 text-white mr-4'
                      }`}
                    >
                      <p className="text-sm font-general leading-relaxed">
                        {message.content}
                      </p>
                    </div>
                  </motion.div>
                ))}
                
                {/* Loading indicator */}
                {isLoading && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex justify-start"
                  >
                    <div className="bg-gradient-to-r from-green-500/20 to-orange-500/20 text-white mr-4 p-3 rounded-2xl">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>
            </GlassCard>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Input interactivo con botón de envío */}
      <form onSubmit={handleSubmit} className="w-full max-w-xl flex justify-center px-4">
        <GlassInput 
          placeholder="What would Diego do as your AI copilot?"
          className="flex-1 !rounded-l-[24px] !rounded-r-none"
          fullWidth={true}
          value={inputValue}
          onChange={handleInputChange}
          disabled={isLoading}
        />
        <GlassButton 
          type="submit" 
          className="!rounded-r-[24px] !rounded-l-none ml-2 flex-shrink-0"
          disabled={isSubmitDisabled}
        >
          <svg width="0" height="0" style={{ position: 'absolute' }}>
            <defs>
              <linearGradient id="lightning-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="19.84%" stopColor="#60FCB8" />
                <stop offset="80.16%" stopColor="#FF9A44" />
              </linearGradient>
            </defs>
          </svg>
          <motion.div
            animate={isLoading ? { rotate: 360 } : { rotate: 0 }}
            transition={isLoading ? { duration: 1, repeat: Infinity, ease: "linear" } : { duration: 0.3 }}
          >
            <Lightning 
              size={24} 
              weight="fill"
              style={{
                fill: 'url(#lightning-gradient)',
                color: 'url(#lightning-gradient)'
              }}
            />
          </motion.div>
        </GlassButton>
      </form>

      </div>

      {/* Bottom Left - Animated Arrow and Text */}
      <div className="absolute bottom-4 lg:bottom-[60px] left-4 lg:left-[60px] flex items-center gap-3">
        {/* Animated Arrow */}
        <motion.button
          onClick={handleScrollToNext}
          animate={{ 
            y: [0, 8, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="text-white cursor-pointer hover:opacity-80 transition-opacity focus:outline-none"
        >
          <ArrowDown size={32} weight="bold" />
        </motion.button>
        
        {/* Text */}
        <button
          onClick={handleScrollToNext}
          className="text-white font-general text-base font-light cursor-pointer hover:opacity-80 transition-opacity focus:outline-none"
        >
          Meet the human behind the AI
        </button>
      </div>

      {/* Bottom Right - Social Contact Buttons */}
      <div className="absolute bottom-4 lg:bottom-[60px] right-4 lg:right-[60px] flex flex-col items-center gap-3">
        {/* Email Button */}
        <GlassButton 
          variant="circular" 
          className="w-12 h-12 hover:scale-110 transition-transform duration-200"
          onClick={() => window.location.href = socialLinks.email}
        >
          <Envelope size={20} weight="regular" />
        </GlassButton>
        
        {/* LinkedIn Button */}
        <GlassButton 
          variant="circular" 
          className="w-12 h-12 hover:scale-110 transition-transform duration-200"
          onClick={() => window.open(socialLinks.linkedin, '_blank')}
        >
          <LinkedinLogo size={20} weight="regular" />
        </GlassButton>
        
        {/* GitHub Button */}
        <GlassButton 
          variant="circular" 
          className="w-12 h-12 hover:scale-110 transition-transform duration-200"
          onClick={() => window.open(socialLinks.github, '_blank')}
        >
          <GithubLogo size={20} weight="regular" />
        </GlassButton>
      </div>

    </section>
  );
}