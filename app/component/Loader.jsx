import React from 'react'
import dynamic from 'next/dynamic'
const Lottie = dynamic(() => import("lottie-react"), { ssr: false })
import Loading from "../assests/loading.json"

const Loader = () => {
	return (
		<div className='fixed inset-0 w-screen flex justify-center items-center dark:bg-[#273142] bg-white h-screen'>
			<div>
				<Lottie animationData={Loading} loop size={250} />
			</div>
		</div>
	)
}

export default Loader