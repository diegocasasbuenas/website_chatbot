import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        satoshi: ["var(--font-satoshi)", "sans-serif"],
        general: ["var(--font-general)", "sans-serif"],
      },
      fontSize: {
        'ai-mobile': 'clamp(20px, 4vw, 35px)',
        'ai-desktop': 'clamp(50px, 6vw, 80px)',
      },
      letterSpacing: {
        'ai-mobile': 'clamp(-1px, -0.2vw, -1.5px)',
        'ai-desktop': 'clamp(-2px, -0.4vw, -4px)',
      },
      margin: {
        'ai-desktop': 'clamp(-120px, -8vw, -80px)',
      },
      borderColor: {
        'glass': 'rgba(255, 255, 255, 0.25)',
      },
      backgroundImage: {
        'glass': 'linear-gradient(91deg, rgba(0, 0, 0, 0.25) 0%, rgba(0, 0, 0, 0.05) 100%)',
      },
      boxShadow: {
        'glass': '0 4px 8px 0 rgba(0, 0, 0, 0.15)',
      },
      backdropBlur: {
        'glass': '12px',
      }
    },
  },
  plugins: [],
};
export default config;
