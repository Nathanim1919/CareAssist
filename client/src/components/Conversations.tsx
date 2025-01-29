import { GoSidebarExpand } from "react-icons/go";
import { IoCreateOutline } from "react-icons/io5";
import { SlOptions } from "react-icons/sl";
import { ChatContext } from "../context/ChatContext";
import { useContext, useEffect } from "react";
import useSocket from "../hooks/useSocket";
import { IConversation } from "../types/chat.type";

interface IConversationProps {
  expandShrinkConversations: (value: boolean) => void;
  showConversations: boolean;
}

const Conversations: React.FC<IConversationProps> = ({
  expandShrinkConversations,
  showConversations,
}) => {
  const chat = useContext(ChatContext);
  const { getAllConversations, setEmpty, conversations,getActiveConversation, setActiveConversation, activeConversation } = chat!;
  const { socket } = useSocket();


  const handleActiveConversation = (conversationId: IConversation) => {
    setActiveConversation(conversationId);
    getActiveConversation(conversationId._id);
  };

  const startNewConversation = () => {
    setEmpty(true);
    setActiveConversation(null);
  }

  useEffect(() => {
    getAllConversations();
  }, []);


  useEffect(() => {
    socket?.on("newConversation", (data: IConversation) => {
      conversations.unshift(data); // Add new conversation to the top of the list
      setActiveConversation(data);
      getActiveConversation(data._id);
      getAllConversations();
    });
    
    return () => {
      socket?.off("newConversation");
    };
  }, []);
  
  return (
    <div
      className={`conversations bg-black h-[90vh] overflow-hidden p-4 flex flex-col gap-5 transform transition-all duration-500
        `}
    >
      <div className="header">
        <div className="icons flex items-center justify-between text-2xl">
          <GoSidebarExpand className="cursor-pointer"
            onClick={() => {
              expandShrinkConversations(!showConversations);
            }}
          />
          <IoCreateOutline className="cursor-pointer"  onClick={startNewConversation}/>
        </div>
      </div>
      <div className="overflow-auto">
        {conversations.length === 0 && (
          <h3 className="text-center text-gray-400">No Conversations</h3>
        )}
        {conversations.map((conversation, index) => (
          <div
            onClick={() => handleActiveConversation(conversation)}
            key={index}
            className={`group conversation p-2 hover:bg-gray-800 rounded-lg cursor-pointer flex items-center justify-between
              ${activeConversation?._id === conversation._id ? "bg-gray-800" : ""}`}
          >
            <h3 className="text-[13px]">{conversation.title?conversation.title:"new chat"}</h3>
            <SlOptions className="hidden group-hover:block" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Conversations;
