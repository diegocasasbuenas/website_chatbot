"use client";

import { useScrollProgress } from "@/hooks/useScrollProgress";
import Background from "./components/animations/BackgroundCanvas";
import NoiseOverlay from "./components/animations/NoiseOverlay";

export default function ClientRoot({
  children,
}: {
  children: React.ReactNode;
}) {
  const progress = useScrollProgress();

  return (
    <>
      <Background scroll={progress} />
      <NoiseOverlay />
      {children}
    </>
  );
}
