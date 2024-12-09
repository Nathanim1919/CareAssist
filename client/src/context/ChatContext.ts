import React, { createContext, useState, ReactNode } from 'react';

interface ChatContextType {
  messages: string[];
  addMessage: (message: string) => void;
  loading: boolean;
  setLoading: (loading: boolean) => void;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

const ChatProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [messages, setMessages] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const addMessage = (message: string) => {
    setMessages([...messages, message]);
  };

  const contextValue = {
    messages,
    addMessage,
    loading,
    setLoading,
  };

  return (
    <ChatContext.Provider value={contextValue}>
      {children}
    </ChatContext.Provider>
  );
};

export { ChatContext, ChatProvider };