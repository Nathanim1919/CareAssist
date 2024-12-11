import { Router } from "express";
import {
  newMessage,
  getMessages,
  getAllConversation,
} from "../controller/chat.controller";
import { authenticateUser } from "../middleware/auth.middleware";

const router = Router();

router.post("/", authenticateUser, newMessage);
router.get("/getConversations", authenticateUser, getAllConversation);
router.get("/:conversationId", authenticateUser, getMessages);

export default router;
