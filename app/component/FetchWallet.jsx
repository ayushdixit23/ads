import React from 'react'
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table"
import moment from "moment";
import nodataw from "../assests/nodataw.svg";
import { AiOutlineSearch } from 'react-icons/ai';
import Image from 'next/image';
import { capitalizeFirstLetter } from '../utils/useful';

const FetchWallet = ({ data, length }) => {
	return (
		<div
			className={`p-3 h-full max-h-[340px] overflow-y-scroll no-scrollbar ${length != 0 ? null : "pn:max-md:hidden"}`}
		>
			<div className="flex justify-between bg-white dark:bg-[#0D0D0D] items-center w-full border rounded-t-2xl py-5 px-3 sm:px-[4%]">
				<div className="sm:text-2xl text-lg font-semibold">
					All Transaction Details
				</div>
				{/* <div className="flex pn:max-sm:hidden justify-center items-center space-x-2 md:w-[30%]">
					<div className="w-full border px-3 rounded-full ">
						<input
							type="text"
							className="w-full p-2 outline-none bg-transparent rounded-full"
							placeholder='Search " Transaction id "'
						/>
					</div>
					<div className="bg-[#1A73E8] p-2 rounded-full">
						<AiOutlineSearch className="text-2xl text-white" />
					</div>
				</div> */}
			</div>

			<div className="h-full bg-white dark:bg-[#0D0D0D] border no-scrollbar overflow-x-auto ">
				<Table>

					<TableHeader className="h-[70px]">
						<TableRow>
							<TableHead className="text-center">Transactions ID</TableHead>
							{/* <TableHead className="text-center">Name</TableHead> */}
							<TableHead className="text-center">Date</TableHead>
							<TableHead className="text-center">Status</TableHead>
							<TableHead className="text-center">Amount</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{length > 0 ? (
							<>
								{data?.map((p, i) => (
									<TableRow key={i} className="h-[70px]">
										<TableCell className=" text-center px-4 py-2">
											{p?.transactionid ? p?.transactionid : "-"}
										</TableCell>
										{/* <TableCell className=" text-center px-4 py-2">
											{p?.type ? p?.type : "-"}
										</TableCell> */}
										<TableCell className=" text-center px-4 py-2">
											{p?.createdAt
												? moment(p?.createdAt).format("DD/MM/yy")
												: "-"}
										</TableCell>
										<TableCell
											className="flex justify-center items-center text-center"
										>
											<div className={`text-center rounded-lg max-w-[135px] font-medium px-4 py-2 ${p?.status === "pending" ? "text-[#F9943B] bg-[#F9943B]/10" : null
												}
												${p?.status === "completed" ? "text-[#03A65A] bg-[#03A65A]/10" : null}
												${p?.status === "failed" ? "text-[#FC2E20] bg-[#FC2E20]/10" : null}`}>

												{p?.status ? capitalizeFirstLetter(p?.status) : "-"}
											</div>
										</TableCell>
										<TableCell className=" text-center px-4 py-2">
											₹{p?.amount ? p?.amount : "-"}
										</TableCell>
									</TableRow>
								))}
							</>
						) : (
							<>
								<TableRow>
									<TableCell colSpan="7">
										<div className="flex flex-col w-full justify-center bg-white dark:bg-[#0D0D0D] p-2 mb-3 py-5 pn:max-md:hidden items-center">
											<div>
												<div className="flex justify-center items-center">
													<Image src={nodataw} alt="nodataw" />
												</div>
												<div className="text-xl font-semibold text-center py-2">
													No transactions
												</div>
												<div className="py-2 text-sm text-[#8B8D97]">
													You have no transactions during this period.
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
	)
}

export default FetchWallet