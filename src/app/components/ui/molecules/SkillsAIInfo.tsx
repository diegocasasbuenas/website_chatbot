'use client';

import { useEffect, useMemo, useState } from "react";
import { motion } from "motion/react";
import { SparklesIcon, ArrowLongRightIcon } from "@heroicons/react/16/solid";
import GlassContainerAtom from "../atoms/containers/GlassContainerAtom";
import Typography from "../atoms/text/TypographyAtom";

type SkillLeaf = {
  id: string;
  title: string;
  description: string;
  tools: string[];
};

type SkillBranch = {
  id: string;
  title: string;
  description: string;
  tools: string[];
  children: SkillLeaf[];
};

type SkillsData = {
  centerNode: string;
  parentNodes: SkillBranch[];
};

export const skillsData: SkillsData = {
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

const CARD_HEIGHT_CLASS = "!min-h-[320px] !h-[320px]";
const CARD_CONTENT_CLASS =
  "flex h-full flex-col justify-between gap-3 overflow-hidden";
const TEXT_CLAMP_4 =
  "overflow-hidden text-ellipsis [display:-webkit-box] [-webkit-line-clamp:4] [-webkit-box-orient:vertical]";
const CARD_BODY_CLASS = `!text-sm !leading-relaxed text-white/70 ${TEXT_CLAMP_4}`;
const STACK_BODY_CLASS = `!text-sm !leading-relaxed text-white/80 ${TEXT_CLAMP_4}`;
const MAX_STACK_TOOLS = 6;
const MAX_SPECIALIZATION_TOOLS = 5;

export function SkillsAIInfo() {
  const branches = skillsData.parentNodes;

  const [activeParentId, setActiveParentId] = useState<string>(
    branches[0]?.id ?? ""
  );
  const [activeChildId, setActiveChildId] = useState<string>(
    branches[0]?.children?.[0]?.id ?? ""
  );

  const totalSpecializations = useMemo(
    () =>
      branches.reduce(
        (count, branch) => count + (branch.children?.length ?? 0),
        0
      ),
    [branches]
  );

  const activeParent = useMemo<SkillBranch | undefined>(
    () => branches.find((branch) => branch.id === activeParentId) ?? branches[0],
    [branches, activeParentId]
  );

  const activeChild = useMemo<SkillLeaf | undefined>(() => {
    if (!activeParent) {
      return undefined;
    }
    return (
      activeParent.children?.find((child) => child.id === activeChildId) ??
      activeParent.children?.[0]
    );
  }, [activeParent, activeChildId]);

  useEffect(() => {
    if (!activeParent) {
      return;
    }

    if (!activeParent.children?.length) {
      if (activeChildId !== "") {
        setActiveChildId("");
      }
      return;
    }

    const childExists = activeParent.children.some(
      (child) => child.id === activeChildId
    );

    if (!childExists) {
      setActiveChildId(activeParent.children[0]?.id ?? "");
    }
  }, [activeParent, activeChildId]);

  if (!branches.length || !activeParent) {
    return null;
  }

  return (
    <div className="flex w-full flex-col gap-6 lg:gap-8">
      <GlassContainerAtom
        variant="input"
        className="relative overflow-hidden px-6 py-6 text-left text-white shadow-lg md:px-7 md:py-7"
      >
        <motion.span
          aria-hidden="true"
          className="pointer-events-none absolute -left-10 top-0 h-32 w-32 rounded-full bg-white/15 blur-2xl md:h-48 md:w-48"
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 18, ease: "linear" }}
        />
        <motion.span
          aria-hidden="true"
          className="pointer-events-none absolute bottom-0 right-0 h-24 w-24 rounded-full bg-purple-400/20 blur-2xl md:h-32 md:w-32"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{
            repeat: Infinity,
            duration: 6,
            ease: "easeInOut",
          }}
        />
        <div className="flex flex-col gap-4 md:gap-6">
          <div className="flex flex-wrap items-center gap-3 text-sm text-white/70">
            <GlassContainerAtom
              variant="icon"
              className="!h-10 !w-10 !cursor-default !border-white/20 !bg-white/10"
            >
              <SparklesIcon className="size-5 text-white" />
            </GlassContainerAtom>
            <span className="font-general">
              {branches.length} core domains · {totalSpecializations}{" "}
              specializations
            </span>
          </div>
          <Typography
            variant="subtitle"
            className="text-left text-white drop-shadow"
          >
            {skillsData.centerNode}
          </Typography>
          <div className="flex flex-wrap items-center gap-2 text-sm text-white/70 md:text-base">
            <ArrowLongRightIcon className="size-4 text-white/60" />
            <span className="font-general font-medium text-white">
              {activeParent.title}
            </span>
            <span className="font-general text-white/50">
              currently highlighted
            </span>
          </div>
        </div>
      </GlassContainerAtom>

      <div className="flex flex-col gap-5">
        <div className="flex flex-col gap-3">
          <span className="font-general text-xs uppercase tracking-[0.3em] text-white/60">
            Core domains
          </span>
          <div
            role="listbox"
            aria-label="Core domains"
            className="flex max-w-full items-stretch gap-4 overflow-x-auto overflow-y-visible pb-3 pr-1 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
          >
            {branches.map((branch) => {
              const isActive = branch.id === activeParent.id;

              return (
                <motion.button
                  key={branch.id}
                  type="button"
                  className="group min-w-[240px] flex-1 text-left sm:min-w-[260px]"
                  onClick={() => setActiveParentId(branch.id)}
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  role="option"
                  aria-selected={isActive}
                >
                  <GlassContainerAtom
                    variant="card"
                    className={[
                      "!max-h-none !justify-start !p-4 transition-colors duration-300",
                      CARD_HEIGHT_CLASS,
                      isActive
                        ? "border-white/60 bg-white/20 text-white shadow-lg"
                        : "border-white/15 bg-white/5 text-white/75 hover:border-white/35 hover:text-white",
                    ].join(" ")}
                  >
                    <div className={CARD_CONTENT_CLASS}>
                      <div className="flex flex-col gap-3">
                        <Typography
                          variant="accordion-title"
                          className="text-base md:text-lg"
                        >
                          {branch.title}
                        </Typography>
                        <Typography variant="body" className={CARD_BODY_CLASS}>
                          {branch.description}
                        </Typography>
                      </div>
                      <div className="flex flex-wrap gap-2 pt-1">
                        {branch.tools.slice(0, 3).map((tool) => (
                          <ToolBadge key={tool} label={tool} />
                        ))}
                        {branch.tools.length > 3 && (
                          <span className="rounded-full border border-dashed border-white/30 px-3 py-1 text-xs uppercase tracking-wide text-white/50">
                            +{branch.tools.length - 3}
                          </span>
                        )}
                      </div>
                    </div>
                  </GlassContainerAtom>
                </motion.button>
              );
            })}
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <span className="font-general text-xs uppercase tracking-[0.3em] text-white/60">
            Specialization spotlight
          </span>
          <div
            role="listbox"
            aria-label="Related specializations"
            className="flex max-w-full items-stretch gap-4 overflow-x-auto overflow-y-visible pb-3 pr-1 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
          >
            <GlassContainerAtom
              variant="card"
              className={[
                "!max-h-none !min-w-[260px] !justify-start !p-4 bg-white/12 text-white shadow-lg sm:!min-w-[300px]",
                CARD_HEIGHT_CLASS,
              ].join(" ")}
            >
              <div className={CARD_CONTENT_CLASS}>
                <div className="flex flex-col gap-3">
                  <div className="flex items-center gap-2 text-xs uppercase tracking-wide text-white/70">
                    <ArrowLongRightIcon className="size-4 text-white/60" />
                    <span className="font-general">Primary stack</span>
                  </div>
                  <Typography variant="accordion-title" className="text-lg">
                    {activeParent.title}
                  </Typography>
                  <Typography variant="body" className={STACK_BODY_CLASS}>
                    {activeParent.description}
                  </Typography>
                </div>
                <div className="flex flex-wrap gap-2 pt-1">
                  {activeParent.tools.slice(0, MAX_STACK_TOOLS).map((tool) => (
                    <ToolBadge key={tool} label={tool} emphasis />
                  ))}
                  {activeParent.tools.length > MAX_STACK_TOOLS && (
                    <span className="rounded-full border border-dashed border-white/30 px-3 py-1 text-xs uppercase tracking-wide text-white/60">
                      +{activeParent.tools.length - MAX_STACK_TOOLS}
                    </span>
                  )}
                </div>
              </div>
            </GlassContainerAtom>

            {activeParent.children.map((child) => {
              const isChildActive = child.id === activeChild?.id;

              return (
                <motion.button
                  key={child.id}
                  type="button"
                  onClick={() => setActiveChildId(child.id)}
                  whileHover={{ y: -3 }}
                  whileTap={{ scale: 0.98 }}
                  className="min-w-[240px] text-left sm:min-w-[280px]"
                  role="option"
                  aria-selected={isChildActive}
                >
                  <GlassContainerAtom
                    variant="card"
                    className={[
                      "!max-h-none !justify-start !p-4 transition-all duration-300",
                      CARD_HEIGHT_CLASS,
                      isChildActive
                        ? "border-white/60 bg-white/20 text-white shadow-lg"
                        : "border-white/15 bg-white/5 text-white/80 hover:border-white/40 hover:text-white",
                    ].join(" ")}
                  >
                    <div className={CARD_CONTENT_CLASS}>
                      <div className="flex flex-col gap-3">
                        <div className="flex items-center gap-2 text-xs uppercase tracking-wide text-white/60">
                          <ArrowLongRightIcon className="size-4 text-white/50" />
                          <span className="font-general">
                            {activeParent.title}
                          </span>
                        </div>
                        <Typography
                          variant="accordion-title"
                          className="text-lg text-white"
                        >
                          {child.title}
                        </Typography>
                        <Typography variant="body" className={CARD_BODY_CLASS}>
                          {child.description}
                        </Typography>
                      </div>
                      <div className="flex flex-wrap gap-2 pt-1">
                        {child.tools
                          .slice(0, MAX_SPECIALIZATION_TOOLS)
                          .map((tool) => (
                            <ToolBadge key={tool} label={tool} />
                          ))}
                        {child.tools.length > MAX_SPECIALIZATION_TOOLS && (
                          <span className="rounded-full border border-dashed border-white/30 px-3 py-1 text-xs uppercase tracking-wide text-white/50">
                            +{child.tools.length - MAX_SPECIALIZATION_TOOLS}
                          </span>
                        )}
                      </div>
                    </div>
                  </GlassContainerAtom>
                </motion.button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

type ToolBadgeProps = {
  label: string;
  emphasis?: boolean;
};

function ToolBadge({ label, emphasis }: ToolBadgeProps) {
  return (
    <span
      className={[
        "font-general text-xs uppercase tracking-wide",
        "rounded-full border px-3 py-1",
        emphasis
          ? "border-white/40 bg-white/20 text-white"
          : "border-white/20 bg-white/10 text-white/80",
      ].join(" ")}
    >
      {label}
    </span>
  );
}
