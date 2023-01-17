import { configureStore } from "@reduxjs/toolkit";

import storage from "redux-persist/lib/storage";
import { combineReducers } from "redux";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";

import blogReducer from "./Reducers/blogReducer";
import categoryReducer from "./Reducers/categoryReducer";

const persistConfig = {
  key: "root",
  storage,
};
const combReduces = combineReducers({
  blogs: blogReducer,
  category: categoryReducer,
});

const persistedReducer = persistReducer(persistConfig, combReduces);
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware: any) =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});
export const persistor = persistStore(store);
