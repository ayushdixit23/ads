import { formatDateToString } from "@/app/utils/useful"
import { createSlice } from "@reduxjs/toolkit"

export const dataSlice = createSlice({
	name: "data",
	initialState: {
		step: 0,
		validateStep1: false,
		validateStep2: false,
		three: {
			communityName: "",
			communityDesc: "",
			communityCategory: "Humor & Memes",
			communityImage: "",
			location: [],
			Headline: "",
			adName: "",
			Description: "",
			Action: "Order Now",
			link: "",
			media: "",
			goal: "",
			tags: [],
			maxage: "",
			minage: "",
			selectedAgeRange: "",
			gender: "",
			age: "",
			type: "",
			TotalBudget: "",
			DailyBudget: "",
			category: "Business & Finance",
			startDate: new Date(),
			comid: "",
			endDate: "",
			duration: "1",
			random_id: Date.now().toString(),
			audience: "",
			isImage: false,
			postid: ""
		}
	},
	reducers: {
		setStep: (state, action) => {
			state.step = action.payload
		},
		setValidateStep1: (state, action) => {
			state.validateStep1 = action.payload
		},
		setValidateStep2: (state, action) => {
			state.validateStep2 = action.payload
		},
		setThree: (state, action) => {
			state.three = { ...state.three, ...action.payload };
		},
		setAudience: (state, action) => {
			state.three.audience = action.payload
		}
	}
})

export const { setStep, setValidateStep1, setValidateStep2, setAudience, setThree } = dataSlice.actions
export default dataSlice.reducer