import { useDispatch } from "react-redux";
import { store } from "./store";
import { UsersSliceState } from "./slices/users";

export type RootState = ReturnType<typeof store.getState>;
