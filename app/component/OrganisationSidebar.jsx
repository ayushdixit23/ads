"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { LuWallet2 } from "react-icons/lu";
import { useAuthContext } from "../utils/AuthWrapper";
// import { getData } from "../utils/useful";
import Logo from "../assests/Logo.png"
import { MdOutlineCampaign, MdSupervisorAccount } from "react-icons/md";
import { IoChevronDown, IoPersonAdd } from "react-icons/io5";
import Image from "next/image"
import LoginAccount from "./LoginAccount";
import AddAccount from "./AddAccount";
import { useDispatch, useSelector } from "react-redux";
import { setAdvertiserid, setFullname, setImage, setUserid } from "../redux/slice/dataSlice";

const OSidebar = () => {
	// const { image, firstname, lastname } = getData()
	const { data } = useAuthContext()
	const dispatch = useDispatch()
	const image = useSelector((state) => state.data.image)
	const fullname = useSelector((state) => state.data.fullname)
	const [open, setOpen] = useState(false)
	const [pop, setPop] = useState(false)
	const [login, setLogin] = useState(true)

	return (
		<>

			{
				pop && <div className="fixed inset-0 w-screen h-screen bg-black/60 backdrop-blur-md z-50 flex justify-center items-center">
					<div className="flex justify-center items-center w-[40%] bg-white dark:bg-maincolor rounded-lg">
						{
							login ? <LoginAccount setLogin={setLogin} setPop={setPop} login={login} /> : <AddAccount setLogin={setLogin} login={login} setPop={setPop} />
						}
					</div>
				</div>
			}

			<aside className="flex flex-col pn:max-sm:hidden sm:w-24 md:w-[268px] h-[100%] px-4 py-8 overflow-y-auto bg-white border-r rtl:border-r-0 rtl:border-l dark:bg-[#0D0D0D] dark:border-gray-700">
				{/* <a href="#">
          <img className="w-auto h-6 sm:h-7" src="https://merakiui.com/images/logo.svg" alt="" />
        </a> */}

				{/* <div className="flex items-center py-2 gap-2 text-2xl">
					<Image src={Logo} className="w-[50px] h-[50px]" alt="adspace" />
					<span className="sm:max-md:hidden font-medium">Adspace</span>
				</div> */}

				{/* <div className="relative mt-6">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3">
            <svg className="w-5 h-5 text-gray-400" viewBox="0 0 24 24" fill="none">
              <path d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
            </svg>
          </span>

          <input type="text" className="w-full py-2 pl-10 pr-4 text-gray-700 bg-white border rounded-md dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring" placeholder="Search" />
        </div> */}

				<div className="flex flex-col justify-between flex-1 mt-16">
					<nav>
						<Link className="flex items-center px-4 py-2 mt-5 text-gray-600 transition-colors duration-300 transform rounded-md dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700" href="/main/dashboard">
							<svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
								<path
									d="M19 11H5M19 11C20.1046 11 21 11.8954 21 13V19C21 20.1046 20.1046 21 19 21H5C3.89543 21 3 20.1046 3 19V13C3 11.8954 3.89543 11 5 11M19 11V9C19 7.89543 18.1046 7 17 7M5 11V9C5 7.89543 5.89543 7 7 7M7 7V5C7 3.89543 7.89543 3 9 3H15C16.1046 3 17 3.89543 17 5V7M7 7H17"
									stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
							</svg>

							<span className="mx-4 sm:max-md:hidden font-medium">Dashboard</span>
						</Link>

						{/* <Link className="flex items-center px-4 py-2 mt-5 text-gray-600 transition-colors duration-300 transform rounded-md dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700" href="/main/community">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M15 5V7M15 11V13M15 17V19M5 5C3.89543 5 3 5.89543 3 7V10C4.10457 10 5 10.8954 5 12C5 13.1046 4.10457 14 3 14V17C3 18.1046 3.89543 19 5 19H19C20.1046 19 21 18.1046 21 17V14C19.8954 14 19 13.1046 19 12C19 10.8954 19.8954 10 21 10V7C21 5.89543 20.1046 5 19 5H5Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
              </svg>

              <span className="mx-4 sm:max-md:hidden font-medium">Community</span>
            </Link> */}


						<Link href="/main/ads" className="flex items-center px-4 py-2 mt-5 text-gray-600 transition-colors duration-300 transform rounded-md dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700" >
							{/* <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
								<path d="M16 7C16 9.20914 14.2091 11 12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
								<path d="M12 14C8.13401 14 5 17.134 5 21H19C19 17.134 15.866 14 12 14Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
							</svg> */}

							<MdOutlineCampaign className="w-5 h-5" />

							<span className="mx-4 sm:max-md:hidden font-medium">Ads</span>
						</Link>

						<hr className="my-6 border-gray-200 dark:border-gray-600" />

						<div onClick={() => setOpen(!open)} className="flex relative justify-between items-center px-4 py-2 mt-5 text-gray-600 transition-colors duration-300 transform rounded-md dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700" >
							{/* <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
								<path d="M16 7C16 9.20914 14.2091 11 12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
								<path d="M12 14C8.13401 14 5 17.134 5 21H19C19 17.134 15.866 14 12 14Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
							</svg> */}
							<div className="flex justify-center items-center gap-2">
								<MdSupervisorAccount className="w-5 h-5" />
								<span className="sm:max-md:hidden text-[14px] font-medium">Manage Acounts</span>
							</div>
							<IoChevronDown />
							{open && <div className="absolute bg-white py-3 duration-500 dark:bg-maincolor shadow-lg w-full z-50 rounded-md top-10 left-0">
								<div className="flex flex-col z-30 gap-2 rounded-md">
									{data?.manageusers?.map((d, i) => (
										<Link
											// href={`/createAd?brand=${d?.lastname ? d?.fullname : d?.firstname}&userid=${d?.userid}&advid=${d?.id}&image=${d?.image}&step=1`}
											onClick={() => {
												dispatch(setAdvertiserid(d?.id))
												dispatch(setUserid(d?.userid))
												dispatch(setFullname(d?.lastname ? d?.fullname : d?.firstname))
												dispatch(setImage(d?.image))
											}}
											href={`/main/dashboard/${d?.id}`}
											key={i} className="flex gap-2 px-4 dark:text-gray-400 hover:bg-gray-100 rounded-md dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700 py-2 transition-colors duration-300 transform items-center">
											<div>
												<img src={d?.image} className="w-[24px] rounded-xl h-[24px]" />
											</div>
											<div className="text-sm font-semibold">{d?.lastname ? d?.fullname : d?.firstname}</div>
										</Link>
									))}
								</div>
								<div onClick={() => setPop(true)} className="flex gap-2 px-4 text-xs py-2 dark:text-gray-400 hover:bg-gray-100 rounded-md dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700 transition-colors duration-300 transform items-center">
									<div><IoPersonAdd /></div>
									<div>Add Account</div>
								</div>
							</div>}

						</div>

						{(fullname && image) && <div className={`flex items-center px-4 py-2 mt-5 text-gray-600 ${open ? null : "transition-colors duration-300 transform"}  rounded-md dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700`} >
							<img src={`${image}`} className="w-[24px] rounded-xl h-[24px]" alt="user" />

							<span className="mx-4 sm:max-md:hidden font-medium">{fullname}</span>
						</div>}


						{/* <div className="flex justify-center items-center gap-2 flex-col">
							<div>Manage Acounts</div>
							<div className="flex flex-col gap-2">{data?.manageusers?.map((d, i) => (
								<Link

									// href={`/createAd?brand=${d?.lastname ? d?.fullname : d?.firstname}&userid=${d?.userid}&advid=${d?.id}&image=${d?.image}&step=1`}
									href={`/main/dashboard/${d?.id}`}
									key={i} className="flex gap-2 items-center">
									<div>
										<img src={d?.image} className="w-[34px] rounded-xl h-[34px]" />
									</div>
									<div>{d?.lastname ? d?.fullname : d?.firstname}</div>
								</Link>
							))}</div>
							<Link href={"/addAccount"}>Add Account</Link>
						</div> */}


						<Link className={`flex items-center px-4 py-2 mt-5 text-gray-600 ${open ? null : "transition-colors duration-300 transform"}  rounded-md dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700`} href="/main/wallet">
							<LuWallet2 />

							<span className="mx-4 sm:max-md:hidden font-medium">Wallet</span>
						</Link>

						{/* <hr className="my-6 border-gray-200 dark:border-gray-600" /> */}

						{/* <a className="flex items-center px-4 py-2 mt-5 text-gray-600 transition-colors duration-300 transform rounded-md dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700" href="#">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M15 5V7M15 11V13M15 17V19M5 5C3.89543 5 3 5.89543 3 7V10C4.10457 10 5 10.8954 5 12C5 13.1046 4.10457 14 3 14V17C3 18.1046 3.89543 19 5 19H19C20.1046 19 21 18.1046 21 17V14C19.8954 14 19 13.1046 19 12C19 10.8954 19.8954 10 21 10V7C21 5.89543 20.1046 5 19 5H5Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
              </svg>

              <span className="mx-4 font-medium">Tickets</span>
            </a> */}
						<Link className={`flex items-center px-4 py-2 mt-5 text-gray-600 ${open ? null : "transition-colors duration-300 transform"}  rounded-md dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700`} href={"/setting"}>
							<svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
								<path d="M10.3246 4.31731C10.751 2.5609 13.249 2.5609 13.6754 4.31731C13.9508 5.45193 15.2507 5.99038 16.2478 5.38285C17.7913 4.44239 19.5576 6.2087 18.6172 7.75218C18.0096 8.74925 18.5481 10.0492 19.6827 10.3246C21.4391 10.751 21.4391 13.249 19.6827 13.6754C18.5481 13.9508 18.0096 15.2507 18.6172 16.2478C19.5576 17.7913 17.7913 19.5576 16.2478 18.6172C15.2507 18.0096 13.9508 18.5481 13.6754 19.6827C13.249 21.4391 10.751 21.4391 10.3246 19.6827C10.0492 18.5481 8.74926 18.0096 7.75219 18.6172C6.2087 19.5576 4.44239 17.7913 5.38285 16.2478C5.99038 15.2507 5.45193 13.9508 4.31731 13.6754C2.5609 13.249 2.5609 10.751 4.31731 10.3246C5.45193 10.0492 5.99037 8.74926 5.38285 7.75218C4.44239 6.2087 6.2087 4.44239 7.75219 5.38285C8.74926 5.99037 10.0492 5.45193 10.3246 4.31731Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
								<path d="M15 12C15 13.6569 13.6569 15 12 15C10.3431 15 9 13.6569 9 12C9 10.3431 10.3431 9 12 9C13.6569 9 15 10.3431 15 12Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
							</svg>

							<span className="mx-4 sm:max-md:hidden font-medium">Settings</span>
						</Link>
					</nav>

					<div className="flex gap-1 items-center px-4 -mx-2">
						<img className="object-cover mx-2 rounded-full h-9 w-9" src={data?.image} alt="avatar" />
						<span className="font-medium text-gray-800  sm:max-md:hidden dark:text-gray-200">{data?.firstname + " " + data?.lastname}</span>
					</div>
				</div>
			</aside >
		</>
	);
};

export default OSidebar;
