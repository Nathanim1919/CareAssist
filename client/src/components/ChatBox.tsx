const Chatbox: React.FC = () => {
  return (
    <form className="bg-gray-950 rounded-full overflow-hidden grid grid-cols-[_.9fr_.1fr] items-center absolute bottom-2  left-0 w-[98%] mx-auto">
        <input
            type="text"
            placeholder="Type a message"
            className="p-3 w-full bg-transparent text-white"
        />
        <button type="submit" className="p-2 flex-1 w-full text-white">Send</button>
    </form>
  );
};

export default Chatbox;
