import Chats from "../components/Chats";
import Conversations from "../components/Conversations";

const ChatPage: React.FC = () => {
    return (
        <div className="m-4 shadow-lg  bg-white grid grid-cols-[_.3fr_.7fr]">
            <Conversations/>
            <Chats/>
        </div>
    )
}

export default ChatPage;