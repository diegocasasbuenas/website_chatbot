

import { useState, useRef, useEffect } from "react";
import { chatFallbackResponses } from "@/app/constants/chat";

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
  
  // Refs for auto-scroll functionality
  const chatContainerRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  // Llama al endpoint /api/chat para obtener la respuesta de OpenAI
  const callChatAPI = async (userMessage: string): Promise<string> => {
    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ messages: [{ role: 'user', content: userMessage }] }),
      });
      if (!res.ok) {
        throw new Error(`Chat API responded with status ${res.status}`);
      }

      const data = await res.json();
      if (data.reply) return data.reply;
      throw new Error('No reply from API');
    } catch (err) {
      await new Promise(resolve => setTimeout(resolve, 1500));
      const randomResponse = chatFallbackResponses[Math.floor(Math.random() * chatFallbackResponses.length)];
      return randomResponse;
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
      const aiResponse = await callChatAPI(userMessage.content);
      
      const assistantMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        content: aiResponse,
        role: 'assistant',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Error calling ChatGPT API:', error);
      
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
    
    // Refs
    chatContainerRef,
    
    // Handlers
    handleSubmit,
    handleInputChange,
    
    // Utilities
    isSubmitDisabled: isLoading || !inputValue.trim()
  };
}
