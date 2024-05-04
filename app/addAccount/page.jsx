"use client"
import { API } from '@/Essentials'
import axios from 'axios'
import React, { useState } from 'react'
import { useAuthContext } from '../utils/AuthWrapper'
import { useRouter } from 'next/navigation'
import Cookies from 'js-cookie'

const page = () => {
	const { data, f } = useAuthContext()
	const [details, setDetails] = useState({
		fullname: "Ayush Dixit Test",
		email: "a@g.com",
		phone: "1234567891",
		bio: "my bio my rule",
		username: "etyuuk",
		image: ""
	})

	const router = useRouter()

	const submitter = async (e) => {
		e.preventDefault()
		try {
			const formDataToSend = new FormData()
			const { bio, email, fullname, image, phone, username } = details
			formDataToSend.append("fullname", fullname)
			formDataToSend.append("email", email)
			formDataToSend.append("image", image)
			formDataToSend.append("bio", bio)
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

	return (
		<div className='flex justify-center items-center w-full flex-col gap-3 '>
			<div>
				<input type="text" value={details.fullname} placeholder='Fullname' onChange={(e) => setDetails({ ...details, fullname: e.target.value })} />
			</div>
			<div>
				<input type="email" value={details.email} placeholder='email' onChange={(e) => setDetails({ ...details, email: e.target.value })} />
			</div>
			<div>
				<input type="tel" value={details.phone} placeholder='phone' onChange={(e) => setDetails({ ...details, phone: e.target.value })} />
			</div>
			<div>
				<input type="text" value={details.bio} placeholder='bio' onChange={(e) => setDetails({ ...details, bio: e.target.value })} />
			</div>
			<div>
				<input type="text" value={details.username} placeholder='username' onChange={(e) => setDetails({ ...details, username: e.target.value })} />
			</div>
			<div>
				<input type="file" name='image' onChange={(e) => setDetails({ ...details, bio: e.target.files[0] })} />
			</div>

			<div><button onClick={submitter}>Submit</button></div>
		</div>
	)
}

export default page