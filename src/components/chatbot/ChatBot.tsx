import { Bot, Send, Trash2, X } from 'lucide-react';

import { memo, useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useChatBot } from '@/contexts/ChatBotContext';
import type { ChatMessage } from '@/contexts/ChatBotContext';
import type { SuggestedCourse } from '@/types';

interface ChatBubbleProps {
  message: ChatMessage;
  onSuggestionClick: () => void;
}

const ChatBubble = memo(function ChatBubble({ message, onSuggestionClick }: ChatBubbleProps) {
  const isAI = message.type === 'ai';
  const navigate = useNavigate();

  const formatTime = useCallback((timestamp: string) => {
    return new Date(timestamp).toLocaleTimeString('vi-VN', {
      hour: '2-digit',
      minute: '2-digit',
    });
  }, []);

  const handleSuggestionClick = useCallback(
    (suggestion: SuggestedCourse) => {
      // Navigate to courses page with the suggestion highlighted
      navigate(`/courses?search=${encodeURIComponent(suggestion.title)}`);
      onSuggestionClick();
    },
    [navigate, onSuggestionClick]
  );

  return (
    <div className={`flex ${isAI ? 'justify-start' : 'justify-end'} mb-4`}>
      <div className={`max-w-[80%] ${isAI ? 'flex items-start space-x-2' : ''}`}>
        {isAI && (
          <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
            <Bot size={16} className="text-white" />
          </div>
        )}

        <div className={`flex flex-col space-y-2 ${isAI ? 'flex-1' : ''}`}>
          <div
            className={`rounded-2xl px-4 py-3 ${
              isAI
                ? 'bg-gray-100 text-gray-900 rounded-tl-md'
                : 'bg-blue-600 text-white rounded-tr-md'
            }`}
          >
            <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>
            <span className={`text-xs mt-2 block ${isAI ? 'text-gray-500' : 'text-blue-100'}`}>
              {formatTime(message.timestamp)}
            </span>
          </div>

          {/* Course Suggestions */}
          {message.suggestions && message.suggestions.length > 0 && (
            <div className="space-y-2">
              <p className="text-xs text-gray-600 font-medium">Khóa học gợi ý:</p>
              <div className="space-y-2">
                {message.suggestions.map((suggestion) => (
                  <div
                    key={suggestion.id}
                    className="bg-white border border-gray-200 rounded-xl p-3 hover:shadow-md transition-shadow cursor-pointer group"
                    onClick={() => handleSuggestionClick(suggestion)}
                  >
                    <div className="flex space-x-3">
                      <img
                        src={suggestion.image}
                        alt={suggestion.title}
                        className="w-12 h-12 object-cover rounded-lg flex-shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-semibold text-gray-900 line-clamp-1 group-hover:text-blue-600 transition-colors">
                          {suggestion.title}
                        </h4>
                        <p className="text-xs text-gray-600 mt-1">{suggestion.instructor}</p>
                        <div className="flex items-center justify-between mt-2">
                          <span className="text-sm font-bold text-green-600">
                            {new Intl.NumberFormat('vi-VN', {
                              style: 'currency',
                              currency: 'VND',
                            }).format(suggestion.price)}
                          </span>
                        </div>
                      </div>
                    </div>
                    <p className="text-xs text-gray-500 mt-1 italic">💡 {suggestion.reason}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
});

const TypingIndicator = memo(function TypingIndicator() {
  return (
    <div className="flex justify-start mb-4">
      <div className="flex items-start space-x-2">
        <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
          <Bot size={16} className="text-white" />
        </div>
        <div className="bg-gray-100 rounded-2xl rounded-tl-md px-4 py-3">
          <div className="flex space-x-1">
            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
            <div
              className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
              style={{ animationDelay: '0.1s' }}
            ></div>
            <div
              className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
              style={{ animationDelay: '0.2s' }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
});

export default function ChatBot() {
  const { messages, isOpen, isTyping, toggleChat, sendMessage, clearChat } = useChatBot();
  const [inputMessage, setInputMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto scroll to bottom when new messages arrive
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isTyping]);

  // Focus input and scroll to bottom when chat opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        // Focus input
        if (inputRef.current) {
          inputRef.current.focus();
        }
        // Scroll to bottom
        if (messagesEndRef.current) {
          messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
  }, [isOpen]);

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      if (!inputMessage.trim() || isTyping) return;

      const messageToSend = inputMessage;
      setInputMessage('');
      await sendMessage(messageToSend);
    },
    [inputMessage, isTyping, sendMessage]
  );

  const handleSuggestionClick = useCallback(() => {
    // Close chat when user clicks on suggestion
    toggleChat();
  }, [toggleChat]);

  const quickActions = [
    'Tôi muốn học lập trình web',
    'Gợi ý khóa học tiếng Anh',
    'Tìm khóa học marketing online',
    'Học thiết kế UI/UX',
  ];

  const handleQuickAction = useCallback((action: string) => {
    setInputMessage(action);
    inputRef.current?.focus();
  }, []);

  if (!isOpen) return null;

  return (
    <div className="fixed bottom-4 right-4 w-96 h-[600px] bg-white rounded-2xl shadow-2xl border border-gray-200 flex flex-col z-50 transform transition-all duration-300 animate-slide-up">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-gradient-to-r from-blue-600 to-purple-600 rounded-t-2xl">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
            <Bot size={20} className="text-white" />
          </div>
          <div>
            <h3 className="text-white font-semibold">SmartEdu AI</h3>
            <p className="text-blue-100 text-sm">Tư vấn khóa học</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={clearChat}
            className="text-white hover:bg-white/20 w-8 h-8"
            aria-label="Xóa cuộc trò chuyện"
          >
            <Trash2 size={16} />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleChat}
            className="text-white hover:bg-white/20 w-8 h-8"
            aria-label="Đóng chat"
          >
            <X size={16} />
          </Button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-hidden">
        <ScrollArea className="h-full">
          <div className="p-4 space-y-1">
            {messages.map((message) => (
              <ChatBubble
                key={message.id}
                message={message}
                onSuggestionClick={handleSuggestionClick}
              />
            ))}
            {isTyping && <TypingIndicator />}
            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>
      </div>

      {/* Quick Actions */}
      {messages.length === 1 && (
        <div className="px-4 pb-2">
          <p className="text-xs text-gray-600 mb-2">Gợi ý câu hỏi:</p>
          <div className="flex flex-wrap gap-2">
            {quickActions.map((action) => (
              <button
                key={action}
                onClick={() => handleQuickAction(action)}
                className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1 rounded-full transition-colors"
              >
                {action}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input */}
      <form onSubmit={handleSubmit} className="p-4 border-t border-gray-200">
        <div className="flex items-center space-x-2">
          <Input
            ref={inputRef}
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder="Nhập câu hỏi của bạn..."
            className="flex-1 rounded-xl border-gray-200 focus:border-blue-500"
            disabled={isTyping}
            maxLength={500}
          />
          <Button
            type="submit"
            size="icon"
            disabled={!inputMessage.trim() || isTyping}
            className="rounded-xl bg-blue-600 hover:bg-blue-700 w-10 h-10 flex-shrink-0"
            aria-label="Gửi tin nhắn"
          >
            <Send size={16} />
          </Button>
        </div>
        <p className="text-xs text-gray-500 mt-2 text-center">
          Tối đa 500 ký tự • AI có thể sai sót
        </p>
      </form>
    </div>
  );
}
