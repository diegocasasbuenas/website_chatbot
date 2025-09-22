import { SectionLayout, SectionTitleWrapper } from "@/app/components/layout";
import { ServiceCard } from "@/app/components/ui";
import { servicesData } from "@/app/constants/content";

export function ServicesSection() {
  return (
    <SectionLayout sectionName="SERVICES" id="services">
      {/* Contenido principal */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-7xl">
          {/* Grid de servicios */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {servicesData.map((service, index) => (
              <ServiceCard
                key={service.id}
                title={service.title}
                description={service.description}
                iconName={service.icon}
                index={index}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Título en la esquina inferior izquierda */}
      <SectionTitleWrapper>Services</SectionTitleWrapper>
    </SectionLayout>
  );
}