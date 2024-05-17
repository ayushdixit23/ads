import { API } from '@/Essentials'
import { TableCell, TableRow } from '@/components/ui/table'
import axios from 'axios'
import React, { useState } from 'react'
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io'

const TableAds = ({ d }) => {
	const [state, setState] = useState("")
	const [toggle, setToggle] = useState("")

	const pauseAd = async (id) => {
		try {
			const res = await axios.post(`${API}/pausead/${id}`)
			console.log(res.data)
		} catch (error) {
			console.log(error)
		}
	}

	const runAd = async (id) => {
		try {
			const res = await axios.post(`${API}/runad/${id}`)
			console.log(res.data)
		} catch (error) {
			console.log(error)
		}
	}

	return (
		<>
			<TableRow className="h-[70px] ">
				<TableCell className="font-medium text-center">
					{d?.a?.adname}
				</TableCell>
				<TableCell className="font-medium text-center">
					{d?.a?.status === "review" ? "in review" : d?.a?.status}
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

				</TableCell>
				<TableCell className="font-medium text-center">
					{d?.a?.enddate}
				</TableCell>
				{/* <TableCell className="font-medium text-center">

					{d?.a.status === "review" ? < div className="flex flex-col w-full  bg-[#f7f7f7] dark:bg-[#c4c0c0] rounded-xl">
						<div

							className="flex justify-between items-center relative p-1.5 cursor-pointer h-full gap-2 px-2 w-full text-sm"
						>
							<div className="flex items-center gap-2">

								<div className="text-[#0d0d0d] text-xs dark:text-white font-semibold">
									pending
								</div>
							</div>

							<div className="text-lg ">
								{toggle ? (
									<IoIosArrowUp />
								) : (
									<IoIosArrowDown />
								)}
							</div>

							
						</div>
					</div>

						:
						< div className="flex flex-col w-full  bg-[#f7f7f7] dark:bg-[#121212]  rounded-xl">
							<div
								onClick={() => setToggle(!toggle)}
								className="flex justify-between items-center relative p-1.5 cursor-pointer h-full gap-2 px-2 w-full text-sm"
							>
								<div className="flex items-center gap-2">

									<div className="text-[#0d0d0d] text-xs dark:text-white font-semibold">
										{state ? state : d?.a?.status}
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
									<div className="flex flex-col gap-3 px-2 py-3">

										<div onClick={() => { setState("Pause"); pauseAd(d?.a?._id) }}>Pause</div>
										<div onClick={() => { setState("Run"); runAd(d?.a?._id) }}>Run</div>
									</div>
								</div>
							</div>
						</div>
					}

				</TableCell> */}
			</TableRow >
		</>
	)
}

export default TableAds