import { IoCreateOutline } from "react-icons/io5";
import Chatbox from "./ChatBox";
import { TbLayoutSidebarLeftExpand } from "react-icons/tb";
import { useContext, useState } from "react";
import EmptyPage from "./emptyPage";
import { ChatContext } from "../context/ChatContext";
import ReactMarkdown from "react-markdown";

interface IChatProps {
  expandShrinkConversations: (value: boolean) => void;
  showConversations: boolean;
}

const Chats: React.FC<IChatProps> = ({
  expandShrinkConversations,
  showConversations,
}) => {
  const chats = [
    {
      user: "Nathan",
      message: "Hello",
    },
    {
      ai: "How can I help you today?",
    },
    {
      user: "Nathan",
      message: "I am not feeling well",
    },
    {
      ai: "I am sorry to hear that. Can you tell me more about your symptoms?",
    },
    {
      user: "Nathan",
      message: "I have a headache",
    },
    {
      ai: "I see. Do you have any other symptoms?",
    },
    {
      user: "Nathan",
      message: "I also have a fever",
    },
    {
      ai: "I recommend you take some rest and drink plenty of fluids. If your symptoms persist, please consult a doctor immediately.",
    },
    {
      user: "Nathan",
      message: "Thank you, what about the medication?",
    },
    {
      ai: "I recommend you take some paracetamol for the fever. You can also take some ibuprofen for the headache. Make sure to follow the recommended dosage on the packaging.",
    },
    {
      user: "Nathan",
      message:
        "Thank you for your help, so I will take some rest and drink plenty of fluids and take some paracetamol for the fever and ibuprofen for the headache.",
    },
    {
      ai: "That's correct. If you have any other questions, feel free to ask.",
    },
    {
      user: "Nathan",
      message: "Thank you, goodbye.",
    },
    {
      ai: "Goodbye.",
    },
    {
      user: "Nathan",
      message: "Sorry, one more question.",
    },
    {
      ai: "Sure, what is your question?",
    },
    {
      user: "Nathan",
      message: "How do I book an appointment?",
    },
    {
      ai: "You can book an appointment by clicking on the 'Appointment' button on the left sidebar. You can select the date and time that works best for you.",
    },
    {
      user: "Nathan",
      message: "Thank you.",
    },
    {
      ai: "You're welcome.",
    },
  ];
  const chat = useContext(ChatContext);
  const { messages, setEmpty, empty, activeConversation } = chat!;

  return (
    <div
      className={`h-[90vh] overflow-hidden p-4 relative bg-gray-900
       
    `}
    >
      <div className="header">
        {!showConversations && (
          <div className="icons p-4 flex items-center text-2xl  gap-5">
            <TbLayoutSidebarLeftExpand
              className="cursor-pointer"
              onClick={() => {
                expandShrinkConversations(!showConversations);
              }}
            />
            <IoCreateOutline />
          </div>
        )}
      </div>
      <div className="chats w-full h-[80vh] overflow-y-auto p-4 pb-10">
        {empty && !activeConversation ? (
          <EmptyPage />
        ) : (
          messages.map((chat, index: number) => (
            <div key={index} className="">
              <div className="message flex flex-col gap-4 p-1">
                {chat.role === "user" ? (
                  <div  className="text-gray-200 font-semibold bg-gray-800 md:max-w-[70%] p-2 px-6 rounded-full self-start text-[15px]">
                    <p>
                      <ReactMarkdown>{chat.content}</ReactMarkdown>
                    </p>
                  </div>
                ) : (
                  <div className="md:max-w-[70%] overflow-auto p-2 px-6 rounded-3xl text-[15px]
                  self-end bg-gray-950 text-white
                  ">
                    <p>
                    <ReactMarkdown>{chat.content}</ReactMarkdown>
                    </p>
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>
      {activeConversation && <Chatbox />}
    </div>
  );
};

export default Chats;
