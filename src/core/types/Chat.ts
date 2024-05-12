import { Message } from "./Message";
import { User } from "./User";

export type Chat = {
  id: string;
  room: string;
  messages: Message[];
  users: User[];
};
