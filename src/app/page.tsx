import { HeroSection } from "./components/sections/HeroSection";
import GlobalLayout from "./components/ui/layouts/GlobalLayout";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <GlobalLayout />
    </main>
  );
}
