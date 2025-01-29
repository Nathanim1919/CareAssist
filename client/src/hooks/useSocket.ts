import { useContext, useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import { AuthContext } from "../context/AuthContext";

const useSocket = () => {
  const [connected, setConnected] = useState(false);
  const [socket, setSocket] = useState<Socket | null>(null);
  const auth = useContext(AuthContext);

  useEffect(() => {
    const socketInstance = io("http://localhost:3000", {
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
    });

    setSocket(socketInstance);
    setConnected(socketInstance.connected);

    socketInstance.on("connect", () => {
      setConnected(true);
      console.log("Connected to socket server");
      socketInstance.emit("register", auth?.userData?._id?.toString());
    });

    socketInstance.on("disconnect", () => {
      setConnected(false);
    });

    return () => {
      socketInstance.disconnect();
    };
  }, [auth?.userData?._id]);

  return { connected, socket };
};

export default useSocket;
