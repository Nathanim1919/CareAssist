import { GoSidebarExpand } from "react-icons/go";
import { IoCreateOutline } from "react-icons/io5";
import { SlOptions } from "react-icons/sl";

interface IConversationProps {
  expandShrinkConversations: (value: boolean) => void;
  showConversations: boolean;
}

const Conversations: React.FC<IConversationProps> = ({
  expandShrinkConversations,
  showConversations,
}) => {
  const conversations = [
    {
      title: "How are you feeling today?",
    },
    {
      title: "Health Checkup",
    },
    {
      title: "Medication",
    },
    {
      title: "Appointment",
    },
    {
      title: "How are you feeling today?",
    },
    {
      title: "Health Checkup",
    },
    {
      title: "Medication",
    },
    {
      title: "Appointment",
    },
    {
      title: "How are you feeling today?",
    },
    {
      title: "Health Checkup",
    },
    {
      title: "Medication",
    },
    {
      title: "Appointment",
    },
    {
      title: "How are you feeling today?",
    },
    {
      title: "Health Checkup",
    },
    {
      title: "Medication",
    },
    {
      title: "Appointment",
    },
    {
      title: "How are you feeling today?",
    },
    {
      title: "Health Checkup",
    },
    {
      title: "Medication",
    },
    {
      title: "Appointment",
    },
    {
      title: "How are you feeling today?",
    },
    {
      title: "Health Checkup",
    },
    {
      title: "Medication",
    },
    {
      title: "Appointment",
    },
  ];
  return (
    <div
      className={`conversations bg-black h-[90vh] overflow-hidden p-4 grid gap-5 transform transition-all duration-500
        `}
    >
      <div className="header">
        <div className="icons flex items-center justify-between text-2xl">
          <GoSidebarExpand className="cursor-pointer"
            onClick={() => {
              expandShrinkConversations(!showConversations);
            }}
          />
          <IoCreateOutline />
        </div>
      </div>
      <div className="overflow-auto">
        {conversations.map((conversation, index) => (
          <div
            key={index}
            className="group conversation p-2 hover:bg-gray-800 rounded-lg cursor-pointer flex items-center justify-between"
          >
            <h3 className="text-[13px]">{conversation.title}</h3>
            <SlOptions className="hidden group-hover:block" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Conversations;
