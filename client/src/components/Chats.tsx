import { IoCreateOutline } from "react-icons/io5";
import Chatbox from "./ChatBox";
import { TbLayoutSidebarLeftExpand } from "react-icons/tb";
import { useContext, useEffect, useState } from "react";
import EmptyPage from "./emptyPage";
import { ChatContext } from "../context/ChatContext";
import ReactMarkdown from "react-markdown";
import useSocket from "../hooks/useSocket";

interface IChatProps {
  expandShrinkConversations: (value: boolean) => void;
  showConversations: boolean;
}

const Chats: React.FC<IChatProps> = ({
  expandShrinkConversations,
  showConversations,
}) => {
  const chat = useContext(ChatContext);
  const { messages, empty, activeConversation, setActiveConversation } = chat!;
  const { socket } = useSocket();
  const [aiThinking, setAiThinking] = useState<boolean>(false);

  useEffect(() => {
    socket?.on("aiIsTyping", () => {
      setAiThinking(true);
    });

    socket?.on("aiResponse", (data: any) => {
      messages.push(data);
      setAiThinking(false);
    });

    socket?.on("title", (data: any) => {
      console.log(data);
      setActiveConversation({
        ...activeConversation!,
        title: data,
      });
    });

    return () => {
      socket?.off("aiIsTyping");
      socket?.off("aiResponse");
      socket?.off("title");
    };
  }, [activeConversation, messages, setActiveConversation, socket]);

  return (
    <div
      className={`h-[90vh] overflow-hidden p-4 relative bg-gray-800/60
       
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
            <IoCreateOutline onClick={() => setActiveConversation(null)} />
          </div>
        )}
      </div>
      <div className="chats w-full h-[75vh] overflow-y-auto p-4 pb-10">
        {empty && !activeConversation ? (
          <EmptyPage />
        ) : (
          messages.map((chat, index: number) => (
            <div key={index} className="">
              <div className="message flex flex-col gap-4 p-1">
                {chat.role === "user" ? (
                  <div className="text-gray-200 font-semibold bg-gray-800 md:max-w-[70%] p-2 px-6 rounded-full self-start text-[15px]">
                    <ReactMarkdown>{chat.content}</ReactMarkdown>
                  </div>
                ) : (
                  <div
                    className="md:max-w-[70%] overflow-auto p-2 px-6 rounded-3xl text-[15px]
                  self-end bg-gray-950 text-white
                  "
                  >
                    <ReactMarkdown>{chat.content}</ReactMarkdown>
                  </div>
                )}
              </div>
            </div>
          ))
        )}

        {aiThinking && (
          <div className="message flex flex-col gap-4 p-1">
            <div
              className="md:max-w-[70%] overflow-auto p-2 px-6 rounded-3xl text-[15px]
              self-end bg-gray-950 text-white
            "
            >
              <p>AI is thinking...</p>
            </div>
          </div>
        )}
      </div>
      {activeConversation && <Chatbox />}
    </div>
  );
};

export default Chats;
