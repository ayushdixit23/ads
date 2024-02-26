"use client"
import useAdFetching from '@/app/useFetch/useAdFetching';
import { getData } from '@/app/utils/useful';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table"
import dsh from '../../assests/dsh.svg';
import Image from 'next/image';
import React, { useEffect, useState } from 'react'
import { AiOutlinePlus } from 'react-icons/ai';
import { useRouter } from 'next/navigation';
import { FaAngleDown } from 'react-icons/fa';

const page = () => {
	const [campdata, setCampdata] = useState([]);
	const router = useRouter()
	const { advid } = getData()
	const { CampaignFetch } = useAdFetching()

	function formatDate(inputDate) {
		const date = new Date(inputDate);
		const day = date.getDate();
		const month = date.getMonth() + 1;
		const year = date.getFullYear();
		const formattedDay = day < 10 ? `0${day}` : day;
		const formattedMonth = month < 10 ? `0${month}` : month;
		const formattedDate = `${formattedDay} ${formattedMonth} ${year}`;
		return formattedDate;
	}

	const fetchData = async () => {
		const data = await CampaignFetch(advid)
		setCampdata(data)
	}

	useEffect(() => {
		if (advid) {
			fetchData()
		}
	}, [advid])
	return (
		<>
			<div className=''>
				{/* <div className="flex justify-between bg-maincolor items-center px-4 sm:px-[2%]">
					<div className="sm:text-3xl text-xl py-5 font-semibold">Ads</div>
				</div> */}

				<div
					className={`p-3 ${campdata?.length != 0
						? "max-w-full my-3 overflow-x-scroll no-scrollbar"
						: "pn:max-md:hidden"
						}`}
				>

					<Table className="w-full border bg-maincolor min-w-[900px] border-border">
						<TableHeader>
							<TableRow>
								<TableHead className="text-center">NAME</TableHead>
								<TableHead className="text-center">STATUS</TableHead>
								<TableHead className="text-center">INTERACTION</TableHead>
								<TableHead className="text-center">CONVERSION</TableHead>
								<TableHead className="text-center">AVG. COST</TableHead>
								<TableHead className="text-center">START DATE</TableHead>
								<TableHead className="text-center">DURATION (in days)</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>

							{campdata?.length > 0 ? (
								<>
									{campdata?.map((d, i) => (
										<TableRow>
											<TableCell className="font-medium text-center">
												{d?.a?.adname}
											</TableCell>
											<TableCell className="font-medium text-center">
												{d?.a?.status}
											</TableCell>
											<TableCell className="font-medium text-center">
												__
											</TableCell>
											<TableCell className="font-medium text-center">
												__
											</TableCell>
											<TableCell className="font-medium text-center">
												{d?.a?.budget ? d?.a?.budget : "___"}
											</TableCell>
											<TableCell className="font-medium text-center">
												{d?.a?.startdate
													? formatDate(Number(d?.a?.startdate))
													: "___"}
											</TableCell>
											<TableCell className="font-medium text-center">
												{d?.a?.enddate} {d?.a?.enddate == "1" ? "day" : "days"}
											</TableCell>
										</TableRow>

									))}
									<TableRow>
										<TableCell colSpan="7">
											<div className="flex justify-between  items-center p-3">
												<div className="font-semibold">
													{campdata?.length}
													Ads
												</div>
												<div className="flex justify-center gap-5 items-center">
													<div className="flex justify-center space-x-1 p-1 px-3 rounded-full items-center">
														<div>{campdata?.length}</div>
														<div>
															<FaAngleDown />
														</div>
													</div>
												</div>
											</div>
										</TableCell>
									</TableRow>
								</>
							) : (
								<>
									<TableRow>
										<TableCell colSpan="7">

											<div className="flex justify-center pn:max-md:hidden my-6 mb-7 items-center">
												<div>
													<div className="flex justify-center items-center">
														<Image src={dsh} alt="dsh" />
													</div>
													<div className="text-xl font-semibold text-center py-2">
														No Analytics Yet?
													</div>
													<div className="py-2 text-sm text-[#8B8D97]">
														Add a new Campaign to see Live Analytics here.
													</div>
													<div className="text-white cursor-pointer bg-[#2D9AFF] flex justify-center items-center p-2 rounded-xl gap-3">
														<div>
															<AiOutlinePlus />
														</div>
														<div
															onClick={() => {
																router.push(`/createAd?step=1`);
															}}
														>
															Create Ad
														</div>
													</div>
												</div>
											</div>
											<div className="flex justify-between  items-center border-y-2 p-3">
												<div className="font-semibold">
													{campdata?.length}
													Ads
												</div>
												<div className="flex justify-center gap-5 items-center">
													<div className="flex justify-center space-x-1 p-1 px-3 border-2 rounded-full items-center">
														<div>{campdata?.length}</div>
														<div>
															<FaAngleDown />
														</div>
													</div>
												</div>
											</div>
										</TableCell>
									</TableRow>
								</>
							)}
						</TableBody>
					</Table>
				</div>
			</div>
		</>
	)
}

export default page