"use client"
import Link from "next/link";
import { AiFillLock } from "react-icons/ai";
import { BsCheckLg } from "react-icons/bs";
import { useSelector } from "react-redux";

export default function registerLayout({ children }) {
	const change = useSelector((state) => state.register.change)
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

								<span className={`${change > 2 ? "text-green-600" : change == 2 ? "text-blue-500" : "text-white"} text-xs pp:text-base`}>Provide your basic info</span>

							</li>

							<li className="relative flex justify-end">
								<span className="absolute -bottom-[1.75rem] -end-1 rounded-full bg-gray-600 text-white">
									{/* {a ? <BsCheckLg className="w-6 h-6 p-[5px]" />
											: */}
									{change == 3 ? <div className="w-6 h-6 rounded-full bg-blue-600 text-sm flex justify-center items-center">3</div> : <div className="w-6 h-6 rounded-full bg-white text-black text-sm flex justify-center items-center">3</div>}
									{/* } */}
								</span>
								<span className={`text-white text-xs pp:text-base`}>Verify your Details</span>
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
