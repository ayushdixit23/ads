import Image from 'next/image';
import React, { useEffect, useState } from 'react'
import w1 from "../assests/Image1.jpg"
import w2 from "../assests/Image2.jpg"
import w3 from "../assests/Image3.jpg"

const Lotties = () => {
	const [activeSlide, setActiveSlide] = useState(0);
	const slides = [{ img: w1 }, { img: w2 }, { img: w3 }];
	const nextSlide = () => {
		setActiveSlide((prevSlide) => (prevSlide + 1) % slides.length);
	};

	useEffect(() => {
		const interval = setInterval(nextSlide, 3000);
		return () => {
			clearInterval(interval);
		};
	}, []);
	return (
		<div className="overflow-hidden w-[100%] rounded-xl h-[95vh] pt-36">
			<div
				className="relative flex rounded-xl transition-transform duration-500 transform"
				style={{
					transform: `translateX(-${activeSlide * 100}%)`,
				}}
			>
				{slides.map((slide, index) => (

					<div
						key={index}
						className="h-[50vh] w-full flex-col flex-shrink-0 bg-lightgray flex items-center justify-center text-black text-2xl"
					>
						{/* <div className="mb-10 font-semibold text-3xl text-center text-[#0066FF]">{slide.msg}</div> */}
						<Image priority src={slide.img} alt="hlo" className='h-screen w-[80%]' />
					</div>

				))}
			</div>

			<div className="flex justify-center pt-24">
				{slides.map((_, index) => (
					<div
						key={index}
						className={`w-2 h-2 duration-500 rounded-full mx-2 ${index === activeSlide ? 'bg-blue-500' : 'bg-white'
							}`}
					></div>
				))}
			</div>

		</div>
	)
}

export default Lotties