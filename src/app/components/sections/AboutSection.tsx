import Image from "next/image";
import AccordionMolecule, {
  AccordionItem,
} from "../ui/molecules/AccordionMolecule";

export default function AboutSection() {
  const accordionInfo: AccordionItem[] = [
    {
      title: "Who is Diego?",
      content:
        "Diego is an AI Engineer specialized in LLMs and agents. Since 2023, he began his journey in the world of data science and artificial intelligence, developing projects ranging from the basics to advanced implementations: linear regressions, binary classification, ensemble and boosting models, time series analysis, recommendation systems, anomaly detection, LLM fine-tuning, building RAG systems, and creating agents applied to complex workflows.\n\nBeyond his professional work, he is passionate about running, the gym, and a lifestyle focused on personal growth. Thanks to this approach, he developed the habit of reading, having completed more than 10 books in recent years, which has strengthened his mindset and outlook on life. He also enjoys Formula 1 as one of his favorite hobbies.",
    },
    {
      title: "What sets Diego apart?",
      content:
        "What makes me unique is my positive attitude toward life and my resilience in the face of failure. Thanks to this combination, I have overcome difficult moments and transformed them into seeds for success. My passion for technology has led me to dive deep into the world of artificial intelligence, while my curiosity about business drives me to combine a technical vision with the ambition of an entrepreneur. In addition, honesty is a core value that I apply both in my work and in my daily life.\n\nI would also define myself as a dreamer, someone who strongly believes in reaching beyond the conventional. I have always felt that the traditional path was not for me and that there was something special within me that I had not fully explored—until now. This combination of vision, authenticity, and determination is what makes me unique.",
    },
  ];

  return (
    <div className="w-full h-full flex flex-col md:flex-row justify-center items-start gap-8">
      <Image
        src="/images/Portrait.png"
        alt="Profile Picture"
        width={450}
        height={350}
        className="w-1/2 max-w-2xl"
      />
      <AccordionMolecule items={accordionInfo} />
    </div>
  );
}
