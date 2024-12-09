const Chatbox: React.FC = () => {
  return (
    <form className="bg-red-500 flex items-center absolute bottom-0 left-0 w-full p-2">
        <input
            type="text"
            placeholder="Type a message"
            className=" bg-gray-200 p-4 w-full rounded-full"
        />
        <button type="submit" className="flex-1 w-full bg-gray-900 text-white">Send</button>
    </form>
  );
};

export default Chatbox;
