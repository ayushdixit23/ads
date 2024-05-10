"use client"
import AdsIndividual from '@/app/component/AdsIndividual'
import AdsOrganisation from '@/app/component/AdsOrganisation'
import { useAuthContext } from '@/app/utils/AuthWrapper'
import React from 'react'

const page = () => {
	const { data } = useAuthContext()
	return (
		<div>
			{data?.type === "Individual" ? <AdsIndividual /> : <AdsOrganisation />}
		</div>
	)
}

export default page