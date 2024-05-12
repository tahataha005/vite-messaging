import { request } from "../../tools/request";

export const chatApi = {
  getChats: async () => {
    try {
      const { data } = await request({
        route: "/chats",
        method: "GET",
      });

      return data.map((chat) => {
        chat.id = chat._id;

        return chat;
      });
    } catch (error) {
      console.log(error);
    }
  },
  createChat: async (room: string) => {
    try {
      const { data } = await request({
        route: "/chats",
        method: "POST",
        data: {
          room,
        },
      });

      return data;
    } catch (error) {
      console.log(error);
    }
  },
  readChat: async (room: string) => {
    try {
      const { data } = await request({
        route: `/chats/${room}`,
        method: "GET",
      });

      return data;
    } catch (error) {
      console.log(error);
    }
  },
};
