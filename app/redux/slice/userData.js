import { createSlice } from "@reduxjs/toolkit";

const userData = createSlice({
	name: "userData",
	initialState: {
		loading: false,
		path: "",
		data: null,
	},
	reducers: {
		changeloading: (state, action) => {
			const { loading, path } = action.payload;
			state.loading = loading
			state.path = path
		},
		sendData: (state, action) => {
			state.data = action.payload
		},
	},
});

export const { changeloading, sendData } = userData.actions;
export default userData.reducer;