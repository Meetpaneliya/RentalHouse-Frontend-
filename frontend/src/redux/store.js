import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // localStorage
import {
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";

import { api } from "./APi/api";
import { listingAPI } from "./APi/listingApi";
import authSlice from "./reducers/Auth";
import orderSlice from "./reducers/orderSlice";

// Combine reducers
const rootReducer = combineReducers({
  [authSlice.name]: authSlice.reducer,
  [orderSlice.name]: orderSlice.reducer,
  [listingAPI.reducerPath]: listingAPI.reducer,
  [api.reducerPath]: api.reducer,
});

// Configure persistence
const persistConfig = {
  key: "root",
  storage,
  whitelist: [authSlice.name], // ✅ persist only slices, not RTK query
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure store
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Redux persist needs these ignored
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(api.middleware, listingAPI.middleware),
});

export const persistor = persistStore(store);
export default store;
