import { HeroSection } from "./components/sections/HeroSection";
import GlobalLayout from "./components/ui/layouts/GlobalLayout";

export default function Home() {
  return (
    <main className="scroll-container h-screen flex flex-col md:snap-y md:snap-mandatory scroll-smooth overflow-y-auto scrollbar-none no-scrollbar">
      <HeroSection />
      <GlobalLayout />
    </main>
  );
}
