
// ===============================
// 1. Enlaces sociales (Hero)
// ===============================
export const socialLinks = {
  email: "mailto:diego@example.com",
  linkedin: "https://www.linkedin.com/in/diegocasasbuenas-ai/",
  github: "https://github.com/diegocasasbuenas/website_chatbot"
};

// ===============================
// 2. Configuración de secciones
// ===============================
export const sectionsConfig = [
  { id: "hero", title: "Home" },
  { id: "about", title: "Meet Diego" },
  { id: "skills", title: "Skills" },
  { id: "projects", title: "Projects" },
  { id: "services", title: "Services" },
];

// ===============================
// 3. Contenido para sección About
// ===============================
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

// ===============================
// 4. Servicios (Services Section)
// ===============================
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

// ===============================
// 5. Proyectos (Projects Section)
// ===============================
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

// ===============================
// 6. Skills Graph (Skills Section)
// ===============================
export const skillsData = {
  // Texto del nodo central (corazón)
  centerNode: "Diego's Skills",

  // Nodos principales y sus hijos con info detallada
  parentNodes: [
    // --- Edita cada bloque para cambiar los nodos principales y sus hijos ---
    {
      id: "core-ai-ml",
      title: "Core AI & ML",
      description: "Fundamental concepts and models for artificial intelligence and machine learning.",
      projects: [
        { title: "ML Foundations", description: "Building core models for prediction and classification." },
        { title: "AI Research", description: "Exploring new algorithms and approaches." }
      ],
      tools: ["Python", "Scikit-learn", "TensorFlow", "PyTorch"],
      children: [
        {
          id: "anomaly-detection",
          title: "Anomaly Detection",
          description: "Identify unusual patterns in financial data, e-commerce, and operations.",
          projects: [
            { title: "Fraud Detection System", description: "Detecting anomalies in financial transactions." },
            { title: "E-commerce Monitoring", description: "Real-time detection of unusual shopping behaviors." }
          ],
          tools: ["Python", "PyOD", "Scikit-learn", "Pandas"]
        },
        {
          id: "time-series",
          title: "Time Series",
          description: "Forecasting and analyzing temporal data for business and science.",
          projects: [
            { title: "Sales Forecasting", description: "Predicting future sales using time series models." }
          ],
          tools: ["Python", "Prophet", "Statsmodels", "Pandas"]
        },
        {
          id: "learning",
          title: "Learning",
          description: "Supervised and unsupervised learning techniques.",
          projects: [
            { title: "Customer Segmentation", description: "Grouping users based on behavior." }
          ],
          tools: ["Scikit-learn", "Python"]
        },
        {
          id: "deep-learning",
          title: "Deep Learning",
          description: "Neural networks for image, text, and data analysis.",
          projects: [
            { title: "Image Classifier", description: "Classifying images using CNNs." }
          ],
          tools: ["TensorFlow", "PyTorch", "Keras"]
        },
        {
          id: "recommenders",
          title: "Recommenders",
          description: "Building recommendation systems for products and content.",
          projects: [
            { title: "Movie Recommender", description: "Suggesting movies based on user preferences." }
          ],
          tools: ["Python", "Surprise", "LightFM"]
        }
      ]
    },
    {
      id: "llms",
      title: "LLM's",
      description: "Large Language Models for advanced text understanding and generation.",
      projects: [
        { title: "Chatbot Platform", description: "Conversational AI using LLMs." }
      ],
      tools: ["Python", "HuggingFace", "LangChain"],
      children: [
        {
          id: "applications",
          title: "Applications",
          description: "Practical uses of LLMs in business and research.",
          projects: [
            { title: "Legal Assistant", description: "Processing legal documents with LLMs." }
          ],
          tools: ["Python", "OpenAI API"]
        },
        {
          id: "rag",
          title: "RAG",
          description: "Retrieval-Augmented Generation for contextual responses.",
          projects: [
            { title: "RAG System", description: "Combining search and generation for better answers." }
          ],
          tools: ["LangChain", "Python"]
        },
        {
          id: "fine-tuning",
          title: "Fine-Tuning",
          description: "Adapting LLMs to specific domains and tasks.",
          projects: [
            { title: "Domain LLM", description: "Custom training for industry knowledge." }
          ],
          tools: ["HuggingFace", "Python"]
        },
        {
          id: "agents",
          title: "Agents",
          description: "Autonomous agents powered by LLMs.",
          projects: [
            { title: "Workflow Agent", description: "Automating business processes with agents." }
          ],
          tools: ["LangChain", "Python"]
        }
      ]
    },
    {
      id: "mlops",
      title: "MLOps",
      description: "Machine Learning Operations for scalable deployment and monitoring.",
      projects: [
        { title: "ML Pipeline", description: "Automated training and deployment." }
      ],
      tools: ["Docker", "Kubernetes", "Python"],
      children: [
        {
          id: "ci-cd",
          title: "CI/CD",
          description: "Continuous integration and delivery for ML workflows.",
          projects: [
            { title: "Model CI/CD", description: "Automated testing and deployment of models." }
          ],
          tools: ["GitHub Actions", "Docker"]
        },
        {
          id: "deployment",
          title: "Deployment",
          description: "Serving models in production environments.",
          projects: [
            { title: "Model Serving", description: "Deploying models with REST APIs." }
          ],
          tools: ["FastAPI", "Docker"]
        },
        {
          id: "pipelines",
          title: "Pipelines",
          description: "End-to-end automation of ML workflows.",
          projects: [
            { title: "Data Pipeline", description: "Automating data ingestion and processing." }
          ],
          tools: ["Airflow", "Python"]
        }
      ]
    }
  ]
};
