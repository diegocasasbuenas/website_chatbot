import { ReactNode } from "react";
import Typography from "../atoms/text/TypographyAtom";

// type SectionLayoutProps = {
//   children: ReactNode;
// };

export default function SectionLayout() {
  return (
    <section className="w-full min-h-screen max-h-screen grid grid-cols-[1fr] grid-rows-[60px_1fr] md:grid-cols-[60px_1fr] md:grid-rows-[60px_1fr]">
      {/* Cubo esquina superior izquierda */}
      <div className="hidden md:block"></div>
      {/* Contenedor superior */}
      <div className="border-b-1 border-b-white p-4">
        <a href="#">
          <Typography as="h3">Contacto</Typography>
        </a>
      </div>
      {/* Contenedor izquierda */}
      <div className="border-r-1 border-r-white hidden md:block"></div>
      {/* Contenedor principal */}
      <div className="overflow-y-auto scrollbar-none no-scrollbar">
        <section className="min-h-full flex items-center justify-center">
          <h2>Sección 1</h2>
        </section>
        <section className="min-h-full flex items-center justify-center">
          <h2>Sección 2</h2>
        </section>
        <section className="min-h-full flex items-center justify-center">
          <h2>Sección 3</h2>
        </section>
        <section className="min-h-full flex items-center justify-center">
          <h2>Sección 4</h2>
        </section>
      </div>
    </section>
  );
}
