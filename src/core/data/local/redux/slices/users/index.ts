import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../hooks";
import { useSelector } from "react-redux";
import { User } from "../../../../../types/User";

export type UsersSliceState = {
  list: User[];
  selected: User | null;
  loading: boolean;
  error: string | null;
};

const initialState: UsersSliceState = {
  list: [],
  selected: null,
  loading: false,
  error: null,
};

export const usersSlice = createSlice({
  initialState,
  name: "users",
  reducers: {
    loadingUsers: (state) => {
      state.loading = true;
    },
    loadUsers: (state, action) => {
      state.loading = false;
      state.list = action.payload;
    },
    usersError: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    selectUser: (state, action) => {
      const id = action.payload;

      state.selected = state.list.find((user) => user.id === id) || null;
    },
  },
});

export const usersName = usersSlice.name;

export const { loadUsers, loadingUsers, usersError, selectUser } =
  usersSlice.actions;

export const userSliceSeletor = (): UsersSliceState =>
  useSelector((global: RootState) => global[usersName]);

export default usersSlice.reducer;
