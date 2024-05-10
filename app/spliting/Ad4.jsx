import Image from "next/image";
import React, { useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { BsLink, BsThreeDotsVertical } from "react-icons/bs";
import styles from "../CustomScrollbarComponent.module.css";
import adss from "../assests/defaultads.jpg";
import comdefault from "../assests/comdefault.jpeg";
// import { getData } from "../utils/useful";
import { useGetCommunityQuery } from "../redux/slice/apiSlice";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Cookies from "js-cookie";
import { useAuthContext } from "../utils/AuthWrapper";

const Ad4 = ({
	three,
	dispatch,
	setThree,
	down, params,
	userid,
	advid,
	brand,
	setDown,
	handleFileChanges,
}) => {
	const [select, setSelect] = useState()
	const [comimage, setComimage] = useState("")
	// const userid = params.get("userid")
	// const advid = params.get("advid")
	// const brand = params.get("brand")
	const url = process.env.NEXT_PUBLIC_URL
	// const { userid, data?.firstname, data?.lastname } = getData()
	// const { data: ads } = useAuthContext()
	const { data } = useGetCommunityQuery({ id: userid }, { skip: !userid })

	console.log("ad4")

	useEffect(() => {
		setComimage(data?.communitywithDps[0]?.dps)
		setSelect(data?.communitywithDps[0]?.title)
		dispatch(setThree({ comid: data?.communitywithDps[0]?._id }))
	}, [data])

	const categories = [
		"Movies & Entertainment", "News", "Pet & Animals", "Gaming", "Career & Education", "Anime & Manga",
		"Humor & Memes", "Family & Relationships", "Sports",
		"Science & Learning", "DIY & Crafts", "Music & Podcasts", "Beauty & Fashion", "Health & Fitness", "Food & Cooking", "Business & Finance",
		"Photography", "Travel & Gadgets", "Pop Culture", "Cars", "Motivation & Self-Help"
	]

	return (
		<>
			{/* scroll this */}
			<div className="grid grid-cols-7  sm:h-[87%] sm:mb-0 mb-10 pn:max-sm:pb-[30%] bg-[#f1f1f1] dark:bg-[#2e2e30] sm:fixed md:overflow-auto gap-4 md:scrollbar-hidden pn:max-md:grid-cols-1 w-full">
				<div
					className={` ${styles.customScrollbar} sm:px-4 h-[100%] px-2 bg-[#96b6e6] bg-maincolor w-full md:col-span-4 sm:overflow-y-scroll py-2 pn:max-md:order-1`}
				>

					{
						data?.communitywithDps.length > 0 ?

							<div className="px-[2%] my-2 rounded-xl bg-maincolor pn:max-sm:px-2 pb-4">
								<div className="text-2xl font-semibold py-2 pn:max-sm:px-2 my-2">Community</div>
								<Select
									className="dark:text-white bg-green-300 w-full dark:border-none "
									onValueChange={(selectValue) => {

										const selectedData = data?.communitywithDps?.find(
											(item) => item._id === selectValue
										);

										if (selectedData) {
											dispatch(setThree({ comid: selectValue }))

											setComimage(selectedData.dps)
											setSelect(selectedData.title)
										}
									}}

								>
									<SelectTrigger className="w-full dark:text-white dark:bg-transparent rounded-xl outline-none dark:border ">
										<SelectValue
											value={select}
											placeholder={select}
											className="dark:text-white dark:bg-[#323b4e] dark:border-none "
										/>
									</SelectTrigger>
									<SelectContent className="dark:text-white dark:bg-[#323b4e] dark:border-none ">
										<SelectGroup className="max-h-[200px] gap-1 w-full flex flex-col justify-center items-center">
											{data?.communitywithDps?.map((d, i) => (
												<SelectItem
													value={d._id}
													key={i}
													className=""
												>

													{/* {console.log(d.dps)} */}
													<div className="flex justify-center gap-2 items-center w-full">
														<div>
															<img
																src={d?.dps}
																className="max-w-[30px] rounded-lg min-h-[30px] min-w-[30px] max-h-[30px]"
																alt="image"
															/>
														</div>
														<div className="flex flex-col">
															<div className="text-xs">{d?.title}</div>
														</div>
													</div>

												</SelectItem>
											))}

										</SelectGroup>
									</SelectContent>
								</Select>
							</div>
							:
							<div>
								<h1 className="text-2xl font-semibold py-2 pn:max-sm:px-2 my-2">Community Details</h1>
								<div className="my-2 rounded-xl bg-maincolor pb-4 pn:max-sm:px-2">
									<div className="flex py-2 px-[2%] flex-col w-full">
										<div className="text-lg font-semibold py-2">Community Name</div>
										<input value={three.communityName} onChange={(e) => dispatch(setThree({ communityName: e.target.value }))} type="text" className="w-full border rounded-xl bg-transparent outline-none p-2" placeholder="Enter Community Name" />
									</div>
									<div className="flex py-2 px-[2%] flex-col w-full">
										<div className="text-lg font-semibold py-2">Community Description</div>
										<textarea value={three.communityDesc} onChange={(e) => dispatch(setThree({ communityDesc: e.target.value }))} className="w-full border rounded-xl bg-transparent min-h-[150px] max-h-[300px] outline-none p-2" placeholder="Enter Community Description" />
									</div>
									<div className="flex py-2 px-[2%] flex-col w-full">
										<div className="text-lg font-semibold py-2">Category</div>

										<Select
											defaultValue="Humor & Memes"
											onValueChange={(value) => {
												dispatch(setThree({ communityCategory: value }))
											}}
											className="dark:text-white dark:bg-[#323b4e] w-full dark:border-none "
										>
											<SelectTrigger className="w-full dark:text-white dark:bg-transparent rounded-xl outline-none dark:border ">
												<SelectValue

													className="dark:text-white dark:bg-[#323b4e] dark:border-none "
												/>
											</SelectTrigger>
											<SelectContent className="dark:text-white dark:bg-[#323b4e] dark:border-none ">
												<SelectGroup className="max-h-[200px] gap-1 w-full flex flex-col justify-center items-center">
													{categories?.map((d, i) => (
														<SelectItem
															value={d}
															key={d}
														>
															{d}
														</SelectItem>
													))}

												</SelectGroup>
											</SelectContent>
										</Select>

									</div>
									<div className="flex py-2 px-[2%] flex-col w-full">
										<div className="text-lg font-semibold py-2">Image</div>

										<div className="flex items-center justify-center w-full">
											<label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full bg-transparent h-56 border border-gray-300 border-dashed rounded-lg cursor-pointer   ">
												<div className="flex flex-col items-center justify-center pt-5 pb-6">
													<svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
														<path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
													</svg>
													<p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
													<p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG </p>
												</div>

												<input id="dropzone-file" accept="image/*" onChange={(e) => dispatch(setThree({ communityImage: e.target.files[0] }))} type="file" className="w-full hidden border rounded-xl bg-transparent outline-none p-2" placeholder="Enter Community Name" />
											</label>
										</div>


									</div>
								</div>
							</div>
					}

					<h1 className="text-2xl font-semibold py-2 px-[2%] pn:max-sm:px-2 my-2">
						Ad Details
					</h1>
					<div className="my-2 rounded-xl bg-maincolor pn:max-sm:px-2">
						<div className="flex  py-2 px-[2%] flex-col w-full">
							<label
								htmlFor="adname"
								className="text-lg font-semibold py-2"
							>
								Ad Name<span className="text-[#FF4444]"> *</span>
							</label>
							<input
								name="myForm"
								id="adname"
								onChange={(e) => dispatch(setThree({ adName: e.target.value }))}
								value={three.adName}
								type="text"
								placeholder="Enter Ad Name"
								className="w-full border rounded-xl bg-transparent outline-none p-2"
							/>
						</div>
						<div className=" py-2 px-[2%]">
							<h1 className="text-lg font-semibold py-2">
								Select a goal for Ad
							</h1>
							<div className="sm:flex grid grid-cols-2 sm:flex-wrap gap-3">
								<div
									onClick={() => dispatch(setThree({ goal: "Sales" }))}
									// onClick={() => setThree({ ...three, goal: "Sales" })}
									className={`p-1 border-2 inline-block  text-text w-full sm:w-[220px] rounded-xl ${three.goal === "Sales"
										? "border-2 border-[#2D9AFF]"
										: " sm:hover:text-black"
										} `}
								>
									<div
										className={`p-2 h-full rounded-lg ${three.goal === "Sales"
											? "bg-[#2D9AFF]/30"
											: "bg-maincolor sm:hover:bg-[#3e3e3e]/80 sm:hover:text-white"
											}  `}
									>
										{" "}
										<h1 className="sm:text-2xl text-lg  font-robot font-bold py-1">
											Sales
										</h1>
										<p className="text-sm w-[90%]">
											Drive Sales To your desired destination
										</p>
									</div>
								</div>
								<div
									onClick={() => dispatch(setThree({ goal: "Awareness" }))}

									className={`p-1 border-2 inline-block w-full sm:w-[220px] rounded-xl ${three.goal === "Awareness"
										? "border-2 border-[#2D9AFF]"
										: " sm:hover:text-black"
										} `}
								>
									<div
										className={`p-2 h-full rounded-lg ${three.goal === "Awareness"
											? "bg-[#2D9AFF]/30"
											: "bg-maincolor sm:hover:bg-[#3e3e3e]/80 sm:hover:text-white"
											}  `}
									>
										<h1 className="sm:text-2xl text-lg  font-robot font-bold py-1">
											Awareness
										</h1>
										<p className="text-sm w-[90%]">
											Generate trust for your brand between audience.
										</p>
									</div>
								</div>
								<div

									onClick={() => dispatch(setThree({ goal: "Clicks" }))}
									className={` p-1 border-2 inline-block w-full sm:w-[220px] rounded-xl ${three.goal === "Clicks"
										? "border-2 border-[#2D9AFF]"
										: " sm:hover:text-black"
										} `}
								>
									<div
										className={`p-2 h-full rounded-lg ${three.goal === "Clicks"
											? "bg-[#2D9AFF]/30"
											: "bg-maincolor sm:hover:bg-[#3e3e3e]/80 sm:hover:text-white"
											}  `}
									>
										<h1 className="sm:text-2xl text-lg  font-robot font-bold py-1">
											Clicks
										</h1>
										<p className="text-sm w-[90%]">
											Bring Conversion for your platform.
										</p>
									</div>
								</div>
								<div

									onClick={() => dispatch(setThree({ goal: "Downloads" }))}

									className={` p-1 border-2 inline-block w-full sm:w-[220px] rounded-xl ${three.goal === "Downloads"
										? "border-2 border-[#2D9AFF]"
										: " sm:hover:text-black"
										} `}
								>
									<div
										className={`p-2 h-full rounded-lg ${three.goal === "Downloads"
											? "bg-[#2D9AFF]/30"
											: "bg-maincolor sm:hover:bg-[#3e3e3e]/80 sm:hover:text-white"
											}  `}
									>
										{" "}
										<h1 className="sm:text-2xl text-lg  font-robot font-bold py-1">
											Downloads
										</h1>
										<p className="text-sm w-[90%]">
											Get downloads for your app or digital product.
										</p>
									</div>
								</div>
								<div

									onClick={() => dispatch(setThree({ goal: "Views" }))}
									className={` p-1 border-2 inline-block w-full sm:w-[220px] rounded-xl ${three.goal === "Views"
										? "border-2 border-[#2D9AFF]"
										: " sm:hover:text-black"
										} `}
								>
									<div
										className={`p-2 h-full rounded-lg ${three.goal === "Views"
											? "bg-[#2D9AFF]/30"
											: "bg-maincolor sm:hover:bg-[#3e3e3e]/80 sm:hover:text-white"
											}  `}
									>
										{" "}
										<h1 className="sm:text-2xl text-lg  font-robot font-bold py-1">
											Views
										</h1>
										<p className="text-sm w-[90%]">
											Drive Traffice to your desired content.
										</p>
									</div>
								</div>
							</div>
						</div>
					</div>

					<div className="my-[4%] rounded-xl pn:max-sm:px-2 bg-maincolor">
						<div className="flex flex-col  py-2 px-[2%] w-full">
							<div className="flex items-center gap-1">
								<label
									htmlFor="headline"
									className="text-lg font-semibold py-2"
								>
									Headline
								</label>

							</div>
							<input
								name="myForm"
								disabled={three.isDisabled}
								id="headline"
								onChange={(e) =>
									dispatch(setThree({ Headline: e.target.value }))
								}
								value={three.Headline}
								type="text"
								placeholder="Never have a bad meal"
								className="w-full border rounded-xl bg-transparent outline-none p-2"
							/>
						</div>
						<div className="flex flex-col  py-2 px-[2%] w-full">
							<div className="flex items-center gap-1">
								<label htmlFor="des" className="text-lg font-semibold py-2">
									Description
								</label>

							</div>
							<input
								name="myForm"
								id="des"
								disabled={three.isDisabled}
								onChange={(e) =>
									dispatch(setThree({ Description: e.target.value }))
								}
								value={three.Description}
								type="text"
								placeholder="healthy and sweet dishes"
								className="w-full border rounded-xl bg-transparent outline-none p-2"
							/>
						</div>
						<div className="grid sm:grid-cols-2 px-[2%] w-full grid-cols-1 sm:gap-4 py-2">
							<div className="flex flex-col w-full group hover:rounded-[0] hover:rounded-t-2xl relative">
								<div className="flex w-full items-center gap-1">
									<label
										htmlFor="action"
										className="text-lg w-full font-semibold py-2"
									>
										Select Call To Action
									</label>

								</div>

								<Select
									defaultValue="Order Now"
									onValueChange={(value) => {
										dispatch(setThree({ Action: value }))
									}}
									className="dark:text-white dark:bg-[#323b4e] outline-none w-full dark:border-none "
								>
									<SelectTrigger className="w-full dark:text-white dark:bg-transparent rounded-xl outline-none dark:border ">
										<SelectValue

											className="dark:text-white dark:bg-[#323b4e] dark:border-none "
										/>
									</SelectTrigger>
									<SelectContent className="dark:text-white dark:bg-[#323b4e] outline-none dark:border-none ">
										<SelectGroup className="max-h-[200px] gap-1 w-full flex flex-col justify-center items-center">
											<SelectItem
												value="Order Now"
											>
												Order Now
											</SelectItem>

											<SelectItem
												value="Learn More"
											>
												Learn More
											</SelectItem>
											<SelectItem
												value="Install Now"
											>
												Install Now
											</SelectItem>
											<SelectItem
												value="Buy Now"
											>
												Buy Now
											</SelectItem>
											<SelectItem
												value=" Visit"
											>
												Visit
											</SelectItem>

										</SelectGroup>
									</SelectContent>
								</Select>
							</div>
							<div className="flex w-full flex-col">
								<div className="flex w-full items-center gap-1">
									<label
										htmlFor="link"
										className="text-lg w-full min-w-[230px] font-semibold py-2"
									>
										Paste Link To Call To Action
									</label>
								</div>
								<div className="flex justify-center  rounded-xl items-center border">
									<BsLink className="border-r-2 p-2 text-4xl " />
									<input
										name="myForm"
										id="link"
										onChange={(e) => dispatch(setThree({ link: e.target.value }))}
										value={three.link}
										type="text"
										placeholder="grovyo.com"
										className="w-full rounded-xl bg-transparent rounded-l-none outline-none p-2"
									/>
								</div>
							</div>
						</div>

						{three.isDisabled === false && <div className="my-3 mb-4 flex py-2 px-[2%] flex-col space-y-2">
							<h1 className="text-lg font-semibold">Ad images</h1>
							{/* <div>
                  Create up to 5 ads by Selecting multiple images from the
                  library or by uploading directly.
                </div> */}
							<div className="bg-[#F3F6F8] dark:bg-[#1e2129] dark:border dark:border-border flex sm:flex-row flex-col justify-between px-4 py-3 rounded-2xl items-center w-full">
								<div className="pn:max-sm:text-center pn:max-sm:w-[80%] 
                     pn:max-sm:py-2">
									{three.type === "skipable" || three.type === "non-skipable" ? "Videos must be MP4, AVI, or MOV, up to 5 mb" : "Image must be JPG, PNG , JPEG , or SVG, up to 5 mb"}
								</div>
								<div className="text-[#5585FF] border pn:max-sm:w-[80%] pn:max-sm:text-center hover:border-[#5585FF] p-2 rounded-2xl">
									<label htmlFor="files">Select and Upload</label>

									<input
										name="myForm"
										onChange={handleFileChanges}
										type="file"
										accept="video/*,image/*"
										id="files"
										className="hidden"
									/>
								</div>
							</div>
						</div>}
						{/* <div className="py-2 px-[2%]">
                  <div className="bg-[#F3F6F8] dark:bg-[#1e2129] dark:border dark:border-border py-2 px-[2%]  flex justify-between rounded-2xl items-center w-full">
                    <div className="flex justify-center overflow-hidden space-x-4 items-center">
                      <div>

                        {three.pic === "" && (
                          <Image
                            src={three.pic ? three.pic : adss}
                            alt={three.picname}
                            width={350}
                            height={200}
                            className="w-[60px] h-[60px] object-cover"
                          />
                        )}
                        {three.pic && (
                          <img
                            className="w-[60px] h-[60px]"
                            src={three.pic}
                            alt={three.picname}
                          />
                        )}
                    

                        {three.picsend &&
                          ["mp4", "avi", "mov"].includes(
                            three.picname.split(".").pop().toLowerCase()
                          ) && <div>Video</div>}
                      </div>
                      <div>
                        {three?.picname ? (
                          <>
                            {three?.picname.slice(0, 35)}
                            {three.picname.length > 35 && <>...</>}
                          </>
                        ) : (
                          "File Name"
                        )}
                      </div>
                    </div>

                    <div>
                      <AiOutlineClose className="text-2xl text-blue-600" />
                    </div>
                  </div>
                </div> */}
					</div>
				</div>

				<div
					className="md:col-span-3 pn:max-md:order-2 w-full min-h-full sm:overflow-y-auto sm:no-scrollbar rounded-xl max-h-[780px]">
					<div className=" rounded-xl w-full flex justify-center items-center">
						<div className="bg-maincolor rounded-xl flex flex-col w-[85%] sm:w-[500px] text-wrap md:w-[370px]  my-10 px-2">
							<div className="flex justify-between items-center w-full">
								<div className="flex items-center gap-2 pt-2 w-full">
									<div>
										{
											data?.communitywithDps.length > 0 ? <img
												width={40}
												height={30}
												alt="commmunityImage"
												src={comimage}
												className="min-w-[40px] min-h-[40px] rounded-xl h-[45px] w-[45px]"
											/>
												:

												three.communityImage ? <img src={(URL.createObjectURL(three.communityImage))} width={40}
													height={30}
													alt="commmunityImage"
													className="min-w-[40px] min-h-[40px] rounded-xl h-[45px] w-[45px]" />
													:
													<Image src={comdefault} width={40}
														height={30}
														alt="commmunityImage"
														className="min-w-[40px] min-h-[40px] rounded-xl h-[45px] w-[45px]" />
										}

									</div>
									<div className="flex -mt-2 flex-col ">
										{
											data?.communitywithDps.length > 0 ? <div className="font-semibold">{select}</div>
												:
												<div className="font-semibold">{three.communityName.length > 0 ? three.communityName : "Community Name"}</div>
										}

										<div className="flex items-center gap-1 text-xs">
											<div>By {brand}</div>
											<div>Sponsored</div>
										</div>

									</div>
								</div>
								<div>
									<BsThreeDotsVertical />
								</div>
							</div>
							<div className="mt-2 flex flex-col h-full w-full">

								{(!three.media && !three.isImage) && (
									<Image
										src={adss}
										alt={"image"}
										width={350}
										height={200}
										className="w-full h-[300px] min-w-full  rounded-lg object-cover"
									/>
								)}
								{(three.isImage && three.media) && (
									<Image
										src={typeof three.media === "string" ? three.media : URL.createObjectURL(three.media)}
										alt={three.media?.name}
										width={350}
										height={200}
										className="w-full h-[300px] max-w-[300px] max-h-[300px] min-w-full min-h-[250px] rounded-lg object-cover"
									/>
								)}

								{(!three.isImage && three.media) && (
									<video
										src={typeof three.media === "string" ? three.media : URL.createObjectURL(three.media)}
										className="w-full h-[300px] min-w-full rounded-2xl object-cover"
										width="350"
										height="200"
										controls
									/>
								)}

							</div>

							<div className="py-1 mt-2 font-semibold">
								{three?.Headline ?
									three?.Headline?.length > 20 ? `${three?.Headline?.slice(0, 20)}...` : three.Headline
									: "Never have a bad meal"}
							</div>
							<div className="py-1">
								{three.Description != ""
									? three.Description?.length > 50 ? `${three?.Description?.slice(0, 50)}...` : three.Description
									: "healthy and sweet dishes"}
							</div>

							<button className="text-white bg-black p-2 my-3 rounded-xl">
								{three.Action != "" ? three.Action : "Order Now"}
							</button>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Ad4;
