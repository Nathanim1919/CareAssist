import React, { createContext, useState, ReactNode } from "react";
import { IConversation, IMessage } from "../types/chat.type";
import { apiConfig } from "../utils/apiConfig";

interface ChatContextType {
  conversations: IConversation[];
  loading: boolean;
  setLoading: (loading: boolean) => void;
  showConversations: boolean;
  expandShrinkConversations: () => void;
  getAllConversations: () => void;
  sendMessage: (message: string, conversationId?: string) => void;
  activeConversation: IConversation | null;
  setActiveConversation: (conversationId: IConversation | null) => void;
  empty: boolean;
  setEmpty: (empty: boolean) => void;
  getActiveConversation: (conversationId: string) => void;
  messages: IMessage[];
  setMessages: (messages: IMessage[]) => void;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

const ChatProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [showConversations, setShowConversations] = useState<boolean>(true);
  const [conversations, setConversations] = useState<IConversation[]>([]);
  const [activeConversation, setActiveConversation] = useState<IConversation | null>(
    null
  );
  const [isEmpty, setIsEmpty] = useState(true);

  const getAllConversations = async () => {
    setLoading(true);
    try {
      const response = await apiConfig.get("/chat/getConversations");
      setConversations(response.data);
      console.log(response);
      console.log(conversations);
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  const sendMessage = async (
    message: string,
    activeConversation?: string | null
  ) => {
    setLoading(true);
    try {
      const response = await apiConfig.post("/chat", {
        message,
        activeConversation,
      });
      console.log(response);
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  const getActiveConversation = async (conversationId: string) => {
    setLoading(true);
    try {
      const response = await apiConfig.get(`/chat/${conversationId}`);
      setMessages(response.data.messages);
      setActiveConversation(response.data);
      console.log(response);
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  const expandShrinkConversations = () => {
    setShowConversations(!showConversations);
  };


  return (
    <ChatContext.Provider
      value={{
        loading,
        setLoading,
        showConversations,
        expandShrinkConversations,
        getAllConversations,
        conversations,
        sendMessage,
        activeConversation,
        setActiveConversation,
        empty: isEmpty,
        setEmpty: setIsEmpty,
        getActiveConversation,
        messages,
        setMessages,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export { ChatContext, ChatProvider };
