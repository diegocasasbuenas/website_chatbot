import Image from "next/image";
import { useEffect, useState } from "react";
import Typography from "../ui/atoms/text/TypographyAtom";
import GlassContainerAtom from "../ui/atoms/containers/GlassContainerAtom";
import { SiGithub } from "react-icons/si";

const projectsData = [
  {
    id: "project-1",
    title: "AI Insurance Policy Chatbot",
    description:
      "Dual assistant that helps employees and clients query insurance policies with instant, accurate responses.",
    image: "/images/projects/1.png",
    githubUrl: "https://github.com/placeholder/insurance-chatbot",
  },
  {
    id: "project-2",
    title: "Oil Production Forecasting Agent",
    description:
      "LLM-powered analytical agent that produces approximate oil production forecasts to support strategic decisions.",
    image: "/images/projects/2.png",
    githubUrl: "https://github.com/placeholder/oil-forecast-agent",
  },
  {
    id: "project-3",
    title: "Image Classification with Deep Learning",
    description:
      "ResNet and Vision Transformer models that classify and label images for industries such as retail and healthcare.",
    image: "/images/projects/3.png",
    githubUrl: "https://github.com/placeholder/image-classification",
  },
  {
    id: "project-4",
    title: "Custom Fine-Tuned LLMs with RAG",
    description:
      "Open-source LLM fine-tuning pipeline with RAG inference served via FastAPI, enabling custom personalities and APIs.",
    image: "/images/projects/4.png",
    githubUrl: "https://github.com/placeholder/llm-rag-pipeline",
  },
  {
    id: "project-5",
    title: "Automated AI Dashboards",
    description:
      "Interactive dashboards wired to ML models, delivering real-time insights, automated reports, and predictive analytics.",
    image: "/images/projects/5.png",
    githubUrl: "https://github.com/placeholder/ai-dashboards",
  },
  {
    id: "project-6",
    title: "Multi-Agent Process Automation",
    description:
      "Network of autonomous agents that execute complex workflows while users interact through a single conversational LLM.",
    image: "/images/projects/6.png",
    githubUrl: "https://github.com/placeholder/multi-agent-automation",
  },
  {
    id: "project-7",
    title: "AI Product Development Platform",
    description:
      "End-to-end AI product design—from training neural networks to deploying scalable APIs with key-based access.",
    image: "/images/projects/7.png",
    githubUrl: "https://github.com/placeholder/ai-product-platform",
  },
];

export default function ProjectsSection() {
  const [isTouch, setIsTouch] = useState(false);
  const [activeProjectIndex, setActiveProjectIndex] = useState<number | null>(
    null
  );
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // Detectar si es touch
  useEffect(() => {
    const hasTouch = "ontouchstart" in window || navigator.maxTouchPoints > 0;
    setIsTouch(hasTouch);
  }, []);

  const currentProject =
    !isTouch && hoveredIndex !== null ? projectsData[hoveredIndex] : null;

  const toggleCard = (index: number) => {
    setActiveProjectIndex((prev) => (prev === index ? null : index));
  };

  return (
    <div className="relative w-full h-full overflow-hidden">
      <div className="relative w-full h-full grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-15 overflow-y-auto">
        {projectsData.map((project, index) => {
          const isActive = activeProjectIndex === index;

          return (
            <div
              key={project.id}
              className={`relative w-full lg:w-3/4 h-[475px] md:aspect-[4/3] lg:h-[400px] xl:h-[600px] 2xl:h-[800px] ${
                index % 2 !== 0 ? "justify-self-end" : "justify-self-start"
              } rounded-2xl overflow-hidden`}
              onClick={() => isTouch && toggleCard(index)}
              onMouseEnter={() => !isTouch && setHoveredIndex(index)}
              onMouseLeave={() => !isTouch && setHoveredIndex(null)}
            >
              <Image
                src={project.image}
                alt={`Project ${index + 1}`}
                fill
                className={`z-0 object-cover rounded-2xl grayscale hover:grayscale-0 cursor-pointer transition-all duration-300 ${
                  isActive ? "grayscale-0" : "grayscale hover:grayscale-0"
                }`}
              />

              {/* 👇 Solo aparece dentro de la card en touch */}
              {isTouch && isActive && (
                <div className="absolute inset-0 z-10 flex flex-col justify-end items-start gap-4 bg-black/60 text-white p-6 rounded-2xl transition-all duration-300">
                  <Typography variant="subtitle" className="text-left">
                    {project.title}
                  </Typography>
                  <Typography variant="body">{project.description}</Typography>
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <GlassContainerAtom variant="button">
                      <SiGithub className="text-sm" />
                      <Typography variant="body">View on Github</Typography>
                    </GlassContainerAtom>
                  </a>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* 👇 El ASIDE solo aparece en desktop (no touch) */}
      {!isTouch && currentProject && (
        <aside className="absolute inset-0 z-10 pointer-events-none flex flex-col justify-center items-center text-white p-8 rounded-2xl">
          <Typography variant="subtitle">{currentProject.title}</Typography>
          <Typography variant="body">{currentProject.description}</Typography>
        </aside>
      )}
    </div>
  );
}
