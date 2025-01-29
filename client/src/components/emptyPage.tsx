import { useContext, useState } from "react";
import { ChatContext } from "../context/ChatContext";
import { AuthContext } from "../context/AuthContext";

const EmptyPage: React.FC = () => {
  const chat = useContext(ChatContext);
  const auth = useContext(AuthContext);
  const { userData } = auth!;
  const { sendMessage } = chat!;
  const [message, setMessage] = useState<string>("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(message);
    sendMessage(message);
    setMessage("");
  };

  return (
    <div className="relative h-full w-full grid place-items-center">
      <div className="grid gap-5">
        <div className="flex flex-col items-center justify-center">
          <h1 className="font-bold text-3xl">Hello, {userData?.fullName?.split(" ")[0]}.  {userData?.fullName?.split(" ")[1].slice(0,2)}</h1>
          <h2 className="md:text-3xl font-bold text-center">
            <span className="text-gray-500">What Can I Do For You Today?</span>
          </h2>
        </div>
        <form
          onSubmit={handleSubmit}
          className="bg-black flex items-center rounded-full p-2"
        >
          <input
            className="flex-1 p-2 outline-none bg-transparent"
            type="text"
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Enter text"
          />
          <button type="submit" className="p-2">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default EmptyPage;
