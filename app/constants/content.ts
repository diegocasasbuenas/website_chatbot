
// ===============================
// 1. Enlaces sociales (Hero)
// ===============================
export const socialLinks = {
  email: "mailto:diego.cdeaza23@gmail.com",
  linkedin: "https://www.linkedin.com/in/diegocasasbuenas-ai/",
  github: "https://github.com/diegocasasbuenas/"
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
    title: "AI Insurance Policy Chatbot",
    description: "Dual assistant that helps employees and clients query insurance policies with instant, accurate responses.",
    image: "/images/projects/1.png",
    githubUrl: "https://github.com/placeholder/insurance-chatbot"
  },
  {
    id: "project-2", 
    title: "Oil Production Forecasting Agent",
    description: "LLM-powered analytical agent that produces approximate oil production forecasts to support strategic decisions.",
    image: "/images/projects/2.png",
    githubUrl: "https://github.com/placeholder/oil-forecast-agent"
  },
  {
    id: "project-3",
    title: "Image Classification with Deep Learning",
    description: "ResNet and Vision Transformer models that classify and label images for industries such as retail and healthcare.",
    image: "/images/projects/3.png",
    githubUrl: "https://github.com/placeholder/image-classification"
  },
  {
    id: "project-4",
    title: "Custom Fine-Tuned LLMs with RAG",
    description: "Open-source LLM fine-tuning pipeline with RAG inference served via FastAPI, enabling custom personalities and APIs.",
    image: "/images/projects/4.png",
    githubUrl: "https://github.com/placeholder/llm-rag-pipeline"
  },
  {
    id: "project-5",
    title: "Automated AI Dashboards",
    description: "Interactive dashboards wired to ML models, delivering real-time insights, automated reports, and predictive analytics.",
    image: "/images/projects/5.png",
    githubUrl: "https://github.com/placeholder/ai-dashboards"
  },
  {
    id: "project-6",
    title: "Multi-Agent Process Automation",
    description: "Network of autonomous agents that execute complex workflows while users interact through a single conversational LLM.",
    image: "/images/projects/6.png",
    githubUrl: "https://github.com/placeholder/multi-agent-automation"
  },
  {
    id: "project-7",
    title: "AI Product Development Platform",
    description: "End-to-end AI product design—from training neural networks to deploying scalable APIs with key-based access.",
    image: "/images/projects/7.png",
    githubUrl: "https://github.com/placeholder/ai-product-platform"
  }
];

