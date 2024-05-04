import React, { useState } from 'react'
import styles from "../CustomScrollbarComponent.module.css";
import { AiFillCheckCircle, AiOutlinePlus, AiOutlineClose } from 'react-icons/ai';
import { BiMap } from 'react-icons/bi';
import Square3 from '../component/Square3';
import feed from "../assests/feed.svg";
import video from "../assests/video.svg";
import search from "../assests/search.svg";
import banner from "../assests/banner.png";
import skip from "../assests/skip.png";
import nonskip from "../assests/nonskip.png";
import Image from 'next/image';
import { formatDate, formatDateToString } from '../utils/useful';
import { IoMdPricetags } from "react-icons/io";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Toaster, toast } from "sonner"

const Ad2 = ({
	setCLick,
	setThree,
	dispatch,
	setT,
	three,
	date,
	setDate,
	PointsCategory,
	handleCheckboxClick,
	handleCategoryChange,
	inputValue,
	setInputValue,
	myAgeHandle,
	click,
	handleAgeRangeChange,
	ProperAudience,
	ctr,
	pricebyDay,
	totalPrice,
	myLocation,
	t,

}) => {
	const [open, setOpen] = useState(false)
	console.log(formatDateToString(three.startDate))
	console.log(formatDateToString(three.endDate))
	return (
		<>
			<Toaster position="bottom-right" />
			<div className="flex justify-center dark:bg-[#181a20] bg-[#f1f1f1] w-full sm:fixed h-[87%] gap-9 px-[2%] pn:max-md:hidden">
				<div
					className={`${styles.customScrollbar} pn:max-md:hidden md:w-[900px] w-full overflow-y-scroll dark:bg-[#1e2129] bg-[#F0F2F5]  my-4 rounded-2xl py-5 px-2`}
				>
					<h1 className="sm:text-3xl text-xl font-semibold py-2 px-3">
						Select Target
					</h1>
					<div className="bg-maincolor my-3 px-[2%] select-none py-2 rounded-xl ">
						<h2 className="sm:text-xl text-lg font-semibold py-2">
							Select Optimal section for effective advertising
						</h2>
						<div className="flex flex-wrap gap-3 my-4">
							<div
								onClick={() => {

									dispatch(setThree({ type: "infeed" }));
									setOpen(false)
								}}
								className={` flex flex-col justify-center border relative  p-2 z-0  items-center min-w-[150px] max-w-[250px] rounded-lg ${three.type.includes("infeed")
									? "border-[#4C9AFF]  bg-[#3e84e4]/10"
									: ""
									}`}
							>
								<div>
									<Image
										src={feed}
										className="w-[90px] h-[90px]"
										alt="infeed"
									/>
								</div>
								<div className="font-medium py-2">In Feed Ads</div>
								{three.type.includes("infeed") && (
									<div className={`absolute -top-2 -right-2 z-50`}>
										<AiFillCheckCircle className="text-blue-600 z-50 text-xl" />
									</div>
								)}
							</div>
							{/* <div
											onClick={() => { dispatch(setThree({ type: "search" })); setOpen(false) }}
											className={` flex flex-col justify-center border relative  p-2 z-0 items-center min-w-[150px] max-w-[250px] rounded-lg ${three.type.includes("search")
												? "border-[#4C9AFF]  bg-[#3e84e4]/10"
												: ""
												}`}
										>
											<div>
												<Image
													src={video}
													className="w-[90px] h-[90px]"
													alt="search"
												/>
											</div>
											<div className="font-medium py-2">Search</div>
											{three.type.includes("search") && (
												<div className={`absolute -top-2 -right-2`}>
													<AiFillCheckCircle className="text-blue-600 text-xl" />
												</div>
											)}
										</div> */}
							<div
								onClick={() => { setOpen(!open); dispatch(setThree({ type: "" })) }}
								className={` flex flex-col justify-center border relative  p-2 z-0  items-center min-w-[150px] max-w-[250px] rounded-lg ${open
									? "border-[#4C9AFF]  bg-[#3e84e4]/10"
									: ""
									}`}
							>
								<div>
									<Image
										src={search}
										className="w-[90px] h-[90px]"
										alt="video"
									/>
								</div>{" "}
								<div className="font-medium py-2">Video Ads</div>
								{three.type.includes("videoads") && (
									<div className={`absolute -top-2 -right-2`}>
										<AiFillCheckCircle className="text-blue-600 text-xl" />
									</div>
								)}
							</div>

							<div

								onClick={() => {
									if (three.isImage) {
										dispatch(setThree({ type: "banner" })); setOpen(false)
									} else {
										toast.error("Banner Ads should contain image!")
									}
								}}
								className={` flex flex-col justify-center border relative  p-2 z-0  items-center min-w-[150px] max-w-[250px] rounded-lg ${three.type.includes("banner")
									? "border-[#4C9AFF]  bg-[#3e84e4]/10"
									: ""
									}`}
							>
								<div>
									<Image
										src={banner}
										className="w-[90px] h-[90px]"
										alt="video"
									/>
								</div>{" "}
								<div className="font-medium py-2">Banner Ads</div>
								{three.type.includes("banner") && (
									<div className={`absolute -top-2 -right-2`}>
										<AiFillCheckCircle className="text-blue-600 text-xl" />
									</div>
								)}
							</div>
						</div>
						{open && <div className='flex gap-7 flex-col justify-normal  '>
							<div className='flex items-center mt-3 -mb-3'>Select One of these:-</div>
							<div className='flex gap-3 pb-2 items-center'>
								<><div

									onClick={() => {
										if (three.isImage) {
											toast.error("Videos Ads should contain video!")
										} else {
											dispatch(setThree({ type: "skipable" }))
										}
									}

									}
									className={` flex flex-col justify-center border relative  p-2 z-0  items-center min-w-[150px] max-w-[250px] rounded-lg ${three.type === "skipable"
										? "border-[#4C9AFF]  bg-[#3e84e4]/10"
										: ""
										}`}
								>
									<div>
										<Image
											src={skip}
											className="w-[90px] h-[90px]"
											alt="video"
										/>
									</div>
									<div className="font-medium py-2 text-sm">Skipable Ads</div>
									{three.type === "skipable" && (
										<div className={`absolute -top-2 -right-2`}>
											<AiFillCheckCircle className="text-blue-600 text-xl" />
										</div>
									)}
								</div>
									<div
										onClick={() => {
											if (three.isImage) {
												toast.error("Videos Ads should contain video!")
											} else {
												dispatch(setThree({ type: "non-skipable" }))
											}
										}
										}

										className={` flex flex-col justify-center border relative  p-2 z-0  items-center min-w-[150px] max-w-[250px] rounded-lg ${three.type === "non-skipable"
											? "border-[#4C9AFF]  bg-[#3e84e4]/10"
											: ""
											}`}
									>
										<div>
											<Image
												src={nonskip}
												className="w-[90px] h-[90px]"
												alt="video"
											/>
										</div>
										<div className="font-medium py-2 text-sm">Non Skipable Ads</div>
										{three.type === "non-skipable" && (
											<div className={`absolute -top-2 -right-2`}>
												<AiFillCheckCircle className="text-blue-600 text-xl" />
											</div>
										)}
									</div></>
							</div>
						</div>}

						<div className='text-sm text-black dark:text-white font-semibold'>
							{three.type === "infeed" && "Note: you found this at in the middle of the feed."}
							{three.type === "banner" && "Note: you found this at in the top of the feed."}
							{three.type === "skipable" && "Note: The video ads which can be skipable"}
							{three.type === "non-skipable" && "Note: The video ads which cannot be skipable"}
						</div>

						{(three.type === "infeed" || three.type === "skipable" || three.type === "non-skipable") && <div className='flex flex-col justify-center mb-2'>
							<div className='text-sm font-semibold my-3'>Popularity</div>
							<div className='flex gap-2 items-center'>
								<div onClick={() => dispatch(setThree({ popularity: 1 }))} className={`flex justify-center items-center p-3 px-5 ${three.popularity === 1 ? "bg-blue-600" : "dark:bg-[#181a20] bg-white"} rounded-lg`}>1x</div>
								<div onClick={() => dispatch(setThree({ popularity: 2 }))} className={`flex justify-center items-center p-3 px-5 ${three.popularity === 2 ? "bg-blue-600" : "dark:bg-[#181a20] bg-white"} rounded-lg`}>2x</div>
								<div onClick={() => dispatch(setThree({ popularity: 3 }))} className={`flex justify-center items-center p-3 px-5 ${three.popularity === 3 ? "bg-blue-600" : "dark:bg-[#181a20] bg-white"} rounded-lg`}>3x</div>
								<div onClick={() => dispatch(setThree({ popularity: 4 }))} className={`flex justify-center items-center p-3 px-5 ${three.popularity === 4 ? "bg-blue-600" : "dark:bg-[#181a20] bg-white"} rounded-lg`}>4x</div>
							</div>
							<div className='text-sm mt-2 text-black dark:text-white font-semibold'>
								Note: Speed up your ads by increasing popularity
							</div>
						</div>}


					</div>

					<div className="my-[1%] rounded-xl">
						<div className="py-3 px-[2%] rounded-t-xl bg-maincolor relative">
							<h1 className="text-lg py-1 pb-2 font-medium">Category</h1>
							<Select
								defaultValue='Business & Finance'
								className="dark:text-white dark:bg-[#323b4e] w-full dark:border-none "
								onValueChange={(selectValue) => {
									const data = PointsCategory.find((d) => d.category === selectValue)
									dispatch(setThree({ category: selectValue }))

									handleCategoryChange(
										data.category,
										data.price,
										data.population,
									)
								}}
							>
								<SelectTrigger className="w-full dark:text-white dark:bg-transparent rounded-xl outline-none dark:border ">
									<SelectValue

										className="dark:text-white dark:bg-[#323b4e] dark:border-none "
									/>
								</SelectTrigger>
								<SelectContent className="dark:text-white dark:bg-[#323b4e] dark:border-none ">
									<SelectGroup className=" gap-1 w-full flex flex-col justify-center items-center">
										<div className='max-h-[200px] w-full overflow-y-scroll no-scrollbar'>
											{PointsCategory?.map((d, i) => (
												<SelectItem

													value={d.category}
													key={i}
													className=""
												>

													<div className="text-sm">{d.category}</div>

												</SelectItem>
											))}
										</div>

									</SelectGroup>
								</SelectContent>
							</Select>

						</div>

						<div className="py-2 px-[2%] bg-maincolor rounded-b-xl relative">
							<h1 className="text-lg py-1 font-medium">Enter Tags</h1>
							<div className="w-full flex justify-center items-center  rounded-xl border ">
								{/* <BiMap className="border-r-2 p-2 text-4xl" /> */}
								<IoMdPricetags className="border-r-2 p-2 text-4xl" />
								<input
									name="myForm"
									type="text"
									onChange={(e) => {
										setT(e.target.value);
									}}
									onKeyPress={(e) => {
										if (!t) return;
										else if (three?.tags?.length < 5) {
											if (e.key === "Enter") {
												// setThree((three) => ({
												// 	...three,
												// 	tags: [...three.tags, e.target.value],
												// }));
												dispatch(setThree({ tags: [...three.tags, e.target.value] }))
												setT("");
											}
										} else {
											if (e.key === "Enter") {
												setT(e.target.value);
											}
										}
									}}
									value={t}
									placeholder="tags"
									className="w-full rounded-xl bg-transparent p-2 outline-none "

								/>
							</div>
							{three?.tags?.length >= 5 && t !== "" && (
								<>
									<div className="text-sm font-medium py-3 text-red-500">
										Cant insert more than 5 tags
									</div>
								</>
							)}
							<div className="flex  flex-wrap items-center gap-2 my-3">
								{three?.tags?.map((f, g) => (
									<div
										key={g}
										className="flex justify-center items-center gap-2 dark:bg-border bg-[#FAFAFA] p-2 px-3 rounded-full"
									>
										<div>{f}</div>
										<div
											onClick={() => {
												// setThree((three) => ({
												// 	...three,
												// 	tags: three.tags.filter((_, h) => h !== g),
												// }));
												dispatch(setThree({ tags: three.tags.filter((_, h) => h !== g) }))
											}}
										>
											<AiOutlineClose className="text-white bg-black rounded-full" />
										</div>
									</div>
								))}
							</div>

							<div className="text-[#5585FF] text-[13px] mt-2">
								Note: Enter tags that your audience interested in..
							</div>
						</div>

					</div>

					<div className="my-[1%] rounded-xl py-2 px-[2%] bg-maincolor">
						<h1 className="text-2xl font-semibold py-2">
							Target Audience
						</h1>

						<div>
							<h1 className="text-lg py-1 font-medium">
								Location
								<span className="text-[#FF4444]">*</span>
							</h1>
							<div className="w-full flex justify-center items-center rounded-xl border">
								<BiMap className="border-r-2 p-2 text-4xl" />
								<input
									name="selectinput"
									type="text"
									placeholder="Enter the location to target audience"
									value={inputValue}
									onChange={(e) => setInputValue(e.target.value)}
									className="w-full rounded-xl p-2 bg-transparent outline-none"
								// onKeyDown={(e) => {
								// 	if (e.key === "Enter") {
								// 		if (inputValue && three.location.length < 3) {

								// 			dispatch(setThree({ location: [...three.location, inputValue] }))
								// 			setInputValue("");
								// 		}
								// 	}
								// }}
								/>
							</div>


							<div className="flex items-center flex-wrap gap-2 my-2 mb-4">
								{three?.location?.map((m, i) => (
									<div
										key={i}
										className="flex justify-center items-center gap-2 dark:bg-border bg-[#FAFAFA] p-2 px-3 rounded-full "
									>
										<div>{m}</div>
										<div
											onClick={() => {

												dispatch(setThree({
													location: three.location.filter(
														(_, a) => a !== i
													)
												}))
											}}
										>
											<AiOutlineClose className="text-white bg-black rounded-full" />
										</div>
									</div>
								))}
							</div>

							{inputValue && <div className='max-h-[300px] overflow-y-scroll border border-[#7d7c7c] p-3 rounded-xl no-scrollbar flex flex-col gap-2'>


								{myLocation.filter((l) => l.name.toLowerCase().includes(inputValue.toLowerCase())).length === 0 ? (
									<div>No data found</div>
								) : (
									myLocation.filter((l) => l.name.toLowerCase().includes(inputValue.toLowerCase())).map((l, i) => (
										<div key={i} className="flex items-center gap-1">
											<input
												name={i}
												type="checkbox"
												// onClick={handleCheckboxClick}
												checked={three.location.includes(l.name)}
												onChange={(event) => {
													const isChecked = event.target.checked;
													if (isChecked) {
														if (three.location.length < 3) {
															dispatch(setThree({ location: [...three.location, l?.name] }))
														} else {
															toast.error("Max Location Reached!")
														}
														// setInputValue(l.name);
													} else {
														// setInputValue("");
														dispatch(setThree({
															location: three.location.filter(
																(item) => item !== l.name
															)
														}))
													}
												}}
											/>
											<div className="font-medium">{l.name}</div>
										</div>
									))
								)}

							</div>}

							<div className="text-[#5585FF] text-[13px] my-2">
								Note: Prices may fluctuate depending on factors such as
								traffic, weather conditions, events etc..
								<span className="text-[#5585FF] mx-1">Learn more</span>
							</div>
						</div>

						<div>
							<h1 className="font-semibold py-2">Gender</h1>

							<div className="flex flex-wrap gap-2 items-center">
								<div
									onClick={() => {
										dispatch(setThree({ gender: "Men" }))
									}}
									className={`p-2 px-6 rounded-full ${three.gender === "Men"
										? "text-white bg-blue-500"
										: "border border-black"
										} `}
								>
									Men
								</div>
								<div
									onClick={() => {
										dispatch(setThree({ gender: "Women" }))
									}}
									className={`p-2 px-6 rounded-full ${three.gender === "Women"
										? "text-white bg-blue-500"
										: "border border-black"
										} `}
								>
									Women
								</div>
								<div
									onClick={() => {
										dispatch(setThree({ gender: "Both" }))
									}}
									className={`p-2 px-6  rounded-full ${three.gender === "Both"
										? "text-white bg-blue-500"
										: "border border-black"
										} `}
								>
									Both
								</div>
							</div>

							<div className="my-3">
								<h1 className="font-semibold py-2">Age Group</h1>
								<div className="flex space-x-4 items-center">
									<div className="flex justify-center items-center space-x-1">
										<input
											onClick={() => {
												setCLick(0);

												dispatch(setThree({
													selectedAgeRange: "",
													age: "All age group",
													maxage: "",
													minage: "",
												}))
											}}
											type="radio"
											name="age"
										/>
										<div className="font-semibold ">All Age Groups</div>
									</div>
									<div className="flex justify-center items-center space-x-1">
										<input
											onClick={() => {
												myAgeHandle();
											}}
											type="radio"
											name="age"
											id="ageweb"
										/>
										<div className="font-semibold">Age Range</div>
									</div>
								</div>
								<div className={`${click === 1 ? null : "hidden"}`}>
									<label className="font-medium my-2" htmlFor="ageRange">
										Select Age Range:
									</label>
									<select
										id="ageRange"
										className="p-1 border outline-none rounded-lg border-[#e6e6e6] mx-1 my-2"
										name="ageRange"
										value={three.selectedAgeRange}
										onChange={handleAgeRangeChange}
									>
										<option value="12-18">12-18</option>
										<option value="19-40">19-40</option>
										<option value="41-65">41-65</option>
									</select>
								</div>
							</div>
						</div>
					</div>
					<div className="my-[1%] rounded-xl py-3 px-[2%] bg-maincolor">
						<div>
							<h1 className="text-2xl font-semibold">
								Schedule and duration
							</h1>
							<div className="grid grid-cols-2 w-full gap-4 py-2">
								<div className="flex flex-col w-full">
									<label
										htmlFor="sdate"
										className="text-lg font-semibold py-2"
									>
										Start Date<span className="text-[#FF4444]">*</span>
									</label>
									<input
										name="myForm"
										id="sdate"
										// defaultValue={formatDate(three.startDate)}
										type="date"
										onChange={(e) =>
											// setThree({
											// 	...three,
											// 	startDate: e.target.value,
											// })
											dispatch(setThree({ startDate: e.target.value }))
										}

										value={three.startDate}
										placeholder="Enter Campaign Name"
										className="w-full border rounded-xl bg-transparent outline-none p-2"
									/>
									{formatDate(three.startDate) < formatDate(new Date()) && (
										<div className="text-sm text-red-700">
											Please Enter a Valid Startdate
										</div>
									)}

								</div>
								<div
									className={`${date ? "flex flex-col" : "hidden"
										}`}
								>
									<label
										htmlFor="edate"
										className="text-lg font-semibold py-2"
									>
										End Date<span className="text-[#FF4444]">*</span>
									</label>
									<input
										name="myForm"
										id="edate"
										onChange={(e) =>
											dispatch(setThree({ endDate: e.target.value }))
											// setThree({
											// 	...three,
											// 	endDate: e.target.value,
											// })
										}
										value={three.endDate}
										type="date"
										placeholder="Enter Campaign Name"
										className="w-full border rounded-xl bg-transparent outline-none p-2"
									/>
									{formatDate(three.endDate) < formatDate(three.startDate) && (
										<div className="text-sm text-red-700">
											Please Enter a Valid Enddate
										</div>
									)}
								</div>


								{/* <div className="flex flex-col bg-transparent relative top-1 w-full gap-2">
												<label
													htmlFor="dbudget"
													className="text-lg font-semibold"
												>
													Daily Budget
												</label>
												<div className="flex justify-center rounded-xl items-center border">
													<div className="border-r-2 p-2 text-lg">&#x20B9;</div>
													<input
														id="dbudget"
														onChange={(e) =>
															setThree({
																...three,
																DailyBudget: e.target.value,
															})
														}
														value={three.DailyBudget}
														type="number"
														placeholder="Enter Daily Budget"
														className="w-full bg-transparent px-2 rounded-xl outline-none"
													/>
												</div>
											</div> */}
							</div>

							{/* <div className="my-[2%]">
											<h1 className="text-lg py-2 font-semibold">
												Select Ad Duration
											</h1>
											<div className="flex flex-wrap my-2 gap-4">
												<div
													onClick={() =>
														dispatch(setThree({ duration: 1 }))
													
													}
													className={`${three.duration == 1
														? "bg-[#2D9AFF] text-white"
														: "border border-black"
														} p-1 px-5 rounded-full`}
												>
													1 day
												</div>
												<div
													onClick={() => dispatch(setThree({ duration: 7 }))}
													className={`${three.duration === 7
														? "bg-[#2D9AFF] text-white"
														: "border border-black"
														} p-1 px-5 rounded-full`}
												>
													7 days
												</div>
												<div
													onClick={() => dispatch(setThree({ duration: 30 }))}

													className={`${three.duration === 30
														? "bg-[#2D9AFF] text-white"
														: "border  border-black"
														} p-1 px-5 rounded-full`}
												>
													30 days
												</div>
											</div>
										</div> */}
						</div>
						<div className="flex flex-col gap-1">
							<div className="flex gap-2 my-2 items-center">
								<input
									name="myFormzpp"
									id="258"
									type="radio"
									onChange={() => {
										setDate(false);
									}}
									className="w-4 h-4"
									checked={!date}
								/>
								<div className="flex flex-col">
									<div className="font-medium">
										Run this ad Continuously
									</div>
									<div>
										Your ad will run continuously for a daily budget. This
										option is recommended. Learn more
									</div>
								</div>
							</div>
							<div className="flex gap-2 my-2 items-center">
								<input
									name="myFormzder"
									id="234"
									type="radio"
									onChange={() => { }}
									onClick={() => {
										setDate(true);
										setThree({ ...three, endDate: "" });
									}}
									checked={date}
									className="w-4 h-4"
								/>
								<div className="font-medium">
									Choose When this Ad Will End
								</div>
							</div>
						</div>
						<div>
							<h1 className="text-2xl font-semibold">Budget</h1>
							<div className="grid grid-cols-2 gap-4 py-3">
								<div className="flex flex-col space-y-1">
									<label
										htmlFor="tbudget"
										className="text-lg font-semibold"
									>
										Total Budget
									</label>
									<div className="flex justify-center  rounded-xl items-center border">
										<div className="border-r-2 p-2 text-lg">&#x20B9;</div>
										<input
											id="tbudget"
											name="myForm"
											onChange={(e) =>
												// setThree({
												// 	...three,
												// 	TotalBudget: e.target.value,
												// })
												dispatch(setThree({
													...three,
													TotalBudget: e.target.value,
												}))
											}
											value={three.TotalBudget}
											type="text"
											placeholder="Enter Total Budget"
											className="w-full bg-transparent rounded-xl outline-none p-2"
										/>
									</div>
								</div>

							</div>
						</div>
					</div>
					{/* <div className="lg:min-w-[700px] bg-maincolor my-4 rounded-2xl py-5 px-5">
                  <div className="flex flex-col gap-4">
                    <div className="flex flex-col gap-1">
                      <div className="font-bold">Payment Details</div>
                      
                    </div>
                    <div className="bg-[#FAFAFA] p-5 rounded-2xl">
                      <div className="flex flex-col gap-2">
                        <div className="flex justify-between p-[2px] items-center">
                          <div className="font-medium">Ad Budget</div>
                          <div>₹ 10,000.00</div>
                        </div>
                

                        <div className="flex justify-between p-[2px] items-center">
                          <div className="font-medium">Taxes and Charges</div>
                          <div>₹ 1800</div>
                        </div>
                        <div className="flex justify-between p-[2px] items-center">
                          <div className="font-medium">Total</div>
                          <div className="font-semibold">₹ 10,800</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div> */}
				</div>
				<div className="flex flex-col items-center">
					<div>
						<Square3 display={ProperAudience ? ProperAudience : 0} />
					</div>
					{/* <Square4
									ctr={ctr ? ctr : 0}
									duration={three.duration ? three.duration : 1}
									price={pricebyDay ? pricebyDay : 0}
									daily={totalPrice ? totalPrice : 0}
									display={ProperAudience ? ProperAudience : 0}
								/> */}
				</div>
			</div>
			{/* mobile */}
			<div className="flex bg-maincolor flex-col md:hidden pb-[180px] py-2">
				<div className="grid grid-cols-1">
					<div className="flex flex-col">
						<Square3 display={ProperAudience ? ProperAudience : 0} />
						{/* <Square4
									ctr={ctr ? ctr : 0}
									duration={three.duration ? three.duration : 1}
									price={pricebyDay ? pricebyDay : 0}
									daily={totalPrice ? totalPrice : 0}
									display={ProperAudience ? ProperAudience : 0}
								/> */}
					</div>

					<div className="w-full md:hidden bg-[#F0F2F5] dark:bg-[#181a20] my-4 rounded-2xl py-5 px-2">
						<h1 className="text-2xl font-semibold py-2 px-2">
							Select Target
						</h1>
						<div className="my-2 bg-maincolor p-3 rounded-xl">
							<div>
								<h2 className="text-xl font-semibold py-2">
									Select Optimal section for
									<br className="sm:hidden" /> effective advertising
								</h2>
								<div className="flex flex-wrap gap-3 my-4">
									<div

										onClick={() => { dispatch(setThree({ type: "infeed" })); setOpen(false) }}
										className={` flex flex-col justify-center border relative  p-2 z-0  items-center min-w-[150px] max-w-[250px] rounded-lg ${three.type.includes("infeed")
											? "border-[#4C9AFF]  bg-[#3e84e4]/10"
											: ""
											}`}
									>
										<div>
											<Image
												src={feed}
												className="w-[90px] h-[90px]"
												alt="infeed"
											/>
										</div>
										<div className="font-medium py-2">In Feed Ads</div>
										{three.type.includes("infeed") && (
											<div className={`absolute -top-2 -right-2 z-50`}>
												<AiFillCheckCircle className="text-blue-600 z-50 text-xl" />
											</div>
										)}
									</div>

									<div
										// onClick={() => toggleType("videoads")}
										onClick={() => { setOpen(!open); dispatch(setThree({ type: "" })) }}
										className={` flex flex-col justify-center border relative  p-2 z-0  items-center min-w-[150px] max-w-[250px] rounded-lg ${open
											? "border-[#4C9AFF]  bg-[#3e84e4]/10"
											: ""
											}`}
									>
										<div>
											<Image
												src={search}
												className="w-[90px] h-[90px]"
												alt="video"
											/>
										</div>{" "}
										<div className="font-medium py-2">Video Ads</div>

									</div>

									{/* {open && <>
												<div
													// onClick={() => toggleType("skipable")}
													onClick={() => { dispatch(setThree({ type: "skipable" })) }}
													className={` flex flex-col justify-center border relative  p-2 z-0  items-center min-w-[150px] max-w-[250px] rounded-lg ${three.type === "skipable"
														? "border-[#4C9AFF]  bg-[#3e84e4]/10"
														: ""
														}`}
												>
													<div>
														<Image
															src={search}
															className="w-[90px] h-[90px]"
															alt="video"
														/>
													</div>{" "}
													<div className="font-medium py-2">Skipable</div>
													{three.type === "skipable" && (
														<div className={`absolute -top-2 -right-2`}>
															<AiFillCheckCircle className="text-blue-600 text-xl" />
														</div>
													)}
												</div>
												<div
													// onClick={() => toggleType("non-skipable")}
													onClick={() => dispatch(setThree({ type: "non-skipable" }))}
													className={` flex flex-col justify-center border relative  p-2 z-0  items-center min-w-[150px] max-w-[250px] rounded-lg ${three.type === "non-skipable"
														? "border-[#4C9AFF]  bg-[#3e84e4]/10"
														: ""
														}`}
												>
													<div>
														<Image
															src={search}
															className="w-[90px] h-[90px]"
															alt="video"
														/>
													</div>{" "}
													<div className="font-medium py-2">Non Skipable</div>
													{three.type === "non-skipable" && (
														<div className={`absolute -top-2 -right-2`}>
															<AiFillCheckCircle className="text-blue-600 text-xl" />
														</div>
													)}
												</div>
											</>} */}
									<div
										// onClick={() => toggleType("banner")}
										onClick={() => {
											if (three.isImage) {
												dispatch(setThree({ type: "banner" })); setOpen(false)
											} else {
												toast.error("Banner Ads should contain image!")
											}
										}}
										className={` flex flex-col justify-center border relative  p-2 z-0  items-center min-w-[150px] max-w-[250px] rounded-lg ${three.type.includes("banner")
											? "border-[#4C9AFF]  bg-[#3e84e4]/10"
											: ""
											}`}
									>
										<div>
											<Image
												src={banner}
												className="w-[90px] h-[90px]"
												alt="video"
											/>
										</div>{" "}
										<div className="font-medium py-2">Banner Ads</div>
										{three.type.includes("banner") && (
											<div className={`absolute -top-2 -right-2`}>
												<AiFillCheckCircle className="text-blue-600 text-xl" />
											</div>
										)}
									</div>
								</div>
								{open && <div className='flex gap-7 flex-col justify-normal  '>
									<div className='flex items-center mt-3 -mb-3'>Select One of these:-</div>
									<div className='flex gap-3 pb-2 items-center'>
										<><div

											onClick={() => {
												if (three.isImage) {
													toast.error("Videos Ads should contain video!")
												} else {
													dispatch(setThree({ type: "skipable" }))
												}
											}

											}
											className={` flex flex-col justify-center border relative  p-2 z-0  items-center min-w-[150px] max-w-[250px] rounded-lg ${three.type === "skipable"
												? "border-[#4C9AFF]  bg-[#3e84e4]/10"
												: ""
												}`}
										>
											<div>
												<Image
													src={skip}
													className="w-[90px] h-[90px]"
													alt="video"
												/>
											</div>
											<div className="font-medium py-2 text-sm">Skipable Ads</div>
											{three.type === "skipable" && (
												<div className={`absolute -top-2 -right-2`}>
													<AiFillCheckCircle className="text-blue-600 text-xl" />
												</div>
											)}
										</div>
											<div

												onClick={() => {
													if (three.isImage) {
														toast.error("Videos Ads should contain video!")
													} else {
														dispatch(setThree({ type: "non-skipable" }))
													}
												}
												}
												className={` flex flex-col justify-center border relative  p-2 z-0  items-center min-w-[150px] max-w-[250px] rounded-lg ${three.type === "non-skipable"
													? "border-[#4C9AFF]  bg-[#3e84e4]/10"
													: ""
													}`}
											>
												<div>
													<Image
														src={nonskip}
														className="w-[90px] h-[90px]"
														alt="video"
													/>
												</div>
												<div className="font-medium py-2 text-sm">Non Skipable Ads</div>
												{three.type === "non-skipable" && (
													<div className={`absolute -top-2 -right-2`}>
														<AiFillCheckCircle className="text-blue-600 text-xl" />
													</div>
												)}
											</div></>
									</div>
								</div>}

								<div className='text-sm text-black dark:text-white font-semibold'>
									{three.type === "infeed" && "Note: you found this at in the middle of the feed."}
									{three.type === "banner" && "Note: you found this at in the top of the feed."}
									{three.type === "skipable" && "Note: The video ads which can be skipable"}
									{three.type === "non-skipable" && "Note: The video ads which cannot be skipable"}
								</div>

								{(three.type === "infeed" || three.type === "skipable" || three.type === "non-skipable") && <div className='flex flex-col justify-center mb-2'>
									<div className='text-sm font-semibold my-3'>Popularity</div>
									<div className='flex gap-2 items-center'>
										<div onClick={() => dispatch(setThree({ popularity: 1 }))} className={`flex justify-center items-center p-3 px-5 ${three.popularity === 1 ? "bg-blue-600" : "dark:bg-[#181a20] bg-white"} rounded-lg`}>1x</div>
										<div onClick={() => dispatch(setThree({ popularity: 2 }))} className={`flex justify-center items-center p-3 px-5 ${three.popularity === 2 ? "bg-blue-600" : "dark:bg-[#181a20] bg-white"} rounded-lg`}>2x</div>
										<div onClick={() => dispatch(setThree({ popularity: 3 }))} className={`flex justify-center items-center p-3 px-5 ${three.popularity === 3 ? "bg-blue-600" : "dark:bg-[#181a20] bg-white"} rounded-lg`}>3x</div>
										<div onClick={() => dispatch(setThree({ popularity: 4 }))} className={`flex justify-center items-center p-3 px-5 ${three.popularity === 4 ? "bg-blue-600" : "dark:bg-[#181a20] bg-white"} rounded-lg`}>4x</div>
									</div>
									<div className='text-sm mt-2 text-black dark:text-white font-semibold'>
										Note: Speed up your ads by increasing popularity
									</div>
								</div>}


							</div>
						</div>
						<div className="rounded-xl">
							<div className="my-5 bg-maincolor p-3 rounded-xl">
								<div className="py-3  rounded-t-xl bg-maincolor relative">
									<h1 className="text-lg py-1 pb-2 font-medium">Category</h1>
									<Select
										defaultValue='Business & Finance'
										className="dark:text-white dark:bg-[#323b4e] w-full dark:border-none "
										onValueChange={(selectValue) => {
											dispatch(setThree({ category: selectValue }))
										}}
									>
										<SelectTrigger className="w-full dark:text-white dark:bg-transparent rounded-xl outline-none dark:border ">
											<SelectValue

												className="dark:text-white dark:bg-[#323b4e] dark:border-none "
											/>
										</SelectTrigger>
										<SelectContent className="dark:text-white dark:bg-[#323b4e] dark:border-none ">
											<SelectGroup className="max-h-[200px] gap-1 w-full flex flex-col justify-center items-center">
												{PointsCategory?.map((d, i) => (
													<SelectItem
														value={d.category}
														key={i}
														className=""
													>

														<div className="text-sm">{d.category}</div>

													</SelectItem>
												))}
											</SelectGroup>
										</SelectContent>
									</Select>

								</div>

								<div className='my-1'>

								</div>
								<div className="">
									<div className="my-2">
										<h1 className="text-lg py-1 font-medium">Enter Tags</h1>
										<div className="border flex justify-between items-center rounded-xl">
											<div className="flex justify-center  items-center">
												<IoMdPricetags className="text-3xl  px-1" />
												{/* <BiMap className="text-3xl  px-1" /> */}
												<input
													name="myForm"
													type="text"
													onChange={(e) => {
														setT(e.target.value);
													}}
													value={t}
													placeholder="tags"
													className="outline-none border-l-2 bg-transparent w-full rounded-l-none p-2 rounded-xl"
												/>
											</div>
											<div className="bg-[#2D9AFF] p-2 px-3 font-bold text-xl rounded-r-xl text-white">
												<button
													onClick={() => {
														if (t && three?.tags?.length < 5) {
															dispatch(setThree({ tags: [...three.tags, t] }))
															setT("");
														}
													}}
												>
													<AiOutlinePlus />
												</button>
											</div>
										</div>
									</div>

									<div>
										{three?.tags?.length >= 5 && t !== "" && (
											<>
												<div className="text-sm font-medium py-3  text-red-500">
													Cant insert more than 5 tags
												</div>
											</>
										)}
									</div>

									<div className="flex  flex-wrap items-center gap-2 my-3">
										{three?.tags?.map((f, g) => (
											<div
												key={g}
												className="flex justify-center items-center gap-2 p-2 px-3 dark:bg-border bg-[#fafafa] rounded-full"
											>
												<div>{f}</div>
												<div
													onClick={() => {
														// setThree((three) => ({
														// 	...three,
														// 	tags: three.tags.filter((_, h) => h !== g),
														// }));
														dispatch(setThree({
															tags: three.tags.filter((_, h) => h !== g)
														}))
													}}
												>
													<AiOutlineClose className="text-white bg-black rounded-full" />
												</div>
											</div>
										))}
									</div>


									<div className="text-[#5585FF] text-[13px] my-2">
										Note: Enter tags that your audience interested in..
									</div>
								</div>
							</div>

							<div className="my-5 bg-maincolor p-3 rounded-xl">
								<h1 className="text-2xl font-semibold py-2">
									Target Audience
								</h1>

								<div>
									<h1 className="text-lg py-1 font-medium">
										Location
										<span className="text-[#FF4444]">*</span>
									</h1>
									<div className="w-full flex justify-center items-center rounded-xl border">
										<BiMap className="border-r-2 p-2 text-4xl" />
										<input
											name="selectinput"
											type="text"
											placeholder="Enter the location to target audience"
											value={inputValue}
											onChange={(e) => setInputValue(e.target.value)}
											className="w-full rounded-xl p-2 bg-transparent outline-none"
										// onKeyDown={(e) => {
										// 	if (e.key === "Enter") {
										// 		if (inputValue && three.location.length < 3) {

										// 			dispatch(setThree({ location: [...three.location, inputValue] }))
										// 			setInputValue("");
										// 		}
										// 	}
										// }}
										/>
									</div>


									<div className="flex items-center flex-wrap gap-2 my-2 mb-4">
										{three?.location?.map((m, i) => (
											<div
												key={i}
												className="flex justify-center items-center gap-2 dark:bg-border bg-[#FAFAFA] p-2 px-3 rounded-full "
											>
												<div>{m}</div>
												<div
													onClick={() => {

														dispatch(setThree({
															location: three.location.filter(
																(_, a) => a !== i
															)
														}))
													}}
												>
													<AiOutlineClose className="text-white bg-black rounded-full" />
												</div>
											</div>
										))}
									</div>

									{inputValue && <div className='max-h-[300px] overflow-y-scroll border border-[#7d7c7c] p-3 rounded-xl no-scrollbar flex flex-col gap-2'>


										{myLocation.filter((l) => l.name.toLowerCase().includes(inputValue.toLowerCase())).length === 0 ? (
											<div>No data found</div>
										) : (
											myLocation.filter((l) => l.name.toLowerCase().includes(inputValue.toLowerCase())).map((l, i) => (
												<div key={i} className="flex items-center gap-1">
													<input
														name={i}
														type="checkbox"
														// onClick={handleCheckboxClick}
														checked={three.location.includes(l.name)}
														onChange={(event) => {
															const isChecked = event.target.checked;
															if (isChecked) {
																if (three.location.length < 3) {
																	dispatch(setThree({ location: [...three.location, l?.name] }))
																} else {
																	toast.error("Max Location Reached!")
																}
																// setInputValue(l.name);
															} else {
																// setInputValue("");
																dispatch(setThree({
																	location: three.location.filter(
																		(item) => item !== l.name
																	)
																}))
															}
														}}
													/>
													<div className="font-medium">{l.name}</div>
												</div>
											))
										)}

									</div>}

									<div className="text-[#5585FF] text-[13px] my-2">
										Note: Prices may fluctuate depending on factors such as
										traffic, weather conditions, events etc..
										<span className="text-[#5585FF] mx-1">Learn more</span>
									</div>
								</div>

								<h1 className="font-semibold py-2">Gender</h1>

								<div className="flex flex-wrap gap-2 items-center">
									<div
										onClick={() => {
											dispatch(setThree({ gender: "Men" }))
										}}
										className={`p-2 px-6 rounded-full ${three.gender === "Men"
											? "text-white bg-blue-500"
											: "border border-black"
											} `}
									>
										Men
									</div>
									<div
										onClick={() => {
											dispatch(setThree({ gender: "Women" }))
										}}
										className={`p-2 px-6 rounded-full ${three.gender === "Women"
											? "text-white bg-blue-500"
											: "border border-black"
											} `}
									>
										Women
									</div>
									<div
										onClick={() => {
											dispatch(setThree({ gender: "Both" }))
										}}
										className={`p-2 px-6  rounded-full ${three.gender === "Both"
											? "text-white bg-blue-500"
											: "border border-black"
											} `}
									>
										Both
									</div>
								</div>

								{/* <div className="my-2">
                      <h1 className="font-semibold py-2">Age Group</h1>
                      <div className="flex space-x-4 items-center">
                        <div className="flex justify-center items-center space-x-1">
                          <input
                            onClick={() => {
                              setCLick(0);
                              setThree({
                                ...three,
                                selectedAgeRange: "",
                                age: "All age group",
                                maxage: "",
                                minage: "",
                              });
                            }}
                            type="radio"
                            name="age"
                            id="ages"
                          />
                          <label className="font-semibold " htmlFor="ages">
                            All Age Groups
                          </label>
                        </div>
                        <div className="flex justify-center items-center space-x-1">
                          <input
                            onClick={() => {
                              myAgeHandle();
                            }}
                            type="radio"
                            id="RadioAge"
                          />
                          <label className="font-semibold " htmlFor="RadioAge">
                            Age Range
                          </label>
                        </div>
                      </div>
                      <div className={`${click === 1 ? null : "hidden"}`}>
                        <label
                          className="font-medium my-2"
                          htmlFor="myAgeRange"
                        >
                          Select Age Range:
                        </label>
                        <select
                          id="myAgeRange"
                          className="p-1 border outline-none rounded-lg border-[#e6e6e6] mx-1 my-2"
                          name="myAgeRange"
                          value={three.selectedAgeRange}
                          onChange={handleAgeRangeChange}
                        >
                          <option value="12-18">12-18</option>
                          <option value="19-40">19-40</option>
                          <option value="41-65">41-65</option>
                        </select>
                      </div>
                    </div> */}

								<div className="my-2">
									<h1 className="font-semibold py-2">Age Group</h1>
									<div className="flex space-x-4 items-center">
										<div className="flex justify-center items-center space-x-1">
											<input
												onClick={() => {
													setCLick(0);
													// setThree({
													// 	...three,
													// 	selectedAgeRange: "",
													// 	age: "All age group",
													// 	maxage: "",
													// 	minage: "",
													// });
													dispatch(setThree({
														selectedAgeRange: "",
														age: "All age group",
														maxage: "",
														minage: "",
													}))
												}}
												type="radio"
												name="ageofmobile"
												id="mobilekiage"
											/>
											<div className="font-semibold " htmlFor="age">
												All Age Groups
											</div>
										</div>
										<div className="flex justify-center items-center space-x-1">
											<input
												onClick={() => {
													myAgeHandle();
												}}
												type="radio"
												name="ageofmobile"
												id="agedmobile"
											/>
											<div className="font-semibold " htmlFor="age">
												Age Range
											</div>
										</div>
									</div>
									<div className={`${click === 1 ? "my-1" : "hidden"}`}>
										<label className="font-medium my-2" htmlFor="ageRange">
											Select Age Range:
										</label>
										<select
											id="ageRange"
											className="p-1 border outline-none rounded-lg border-[#e6e6e6] mx-1 my-2"
											name="ageRangemobile"
											value={three.selectedAgeRange}
											onChange={handleAgeRangeChange}
										>
											<option value="12-18">12-18</option>
											<option value="19-40">19-40</option>
											<option value="41-65">41-65</option>
										</select>
									</div>
								</div>
							</div>

							<div className="my-[4%] rounded-xl py-3 px-[2%] bg-maincolor">
								<div>
									<h1 className="text-2xl font-semibold">
										Schedule and duration
									</h1>
									<div className="grid sm:grid-cols-2 gap-4 py-2">
										<div className="flex flex-col gap-1">
											<label
												htmlFor="sdate"
												className="text-lg font-semibold py-2"
											>
												Start Date<span className="text-[#FF4444]">*</span>
											</label>
											<input
												name="myForm"
												id="sdate"
												type="date"
												onChange={(e) =>
													// setThree({
													// 	...three,
													// 	startDate: e.target.value,
													// })
													dispatch(setThree({
														startDate: e.target.value,
													}))
												}
												value={three.startDate}
												placeholder="Enter Campaign Name"
												className="w-full border rounded-xl bg-transparent outline-none p-2"
											/>
											{formatDateToString(three.startDate) < formatDateToString(new Date()) && (
												<div className="text-sm text-red-700">
													Please Enter a Valid Startdate
												</div>
											)}
										</div>
										<div
											className={`${date ? "flex flex-col space-y-1" : "hidden"
												}`}
										>
											<label
												htmlFor="edate"
												className="text-lg font-semibold py-2"
											>
												End Date<span className="text-[#FF4444]">*</span>
											</label>
											<input
												name="myForm"
												id="edate"
												onChange={(e) =>
													setThree({
														...three,
														endDate: e.target.value,
													})
												}
												value={three.endDate}
												type="date"
												placeholder="Enter Campaign Name"
												className="w-full border rounded-xl outline-none p-2"
											/>
											{formatDateToString(three.endDate) < formatDateToString(three.startDate) && (
												<div className="text-sm text-red-700">
													Please Enter a Valid Enddate
												</div>
											)}
										</div>
									</div>
								</div>
								<div className="flex flex-col gap-1">
									<div className="flex gap-2 my-2 items-center">
										<input
											name="mpypFormzpp"
											id="2529346758"
											type="radio"
											onChange={() => {
												setDate(false);
											}}
											className="w-4 h-4"
											checked={!date}
										/>
										<div className="flex flex-col">
											<div className="font-medium">
												Run this ad Continuously
											</div>
											<div>
												Your ad will run continuously for a daily budget.
												This option is recommended. Learn more
											</div>
										</div>
									</div>
									<div className="flex gap-2 my-2 items-center">
										<input
											name="myFormerloi"
											id="234123565"
											type="radio"
											onChange={() => { }}
											onClick={() => {
												setDate(true);
												setThree({ ...three, endDate: "" });
											}}
											checked={date}
											className="w-4 h-4"
										/>
										<div className="font-medium">
											Choose When this Ad Will End
										</div>
									</div>
								</div>
								<div className='mt-3'>
									<h1 className="text-2xl font-semibold">Budget</h1>
									<div className="grid gap-4 py-3">
										<div className="flex flex-col space-y-1">
											<label
												htmlFor="tbudget"
												className="text-lg font-semibold"
											>
												Total Budget
											</label>
											<div className="flex justify-center  rounded-xl items-center border">
												<div className="border-r-2 p-2 text-lg">&#x20B9;</div>
												<input
													id="tbudget"
													name="myForm"
													onChange={(e) =>
														// setThree({
														// 	...three,
														// 	TotalBudget: e.target.value,
														// })
														dispatch(setThree({
															...three,
															TotalBudget: e.target.value,
														}))
													}
													value={three.TotalBudget}
													type="text"
													placeholder="Enter Total Budget"
													className="w-full bg-transparent rounded-xl outline-none p-2"
												/>
											</div>
										</div>

									</div>
								</div>
								{/* <div className="flex flex-col my-1 gap-1">
                      <label
                        htmlFor="dbudget"
                        className="text-lg font-semibold"
                      >
                        Daily Budget
                      </label>
                      <div className="flex justify-center  rounded-xl items-center border">
                        <div className="border-r-2 p-2 text-lg">&#x20B9;</div>
                        <input
                          id="dbudget"
                          onChange={(e) =>
                            setThree({
                              ...three,
                              DailyBudget: e.target.value,
                            })
                          }
                          value={three.DailyBudget}
                          type="text"
                          placeholder="Enter Daily Budget"
                          className="w-full rounded-xl outline-none p-2"
                        />
                      </div>
                    </div> */}
								{/* <div className="my-3">
											<h1 className="text-lg py-2 font-semibold">
												Select Ad Duration
											</h1>
											<div className="flex flex-wrap my-2 gap-5">
												<div
													onClick={() =>
														dispatch(setThree({
															duration: 1
														}))
													}
													className={`${three.duration == 1
														? "bg-[#2D9AFF] text-white"
														: "border border-black"
														} p-1 px-5 rounded-full`}
												>
													1 day
												</div>
												<div
													onClick={() =>
														dispatch(setThree({
															duration: 7
														}))
													}
													className={`${three.duration === 7
														? "bg-[#2D9AFF] text-white"
														: "border border-black"
														} p-1 px-5 rounded-full`}
												>
													7 days
												</div>
												<div
													onClick={() =>
														dispatch(setThree({
															duration: 30
														}))
													}
													className={`${three.duration === 30
														? "bg-[#2D9AFF] text-white"
														: "border  border-black"
														} p-1 px-5 rounded-full`}
												>
													30 days
												</div>
											</div>
										</div> */}
								{/* <div>
                      <h1 className="text-2xl font-semibold">Budget</h1>
                      <div className="grid sm:grid-cols-2 gap-4 py-3">
                        <div className="flex flex-col space-y-1">
                          <label
                            htmlFor="tbudget"
                            className="text-lg font-semibold"
                          >
                            Total Budget
                          </label>
                          <div className="flex justify-center  rounded-xl items-center border">
                            <div className="border-r-2 p-2 text-lg">
                              &#x20B9;
                            </div>
                            <input
                              id="tbudget"
                              name="myForm"
                              onChange={(e) =>
                                setThree({
                                  ...three,
                                  TotalBudget: e.target.value,
                                })
                              }
                              value={three.TotalBudget}
                              type="text"
                              placeholder="Enter Total Budget"
                              className="w-full rounded-xl outline-none p-2"
                            />
                          </div>
                        </div>
                        <div className="flex flex-col space-y-1">
                          <label
                            htmlFor="dbudget"
                            className="text-lg font-semibold"
                          >
                            Daily Budget
                          </label>
                          <div className="flex justify-center  rounded-xl items-center border">
                            <div className="border-r-2 p-2 text-lg">
                              &#x20B9;
                            </div>
                            <input
                              id="dbudget"
                              onChange={(e) =>
                                setThree({
                                  ...three,
                                  DailyBudget: e.target.value,
                                })
                              }
                              value={three.DailyBudget}
                              type="text"
                              placeholder="Enter Daily Budget"
                              className="w-full rounded-xl outline-none p-2"
                            />
                          </div>
                        </div>
                      </div>
                    </div> */}
							</div>
							{/* <div
                    className="w-full bg-maincolor my-4 rounded-2xl py-5 px-5"
                  >
                    <div className="flex flex-col gap-4">
                      <div className="flex flex-col gap-1">
                        <div className="font-bold">Payment Details</div>
                     
                      </div>
                      <div className="bg-[#FAFAFA] p-3 rounded-2xl">
                        <div className="flex flex-col gap-2">
                          <div className="flex justify-between p-[2px] items-center">
                            <div className="font-medium">Ad Budget</div>
                            <div>₹ 10,000.00</div>
                          </div>
                          <div className="text-[#333333] text-sm">
                            ₹83.60 a day x 7 days
                          </div>

                          <div className="flex justify-between p-[2px] items-center">
                            <div className="font-medium">Taxes and Charges</div>
                            <div>₹ 1800</div>
                          </div>

                          <div className="w-full h-1 border-t border-black"></div>

                          <div className="flex justify-between p-[2px] items-center">
                            <div className="font-medium">Total</div>
                            <div className="font-semibold">₹ 10,800</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div> */}
						</div>
					</div>
				</div>
			</div>
		</>
	)
}

export default Ad2