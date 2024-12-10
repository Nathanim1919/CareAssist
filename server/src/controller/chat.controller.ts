import { Request, Response } from "express";
import { createMessage, getMessages } from "../services/chat.service";


export const getAllConversation = async (req: Request, res: Response) => {
    try {
        const userId  = req.useId;
        const res = await getAllConversations(userId);
        res.status(200).json({ message: "All conversations" });
    } catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ message: error.message });
        }
    }
};

export const newMessage = async (req: Request, res: Response) => {
    try {
        const { userId, message, conversationId } = req.body;
        const response = await createMessage(userId, message, conversationId);
        res.status(200).json(response);
    } catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ message: error.message });
        }
    }
};

export const getAllMessages = async (req: Request, res: Response) => {
    try {
        const { conversationId } = req.params;
        const response = await getMessages(conversationId);
        res.status(200).json(response);
    } catch (error) {
        if (error instanceof Error) {
           res.status(400).json({ message: error.message });
        }
    }
};