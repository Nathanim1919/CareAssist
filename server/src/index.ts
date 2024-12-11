import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRouter from "./routes/auth.route";
import chatRouter from "./routes/chat.route";
import mongoose from "mongoose";
import dotenv from "dotenv";
import initSocketServer from "./socket";
import http from "http";


dotenv.config()
const app = express();


// create http server
export const httpServer = http.createServer(app);

// create socket server
const socketInstance = initSocketServer(httpServer);



// connect to mongodb
mongoose
  .connect("mongodb://localhost:27017/chat-app")
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.log("Error connecting to MongoDB", error);
  });

// routes
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

app.use("/auth", authRouter);
app.use("/chat", chatRouter);

httpServer.listen(3000, () => {
  console.log("Server is running on port 3000");
});
