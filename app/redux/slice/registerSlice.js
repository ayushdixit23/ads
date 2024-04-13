import { createSlice } from "@reduxjs/toolkit";

export const registerSlice = createSlice({
	name: "register",
	initialState: {
		change: 1,
		load: false
	},
	reducers: {
		setChange: (state, action) => {
			state.change = action.payload
		},
		setLoad: (state, action) => {
			state.load = action.payload
		}

	}
})

export const { setChange, setLoad } = registerSlice.actions
export default registerSlice.reducer