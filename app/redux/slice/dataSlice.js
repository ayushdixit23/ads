import { createSlice } from "@reduxjs/toolkit"

export const dataSlice = createSlice({
	name: "data",
	initialState: {
		step: 0,
		validateStep1: false,
		validateStep2: false,
		// three: {
		// 	communityName: "",
		// 	communityDesc: "",
		// 	communityCategory: "Humor & Memes",
		// 	communityImage: "",
		// 	location: ["bihar"],
		// 	Headline: "dfcghjbk",
		// 	adName: "gfxdg",
		// 	Description: "dhjhfjhcbjersfvhmecvh  vy hwec liywvuc hgigwevc",
		// 	Action: "Order Now",
		// 	link: "hjvgx wceukcvw k ",
		// 	media: "",
		// 	goal: "Sales",
		// 	tags: [],
		// 	maxage: "",
		// 	minage: "",
		// 	selectedAgeRange: "",
		// 	gender: "Both",
		// 	popularity: 1,
		// 	age: "All age group",
		// 	type: "infeed",
		// 	TotalBudget: "10000",
		// 	DailyBudget: "10000",
		// 	category: "Business & Finance",
		// 	startDate: new Date(),
		// 	comid: "",
		// 	endDate: "",
		// 	duration: "1",
		// 	random_id: Date.now().toString(),
		// 	audience: "",
		// 	isImage: false,
		// 	postid: "",
		// 	isDisabled: false
		// },
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
			popularity: 1,
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
			postid: "",
			isDisabled: false
		},
		advertiserid: "",
		userid: "",
		image: "",
		fullname: ""
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
		},
		setUserid: (state, action) => {
			state.userid = action.payload
		},
		setAdvertiserid: (state, action) => {
			state.advertiserid = action.payload
		},
		setImage: (state, action) => {
			state.image = action.payload
		},
		setFullname: (state, action) => {
			state.fullname = action.payload
		},

	}
})

export const { setStep, setValidateStep1, setValidateStep2, setAdvertiserid
	, setUserid, setAudience, setThree, setFullname, setImage } = dataSlice.actions
export default dataSlice.reducer