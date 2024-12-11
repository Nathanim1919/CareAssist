import { GoSidebarExpand } from "react-icons/go";
import { IoCreateOutline } from "react-icons/io5";
import { SlOptions } from "react-icons/sl";
import { ChatContext } from "../context/ChatContext";
import { useContext, useEffect } from "react";

interface IConversationProps {
  expandShrinkConversations: (value: boolean) => void;
  showConversations: boolean;
}

const Conversations: React.FC<IConversationProps> = ({
  expandShrinkConversations,
  showConversations,
}) => {
  // const conversations = [
  //   {
  //     title: "How are you feeling today?",
  //   },
  //   {
  //     title: "Health Checkup",
  //   },
  //   {
  //     title: "Medication",
  //   },
  //   {
  //     title: "Appointment",
  //   },
  //   {
  //     title: "How are you feeling today?",
  //   },
  //   {
  //     title: "Health Checkup",
  //   },
  //   {
  //     title: "Medication",
  //   },
  //   {
  //     title: "Appointment",
  //   },
  //   {
  //     title: "How are you feeling today?",
  //   },
  //   {
  //     title: "Health Checkup",
  //   },
  //   {
  //     title: "Medication",
  //   },
  //   {
  //     title: "Appointment",
  //   },
  //   {
  //     title: "How are you feeling today?",
  //   },
  //   {
  //     title: "Health Checkup",
  //   },
  //   {
  //     title: "Medication",
  //   },
  //   {
  //     title: "Appointment",
  //   },
  //   {
  //     title: "How are you feeling today?",
  //   },
  //   {
  //     title: "Health Checkup",
  //   },
  //   {
  //     title: "Medication",
  //   },
  //   {
  //     title: "Appointment",
  //   },
  //   {
  //     title: "How are you feeling today?",
  //   },
  //   {
  //     title: "Health Checkup",
  //   },
  //   {
  //     title: "Medication",
  //   },
  //   {
  //     title: "Appointment",
  //   },
  // ];
  const chat = useContext(ChatContext);
  const { getAllConversations, setEmpty, conversations,getActiveConversation, setActiveConversation, activeConversation } = chat!;

  useEffect(() => {
    getAllConversations();
    console.log(conversations);
  }, []);


  const handleActiveConversation = (conversationId: string) => {
    setActiveConversation(conversationId);
    getActiveConversation(conversationId);
  };

  const startNewConversation = () => {
    setEmpty(true);
    setActiveConversation("");
  }
  
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
        {conversations.map((conversation, index) => (
          <div
            onClick={() => handleActiveConversation(conversation._id)}
            key={index}
            className={`group conversation p-2 hover:bg-gray-800 rounded-lg cursor-pointer flex items-center justify-between
              ${activeConversation === conversation._id ? "bg-gray-800" : ""}`}
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
