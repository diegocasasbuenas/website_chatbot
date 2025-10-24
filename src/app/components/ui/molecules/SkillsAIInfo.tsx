import { div } from "motion/react-client";

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

export function SkillsAIInfo() {
  return <div></div>;
}
