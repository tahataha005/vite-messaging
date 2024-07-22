import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../hooks";
import { useSelector } from "react-redux";
import { User } from "../../../../../types/User";

export type UsersSliceState = {
  list: User[];
  fileredList: User[];
  online: { id: string; room: string }[];
  query: {
    email: string;
    firstName: string;
    lastName: string;
  };
  selected: User | null;
  loading: boolean;
  error: string | null;
};

const initialState: UsersSliceState = {
  list: [],
  fileredList: [],
  online: [],
  query: {
    email: "",
    firstName: "",
    lastName: "",
  },
  selected: null,
  loading: false,
  error: null,
};

export const usersSlice = createSlice({
  initialState,
  name: "users",
  reducers: {
    loadingUsers: (
      state,
      action: { type: string; payload: boolean | undefined }
    ) => {
      state.loading = action.payload ?? true;
    },
    loadOnlineUsers: (state, action) => {
      state.online = action.payload;
    },
    queryChanges: (state, action) => {
      state.query = { ...state.query, ...action.payload };

      state.fileredList = state.list.filter((user) => {
        const { email, firstName, lastName } = state.query;

        return (
          user.email.includes(email) &&
          user.firstName.includes(firstName) &&
          user.lastName.includes(lastName)
        );
      });
    },
    addSeachedUsers: (state, action) => {
      state.loading = false;

      const toAdd = action.payload.filter(
        (user: User) => !state.list.find((u) => u._id === user._id)
      );

      state.list = [...state.list, ...toAdd];

      state.fileredList = state.list.filter((user) => {
        const { email, firstName, lastName } = state.query;

        return (
          user.email.includes(email) &&
          user.firstName.includes(firstName) &&
          user.lastName.includes(lastName)
        );
      });
    },
    usersError: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    selectUser: (state, action) => {
      const id = action.payload;

      state.selected = state.list.find((user) => user._id === id) || null;
    },
  },
});

export const usersName = usersSlice.name;

export const {
  addSeachedUsers,
  loadingUsers,
  usersError,
  selectUser,
  queryChanges,
  loadOnlineUsers,
} = usersSlice.actions;

export const userSliceSeletor = (): UsersSliceState =>
  useSelector((global: RootState) => global[usersName]);

export default usersSlice.reducer;
