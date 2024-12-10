import { GenerateContentResult } from "@google/generative-ai";
import { getMessages } from "./chat.service";
import { model, preamble } from "./runLLm";
import { User } from "../model/user.model";

export async function generateContent(userId: string, userMessage: string, conversationId?: string) {
  try {
    const user = await User.findById(userId);
    if (!user) throw new Error("User not found");

    const history = await getMessages(conversationId || "");
    const messages = history ? truncateMessages(history.messages.map(msg => msg.content), 3000) : [];
    const prompt = generatePrompt(preamble, messages, user.role, user.fullName, userMessage);
    console.log("prompt: ", prompt);

    const result: GenerateContentResult = await model.generateContent(prompt);
    const content = extractContent(result);

    console.log("Generated Content:\n", content);
    return content;
  } catch (error) {
    console.log("Generating content is not working");
    console.log(error);
    throw new Error("Failed to generate content");
  }
}


export async function generateTitleForConversation(conversationId: string) {
  try {
    const history = await getMessages(conversationId);
    if (!history) throw new Error("Conversation not found");

    const messages = truncateMessages(history.messages.map(msg => msg.content), 500); // Shorter context for titles
    const titlePrompt = generateTitlePrompt(messages);

    const result = await model.generateContent(titlePrompt);
    const title = extractContent(result);

    console.log("Generated Title:\n", title);
    return title;
  } catch (error) {
    console.log("Generating titile is not working");
    console.log(error);
    throw new Error("Failed to generate title");
  }
}

// Utility Functions
/**
 * Truncate messages to ensure they fit within a token limit.
 * @param messages Array of message strings.
 * @param maxTokens Maximum allowed tokens.
 * @returns Truncated array of messages.
 */
const truncateMessages = (messages: string[], maxTokens: number): string[] => {
    let tokenCount = 0;
    const truncated: string[] = [];
  
    // Start from the most recent messages
    for (let i = messages.length - 1; i >= 0; i--) {
      const tokens = messages[i].split(" ").length; // Approximate token count
      if (tokenCount + tokens > maxTokens) break;
      tokenCount += tokens;
      truncated.unshift(messages[i]);
    }
  
    return truncated;
  };
  
  /**
   * Generate a prompt for the LLM model.
   * @param preamble Static preamble for the prompt.
   * @param messages Conversation history as an array of strings.
   * @param userRole The role of the user (e.g., doctor, nurse).
   * @param userMessage The latest user message.
   * @returns Formatted prompt string.
   */
  const generatePrompt = (
    preamble: string,
    messages: string[],
    userRole: string,
    userName: string,
    userMessage: string
  ): string => {
    return `
      ${preamble}
      ${messages.join("\n")}
      this user name is ${userName}
      This user is a ${userRole}.
      User: ${userMessage}
      AI:
    `;
  };
  
  /**
   * Extract content from the LLM response.
   * @param result The result object from the LLM model.
   * @returns Extracted content as a string.
   */
  const extractContent = (result: GenerateContentResult): string => {
    if (!result.response || !result.response.candidates) {
      return "No content found";
    }
  
    return result.response.candidates
      .map(candidate => candidate.content?.parts?.[0]?.text || "No content found")
      .join("\n");
  };
  
  /**
   * Generate a prompt specifically for creating a title from conversation history.
   * @param messages Array of conversation messages.
   * @returns Formatted title generation prompt.
   */
  const generateTitlePrompt = (messages: string[]): string => {
    return `
      Summarize the following conversation into a concise and meaningful title:
      ${messages.join("\n")}
    `;
  };
  
