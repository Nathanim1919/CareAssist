import { Error } from "mongoose";
import { ConversationModel } from "../model/conversation.model";
import { generateContent, generateTitleForConversation } from "./llmService";

export const createConversation = async (userId: string) => {
  try {
    const conversation = await ConversationModel.create({user:userId, title:"", messages: [] });
    return conversation;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error("An error occurred while creating a conversation");
  }
};

export const getMessages = async (conversationId: string) => {
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
    // Find the conversation by ID or create a new one
    const conversation = conversationId
      ? await ConversationModel.findById(conversationId)
      : await createConversation(userId);

    // Create a new message
    conversation?.messages.push({ content: message, role: "user" });
    const aiResponse = await generateContent(userId, message, conversationId);
    conversation?.messages.push({ content: aiResponse, role: "ai" });
    // generate title if title is empty
    if (conversation && !conversation.title) {
      if (conversation?.messages.length >= 3) {
        const title = await generateTitleForConversation(conversationId || "");
        conversation.title = title;
        console.log("Generated title:", title);
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