import { TbLayoutSidebarLeftExpand } from "react-icons/tb";
import { IoCreateOutline } from "react-icons/io5";
import { SlOptions } from "react-icons/sl";



const Conversations: React.FC = () => {
    const conversations = [
        {
            "title": "How are you feeling today?",
        },
        {
            "title": "Health Checkup",
        },
        {
            "title": "Medication",
        },
        {
            "title": "Appointment",
        },
        {
            "title": "How are you feeling today?",
        },
        {
            "title": "Health Checkup",
        },
        {
            "title": "Medication",
        },
        {
            "title": "Appointment",
        },
        {
            "title": "How are you feeling today?",
        },
        {
            "title": "Health Checkup",
        },
        {
            "title": "Medication",
        },
        {
            "title": "Appointment",
        },
        {
            "title": "How are you feeling today?",
        },
        {
            "title": "Health Checkup",
        },
        {
            "title": "Medication",
        },
        {
            "title": "Appointment",
        },
    ];
    return (
        <div className="conversations bg-gray-200 p-4 grid gap-5">
             <div className="header">
                    <div className="icons flex items-center justify-between text-2xl">
                        <TbLayoutSidebarLeftExpand/>
                        <IoCreateOutline/>
                    </div>
             </div>
             <div className="">
                {conversations.map((conversation, index) => (
                    <div key={index} className="group conversation p-2 hover:bg-gray-400 cursor-pointer flex items-center justify-between">
                        <h3 className="">{conversation.title}</h3>
                        <SlOptions className="hidden group-hover:block"/>
                    </div>
                ))}
             </div>
        </div>
    )
}

export default Conversations;