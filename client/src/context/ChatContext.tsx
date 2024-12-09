import React, { createContext, useState, ReactNode, useEffect } from "react";

interface ChatContextType {
  messages: string[];
  addMessage: (message: string) => void;
  loading: boolean;
  setLoading: (loading: boolean) => void;
  showConversations: boolean;
  expandShrinkConversations: () => void;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

const ChatProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [messages, setMessages] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [showConversations, setShowConversations] = useState<boolean>(true);

  const getAllConversations = async () => {
    setLoading(true);
    try {
      const response = await fetch("https://jsonplaceholder.typicode.com/posts");
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };


  const expandShrinkConversations = () => {
    setShowConversations(!showConversations);
  };

  useEffect(() => {
    getAllConversations();
  }, []);

  const addMessage = (message: string) => {
    setMessages([...messages, message]);
  };

  const contextValue = {
    messages,
    addMessage,
    loading,
    setLoading,
    showConversations,
    expandShrinkConversations,
  };

  return (
    <ChatContext.Provider value={contextValue}>{children}</ChatContext.Provider>
  );
};

export { ChatContext, ChatProvider };
