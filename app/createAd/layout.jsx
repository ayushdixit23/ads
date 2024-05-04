"use client"
import React, { Suspense } from 'react'
import dynamic from 'next/dynamic'
import { Toaster } from 'react-hot-toast'
import Loader from '../component/Loader'
const Component = dynamic(() => import('./laycom'), { ssr: false })

const page = () => {
	return (
		<>
			<Toaster />
			<Suspense fallback={<Loader />}>
				<Component />
			</Suspense>
		</>
	)
}

export default page
