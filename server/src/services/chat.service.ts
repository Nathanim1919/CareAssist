import mongoose, { Error } from "mongoose";
import { ConversationModel } from "../model/conversation.model";
import { generateContent, generateTitleForConversation } from "./llmService";
import { io, userSockets } from "../index";

export const createConversation = async (userId: string) => {
  try {
    const soketId = userSockets.get(userId);

    const conversation = await ConversationModel.create({
      user: userId,
      title: "new chat",
      messages: [],
    });

    if (soketId) {
      io.to(soketId).emit("newConversation", conversation);
    }
    return conversation;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error("An error occurred while creating a conversation");
  }
};

export const getAllConversations = async (userId: string) => {
  console.log("userId", userId);
  try {
    const user_id = new mongoose.Types.ObjectId(userId);
    const conversations = await ConversationModel.find({ user: user_id });
    return conversations.reverse();
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error(
      "Unknown Error has been occured while fetching all user conversations"
    );
  }
};

export const getMessagesService = async (conversationId: string) => {
  if (!conversationId) {
    return null;
  }
  try {
    const response = await ConversationModel.findById(conversationId).populate(
      "messages"
    );
    return response;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }

    throw new Error("An error occurred while fetching messages");
  }
};

export const createMessage = async (
  userId: string,
  message: string,
  conversationId?: string
) => {
  try {
    const soketId = userSockets.get(userId);
    if (soketId) {
      io.to(soketId).emit("aiIsTyping", true);
    }
    // Find the conversation by ID or create a new one
    const conversation = conversationId
      ? await ConversationModel.findById(
          new mongoose.Types.ObjectId(conversationId)
        )
      : await createConversation(userId);

    // Create a new message
    conversation?.messages.push({ content: message, role: "user" });
    const aiResponse = await generateContent(userId, message, conversationId);
    conversation?.messages.push({ content: aiResponse, role: "ai" });

    if (soketId) {
      io.to(soketId).emit("aiResponse", {
        content: aiResponse,
        role: "ai",
      });
    }

    // generate title if title is empty
    if (conversation && conversation.title === "new chat") {
      if (conversation?.messages.length >= 3) {
        const title = await generateTitleForConversation(conversationId || "");
        conversation.title = title;
        if (soketId) {
          io.to(soketId).emit("title", title);
        }
      } else {
        console.log("Not enough context for generating a title.");
      }
    }

    await conversation?.save();
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    console.log(error);
    throw new Error("An error occurred while creating a message");
  }
};
