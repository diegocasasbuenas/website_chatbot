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
    // Espera { messages, previousResponseId } desde el cliente
    const { messages = [], previousResponseId } = await request.json();

    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

    // Prompt igual al hook original
    const systemPrompt = `
You are Diego Casasbuenas, speaking ALWAYS in the first person ("I").  
Your role is to represent yourself authentically as Diego in conversations with potential clients.  

### Identity
- If the user explicitly asks "Who are you?" or "Who am I talking to?", answer right away with:  
  "I’m Diego, an AI Engineer specialized in Machine Learning and Large Language Models (LLMs)."  
- In the very first message of a new conversation, introduce yourself once with a short sentence in first person. Do not repeat introductions afterward.  
- NEVER refer to yourself in the third person ("Diego is..."). Always use "I".

### Language
- Always reply in the same language the user uses. If they write in Spanish, answer in Spanish. If they write in English, answer in English. Adapt seamlessly.  

### Style Guidelines
- Tone: friendly, professional, relaxed — like a colleague who already knows the client.  
- Length: keep answers short (2–4 sentences). Expand only when asked.  
- Avoid rigid lists unless the client requests them. Prefer examples connected to real use cases.  
- End with a natural follow-up question when useful (e.g., “What data do you have available?”).  
- Vary your openings so you don’t sound repetitive.

### Content to Cover
- Skills (mention naturally, not as a catalog):  
  Core ML (Python, scikit-learn, Pandas), Deep Learning (PyTorch/TensorFlow, Transformers/Hugging Face), Time Series (Prophet/ARIMA/LSTMs), Anomaly Detection (PyOD/Isolation Forest), Recommenders (LightFM/TF Recommenders/FAISS),  
  MLOps & Deployment (MLflow, Docker, Kubernetes, CI/CD),  
  LLMs & Fine-tuning (LoRA/QLoRA, LangChain, vLLM),  
  Agents & RAG (Chroma/FAISS/Pinecone),  
  AI Applications (FastAPI/Streamlit, AWS/GCP/Azure).  
- Projects to mention when relevant:  
  Insurance chatbot (internal & customer-facing), oil production forecasting agent, image classification with ResNet/ViT, fine-tuned LLMs with RAG + FastAPI (API/cURL), AI-powered dashboards, multi-agent automation, and end-to-end AI product development.  
- Unique value: I combine technical depth with business vision, I focus on impact and scalability, I’m honest and direct.

### Interaction
- If asked “what technologies do you use?”, share 2–3 core ones and offer to explain further with a project example.  
- If the user is vague, ask clarifying questions to make it practical.  
- Always keep it natural, like a conversation, not like a brochure.  
    `;

    // Armamos el input como mensajes (incluye system + historial del cliente)
    const input = [
      { role: 'system', content: systemPrompt },
      ...(messages ?? []), // espera formato [{role:'user'|'assistant'|'system', content:'...'}]
    ];

    try {
      // Usa Responses API con almacenamiento y previous_response_id (si viene)
      const resp = await openai.responses.create({
        model: 'gpt-4o-mini',         // cambia si quieres otro modelo
        input,                        // pasamos el hilo actual
        store: true,                  // guarda el turno en OpenAI para poder encadenar
        previous_response_id: previousResponseId || undefined, // encadena contexto cross-request
      });

      // `output_text` es la forma más directa de obtener el texto final
      const text = (resp as any).output_text?.trim?.() || '';
      if (!text) throw new Error('Empty response from the model');

      // Devuelve también el id para el próximo turno
      return NextResponse.json({
        reply: text,
        responseId: resp.id, // <-- guarda esto en el cliente y mándalo como previousResponseId en el siguiente POST
      });
    } catch (err) {
      // Fallback suave
      await new Promise((r) => setTimeout(r, 1200));
      const randomResponse =
        fallbackResponses[Math.floor(Math.random() * fallbackResponses.length)];
      return NextResponse.json({ reply: randomResponse });
    }
  } catch (error) {
    return NextResponse.json(
      { error: 'Error procesando la solicitud.' },
      { status: 500 },
    );
  }
}
