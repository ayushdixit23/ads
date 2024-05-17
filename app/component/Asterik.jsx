import React from 'react'
import { FaAsterisk } from 'react-icons/fa'

const Asterik = ({ text }) => {

	return (
		<div className='flex items-center gap-1'>
			<div>{text}</div>
			<FaAsterisk className='text-red-800 text-[10px]' />
		</div>
	)
}

export default Asterik