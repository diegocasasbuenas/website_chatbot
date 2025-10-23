import Image from "next/image";
import { useEffect, useState } from "react";
import Typography from "../ui/atoms/text/TypographyAtom";

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
  const [isTouch, setIsTouch] = useState<boolean>(false);
  const [activeProjectIndex, setActiveProjectIndex] = useState<number | null>(
    null
  );
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(0);

  const currentIndex = hoveredIndex ?? 0;
  const currentProject = projectsData[currentIndex];

  useEffect(() => {
    const hasTouch = "ontouchstart" in window || navigator.maxTouchPoints > 0;
    setIsTouch(hasTouch);
  }, []);

  const toggleCard = (index: number) => {
    setActiveProjectIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  return (
    <div className="relative w-full h-full grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-15 overflow-y-auto">
      {projectsData.map((project, index) => {
        const isActive = activeProjectIndex === index;
        return (
          <div
            key={index}
            className={`relative w-full lg:w-3/4 h-[475px] md:aspect-[4/3] lg:h-[400px] xl:h-[600px] 2xl:h-[800px] ${
              index % 2 !== 0 ? "justify-self-end" : "justify-self-start"
            }`}
            onBlur={() =>
              setActiveProjectIndex((prevIndex) =>
                prevIndex === index ? null : prevIndex
              )
            }
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() =>
              setHoveredIndex((prev) => (prev === index ? null : prev))
            }
          >
            <Image
              src={project.image}
              alt={`Project ${index + 1}`}
              fill
              className="object-cover rounded-2xl grayscale hover:grayscale-0 cursor-pointer"
            />
          </div>
        );
      })}
      <aside className=" pointer-events-none absolute w-full h-full flex flex-col justify-center items-center">
        <Typography variant="subtitle">{currentProject.title}</Typography>
        <Typography variant="body">{currentProject.description}</Typography>
      </aside>
    </div>
  );
}
