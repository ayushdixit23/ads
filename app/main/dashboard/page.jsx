
"use client"
import IndividaulDashboard from '@/app/component/IndividualDashboard'
import OrganisationDashboard from '@/app/component/OrganisationDashboard'
import { useAuthContext } from '@/app/utils/AuthWrapper'
import React from 'react'

const page = () => {
	const { data } = useAuthContext()
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