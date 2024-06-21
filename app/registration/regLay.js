"use client"
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { AiFillLock } from "react-icons/ai";
import { BsCheckLg } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { setChange } from "../redux/slice/registerSlice";

export default function registerLayout({ children }) {
	const change = useSelector((state) => state.register.change)
	const router = useRouter()
	const params = useSearchParams()
	const dispatch = useDispatch()

	useEffect(() => {
		if (params.get("step")) {
			dispatch(setChange(Number(params.get("step"))))
		}
	}, [params])

	if (change != 2 && change != 1 && change != 3) {
		return (
			<section className="bg-white dark:bg-gray-900 ">
				<div className="container flex items-center min-h-screen px-6 py-12 mx-auto">
					<div>
						<p className="text-sm font-medium text-blue-500 dark:text-blue-400">
							404 error
						</p>
						<h1 className="mt-3 text-2xl font-semibold text-gray-800 dark:text-white md:text-3xl">
							We can’t find that page
						</h1>
						<p className="mt-4 text-gray-500 dark:text-gray-400">
							Sorry, the page you are looking for doesn't exist or has been
							moved.
						</p>

						<div className="flex items-center mt-6 gap-x-3">
							<div
								onClick={() => {
									router.push("/registration?step=1")
								}}
								className="flex items-center justify-center w-1/2 px-5 py-2 text-sm text-gray-700 transition-colors duration-200 bg-white border rounded-lg gap-x-2 sm:w-auto dark:hover:bg-gray-800 dark:bg-gray-900 hover:bg-gray-100 dark:text-gray-200 dark:border-gray-700"
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									stroke-width="1.5"
									stroke="currentColor"
									className="w-5 h-5 rtl:rotate-180"
								>
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18"
									/>
								</svg>

								<span>Go back</span>
							</div>

							<Link
								href="/main/dashboard"
								className="w-1/2 px-5 py-2 text-sm tracking-wide text-white transition-colors duration-200 bg-blue-500 rounded-lg shrink-0 sm:w-auto hover:bg-blue-600 dark:hover:bg-blue-500 dark:bg-blue-600"
							>
								Take me home
							</Link>
						</div>
					</div>
				</div>
			</section>
		);
	}
	return (
		<>
			<div className="min-h-screen flex justify-center items-center flex-col bg-maincolor w-full">
				<div className="pt-4">
					<h1 className="text-center text-3xl font-semibold  pt-2 pb-1">
						Create an account
					</h1>
					<h1 className="text-center">
						Already have an account?
						<Link href="/login" className="underline pl-1">
							Log in
						</Link>
					</h1>
					<div className="px-4">
						<div className="flex justify-center gap-3 rounded-lg sm:my-7 my-4 items-center sm:p-3 p-2 py-4 bg-maincolor border border-border bg-[#fafafa]">
							<AiFillLock className="text-3xl" />
							<div>
								We take privacy issues seriously. You can be sure that your
								personal data is securely protected.
							</div>
						</div>
					</div>
				</div>
				<div className=" bg-maincolor">
					<div className="after:mt-4 mb-7 after:block after:h-[0.5px] min-w-[78%] sm:min-w-[600px] after:w-full after:rounded-lg after:bg-[#ccc]">
						<ol className="grid grid-cols-3 font-medium text-sm text-gray-500">
							<li className="relative flex justify-start ">

								<span className="absolute -bottom-[1.75rem] -start-1 rounded-full bg-green-600 text-white">
									{change > 1 ? <BsCheckLg className="w-6 h-6 p-[5px]" /> : <div className="w-6 h-6 rounded-full bg-blue-600 text-sm flex justify-center items-center">1</div>
									}
								</span>
								<span className={`${change > 1 ? "text-green-600" : "text-blue-500 "}  text-xs pp:text-base`}>Select Your Type</span>
							</li>

							<li className="relative flex justify-center text-green-600">
								<span
									className="absolute -bottom-[1.75rem] left-1/2 -translate-x-1/2 rounded-full bg-green-600 text-white"
								>
									{change > 2 ? <BsCheckLg className="w-6 h-6 p-[5px]" /> : change == 2 ? <div className="w-6 h-6 rounded-full bg-blue-600 text-sm flex justify-center items-center">2</div> : <div className="w-6 h-6 rounded-full bg-white text-black text-sm flex justify-center items-center">2</div>}
								</span>

								<span className={`${change > 2 ? "text-green-600" : change == 2 ? "text-blue-500" : " text-gray-500 dark:text-white"} text-xs pp:text-base`}>Provide your basic info</span>

							</li>

							<li className="relative flex justify-end">
								<span className="absolute -bottom-[1.75rem] -end-1 rounded-full bg-gray-600 text-white">
									{/* {a ? <BsCheckLg className="w-6 h-6 p-[5px]" />
											: */}
									{change == 3 ? <div className="w-6 h-6 rounded-full bg-blue-600 text-sm flex justify-center items-center">3</div> : <div className="w-6 h-6 rounded-full bg-white text-black text-sm flex justify-center items-center">3</div>}
									{/* } */}
								</span>
								<span className={`dark:text-white text-xs pp:text-base`}>Verify your Details</span>
							</li>
						</ol>
					</div>
				</div>
				<div className={`w-full ${change ? " max-w-3xl" : "max-w-5xl"} z-50`}>
					{children}
				</div>
			</div >

		</>
	)
}
