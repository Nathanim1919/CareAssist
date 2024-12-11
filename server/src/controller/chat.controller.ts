import { Request, Response } from "express";
import { createMessage, getMessagesService, getAllConversations } from "../services/chat.service";


export const getAllConversation = async (req: Request, res: Response) => {
    try {
        const userId  = req.user??"";
        const response = await getAllConversations(userId);
        res.status(200).json(response);
    } catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ message: error.message });
        }
    }
};

export const newMessage = async (req: Request, res: Response) => {
    console.log(req.body);
    try {
        const userId = req.user??"";
        const {message, activeConversation } = req.body;
        const response = await createMessage(userId, message, activeConversation);
        res.status(200).json(response);
    } catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ message: error.message });
        }
    }
};

export const getMessages = async (req: Request, res: Response) => {
    try {
        const { conversationId } = req.params;
        const response = await getMessagesService(conversationId);
        res.status(200).json(response);
    } catch (error) {
        if (error instanceof Error) {
           res.status(400).json({ message: error.message });
        }
    }
};