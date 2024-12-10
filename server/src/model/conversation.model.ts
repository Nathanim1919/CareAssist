import { model, Schema } from "mongoose";

interface IMessage {
  content: string;
  role: "ai" | "user";
}

interface IConversation {
  title: string;
  messages: IMessage[];
}

const ConversationSchema = new Schema<IConversation>(
  {
    title: {
      type: String,
      required: true,
    },
    messages: {
      type: [
        {
          content: {
            type: String,
            required: true,
          },
          role: {
            type: String,
            enum: ["ai", "user"],
            required: true,
          },
        },
      ],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

const ConversationModel = model<IConversation>(
  "Conversation",
  ConversationSchema
);

export { ConversationModel, IConversation, IMessage };
