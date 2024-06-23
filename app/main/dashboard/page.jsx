
"use client"
import IndividaulDashboard from '@/app/component/IndividualDashboard'
import Loader from '@/app/component/Loader'
import OrganisationDashboard from '@/app/component/OrganisationDashboard'
import { useAuthContext } from '@/app/utils/AuthWrapper'
import Cookies from 'js-cookie'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const page = () => {
	const { data, f } = useAuthContext()
	const router = useRouter()

	const [loading, setLoading] = useState(true)

	useEffect(() => {
		if (!data?.id) {
			setLoading(true)
			const a = Cookies.get("axetkn")
			f(a)
			setLoading(false)
		} else {
			router.refresh()
			setLoading(false)
		}
	}, [])

	if (loading) {
		return <Loader />;
	}

	return (
		<>
			<div className='h-full'>
				{
					data?.type === "Individual" ? <IndividaulDashboard /> : <OrganisationDashboard />
				}

			</div>
		</>
	)
}

export default page