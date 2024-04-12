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
	const postid = search.get("pstiq")
	const router = useRouter()
	const path = search.get("path")
	const waitkrnevalafunc = async (data) => {
		try {
			Cookies.remove("axetkn")
			Cookies.remove("rvktkn")
			// localStorage.removeItem("axetkn")
			// localStorage.removeItem("rvktkn")


			Cookies.set(`axetkn`, data?.access_token)
			Cookies.set(`rvktkn`, data?.refresh_token)
			// localStorage.setItem(`axetkn`, data?.access_token)
			// localStorage.setItem(`rvktkn`, data?.refresh_token)

			Cookies.set("post", JSON.stringify(data?.postData))
			Cookies.set("postid", postid)
			// localStorage.setItem(`excktn${data.sessionId}`, data.access_token)
			// localStorage.setItem(`frhktn${data.sessionId}`, data.refresh_token)
			return true;
		} catch (e) {
			console.log(e);
		}
	};

	const f = async () => {
		// const res = await axios.get(`https://work.grovyo.xyz/api/loginwithworkspace/${id}`)
		const res = await axios.get(`${API}/loginwithworkspace/${id}/${postid}`)
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