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
    createChat: (state, action) => {
      const chat = action.payload;

      state.list.push(chat);
    },
    chatsError: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    loadNewMessage: (state, action) => {
      const { message, room } = action.payload;

      const index = state.list.findIndex((chat) => chat.room === room);

      state.list[index].messages.push(message);

      if (state.selected !== null && state.selected?.room === room) {
        state.selected.messages.push(message);
      }
    },
    selectChat: (state, action) => {
      const room = action.payload;

      const index = state.list.findIndex((chat) => chat.room === room);

      state.selected = state.list[index];
    },
    readChat: (state, action) => {
      const room = action.payload;

      const chatIndex = state.list.findIndex((c) => c.room === room);

      const messages = state.list[chatIndex]?.messages.map((message) => {
        message.read = true;

        return message;
      });

      state.list[chatIndex].messages = messages;

      if (state.selected !== null && state.selected?.room === room) {
        state.selected.messages = messages;
      }
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
  createChat,
} = chatsSlice.actions;

export const chatSliceSeletor = (): ChatsSliceState =>
  useSelector((global: RootState) => global[chatsName]);

export default chatsSlice.reducer;
