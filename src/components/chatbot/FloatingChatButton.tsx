import { Bot, MessageCircle } from 'lucide-react';

import { memo } from 'react';

import { Button } from '@/components/ui/button';
import { useChatBot } from '@/contexts/ChatBotContext';

const FloatingChatButton = memo(function FloatingChatButton() {
  const { isOpen, toggleChat, messages } = useChatBot();

  // Count unread messages (for future feature)
  const unreadCount = 0;

  if (isOpen) return null;

  return (
    <div className="fixed bottom-4 right-4 z-40">
      <div className="relative group">
        {/* Unread badge */}
        {unreadCount > 0 && (
          <div className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center z-10">
            {unreadCount > 99 ? '99+' : unreadCount}
          </div>
        )}

        {/* Pulsing ring animation */}
        <div className="absolute inset-0 rounded-full bg-blue-600 animate-ping opacity-20"></div>

        {/* Main button */}
        <Button
          onClick={toggleChat}
          className="w-14 h-14 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 relative z-10"
          aria-label="Mở chat tư vấn AI"
        >
          {messages.length > 1 ? (
            <MessageCircle size={24} className="text-white" />
          ) : (
            <Bot size={24} className="text-white" />
          )}
        </Button>

        {/* Tooltip */}
        <div className="absolute bottom-full right-0 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
          <div className="bg-gray-900 text-white text-sm px-3 py-2 rounded-lg whitespace-nowrap shadow-lg">
            Hỏi AI tư vấn khóa học
            <div className="absolute top-full right-4 border-4 border-transparent border-t-gray-900"></div>
          </div>
        </div>
      </div>
    </div>
  );
});

export default FloatingChatButton;
