"use client"
import { BsCheckLg } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { setStep, setThree } from "../redux/slice/dataSlice";
import { getData } from "../utils/useful";
import axios from "axios";
import { useRouter } from "next/navigation";
import { API } from "@/Essentials";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function createAdLayout({ children }) {
	const { advid, userid } = getData()
	const step = useSelector((state) => state.data.step)
	const validateStep1 = useSelector((state) => state.data.validateStep1)
	const three = useSelector((state) => state.data.three)
	const validateStep2 = useSelector((state) => state.data.validateStep2)
	const dispatch = useDispatch()
	const router = useRouter()
	const [client, setClient] = useState(false)

	const stepRunner = () => {
		if (step === 0) {
			dispatch(setStep(1))
		} else if (step === 1) {
			dispatch(setStep(2))
		} else {
			console.log("first")
		}
	}

	const stepBacker = () => {
		if (step === 2) {
			dispatch(setStep(1))
		} else if (step === 1) {
			dispatch(setStep(0))
		} else {
			console.log("first")
		}
	}

	useEffect(() => {
		setClient(true)
	}, [])

	useEffect(() => {
		const isPageReloaded = window.performance.navigation.type === 1;

		if (isPageReloaded) {
			console.log('Page is reloaded');
			router.push("/createAd?step=1")
		} else {
			console.log('Page is not reloaded');
		}
	}, []);

	useEffect(() => {
		if (step === 1 && !validateStep1) {
			router.push("/createAd?step=1")
		}
		if (step === 2 && !validateStep2) {
			router.push("/createAd?step=1")
		}
	}, [step, validateStep1, validateStep2])

	const sendData = async (e) => {
		console.log("runde")
		e.preventDefault();
		try {
			const formDataToSend = new FormData();
			formDataToSend.append("location", three.location);
			formDataToSend.append("headline", three.Headline);
			formDataToSend.append("desc", three.Description);
			formDataToSend.append("age", three.age);
			formDataToSend.append("communityName", three.communityName);
			formDataToSend.append("communityDesc", three.communityDesc);
			formDataToSend.append("communityCategory", three.communityCategory);
			formDataToSend.append("communityImage", three.communityImage);
			formDataToSend.append("file", three.picsend);
			formDataToSend.append("cta", three.Action);
			formDataToSend.append("ctalink", three.link);
			formDataToSend.append("adname", three.adName);
			formDataToSend.append("gender", three.gender);
			// formDataToSend.append("estaudience", ProperAudience);
			formDataToSend.append("category", three.category);
			formDataToSend.append("contenttype", "image");
			formDataToSend.append("tags", three.tags);
			// formDataToSend.append("dailybudget", totalPrice);
			// formDataToSend.append("totalbudget", pricebyDay);
			formDataToSend.append("agerange", three.selectedAgeRange);
			formDataToSend.append("comid", three.comid)
			formDataToSend.append("minage", three.minage);
			formDataToSend.append("preferedsection", three.type);
			formDataToSend.append("maxage", three.maxage);
			formDataToSend.append("startdate", three.startDate);
			formDataToSend.append("adid", three.random_id);
			formDataToSend.append("enddate", three.duration);
			formDataToSend.append("goal", three.goal);
			formDataToSend.append("advertiserid", advid);

			let res
			if (three.comid) {
				res = await axios.post(`${API}/v1/createad/${advid}`, formDataToSend);
				console.log("first")
			} else {
				console.log("irst")
				res = await axios.post(`${API}/newad/${advid}/${userid}`, formDataToSend);
			}
			console.log(res.data)
			if (res?.data?.success) {
				router.refresh()
				router.push("/main/dashboard");
			}
		} catch (err) {
			console.log(err);
		}
	};

	if (!client) {
		return null
	}

	if ((step !== 2 && step !== 1 && step !== 0)) {
		return <section className="bg-white dark:bg-gray-900 ">
			<div className="container flex items-center min-h-screen px-6 py-12 mx-auto">
				<div>
					<p className="text-sm font-medium text-blue-500 dark:text-blue-400">404 error</p>
					<h1 className="mt-3 text-2xl font-semibold text-gray-800 dark:text-white md:text-3xl">We can’t find that page</h1>
					<p className="mt-4 text-gray-500 dark:text-gray-400">Sorry, the page you are looking for doesn't exist or has been moved.</p>

					<div className="flex items-center mt-6 gap-x-3">
						<Link href="/createAd?step=1" className="flex items-center justify-center w-1/2 px-5 py-2 text-sm text-gray-700 transition-colors duration-200 bg-white border rounded-lg gap-x-2 sm:w-auto dark:hover:bg-gray-800 dark:bg-gray-900 hover:bg-gray-100 dark:text-gray-200 dark:border-gray-700">
							<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-5 h-5 rtl:rotate-180">
								<path stroke-linecap="round" stroke-linejoin="round" d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18" />
							</svg>

							<span>Go back</span>
						</Link>

						<Link href="/main/dashboard" className="w-1/2 px-5 py-2 text-sm tracking-wide text-white transition-colors duration-200 bg-blue-500 rounded-lg shrink-0 sm:w-auto hover:bg-blue-600 dark:hover:bg-blue-500 dark:bg-blue-600">
							Take me home
						</Link>
					</div>
				</div>
			</div>
		</section>
	}

	return (
		<>
			<div className="w-screen h-screen no-scrollbar overflow-auto">
				<div className="w-full sticky top-0 left-0 z-50  bg-maincolor">
					<div className="flex border w-full bg-maincolor justify-between items-center px-5 py-3 pb-4">
						<div className="text-[#555555] dark:text-white pn:max-sm:hidden text-xl font-semibold">
							Set up a new Ad
						</div>
						<div className="text-[#555555] sm:hidden text-xl font-semibold">
							Ad SetUp
						</div>
						<div className="flex justify-center pt-2 items-center gap-3">
							{step === 0 && (
								<Link href="/main/dashboard" onClick={stepBacker} className="border-b cursor-pointer pn:max-sm:hidden border-black">
									Discard
								</Link>
							)
							}
							{step === 1 && (
								<Link href="/createAd?step=1" onClick={stepBacker} className="border-b cursor-pointer pn:max-sm:hidden border-black">
									Discard
								</Link>
							)
							}
							{step === 2 &&

								<Link href="/createAd?step=2" onClick={stepBacker} className="border-b cursor-pointer pn:max-sm:hidden border-black">
									Discard
								</Link>
							}
							{step === 0 && (
								validateStep1 ?
									// <div onClick={stepRunner} className="p-2 px-7 rounded-full bg-blue-800 cursor-pointer  text-white">
									// 	< div > Next</div>
									// </div> 
									<Link href="/createAd?step=2" onClick={stepRunner} className="p-2 px-7 rounded-full bg-blue-800 cursor-pointer  text-white">
										< div > Next</div>
									</Link>
									:
									<div className="p-2 px-7 bg-[#b3bbc3]/30 rounded-full text-white">
										<div>Next</div>
									</div>
							)
							}
							{step === 1 && (
								validateStep2 ?
									// <div onClick={stepRunner} className="p-2 px-7 rounded-full bg-blue-800 cursor-pointer  text-white">
									// 	< div > Next</div>
									// </div> 
									<Link href="/createAd?step=3" onClick={stepRunner} className="p-2 px-7 rounded-full bg-blue-800 cursor-pointer  text-white">
										< div > Next</div>
									</Link>
									:
									<div className="p-2 px-7 bg-[#b3bbc3]/30 rounded-full text-white">
										<div>Next</div>
									</div>)
							}
							{step === 2 &&

								<div onClick={sendData} className="p-2 px-7 rounded-full bg-blue-800 cursor-pointer  text-white">
									< div > Next</div>
								</div>
							}
						</div>
					</div>
					<div className="flex justify-center mt-5 bg-maincolor items-center">
						<div className="after:mt-4 mb-7 after:block after:h-1 min-w-[83%] sm:min-w-[600px] after:w-full after:rounded-lg after:bg-gray-200">
							<ol className="grid grid-cols-3 text-sm font-medium text-gray-500">
								<li className="relative flex justify-start text-green-600">

									<span className="absolute -bottom-[1.90rem] -start-1 rounded-full bg-green-600 text-white">
										{step >= 1 ? <BsCheckLg className="w-7 h-7 p-[5px]" /> : <div className="w-7 h-7 rounded-full bg-blue-600 text-sm flex justify-center items-center">1</div>
										}
									</span>
									<span class={`${step >= 1 ? "text-green-600" : "text-blue-600"} text-xs pp:text-base`}>Set up Ad</span>
								</li>

								<li className="relative flex justify-center text-green-600">
									<span
										className="absolute -bottom-[1.90rem] left-1/2 -translate-x-1/2 rounded-full bg-green-600 text-white"
									>
										{step >= 2 ? <BsCheckLg className="w-7 h-7 p-[5px]" /> : <div className="w-7 h-7 rounded-full bg-blue-600 text-sm flex justify-center items-center">2</div>}
									</span>

									<span className={`${step >= 2 ? "text-green-600" : "text-blue-600"} text-xs pp:text-base`}>Select target</span>

								</li>

								<li className="relative flex justify-end">
									<span className="absolute -bottom-[1.90rem] -end-1 rounded-full bg-gray-600 text-white">
										{/* {a ? <BsCheckLg className="w-7 h-7 p-[5px]" />
											: */}
										<div className="w-7 h-7 rounded-full bg-blue-600 text-sm flex justify-center items-center">3</div>
										{/* } */}
									</span>
									<span className={`text-blue-600 text-xs pp:text-base`}>Preview & Launch</span>
								</li>
							</ol>
						</div>
					</div>
				</div >
				<div>
					{children}
				</div>
			</div >
		</>
	)

}