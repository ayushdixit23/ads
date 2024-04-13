import { configureStore } from "@reduxjs/toolkit";
import dataSlice from "./slice/dataSlice";
import { api } from "./slice/apiSlice";
import userSlice from "./slice/userData";
import registerSlice from "./slice/registerSlice";

export const store = configureStore({
	reducer: {
		[api.reducerPath]: api.reducer,
		data: dataSlice,
		userData: userSlice,
		register: registerSlice
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: false
		}).concat(api.middleware),
})
