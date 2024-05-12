import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../hooks";
import { useSelector } from "react-redux";
import { Chat } from "../../../../../types/Chat";
import { User } from "../../../../../types/User";

export type ChatsSliceState = {
  list: Chat[];
  online: User[];
  selected: Chat | null;
  loading: boolean;
  error: string | null;
};

const initialState: ChatsSliceState = {
  list: [],
  online: [],
  selected: null,
  loading: false,
  error: null,
};

export const chatsSlice = createSlice({
  initialState,
  name: "chat",
  reducers: {
    loadingChats: (state) => {
      state.loading = true;
    },
    loadChats: (state, action) => {
      const list = action.payload;

      state.loading = false;
      state.list = list;
    },
    chatsError: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    loadNewMessage: (state, action) => {
      const message = action.payload;

      state.list = state.list.map((chat) => {
        if (chat.users.some((user) => (user as any)._id === message.user)) {
          chat.messages.push(message);
        }

        return chat;
      });
    },
    selectChat: (state, action) => {
      const id = action.payload;

      state.selected = state.list.find((chat) => chat.id === id) || null;
    },
    readChat: (state, action) => {
      const chatId = action.payload;

      const chatIndex = state.list.findIndex((c) => c.id === chatId);

      const messages = state.list[chatIndex]?.messages.map((message) => {
        message.read = true;

        return message;
      });

      state.list[chatIndex].messages = messages;
    },
    loadOnline: (state, action) => {
      const { list } = action.payload;

      state.online = list;
    },
  },
});

export const chatsName = chatsSlice.name;

export const {
  chatsError,
  loadChats,
  loadingChats,
  selectChat,
  loadNewMessage,
  readChat,
  loadOnline,
} = chatsSlice.actions;

export const chatSliceSeletor = (): ChatsSliceState =>
  useSelector((global: RootState) => global[chatsName]);

export default chatsSlice.reducer;
