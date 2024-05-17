"use client"
import useAdFetching from '@/app/useFetch/useAdFetching';
// import { getData } from '@/app/utils/useful';
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation';
import Fetch from '@/app/component/Fetch';
import Pagination from '@/app/component/Pagination';
import Loader from '@/app/component/Loader';
import { useAuthContext } from '@/app/utils/AuthWrapper';
import d2 from "../assests/d2.png";
import d3 from "../assests/d3.png";
import d4 from "../assests/d4.png";
import d1 from "../assests/d1.png";
import { setAdvertiserid, setFullname, setImage, setUserid } from '@/app/redux/slice/dataSlice';
import { useDispatch, useSelector } from 'react-redux';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';
import Image from 'next/image';
import axios from 'axios';
import { API } from '@/Essentials';

const AdsOrganisation = () => {
	const [campdata, setCampdata] = useState([]);
	const router = useRouter()
	// const { data?.advid } = getData()
	const { data } = useAuthContext()
	const advertiserid = useSelector((state) => state.data.advertiserid)
	const fullname = useSelector((state) => state.data.fullname)
	const image = useSelector((state) => state.data.image)
	const dispatch = useDispatch()
	const [state, setState] = useState("")
	const [toggle, setToggle] = useState(false)
	const [dp, setDp] = useState("")
	const { CampaignFetch } = useAdFetching()
	const [loading, setLoading] = useState(true)
	const [currentbalance, setCurrentBalance] = useState(null)
	const [currentPage, setCurrentPage] = useState(1);
	const [postPerPage, setPostPerPage] = useState(5);
	const lastindex = currentPage * postPerPage;
	const firstIndex = lastindex - postPerPage;
	const postperData = campdata?.slice(firstIndex, lastindex);
	const [adsData, setAdsData] = useState([])
	const [activeData, setActiveData] = useState({
		totalspent: 0,
		totalads: ""
	})


	const fetchDataO = async (id) => {
		try {
			const res = await axios.get(`${API}/fetchdashboardO/${id}/${data.advid}`);
			if (res?.data?.success) {
				console.log(res.data, "dat")
				setCurrentBalance(res.data.currentbalance)
				setAdsData(res.data.data)
				res.data.data.map((d) => {
					if (d?.id == advertiserid) {
						setActiveData({ ...activeData, totalads: d?.totalads, totalspent: d?.totalSpent })
					}
				})

			}
		} catch (e) {
			console.log(e);
		}
	};


	console.log(currentbalance, activeData)

	const fetchData = async () => {
		try {
			const datas = await CampaignFetch(advertiserid)
			setCampdata(datas)
			setLoading(false)
		} catch (error) {
			console.log(error)
		} finally {
			setLoading(false)
		}

	}

	useEffect(() => {
		setState(fullname)
		setDp(image)
	}, [advertiserid])

	useEffect(() => {
		if (advertiserid) {
			// setLoading(true)
			fetchData()
			fetchDataO(advertiserid)
		}
	}, [advertiserid])

	useEffect(() => {
		if (data) {
			setState(data?.manageusers[0].fullname)
			setDp(data?.manageusers[0].image)
			dispatch(setAdvertiserid(data?.manageusers[0].id))
			dispatch(setFullname(data?.manageusers[0].fullname))
			dispatch(setImage(data?.manageusers[0].image))
			dispatch(setUserid(data?.manageusers[0].userid))
		}
	}, [data])

	if (loading) {
		return <Loader />
	}

	return (
		<>
			<div className='dark:bg-[#141414] h-[100vh]'>

				{/* <div className="p-3 w-full grid md:grid-cols-4 pn:max-md:gap-2  gap-10 grid-cols-2 rounded-xl">
					<div className="bg-white dark:bg-[#0D0D0D] py-3 sm:px-8 rounded-2xl">
						<div className="flex gap-2 items-center">
							<div>
								<Image src={d1} className="w-[60px]" />
							</div>
							<div className="flex flex-col justify-center h-full gap-2 ">
								<div className="font-semibold">Accounts</div>
								<div className="flex flex-col w-full min-w-[130px] bg-[#f7f7f7] dark:bg-[#121212]  rounded-xl">
									<div
										onClick={() => setToggle(!toggle)}
										className="flex justify-between items-center relative p-1.5 cursor-pointer h-full gap-2 px-2 w-full text-sm"
									>
										<div className="flex items-center gap-2">
											<div>
												<img
													src={dp}
													className="max-w-[30px] bg-[#f8f8f8] dark:bg-[#181c24] rounded-lg min-h-[30px] min-w-[30px] max-h-[30px]"
												/>
											</div>
											<div className="text-[#0d0d0d] text-xs dark:text-white font-semibold">
												{state}
											</div>
										</div>

										<div className="text-lg ">
											{toggle ? (
												<IoIosArrowUp onClick={() => setToggle(!toggle)} />
											) : (
												<IoIosArrowDown onClick={() => setToggle(!toggle)} />
											)}
										</div>

										<div
											className={` ${toggle
												? "top-[45px]"
												: "top-0 border-none text-[0px] w-[0px] h-[0px]"
												} absolute left-0 bg-[#f7f7f7] duration-100 dark:bg-[#121212] rounded-xl z-50 w-full`}
										>
											<div className="flex flex-col gap-3 px-2 py-1 max-h-[300px] overflow-y-scroll no-scrollbar">

												{data?.manageusers?.map((d, i) => (
													<div
														onClick={() => {
															dispatch(setAdvertiserid(d?.id))
															dispatch(setUserid(d?.userid))
															dispatch(setFullname(d?.lastname ? d?.fullname : d?.firstname))
															dispatch(setImage(d?.image))
															setDp(d?.image)
															setState(d?.lastname ? d?.fullname : d?.firstname)
															setToggle(false);
														}}
														key={i}
														className="flex gap-2 py-1 items-center w-full rounded-lg light:hover:bg-[#ffffff]"
													>
														<div className="">
															<img
																src={d?.image}
																className={`${toggle
																	? "max-w-[30px] bg-[#f8f8f8] dark:bg-[#181c24] rounded-lg min-h-[30px] min-w-[30px] max-h-[30px]"
																	: "w-0 h-0"
																	} duration-100`}
																alt="image"
															/>
														</div>
														<div className="flex flex-col">
															<div className={`text-xs ${toggle ? "" : " hidden"}`}>
																{d?.lastname ? d?.fullname : d?.firstname}
															</div>
														</div>
													</div>
												))}
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>


				</div> */}


				<div className="p-3 w-full grid md:grid-cols-4 pn:max-md:gap-2 gap-10 grid-cols-2 rounded-xl">
					<div className="bg-white dark:bg-[#0D0D0D] h-[100px]  rounded-2xl">
						<div className="flex gap-2 items-center justify-start pl-6 h-full">
							<div>
								{/* <Image src={d1} /> */}
								<img src={dp} alt="" className="min-w-[60px] min-h-[60px] max-w-[60px] max-h-[60px] dark:bg-[#181c24] rounded-3xl" />
							</div>
							<div className="flex flex-col justify-center h-full gap-2 ">
								<div className="font-semibold">Accounts</div>
								<div className="flex flex-col w-full min-w-[130px] bg-[#f7f7f7] dark:bg-[#121212] rounded-xl">
									<div
										onClick={() => setToggle(!toggle)}
										className="flex justify-between items-center relative p-1.5 cursor-pointer h-full gap-2 px-2 w-full text-sm"
									>
										<div className="flex items-center gap-2">
											{/* <div>
                          <img
                            src={dp}
                            className="max-w-[30px] bg-[#f8f8f8] dark:bg-[#181c24] rounded-lg min-h-[30px] min-w-[30px] max-h-[30px]"
                          />
                        </div> */}
											<div className="text-[#0d0d0d] text-xs dark:text-white font-semibold">
												{state}
											</div>
										</div>

										<div className="text-lg ">
											{toggle ? (
												<IoIosArrowUp onClick={() => setToggle(!toggle)} />
											) : (
												<IoIosArrowDown onClick={() => setToggle(!toggle)} />
											)}
										</div>

										<div
											className={` ${toggle
												? "top-[45px]"
												: "top-0 border-none text-[0px] w-[0px] h-[0px]"
												} absolute left-0 bg-[#f7f7f7] duration-100 dark:bg-[#121212] rounded-xl z-50 w-full`}
										>
											<div className="flex flex-col gap-3 px-2 py-1 max-h-[300px] overflow-y-scroll no-scrollbar">
												{data?.manageusers?.map((d, i) => (
													<div
														onClick={() => {
															dispatch(setAdvertiserid(d?.id));
															dispatch(setUserid(d?.userid));
															dispatch(
																setFullname(
																	d?.lastname ? d?.fullname : d?.firstname
																)
															);
															adsData.map((f) => {
																if (f?.id === d?.id) {
																	setActiveData({ ...activeData, totalads: f?.totalads, totalspent: f?.totalSpent })
																}
															})
															dispatch(setImage(d?.image));
															setDp(d?.image);
															setState(
																d?.lastname ? d?.fullname : d?.firstname
															);
															setToggle(false);
														}}
														key={i}
														className="flex gap-2 py-1 items-center w-full rounded-lg light:hover:bg-[#ffffff]"
													>
														<div className="">
															<img
																src={d?.image}
																className={`${toggle
																	? "max-w-[30px] bg-[#f8f8f8] dark:bg-[#181c24] rounded-lg min-h-[30px] min-w-[30px] max-h-[30px]"
																	: "w-0 h-0"
																	} duration-100`}
																alt="image"
															/>
														</div>
														<div className="flex flex-col">
															<div
																className={`text-xs ${toggle ? "" : " hidden"
																	}`}
															>
																{d?.lastname ? d?.fullname : d?.firstname}
															</div>
														</div>
													</div>
												))}
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>

					{/* <div className="flex justify-center w-full max-h-[100px] items-center pn:max-sm:rounded-md sm:max-md:rounded-xl gap-2 sm:gap-5 p-2 sm:p-3  bg-maincolor md:border-r-2">
								<div className="h-[50px] w-[50px] bg-blue-500 rounded-full flex justify-center items-center p-3" >
									<FaWallet className="h-[35px] w-[35px]" />
								</div>

								<div className="flex flex-col text-xs w-full sm:w-auto justify-center">
									<div>Current Balance</div>
									<div className="sm:text-xl text-base font-semibold">
										{data?.currentbalance ? "₹" + data?.currentbalance : "₹0"}
									</div>
								</div>
							</div> */}

					<div className="bg-white dark:bg-[#0D0D0D] h-[100px]  rounded-2xl">
						<div className="flex gap-2 items-center justify-start pl-6 h-full">
							<div>
								<Image src={d3} className="w-[60px]" />
							</div>
							<div className="flex flex-col justify-center h-full ">
								<div className="font-semibold">Total Spent</div>
								<div className="text-lg pt-[2px] font-semibold">
									{activeData.totalspent
										? "₹" + activeData.totalspent
										: "₹0.00"}
								</div>
							</div>
						</div>
					</div>

					<div className="bg-white dark:bg-[#0D0D0D] h-[100px]  rounded-2xl">
						<div className="flex gap-2 items-center justify-start pl-6 h-full">
							<div>
								<Image src={d2} className="w-[60px]" />
							</div>
							<div className="flex flex-col justify-center h-full ">
								<div className="font-semibold">Current balance</div>
								<div className="text-lg pt-[3px] font-semibold">
									{currentbalance
										? "₹" + currentbalance
										: "₹0.00"}
								</div>
							</div>
						</div>
					</div>

					{/* <div className="flex justify-center max-h-[100px] items-center gap-2 pn:max-sm:rounded-md sm:max-md:rounded-xl sm:gap-5 p-2 sm:p-3  bg-maincolor md:border-r-2">
								<div>
									<Image
										src={dashp2}
										alt="dashp2"
										priority={true}
										className="pp:min-w-[50px] h-[30px] w-[30px] pp:min-h-[50px]"
									/>
								</div>
								<div className="flex flex-col text-xs justify-center">
									<div>Total Conversion</div>
									<div className="sm:text-xl text-sm font-semibold">
										{adValues.conversion
											? parseFloat(adValues.conversion).toFixed(1) + "%"
											: "No Data Yet"}
									</div>
								</div>
							</div> */}
					{/* <div className="flex sm:justify-center max-h-[100px] items-center p-2 sm:p-3 pn:max-sm:rounded-md sm:max-md:rounded-xl gap-2 sm:gap-5 md:rounded-tr-2xl md:rounded-br-2xl bg-maincolor ">
								<div className="flex flex-col ml-3 text-xs">
									<div>Ad Popularitiy</div>
									<div className="sm:text-xl text-sm font-semibold">
										{adValues.popularity ? parseFloat(adValues.popularity).toFixed(1) + "%" : "No Data Yet"}
									</div>
								</div>
								<div>
									<Image
										src={graph2}
										alt="pic"
										className="pp:min-w-[50px] h-[30px] w-[30px] pp:min-h-[50px]"
									/>
								</div>
							</div> */}

					<div className="bg-white dark:bg-[#0D0D0D] h-[100px] rounded-2xl">
						<div className="flex gap-2 items-center justify-start pl-6 h-full">
							<div>
								<Image src={d4} className="w-[60px]" />
							</div>
							<div className="flex flex-col justify-center h-full ">
								<div className="font-semibold">Total campaign</div>
								<div className="text-lg pt-[3px] font-semibold">
									{activeData.totalads}
								</div>
							</div>
						</div>
					</div>
				</div>


				<Fetch data={postperData} length={campdata.length} router={router} />
				{campdata?.length > postPerPage && <Pagination
					postPerPage={postPerPage}
					setCurrentPage={setCurrentPage}
					currentPage={currentPage}
					firstIndex={firstIndex}
					lastindex={lastindex}
					length={campdata.length}
				/>
				}
			</div>



		</>
	)
}

export default AdsOrganisation

