import { Router } from "express";
import { newMessage, getAllMessages } from "../controller/chat.controller";

const router = Router();

router.post("/", newMessage);
router.get("/:conversationId", getAllMessages);

export default router;