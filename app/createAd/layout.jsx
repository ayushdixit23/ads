"use client"
import { BsCheckLg } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { setStep } from "../redux/slice/dataSlice";
import axios from "axios";
import { useRouter } from "next/navigation";
import { API } from "@/Essentials";
import Link from "next/link";
import { useEffect, useState } from "react";
import { formatDateToString } from "../utils/useful";
import { useAuthContext } from "../utils/AuthWrapper";
import Cookies from "js-cookie";

export default function createAdLayout({ children }) {
	const { data } = useAuthContext()
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
		}
	}

	const stepBacker = () => {
		if (step === 2) {
			dispatch(setStep(1))
		} else if (step === 1) {
			dispatch(setStep(0))
		}
	}

	useEffect(() => {
		setClient(true)
	}, [])

	// useEffect(() => {
	// 	const isPageReloaded = window.performance.navigation.type === 1;

	// 	if (isPageReloaded) {
	// 		console.log('Page is reloaded');
	// 		router.push("/createAd?step=1")
	// 	} else {
	// 		console.log('Page is not reloaded');
	// 	}
	// }, []);

	// useEffect(() => {
	// 	if (step === 1 && !validateStep1) {
	// 		router.push("/createAd?step=1")
	// 	}
	// 	if (step === 2 && !validateStep2) {
	// 		router.push("/createAd?step=1")
	// 	}
	// }, [step, validateStep1, validateStep2])

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
			formDataToSend.append("file", three.media);
			formDataToSend.append("cta", three.Action);
			formDataToSend.append("ctalink", three.link);
			formDataToSend.append("adname", three.adName);
			formDataToSend.append("gender", three.gender);
			// formDataToSend.append("estaudience", ProperAudience);
			formDataToSend.append("category", three.category);
			formDataToSend.append("contenttype", three.isImage ? "image" : "video");
			formDataToSend.append("tags", three.tags);
			// formDataToSend.append("dailybudget", totalPrice);
			formDataToSend.append("totalbudget", three.TotalBudget);
			formDataToSend.append("agerange", three.selectedAgeRange);
			formDataToSend.append("comid", three.comid)
			formDataToSend.append("minage", three.minage);
			formDataToSend.append("type", three.type);
			formDataToSend.append("maxage", three.maxage);
			formDataToSend.append("startdate", formatDateToString(three.startDate));
			formDataToSend.append("adid", three.random_id);
			formDataToSend.append("enddate", three.endDate ? three.endDate : "Not Selected");
			formDataToSend.append("goal", three.goal);
			formDataToSend.append("postid", three.postid);
			formDataToSend.append("advertiserid", data?.advid);

			let res
			if (three.comid) {
				res = await axios.post(`${API}/v1/createad/${data?.advid}`, formDataToSend);
			} else {
				res = await axios.post(`${API}/newad/${data?.advid}/${data?.userid}`, formDataToSend);
			}
			if (res?.data?.success) {
				Cookies.remove("postid")
				Cookies.remove("post")
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
			<div className=" h-screen w-screen fixed dark:bg-[#181a20] bg-white">
				<div className="w-full z-10">
					<div className="flex border-b w-full dark:bg-[#1e2129] bg-white justify-between items-center px-5 h-[70px]">
						<div className="text-[#555555] dark:text-white pn:max-sm:hidden text-xl font-semibold">
							Set up a new Ad
						</div>
						<div className="text-[#555555] dark:text-white sm:hidden text-xl font-semibold">
							Ad SetUp
						</div>
						<div className="flex justify-center sm:pt-2 items-center sm:gap-3">
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
					<div className="flex border-b justify-center pl-16 sm:pl-0 dark:bg-[#1e2129] h-[50px] bg-white items-center">


						<ol class="flex items-center justify-center px-3 sm:mt-0 w-full max-w-[800px] text-sm font-medium text-center text-gray-500 dark:text-gray-400 sm:text-base">

							<li class={`flex md:w-full ${step >= 1 ? "text-green-900 dark:text-green-600" : "dark:text-blue-500 text-blue-600"} items-center after:content-[''] after:w-full after:h-1 after:border-b after:border-gray-200 after:border-1 after:hidden sm:after:inline-block after:mx-6 xl:after:mx-10 dark:after:border-gray-700`}>
								<span class="flex items-center after:content-['/'] min-w-[117px] sm:after:hidden after:mx-2 after:text-gray-200 dark:after:text-gray-500">
									{step >= 1 ? <svg class="w-3.5 h-3.5 sm:w-4 sm:h-4 me-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
										<path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
									</svg> : <div className="w-5 h-5 rounded-full bg-blue-600 text-white mr-1 text-xs flex justify-center items-center">1</div>}

									Set up Ads
								</span>
							</li>
							<li class={`flex md:w-full items-center   sm:after:content-[''] after:w-full after:h-1 after:border-b after:border-gray-200 after:border-1 after:hidden sm:after:inline-block after:mx-6 xl:after:mx-10 dark:after:border-gray-700 ${step >= 2 ? "text-green-900 dark:text-green-600" : "dark:text-blue-500 text-blue-600"} `}>
								<span class="flex items-center after:content-['/'] sm:after:hidden after:mx-2 after:text-gray-200 dark:after:text-gray-500">
									{step >= 2 ? <svg class="w-3.5 h-3.5 sm:w-4 sm:h-4 me-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
										<path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
									</svg> : <div className="w-5 h-5 rounded-full bg-blue-600 text-white mr-1 text-xs flex justify-center items-center">2</div>}

									Select <span class="hidden sm:inline-flex sm:ms-2">Target</span>
								</span>
							</li>
							<li class="flex items-center text-blue-500 min-w-[200px]">
								{step >= 3 ? <svg class="w-3.5 h-3.5 sm:w-4 sm:h-4 me-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
									<path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
								</svg> : <div className="sm:w-5 sm:h-5 w-4 h-4 rounded-full bg-blue-600 text-white mr-1 text-xs flex justify-center items-center">3</div>}
								Preview & Launch
							</li>
						</ol>


					</div>
				</div>
				<div className="h-[100%] z-40 bg-white  dark:bg-red-600">

					{children}
				</div>
			</div >
		</>
	)

}