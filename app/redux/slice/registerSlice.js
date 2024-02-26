import { createSlice } from "@reduxjs/toolkit";

export const registerSlice = createSlice({
	name: "register",
	initialState: {
		change: 1
	},
	reducers: {
		setChange: (state, action) => {
			state.change = action.payload
		}
	}
})

export const { setChange } = registerSlice.actions
export default registerSlice.reducer