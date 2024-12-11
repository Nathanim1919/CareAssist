export interface IMessage {
  content: string;
  role: "ai" | "user";
}

export interface IConversation {
  _id: string;
  user: string;
  title: string;
  messages: IMessage[];
}
