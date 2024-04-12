"use client";
import Image from 'next/image';
import React, { useEffect, useState } from 'react'
import w1 from "../assests/Image1.jpg"
import w2 from "../assests/Image2.jpg"
import w3 from "../assests/Image3.jpg"
import Link from 'next/link';
import Number from "../login/Number"
import { useSelector } from 'react-redux';

const Lotties = () => {
	const slides = [{ img: w1 }, { img: w2 }, { img: w3 }];
	const load = useSelector((state) => state.register.load)
	const nextSlide = () => {
		setActiveSlide((prevSlide) => (prevSlide + 1) % slides.length);
	};
	const [activeSlide, setActiveSlide] = useState(0);

	useEffect(() => {
		const interval = setInterval(nextSlide, 3000);
		return () => {
			clearInterval(interval);
		};
	}, []);

	if (load) {
		return (
			<div className="flex justify-center items-center fixed w-screen h-screen inset-0">
				<div>
					<div role="status">
						<svg aria-hidden="true" class="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
							<path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
						</svg>
						<span class="sr-only">Loading...</span>
					</div>
				</div>
			</div>
		);
	}

	return (
		<div>
			< div className="h-screen w-screen dark:bg-[#1c1d21] flex sm:flex-row-reverse pn:max-sm:flex-col" >
				<div className="w-[50%] h-full flex py-20 justify-end items-center pn:max-sm:hidden">
					<div className="overflow-hidden w-[98%] rounded-xl bg-[#A5BEFE] h-[95vh] pt-36">
						<div
							className="relative flex transition-transform duration-500 transform"
							style={{
								transform: `translateX(-${activeSlide * 100}%)`,
							}}
						>
							{slides.map((slide, index) => (

								<div
									key={index}
									className="h-[50vh] w-full flex-col flex-shrink-0 bg-lightgray flex items-center justify-center text-black text-2xl"
								>
									<div className="mb-10 font-semibold text-3xl text-center text-[#0066FF]">{slide.msg}</div>
									<Image priority src={slide.img} alt="hlo" />
								</div>

							))}
						</div>

						<div className="flex justify-center pt-24">
							{slides.map((_, index) => (
								<div
									key={index}
									className={`w-2 h-2 z-30 duration-500 rounded-full mx-2 ${index === activeSlide ? 'bg-blue-500' : 'bg-white'
										}`}
								></div>
							))}
						</div>

					</div>
				</div>
				<div className=" w-[50%] h-[100%] relative flex justify-center items-center pn:max-sm:h-[100%]">
					<Number />
				</div>
				<div className="flex absolute bottom-3 w-[100%] flex-wrap justify-start items-center dark:text-white text-[#414141] gap-4 text-[12px] select-none">
					<div className="flex sm:bottom-3 w-[50%] pn:max-sm:w-full flex-wrap justify-center items-center  dark:text-white text-[#414141] gap-4 text-[12px] select-none">
						<Link href={"/terms"}>T&C</Link>
						<Link href={"/privacy"}>Privacy</Link>
						<Link href={"/contact"}>Contact Us</Link>
						<Link href={"/about"}>About</Link>
						<Link href={"/requestdata"}>Request Data</Link>
						<Link href={"/deleterequest"}>Delete Request</Link>
						<Link href={"/refundpolicy"}>Refund Policy</Link>

					</div>
				</div>
			</div >
		</div>
	)
}

export default Lotties

