import { model, ObjectId, Schema } from "mongoose";

interface IMessage {
  content: string;
  role: "ai" | "user";
}

interface IConversation {
  user: ObjectId;
  title: string;
  messages: IMessage[];
}

const ConversationSchema = new Schema<IConversation>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    title: {
      type: String,
      default: "",
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
