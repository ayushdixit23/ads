"use client"
import { useRouter, useSearchParams } from "next/navigation"
import React, { useEffect } from "react"
import axios from "axios"
import toast from "react-hot-toast"
import Cookies from "js-cookie"
import Loader from "../component/Loader"
import { API } from "@/Essentials"
import { useAuthContext } from "../utils/AuthWrapper"

const Component = () => {
	const search = useSearchParams()
	const { setAuth } = useAuthContext()
	const id = search.get("zray")
	const router = useRouter()
	const path = search.get("path")
	const waitkrnevalafunc = async (data) => {
		try {
			Cookies.remove("axetkn")
			Cookies.remove("rvktkn")

			const expirationDate = new Date();
			expirationDate.setDate(expirationDate.getDate() + 7);

			Cookies.set(`axetkn`, data.access_token, { expires: expirationDate });
			// Set refresh token cookie with expiration time of 7 days
			Cookies.set(`rvktkn`, data.refresh_token, { expires: expirationDate });

			return true;
		} catch (e) {
			console.log(e);
		}
	};

	// https://ads.grovyo.com/alginsf?zray=${id}

	const f = async () => {
		// const res = await axios.get(`https://work.grovyo.xyz/api/loginwithworkspace/${id}`)
		const res = await axios.get(`${API}/loginforAdspace/${id}`)
		console.log(res.data)
		if (res.data?.success) {
			const a = await waitkrnevalafunc(res.data);
			setAuth(true)
			if (a === true) {
				if (path) {
					router.push(path)
				} else {
					router.push("/main/dashboard")
				}
			} else {
				router.push("/login")
			}

		} else {
			toast.error("Something Went Wrong");
			router.push("/login")
		}
	}

	useEffect(() => {
		if (id) {
			f()
		}
	}, [id])


	return (
		<>
			<Loader />
		</>
	)
}

export default Component