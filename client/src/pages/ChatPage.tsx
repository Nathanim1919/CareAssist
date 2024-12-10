import { useContext } from "react";
import Chats from "../components/Chats";
import Conversations from "../components/Conversations";
import { ChatProvider } from "../context/ChatContext";
import { ChatContext } from "../context/ChatContext";

const ChatPage: React.FC = () => {
  const chatContext = useContext(ChatContext);

  if (!chatContext) {
    throw new Error("ChatPage must be used within a ChatProvider");
  }

  const { showConversations, expandShrinkConversations } = chatContext;

  return (
    <div
      className={`shadow-lg w-[80%] mx-auto flex transition-all duration-300 overflow-hidden
        h-full rounded-xl`}
    >
      <div
        className={`transition-width duration-300 ${
          showConversations ? "w-[30%]" : "w-0"
        }`}
      >
        <Conversations
          showConversations={showConversations}
          expandShrinkConversations={expandShrinkConversations}
        />
      </div>

      {/* Chats Panel */}
      <div
        className={`transition-width duration-300 overflow-hidden flex-1 ${
          showConversations ? "w-[60%]" : "w-full"
        }`}
      >
        <Chats
          showConversations={showConversations}
          expandShrinkConversations={expandShrinkConversations}
        />
      </div>
    </div>
  );
};

const ChatPageWithProvider: React.FC = () => (
  <ChatProvider>
    <ChatPage />
  </ChatProvider>
);

export default ChatPageWithProvider;
