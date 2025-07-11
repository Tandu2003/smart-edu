import { createContext, useCallback, useContext, useMemo, useState } from 'react';

import { mockAIResponse, mockSuggestedCourses } from '@/assets/data/mockAISuggestion';
import type { ChatBotContextType, ChatBotProviderProps, ChatMessage } from '@/types/context';
import type { SuggestedCourse } from '@/types/course';

const ChatBotContext = createContext<ChatBotContextType | undefined>(undefined);

export function useChatBot() {
  const context = useContext(ChatBotContext);
  if (context === undefined) {
    throw new Error('useChatBot must be used within a ChatBotProvider');
  }
  return context;
}

export function ChatBotProvider({ children }: ChatBotProviderProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      type: 'ai',
      content:
        'Xin chào! Tôi là SmartEdu AI Assistant. Tôi có thể giúp bạn tìm kiếm khóa học phù hợp với nhu cầu của bạn. Hãy cho tôi biết bạn muốn học gì nhé! 😊',
      timestamp: new Date().toISOString(),
    },
  ]);
  const [isOpen, setIsOpen] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

  const toggleChat = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  const generateAIResponse = useCallback(
    (userMessage: string): { content: string; suggestions: SuggestedCourse[] } => {
      // Get AI response text
      const responseContent = mockAIResponse(userMessage);

      // Get course suggestions
      const suggestions = mockSuggestedCourses(userMessage);

      return {
        content: responseContent,
        suggestions,
      };
    },
    []
  );

  const sendMessage = useCallback(
    async (messageContent: string) => {
      if (!messageContent.trim()) return;

      // Add user message
      const userMessage: ChatMessage = {
        id: `user-${Date.now()}`,
        type: 'user',
        content: messageContent.trim(),
        timestamp: new Date().toISOString(),
      };

      setMessages((prev) => [...prev, userMessage]);
      setIsTyping(true);

      // Simulate AI thinking time
      await new Promise((resolve) => setTimeout(resolve, 1000 + Math.random() * 1500));

      // Generate AI response
      const { content, suggestions } = generateAIResponse(messageContent);

      const aiMessage: ChatMessage = {
        id: `ai-${Date.now()}`,
        type: 'ai',
        content,
        timestamp: new Date().toISOString(),
        suggestions: suggestions.length > 0 ? suggestions : undefined,
      };

      setMessages((prev) => [...prev, aiMessage]);
      setIsTyping(false);
    },
    [generateAIResponse]
  );

  const clearChat = useCallback(() => {
    setMessages([
      {
        id: 'welcome',
        type: 'ai',
        content:
          'Xin chào! Tôi là SmartEdu AI Assistant. Tôi có thể giúp bạn tìm kiếm khóa học phù hợp với nhu cầu của bạn. Hãy cho tôi biết bạn muốn học gì nhé! 😊',
        timestamp: new Date().toISOString(),
      },
    ]);
  }, []);

  const contextValue = useMemo(
    () => ({
      messages,
      isOpen,
      isTyping,
      toggleChat,
      sendMessage,
      clearChat,
    }),
    [messages, isOpen, isTyping, toggleChat, sendMessage, clearChat]
  );

  return <ChatBotContext.Provider value={contextValue}>{children}</ChatBotContext.Provider>;
}
