import React from 'react'
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table"
import Image from 'next/image';
import dsh from '../assests/dsh.svg';
import { FaAngleDown } from 'react-icons/fa';
import { AiOutlinePlus } from 'react-icons/ai';

const Fetch = ({ data, length, router }) => {
	return (
		<>
			<div className=''>
				{/* <div className="flex justify-between bg-maincolor items-center px-4 sm:px-[2%]">
					<div className="sm:text-3xl text-xl py-5 font-semibold">Ads</div>
				</div> */}

				<div
					className={`p-3 ${length != 0
						? "max-w-full my-3 overflow-x-scroll no-scrollbar"
						: ""
						}`}
				>

					<Table className="w-full border bg-maincolor min-w-[900px] border-border">
						<TableHeader className="h-[70px] ">
							<TableRow>
								<TableHead className="text-center">NAME</TableHead>
								<TableHead className="text-center">STATUS</TableHead>
								<TableHead className="text-center">IMPRESSIONS</TableHead>
								<TableHead className="text-center">CONVERSION</TableHead>
								<TableHead className="text-center">CPC</TableHead>
								<TableHead className="text-center">START DATE</TableHead>
								<TableHead className="text-center">END Date</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>

							{length > 0 ? (
								<>
									{data?.map((d, i) => (
										<TableRow className="h-[70px] ">
											<TableCell className="font-medium text-center">
												{d?.a?.adname}
											</TableCell>
											<TableCell className="font-medium text-center">
												{d?.a?.status}
											</TableCell>
											<TableCell className="font-medium text-center">
												{d?.a?.impressions ? d?.a?.impressions : "No Data Yet"}
											</TableCell>
											<TableCell className="font-medium text-center">
												{d?.conversion ? parseFloat(d?.conversion).toFixed(1) : "No Data Yet"}
											</TableCell>
											<TableCell className="font-medium text-center">
												{d?.a?.cpc ? parseFloat(d?.a?.cpc).toFixed(1) : "No Data Yet"}
											</TableCell>
											<TableCell className="font-medium text-center">
												{d?.a?.startdate
													? d?.a?.startdate
													: "___"}
												{/* {d?.a?.startdate
													? formatDate(Number(d?.a?.startdate))
													: "___"} */}
											</TableCell>
											<TableCell className="font-medium text-center">
												{d?.a?.enddate}
											</TableCell>
										</TableRow>

									))}
									{/* <TableRow>
										<TableCell colSpan="7">
											<div className="flex justify-between  items-center p-3">
												<div className="font-semibold">
													{length}
													Ads
												</div>
												<div className="flex justify-center gap-5 items-center">
													<div className="flex justify-center space-x-1 p-1 px-3 rounded-full items-center">
														<div>{length}</div>
														<div>
															<FaAngleDown />
														</div>
													</div>
												</div>
											</div>
										</TableCell>
									</TableRow> */}
								</>
							) : (
								<>
									<TableRow>
										<TableCell colSpan="7">

											<div className="flex justify-center my-6 mb-7 items-center">
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
													{length}
													Ads
												</div>
												<div className="flex justify-center gap-5 items-center">
													<div className="flex justify-center space-x-1 p-1 px-3 border-2 rounded-full items-center">
														<div>{length}</div>
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

export default Fetch