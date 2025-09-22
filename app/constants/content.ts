/**
 * Datos de contenido básicos
 */

// Enlaces sociales para el Hero Section
export const socialLinks = {
  email: "mailto:diego@example.com",
  linkedin: "https://www.linkedin.com/in/diegocasasbuenas-ai/",
  github: "https://github.com/diegocasasbuenas/website_chatbot"
};

// Contenido mínimo para las secciones
export const sectionsConfig = [
  { id: "hero", title: "Hero Section" },
  { id: "about", title: "About Section" },
  { id: "skills", title: "Skills Section" },
  { id: "projects", title: "Projects Section" },
  { id: "services", title: "Services Section" },
];

// Contenido del acordeón para la sección About
export const aboutAccordionData = [
  {
    id: "who-am-i",
    question: "Who is Diego?",
    content:
      "Diego is an AI Engineer specialized in LLMs and agents. Since 2023, he began his journey in the world of data science and artificial intelligence, developing projects ranging from the basics to advanced implementations: linear regressions, binary classification, ensemble and boosting models, time series analysis, recommendation systems, anomaly detection, LLM fine-tuning, building RAG systems, and creating agents applied to complex workflows.\n\nBeyond his professional work, he is passionate about running, the gym, and a lifestyle focused on personal growth. Thanks to this approach, he developed the habit of reading, having completed more than 10 books in recent years, which has strengthened his mindset and outlook on life. He also enjoys Formula 1 as one of his favorite hobbies.",
  },
  {
    id: "what-i-do",
    question: "What sets Diego apart?",
    content:
      "What makes me unique is my positive attitude toward life and my resilience in the face of failure. Thanks to this combination, I have overcome difficult moments and transformed them into seeds for success. My passion for technology has led me to dive deep into the world of artificial intelligence, while my curiosity about business drives me to combine a technical vision with the ambition of an entrepreneur. In addition, honesty is a core value that I apply both in my work and in my daily life.\n\nI would also define myself as a dreamer, someone who strongly believes in reaching beyond the conventional. I have always felt that the traditional path was not for me and that there was something special within me that I had not fully explored—until now. This combination of vision, authenticity, and determination is what makes me unique.",
  },
];

// Datos de servicios para la sección Services
export const servicesData = [
  {
    id: "llm-finetuning",
    title: "Fine-tuning LLMs",
    description: "Adapting language models to specialized knowledge for concrete use cases.",
    icon: "Brain" // Phosphor icon name
  },
  {
    id: "rag-systems", 
    title: "RAG Systems (Retrieval-Augmented Generation)",
    description: "Implementing architectures that combine information retrieval with language models for more accurate and up-to-date responses.",
    icon: "Database" // Phosphor icon name
  },
  {
    id: "mcp-agents",
    title: "Intelligent Agent Automation (MCP Agents)", 
    description: "Designing autonomous workflows that integrate multiple tools and systems.",
    icon: "Robot" // Phosphor icon name
  },
  {
    id: "chatbots",
    title: "Chatbots & Virtual Assistants",
    description: "Developing intelligent conversational solutions for customer service, internal support, or process automation.",
    icon: "ChatCircle" // Phosphor icon name
  },
  {
    id: "data-analysis",
    title: "Data Analysis & Data Science",
    description: "Extracting actionable insights through statistical models, machine learning, and data visualization.",
    icon: "ChartLine" // Phosphor icon name
  },
  {
    id: "computer-vision",
    title: "Computer Vision",
    description: "Building systems for image classification and advanced object detection.",
    icon: "Eye" // Phosphor icon name
  }
];

// Datos de proyectos para la sección Projects
export const projectsData = [
  {
    id: "project-1",
    title: "RAG-Powered Legal Assistant",
    description: "Intelligent chatbot that processes legal documents and provides contextual responses using Retrieval-Augmented Generation.",
    image: "/images/projects/1.png"
  },
  {
    id: "project-2", 
    title: "Automated ML Pipeline",
    description: "End-to-end machine learning pipeline for time series forecasting with automated model selection and deployment.",
    image: "/images/projects/2.png"
  },
  {
    id: "project-3",
    title: "Real-time Object Detection",
    description: "Computer vision application for real-time object detection and classification using advanced deep learning models.",
    image: "/images/projects/3.png"
  },
  {
    id: "project-4",
    title: "Domain-Specific LLM Fine-tuning",
    description: "Fine-tuned language model for specialized industry knowledge with custom training pipeline and evaluation metrics.",
    image: "/images/projects/4.png"
  },
  {
    id: "project-5",
    title: "Business Intelligence Dashboard",
    description: "Interactive dashboard for business analytics with real-time data visualization and automated reporting capabilities.",
    image: "/images/projects/5.png"
  },
  {
    id: "project-6",
    title: "Multi-Agent Workflow System",
    description: "Intelligent agent system that automates complex business workflows using MCP (Model Context Protocol) integration.",
    image: "/images/projects/6.png"
  },
  {
    id: "project-7",
    title: "Neural Network Optimization Platform",
    description: "Advanced platform for neural architecture search and hyperparameter optimization using evolutionary algorithms and distributed computing.",
    image: "/images/projects/7.png"
  }
];
