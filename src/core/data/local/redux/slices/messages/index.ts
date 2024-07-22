import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../hooks";
import { useSelector } from "react-redux";
import { Message } from "../../../../../types/Message";

export type MessagesSliceState = {
  list: Message[];
  unread: Message[];
  selected: Message | null;
  loading: boolean;
  error: string | null;
};

const initialState: MessagesSliceState = {
  list: [],
  unread: [],
  selected: null,
  loading: false,
  error: null,
};

export const messagesSlice = createSlice({
  initialState,
  name: "messages",
  reducers: {
    loadingMessages: (state) => {
      state.loading = true;
    },
    loadMessages: (state, action) => {
      const messages = [...action.payload];

      state.loading = false;
      state.list = messages;
    },
    addMessage: (state, action) => {
      const message = action.payload;

      state.list.push(message);
    },
    messagesError: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    selectMessage: (state, action) => {
      const id = action.payload;

      state.selected = state.list.find((message) => message.id === id) || null;
    },
  },
});

export const messagesName = messagesSlice.name;

export const {
  loadMessages,
  loadingMessages,
  messagesError,
  selectMessage,
  addMessage,
} = messagesSlice.actions;

export const messageSliceSeletor = (): MessagesSliceState =>
  useSelector((global: RootState) => global[messagesName]);

export default messagesSlice.reducer;
