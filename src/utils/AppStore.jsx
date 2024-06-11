import { configureStore } from "@reduxjs/toolkit";
import UserReducer from "./UserSlice";
import moviesReducer from "./MovieSlice";

const appStore = configureStore({
  reducer: {
    user: UserReducer,
    movies: moviesReducer,
  },
});

export default appStore;
