import { User } from "./User";

export type Message = {
  id: string;
  message: string;
  user: string;
  createdAt: string;
  room?: string;
  read: boolean;
};
