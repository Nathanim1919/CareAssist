import { Server as SocketIOServer, Socket } from "socket.io";
import http from "http";

const initSocketServer = (httpServer: http.Server) => {
  const io = new SocketIOServer(httpServer, {
    cors: {
      origin: "http://localhost:5173",
      methods: ["GET", "POST"],
      credentials: true,
    },
    transports: ["websocket", "polling"],
  });

  const userSockets: Map<string, string> = new Map();

  io.on("connection", (socket: Socket) => {
    socket.on("register", (userId: string) => {
      userSockets.set(userId, socket.id);
      console.log("User registered with id:", userId);
      console.log("User sockets:", userSockets);
    });

    socket.on("error", (error) => {
      console.error(error);
    });

    socket.on("disconnect", () => {
      userSockets.forEach((value, key) => {
        if (value === socket.id) {
          userSockets.delete(key);
        }
      });
    });
  });

  return { io, userSockets };
};

export default initSocketServer;
