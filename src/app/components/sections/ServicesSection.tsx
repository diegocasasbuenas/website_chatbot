import { ServiceCard } from "../ui/molecules/ServiceCard";
import {
  BeakerIcon,
  ServerStackIcon,
  CpuChipIcon,
  ChatBubbleLeftRightIcon,
  ChartBarIcon,
  EyeIcon,
} from "@heroicons/react/24/outline";

const servicesData = [
  {
    id: "llm-finetuning",
    title: "Fine-tuning LLMs",
    description:
      "Adapting language models to specialized knowledge for concrete use cases.",
    icon: BeakerIcon,
  },
  {
    id: "rag-systems",
    title: "RAG Systems (Retrieval-Augmented Generation)",
    description:
      "Implementing architectures that combine information retrieval with language models for more accurate and up-to-date responses.",
    icon: ServerStackIcon,
  },
  {
    id: "mcp-agents",
    title: "Intelligent Agent Automation (MCP Agents)",
    description:
      "Designing autonomous workflows that integrate multiple tools and systems.",
    icon: CpuChipIcon,
  },
  {
    id: "chatbots",
    title: "Chatbots & Virtual Assistants",
    description:
      "Developing intelligent conversational solutions for customer service, internal support, or process automation.",
    icon: ChatBubbleLeftRightIcon,
  },
  {
    id: "data-analysis",
    title: "Data Analysis & Data Science",
    description:
      "Extracting actionable insights through statistical models, machine learning, and data visualization.",
    icon: ChartBarIcon,
  },
  {
    id: "computer-vision",
    title: "Computer Vision",
    description:
      "Building systems for image classification and advanced object detection.",
    icon: EyeIcon,
  },
];

export default function ServicesSection() {
  return (
    <div className="w-full h-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 overflow-y-auto">
      {servicesData.map(({ id, title, description, icon }) => (
        <ServiceCard
          key={id}
          title={title}
          description={description}
          icon={icon}
        />
      ))}
    </div>
  );
}
