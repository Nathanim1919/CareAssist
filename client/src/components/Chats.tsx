import { IoCreateOutline } from "react-icons/io5";
import { GoSidebarExpand } from "react-icons/go";
import Chatbox from "./ChatBox";
// import {GoSlidebarShrink} from "react-icons/go";


const Chats: React.FC = () => {
    const chats = [
        {
            "user": "Nathan",
            "message": "Hello"
        },
        {
            "ai": "How can I help you today?"
        },
        {
            "user": "Nathan",
            "message": "I am not feeling well"
        },
        {
            "ai": "I am sorry to hear that. Can you tell me more about your symptoms?"
        },
        {
            "user": "Nathan",
            "message": "I have a headache"
        },
        {
            "ai": "I see. Do you have any other symptoms?"
        },
        {
            "user": "Nathan",
            "message": "I also have a fever"
        },
        {
            "ai": "I recommend you take some rest and drink plenty of fluids. If your symptoms persist, please consult a doctor immediately."
        },
        {
            "user": "Nathan",
            "message": "Thank you"
        },
        {
            "ai": "You're welcome. Take care."
        },
    ];
    return (
        <div className="h-full px-4 relative">
            <div className="header">
                <div className="icons p-4 flex items-center text-2xl  gap-5">
                    <GoSidebarExpand/>
                    <IoCreateOutline/>
                    {/* <GoSlidebarShrink/> */}
                </div>
            </div>
            <div className="chats">
                {chats.map((chat, index) => (
                    <div key={index} className={chat.user ? "user" : "ai"}>
                        <div className="message flex flex-col">
                            {chat.user?
                            <p className="
                            text-gray-700 font-semibold bg-gray-200 md:max-w-[50%] p-2 rounded-full self-start text-[12px]
                            
                            ">{chat.message}</p>:
                            <p className="md:max-w-[50%] p-2 rounded-full text-[12px]
                            self-end bg-gray-950 text-white
                            ">{chat.ai}</p>}
                        </div>
                    </div>
                ))}
            </div>
            <Chatbox/>
        </div>
    )
};


export default Chats;