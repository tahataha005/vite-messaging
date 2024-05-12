import { User } from "./User";

export type Message = {
  id: string;
  message: string;
  user: string;
  createdAt: String;
  room?: string;
  read: boolean;
};