// ===============================
// 6. Skills Graph (Skills Section)
// ===============================
export const skillsData = {
  centerNode: "Diego's Skills",
  parentNodes: [
    {
      id: "core-ai-ml",
      title: "Core AI & ML",
      description:
        "Foundations of AI and ML for prediction, classification, and optimization problems.",
      tools: [
        "Python",
        "Scikit-learn",
        "NumPy",
        "Pandas",
        "Matplotlib",
        "Seaborn",
        "Jupyter Notebooks",
      ],
      children: [
        {
          id: "deep-learning",
          title: "Deep Learning",
          description:
            "Deep neural networks for images, text, and structured data including CNNs, RNNs, and Transformers.",
          tools: [
            "TensorFlow",
            "PyTorch",
            "Keras",
            "Hugging Face Transformers",
            "OpenCV",
            "spaCy",
          ],
        },
        {
          id: "time-series",
          title: "Time Series",
          description:
            "Modeling and forecasting sequential data to capture trends, seasonality, and anomalies.",
          tools: [
            "Statsmodels",
            "Prophet",
            "ARIMA",
            "LSTMs",
            "GRUs",
            "scikit-learn",
            "PyTorch Forecasting",
          ],
        },
        {
          id: "anomaly-detection",
          title: "Anomaly Detection",
          description:
            "Techniques for spotting unusual data points or behaviors in complex datasets.",
          tools: [
            "Scikit-learn",
            "PyOD",
            "Isolation Forest",
            "DBSCAN",
            "One-Class SVM",
            "TensorFlow",
            "PyTorch",
          ],
        },
        {
          id: "recommenders",
          title: "Recommenders",
          description:
            "Systems based on collaborative filtering, content-based, and hybrid recommendation approaches.",
          tools: [
            "Surprise",
            "LightFM",
            "TensorFlow Recommenders",
            "PyTorch Lightning",
            "implicit",
            "Scikit-learn",
            "FAISS",
          ],
        },
        {
          id: "learning",
          title: "Learning",
          description:
            "Supervised and unsupervised learning algorithms for classification, regression, and clustering.",
          tools: [
            "Scikit-learn",
            "XGBoost",
            "LightGBM",
            "CatBoost",
            "Random Forests",
            "K-Means",
            "PCA",
            "Gradient Boosting",
          ],
        },
      ],
    },
    {
      id: "mlops",
      title: "MLOps & Deployment",
      description:
        "Automation, monitoring, and scaling of machine learning workflows in production environments.",
      tools: [
        "MLflow",
        "DVC",
        "Airflow",
        "Prefect",
        "Kubeflow",
        "Docker",
        "Kubernetes",
        "Terraform",
        "Prometheus",
        "Grafana",
      ],
      children: [
        {
          id: "deployment",
          title: "Deployment",
          description:
            "Serving models with scalable APIs and managed services for real-world consumption.",
          tools: [
            "FastAPI",
            "Flask",
            "Docker",
            "Kubernetes",
            "TensorFlow Serving",
            "TorchServe",
            "AWS SageMaker",
            "Vertex AI",
            "Azure ML",
          ],
        },
        {
          id: "pipelines",
          title: "Pipelines",
          description:
            "Automated workflows covering data preprocessing, training, and deployment stages.",
          tools: [
            "Airflow",
            "Prefect",
            "Kedro",
            "Luigi",
            "Scikit-learn Pipelines",
            "Kubeflow Pipelines",
            "Dagster",
          ],
        },
        {
          id: "ci-cd",
          title: "CI/CD",
          description:
            "Continuous integration and delivery practices tailored for ML systems.",
          tools: [
            "GitHub Actions",
            "GitLab CI/CD",
            "Jenkins",
            "CircleCI",
            "ArgoCD",
            "Docker Hub",
            "Helm",
          ],
        },
      ],
    },
    {
      id: "llm-stack",
      title: "LLMs & Intelligent Systems",
      description:
        "Large language models, fine-tuning, and agentic systems for advanced reasoning and automation.",
      tools: [
        "Hugging Face Transformers",
        "LangChain",
        "OpenAI API",
        "Anthropic Claude",
        "vLLM",
        "TensorRT-LLM",
        "Weights & Biases",
      ],
      children: [
        {
          id: "fine-tuning",
          title: "Fine-Tuning",
          description:
            "Customizing pre-trained models for domain-specific tasks with optimized adapters.",
          tools: [
            "Hugging Face PEFT",
            "LoRA",
            "QLoRA",
            "PyTorch Lightning",
            "DeepSpeed",
            "bitsandbytes",
          ],
        },
        {
          id: "agents",
          title: "Agents",
          description:
            "Intelligent agents that orchestrate tools and data sources to complete complex workflows.",
          tools: [
            "LangChain",
            "CrewAI",
            "AutoGen",
            "Semantic Kernel",
            "OpenAI Function Calling",
            "ChromaDB",
            "FAISS",
          ],
        },
        {
          id: "rag",
          title: "RAG",
          description:
            "Retrieval-Augmented Generation pipelines for accurate, context-aware responses.",
          tools: [
            "FAISS",
            "ChromaDB",
            "Weaviate",
            "Pinecone",
            "Milvus",
            "LangChain",
            "LlamaIndex",
            "Elasticsearch",
          ],
        },
        {
          id: "applications",
          title: "Applications",
          description:
            "AI-powered applications that solve real business and technical challenges.",
          tools: [
            "Streamlit",
            "Gradio",
            "FastAPI",
            "Flask",
            "Dash",
            "Plotly",
            "Docker",
            "AWS",
            "GCP",
            "Azure",
          ],
        },
      ],
    },
  ],
};
