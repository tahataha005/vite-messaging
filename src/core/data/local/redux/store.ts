import { configureStore } from "@reduxjs/toolkit";
import usersSliceReducer, { usersName } from "./slices/users";
import chatsSliceReducer, { chatsName } from "./slices/chats";
import messagesSliceReducer, { messagesName } from "./slices/messages";

export const store = configureStore({
  reducer: {
    [chatsName]: chatsSliceReducer,
    [messagesName]: messagesSliceReducer,
    [usersName]: usersSliceReducer,
  },
});
