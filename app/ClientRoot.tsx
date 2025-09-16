"use client";

import Background from "./components/animations/BackgroundCanvas";
import NoiseOverlay from "./components/animations/NoiseOverlay";

export default function ClientRoot({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Background />
      <NoiseOverlay />
      {children}
    </>
  );
}
