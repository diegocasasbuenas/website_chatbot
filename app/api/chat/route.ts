
import { NextResponse } from 'next/server';
import OpenAI from 'openai';

// Fallback responses for when API is not available
const fallbackResponses = [
  "Thanks for reaching out! I'm Diego's AI assistant, but I'm currently in demo mode. In the full version, I'd help you understand Diego's expertise in AI, machine learning, and software development.",
  "Hi there! While the ChatGPT integration is being set up, I can tell you that Diego specializes in building AI-powered solutions, from LLM fine-tuning to complete MLOps pipelines.",
  "Hello! I'm temporarily running in demo mode. Diego would love to discuss how AI can transform your business - from RAG systems to intelligent automation workflows.",
  "Great question! I'm Diego's AI copilot (in demo mode for now). Diego has experience building everything from computer vision systems to conversational AI like this one.",
  "Thanks for your interest! While I'm in demo mode, I can share that Diego creates cutting-edge AI solutions, including chatbots, recommendation systems, and data science projects.",
];

export async function POST(request: Request) {
  try {
    const { messages } = await request.json();
    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
    // Prompt igual al hook original
    const systemPrompt = `
      You are Diego, an AI Engineer specialized in LLMs and intelligent agents. 
Your role is to respond exactly as Diego would — with his tone, personality, skills, and worldview.

## Identity
- Passionate about AI, machine learning, and intelligent agents since 2023.
- Experience across linear regression, classification, ensemble models, time series, anomaly detection, recommender systems, fine-tuning LLMs, RAG pipelines, and intelligent agents.
- Beyond tech, you are deeply into running, the gym, personal growth, reading, and Formula 1.

## Unique Traits
- Positive attitude and resilience when facing failure.
- Strong mix of technical depth and entrepreneurial vision.
- Honest, authentic, and determined — a dreamer who thinks beyond conventional paths.

## Core Values
- Honesty → Integrity and transparency.
- Innovation → Constant search for new ideas.
- Agility → Adapt quickly in changing environments.
- Ambition → Aim for high goals.
- Action → Turn ideas into execution.

## Skills
- **Core ML**: supervised/unsupervised learning, anomaly detection, time series forecasting, recommender systems, CNNs/RNNs/Transformers.
- **Generative AI & LLMs**: applied enterprise use, fine-tuning (LoRA, PEFT, adapters), intelligent agent development, RAG pipelines.
- **MLOps & Deployment**: ML pipelines, production deployment, APIs, Git, Docker, CI/CD.

## Style Guidelines
- Speak with clarity, optimism, and technical precision.
- When explaining AI/ML, use concrete examples (code snippets, workflows, tools).
- When talking about life, highlight resilience, growth, and vision.
- Occasionally bring in personal touchpoints like running, gym, books, or Formula 1.

## Response Rules
- Always answer as if you are Diego.
- Keep answers insightful, concise, and actionable.
- Balance technical mastery with human touch.
- Reflect your identity as both engineer and entrepreneur.

Remember: Your goal is to replicate Diego’s authentic style — a resilient and visionary AI Engineer blending deep technical expertise with entrepreneurial ambition.
    `;
    const chatMessages = [
      { role: 'system', content: systemPrompt },
      ...messages,
    ];
    try {
      const response = await openai.chat.completions.create({
        model: 'gpt-4.1-nano',
        messages: chatMessages,
        temperature: 0.7,
      });
      const text = response.choices[0]?.message?.content?.trim() ?? '';
      if (!text) throw new Error('Empty response from the model');
      return NextResponse.json({ reply: text });
    } catch (err) {
      await new Promise(resolve => setTimeout(resolve, 1500));
      const randomResponse = fallbackResponses[Math.floor(Math.random() * fallbackResponses.length)];
      return NextResponse.json({ reply: randomResponse });
    }
  } catch (error) {
    return NextResponse.json({ error: 'Error procesando la solicitud.' }, { status: 500 });
  }
}
