"use client";

import BackgroundCanvas from "./components/animations/BackgroundCanvas";
import NoiseOverlay from "./components/animations/NoiseOverlay";

/**
 * Componente raíz del cliente que envuelve toda la aplicación
 * 
 * Incluye:
 * - Background animado con blobs responsivos al scroll
 * - Overlay de ruido para textura visual
 * - Contenido principal de la página
 */
export default function ClientRoot({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <BackgroundCanvas />
      <NoiseOverlay />
      {children}
    </>
  );
}
