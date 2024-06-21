"use client"
import React, { Suspense } from 'react'
import dynamic from 'next/dynamic'
import { Toaster } from 'react-hot-toast'
import Loader from '../component/Loader'
const Component = dynamic(() => import('./regLay'), { ssr: false })

const page = ({ children }) => {
	return (
		<>
			<Toaster />
			<Suspense fallback={<Loader />}>
				<Component>{children}</Component>
			</Suspense>
		</>
	)
}

export default page
