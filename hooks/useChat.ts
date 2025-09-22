"use client";

import { useState, useRef, useEffect } from "react";

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
    
    // Mock response with varied themes for demo
    await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate API delay
    
    // Select a random fallback response for variety
    const randomResponse = fallbackResponses[Math.floor(Math.random() * fallbackResponses.length)];
    
    return randomResponse;
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