import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // localStorage

import authReducer from "./authSlice";

/* =============================
   PERSIST CONFIG
   ============================= */
const persistConfig = {
   key: "root",
   storage,
   whitelist: ["auth"], // chỉ persist auth
};

/* =============================
   ROOT REDUCER
   ============================= */
const rootReducer = combineReducers({
   auth: authReducer,
});

/* =============================
   PERSISTED REDUCER
   ============================= */
const persistedReducer = persistReducer(persistConfig, rootReducer);

/* =============================
   STORE
   ============================= */
export const store = configureStore({
   reducer: persistedReducer,
   middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
         serializableCheck: false, // cần cho redux-persist
      }),
});

/* =============================
   PERSISTOR
   ============================= */
export const persistor = persistStore(store);
