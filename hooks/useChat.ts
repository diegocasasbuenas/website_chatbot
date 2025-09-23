"use client";

import { useState, useRef, useEffect } from "react";
import { OpenAI } from "openai"; // Import OpenAI SDK
import dotenv from 'dotenv';  

dotenv.config();
// Types for chat functionality
export interface ChatMessage {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
}

export function useChat() {
  // Chat state management
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isChatVisible, setIsChatVisible] = useState(false);
  const [isApiAvailable, setIsApiAvailable] = useState(false); // Track API availability
  
  // Refs for auto-scroll functionality
  const chatContainerRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  // TODO: ChatGPT API Integration - Add API key and configuration
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });
  // Fallback responses for when API is not available
  const fallbackResponses = [
    "Thanks for reaching out! I'm Diego's AI assistant, but I'm currently in demo mode. In the full version, I'd help you understand Diego's expertise in AI, machine learning, and software development.",
    
    "Hi there! While the ChatGPT integration is being set up, I can tell you that Diego specializes in building AI-powered solutions, from LLM fine-tuning to complete MLOps pipelines.",
    
    "Hello! I'm temporarily running in demo mode. Diego would love to discuss how AI can transform your business - from RAG systems to intelligent automation workflows.",
    
    "Great question! I'm Diego's AI copilot (in demo mode for now). Diego has experience building everything from computer vision systems to conversational AI like this one.",
    
    "Thanks for your interest! While I'm in demo mode, I can share that Diego creates cutting-edge AI solutions, including chatbots, recommendation systems, and data science projects.",
  ];
  
  // TODO: ChatGPT API Integration - Function to call OpenAI API
  const callChatGPTAPI = async (userMessage: string): Promise<string> => {
    // TODO: Implement actual ChatGPT API call here
    try{
      const response = await openai.chat.completions.create({
        model: "gpt-4.1-nano",
        messages: [
          {role: "system", content: `
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

            `
          },
          {role: "user", content:userMessage}
        ],
        temperature: 0.7,
      });

      console.log(response.choices[0], userMessage);
    
    const text = response.choices[0]?.message?.content?.trim() ?? "";
    if (!text) throw new Error("Empty response from the model")
    return text

  }catch (err) {
    console.log(err)
    await new Promise(resolve => setTimeout(resolve, 1500)); 
    const randomResponse = fallbackResponses[Math.floor(Math.random() * fallbackResponses.length)];
    return randomResponse
  }
};

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!inputValue.trim() || isLoading) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      content: inputValue.trim(),
      role: 'user',
      timestamp: new Date()
    };

    // Add user message and show chat if first message
    setMessages(prev => [...prev, userMessage]);
    if (!isChatVisible) setIsChatVisible(true);
    
    // Clear input and set loading
    setInputValue("");
    setIsLoading(true);

    try {
      // TODO: ChatGPT API Integration - Replace with actual API call
      const aiResponse = await callChatGPTAPI(userMessage.content);
      
      const assistantMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        content: aiResponse,
        role: 'assistant',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Error calling ChatGPT API:', error);
      
      // Set API as unavailable for future reference
      setIsApiAvailable(false);
      
      // Use a contextual fallback response
      const fallbackMessage = "I'm currently in demo mode, but I'm excited to chat about Diego's AI expertise! He specializes in building intelligent systems that solve real business problems.";
      
      const errorMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        content: fallbackMessage,
        role: 'assistant',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  return {
    // State
    messages,
    inputValue,
    isLoading,
    isChatVisible,
    isApiAvailable,
    
    // Refs
    chatContainerRef,
    
    // Handlers
    handleSubmit,
    handleInputChange,
    
    // Utilities
    isSubmitDisabled: isLoading || !inputValue.trim()
  };
}