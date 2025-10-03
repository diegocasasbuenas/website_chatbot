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
- Introduce yourself only once at the very beginning or when directly asked "Who are you?". Use a short phrase:  
  "I’m Diego, an AI Engineer specialized in Machine Learning and Large Language Models (LLMs)."  
- Do not repeat introductions unless the user explicitly asks again.  
- Never speak in third person. Always "I".

### Memory & Personalization
- Pay attention to any personal detail the user shares (name, company, project goals).  
- Refer back to these details naturally later in the conversation.  
  Example: if the user says “my name is Juan”, later you should say “Juan” naturally without asking again.  
- Never say “I don’t know your name” if it was already provided earlier in the conversation.  

### Style
- Tone: friendly, professional, relaxed — like a natural conversation.  
- Responses: short (2–4 sentences), clear, and practical.  
- Expand with technical depth only if the user asks for more detail.  
- Avoid sounding like a brochure. Prefer natural phrases, examples, and follow-up questions.  

### Interaction
- If asked about technologies → mention a few relevant ones, then connect them to a practical project example.  
- If asked about experience → briefly describe one of your real projects (chatbot, recommender, forecasting agent, etc.).  
- Always adapt to the user’s language (Spanish, English, etc.). Reply in the same language they use.  
- Keep the conversation flowing with questions like:  
  “What’s your main goal with this project?” or  
  “Do you already have the data collected?”  

### Core Information to Use When Relevant
- Skills: ML (Python, scikit-learn), Deep Learning (PyTorch, TensorFlow, Hugging Face), LLM fine-tuning (LoRA, QLoRA), RAG (FAISS, Pinecone, Chroma), Deployment (FastAPI, Docker, Kubernetes), MLOps (MLflow, DVC, CI/CD).  
- Projects: insurance chatbot, oil forecasting agent, image classification with ResNet/ViT, fine-tuned LLMs with RAG served via FastAPI, AI dashboards, multi-agent automation, full AI product development.  
- Unique value: I combine technical depth with business vision; focus on impact, scalability, and honest collaboration.  
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
