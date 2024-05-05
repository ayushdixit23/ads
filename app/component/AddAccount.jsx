"use client"
import { API } from '@/Essentials'
import axios from 'axios'
import React, { useState } from 'react'
import { useAuthContext } from '../utils/AuthWrapper'
import { useRouter } from 'next/navigation'
import Cookies from 'js-cookie'
import { RxCross2 } from 'react-icons/rx'
import { GrFormAdd } from 'react-icons/gr'
import Image from 'next/image'
import toast, { Toaster } from 'react-hot-toast'

const AddAccount = ({ setLogin, setPop, login }) => {
	const { data, f } = useAuthContext()
	const [details, setDetails] = useState({
		fullname: "",
		email: "",
		phone: "",
		// bio: "my bio my rule",
		username: "",
		image: ""
	})

	const router = useRouter()

	const submitter = async (e) => {
		e.preventDefault()
		if (!details.fullname || !details.username || !details.phone || !details.email || !details.image) {
			toast.error("Enter All Details!")
			return
		}
		try {
			const formDataToSend = new FormData()
			const { email, fullname, image, phone, username } = details
			formDataToSend.append("fullname", fullname)
			formDataToSend.append("email", email)
			formDataToSend.append("image", image)
			formDataToSend.append("phone", 91 + phone)
			formDataToSend.append("username", username)

			const res = await axios.post(`${API}/addAccount/${data?.userid}/${data?.advid}`, formDataToSend)
			console.log(res.data)
			if (res.data.success) {
				Cookies.set(`axetkn`, res.data.access_token)
				Cookies.set(`rvktkn`, res.data.refresh_token)
				const cookies = Cookies.get("axetkn")
				await f(cookies)

				router.push("/main/dashboard")
			}
		} catch (error) {
			console.log(error)
		}
	}

	const handleChangePhotoClick = () => {
		document.getElementById("image").click();
	};

	return (
		<>
			<Toaster />
			<div className='w-full flex flex-col gap-3 h-full p-5'>
				<div className='flex justify-between items-center '>
					<div className='text-2xl font-bold'>Create Account</div>
					<RxCross2 onClick={() => setPop(false)} className='text-2xl font-bold' />
				</div>
				<div>
					Already have an account? <span onClick={() => setLogin(!login)} className='font-semibold'>Login</span>
				</div>
				<div className='w-full h-full'>
					<div>
						<div className="flex flex-col justify-center items-center">
							<label
								htmlFor="image"
								className="w-[80px] relative overflow-hidden mb-2 items-center justify-center h-[80px] rounded-2xl border-2 flex flex-col"
							>
								{details.image != "" ? null : (
									<div
										className="flex justify-center flex-col  items-center
			 "
									>
										<GrFormAdd className="text-3xl" />
									</div>
								)}
								{details.image != "" ? (
									<>
										<Image
											src={details.image}
											width={120}
											height={120}
											className="object-fill "
											alt="image"
										/>
									</>
								) : null}
							</label>
							{details.image == "" && (
								<div
									onClick={handleChangePhotoClick}
									className="text-sm pb-2 text-[#0075ff] "
								>
									Add profile
								</div>
							)}

							<input
								id="image"

								onChange={(e) =>
									setDetails({
										...details,
										image: URL.createObjectURL(e.target.files[0]),
									})
								}
								className="w-full hidden"
								type="file"
							/>
						</div>
						<div className='flex justify-center items-center'>
							{details.image != "" ? (
								<button
									onClick={handleChangePhotoClick}
									className="text-sm pb-2 text-[#0075ff] "
								>
									Change Picture
								</button>
							) : (
								<></>
							)}
						</div>
					</div>
					<div className='grid sm:grid-cols-2 text-white gap-3 w-full'>
						<div className='w-full relative h-16'>
							<input type="text" value={details.fullname} onChange={(e) => setDetails({ ...details, fullname: e.target.value })} placeholder='Enter fullname' className="py-1 transition-colors bg-transparent placeholder-black dark:placeholder-white h-10 peer outline-none focus:border-[#5c73db] focus:border-b-2 absolute top-0 left-0 duration-300 border-b-2 w-full" />
						</div>
						<div className='w-full relative h-16'>
							<input type="text" value={details.username} onChange={(e) => setDetails({ ...details, username: e.target.value })} placeholder='Enter Username' className="py-1 transition-colors bg-transparent placeholder-black dark:placeholder-white h-10 peer outline-none focus:border-[#5c73db] focus:border-b-2 absolute top-0 left-0 duration-300 border-b-2 w-full" />
						</div>
						<div className='w-full relative h-16'>
							<input type="email" value={details.email} onChange={(e) => setDetails({ ...details, email: e.target.value })} placeholder='Enter Email' className="py-1 transition-colors bg-transparent placeholder-black dark:placeholder-white h-10 peer outline-none focus:border-[#5c73db] focus:border-b-2 absolute top-0 left-0 duration-300 border-b-2 w-full" />
						</div>
						<div className='w-full relative h-16'>
							<input type="tel" value={details.phone} onChange={(e) => setDetails({ ...details, phone: e.target.value })} placeholder='Enter Mobile Number' className="py-1 transition-colors bg-transparent placeholder-black dark:placeholder-white h-10 peer outline-none focus:border-[#5c73db] focus:border-b-2 absolute top-0 left-0 duration-300 border-b-2 w-full" />
						</div>
					</div>
				</div>

				<div onClick={submitter} className='bg-[#282828] text-white -mt-3 flex justify-center items-center rounded-md p-3 font-semibold'>Create</div>

			</div>
		</>
	)
}

export default AddAccount