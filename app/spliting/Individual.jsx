import Image from 'next/image';
import React from 'react'
import { GrFormAdd } from 'react-icons/gr';

const Individual = ({
	details,
	handleChangePhotoClick,
	setDetails,
	dispatch,
	setChecked,
	checked,
	handleSave,
	setChange,
	onSignup,
	dataValid
}) => {
	return (
		<>
			<div className="flex justify-center px-[2%] flex-col">
				<div className="flex flex-col justify-center items-center">
					<label
						htmlFor="image"
						className="w-[80px] relative overflow-hidden mb-2 items-center justify-center h-[80px] rounded-2xl border-2 flex flex-col"
					>
						{details.myImage != "" ? null : (
							<div
								className="flex justify-center flex-col  items-center
			 "
							>
								<GrFormAdd className="text-3xl" />
							</div>
						)}
						{details.myImage != "" ? (
							<>
								<Image
									src={details.myImage}
									width={120}
									height={120}
									className="object-fill"
									alt="image"
								/>
							</>
						) : null}
					</label>
					{details.myImage == "" && (
						<div
							onClick={handleChangePhotoClick}
							className="text-sm pb-2 text-[#0075ff] "
						>
							Add profile
						</div>
					)}

					<input
						id="image"
						placeholder="abc@gmail.com"
						onChange={(e) =>
							setDetails({
								...details,
								myImage: URL.createObjectURL(e.target.files[0]),
								img: e.target.files[0],
							})
						}
						className="w-full hidden"
						type="file"
					/>
				</div>
				{details.myImage != "" && (
					<button
						onClick={handleChangePhotoClick}
						className="text-sm pb-2 text-[#0075ff] "
					>
						Change Picture
					</button>
				)}
				<div className="grid sm:grid-cols-2 gap-4 my-2 mt-4">
					{/* first */}
					<div className="relative h-16">
						<input
							placeholder="John"
							id="first"
							onChange={(e) =>
								setDetails({
									...details,
									firstName: e.target.value,
								})
							}
							value={details.firstName}
							className="py-1 transition-colors bg-maincolor placeholder-transparent h-10 peer outline-none focus:border-[#5c73db] focus:border-b-2 absolute top-0 left-0 duration-300 border-b w-full"
							type="text"
						/>
						<label
							htmlFor="first"
							className="peer-focus:text-sm peer-placeholder-shown:text-base peer-placeholder-shown:top-1 -top-4 left-0 text-sm  peer-focus:-top-4 absolute pb-2 transition-all duration-300 font-semibold"
						>
							First Name
						</label>
					</div>

					{/* second */}
					<div className="relative w-full h-16">
						<input
							placeholder="Doe"
							id="last"
							onChange={(e) =>
								setDetails({
									...details,
									lastName: e.target.value,
								})
							}
							value={details.lastName}
							className="py-1 transition-colors bg-maincolor placeholder-transparent h-10 peer outline-none focus:border-[#5c73db] focus:border-b-2 absolute top-0 left-0 duration-300 border-b w-full"
							type="text"
						/>
						<label
							htmlFor="last"
							className="peer-focus:text-sm peer-placeholder-shown:text-base peer-placeholder-shown:top-1 -top-4 left-0 text-sm  peer-focus:-top-4 absolute pb-2 transition-all duration-300 font-semibold"
						>
							Last Name
						</label>
					</div>

					{/* three */}
				</div>

				{/* file| */}
				<div className="grid sm:grid-cols-2 my-2 gap-4">
					<div className="relative h-16 ">
						<input
							placeholder="1234567890"
							id="numbers"
							onChange={(e) =>
								setDetails({
									...details,
									phoneNumber: e.target.value,
								})
							}
							value={details.phoneNumber}
							className="py-1 transition-colors bg-maincolor placeholder-transparent h-10 peer outline-none focus:border-[#5c73db] focus:border-b-2 absolute top-0 left-0 duration-300 border-b w-full"
							type="tel"
						/>
						<label
							htmlFor="numbers"
							className="peer-focus:text-sm peer-placeholder-shown:text-base peer-placeholder-shown:top-1 -top-4 left-0 text-sm  peer-focus:-top-4 absolute pb-2 transition-all duration-300 font-semibold"
						>
							Phone Number
						</label>
					</div>
					<div className="relative w-full h-16">
						<input
							id="emails"
							placeholder="abc@gmail.com"
							onChange={(e) =>
								setDetails({
									...details,
									email: e.target.value,
								})
							}
							value={details.email}
							className="py-1 transition-colors bg-maincolor placeholder-transparent h-10 peer outline-none focus:border-[#5c73db] focus:border-b-2 absolute top-0 left-0 duration-300 border-b w-full"
							type="email"
						/>
						<label
							htmlFor="email"
							className="peer-focus:text-sm peer-placeholder-shown:text-base peer-placeholder-shown:top-1 -top-4 left-0 text-sm  peer-focus:-top-4 absolute pb-2 transition-all duration-300 font-semibold"
						>
							Email
						</label>
					</div>
				</div>
				<div className="grid sm:grid-cols-2 my-2 gap-4">
					<div className="relative h-16 ">
						<input
							minLength={8}
							placeholder="Enter Password"
							id="numberPass"
							onChange={(e) =>
								setDetails({
									...details,
									password: e.target.value,
								})
							}
							value={details.password}
							className="py-1 transition-colors bg-maincolor placeholder-transparent h-10 peer outline-none focus:border-[#5c73db] focus:border-b-2 absolute top-0 left-0 duration-300 border-b w-full"
							type="password"
						/>
						<label
							htmlFor="numberPass"
							className="peer-focus:text-sm peer-placeholder-shown:text-base peer-placeholder-shown:top-1 -top-4 left-0 text-sm  peer-focus:-top-4 absolute pb-2 transition-all duration-300 font-semibold"
						>
							Password
						</label>
					</div>
					<div className="relative w-full h-16">
						<input
							minLength={8}
							id="mypass"
							placeholder="abc@gmail.com"
							onChange={(e) =>
								setDetails({
									...details,
									confirmPass: e.target.value,
								})
							}
							value={details.confirmPass}
							className="py-1 transition-colors bg-maincolor placeholder-transparent h-10 peer outline-none focus:border-[#5c73db] focus:border-b-2 absolute top-0 left-0 duration-300 border-b w-full"
							type="password"
						/>
						<label
							htmlFor="mypass"
							className="peer-focus:text-sm peer-placeholder-shown:text-base peer-placeholder-shown:top-1 -top-4 left-0 text-sm  peer-focus:-top-4 absolute pb-2 transition-all duration-300 font-semibold"
						>
							Confirm Password
						</label>
					</div>
				</div>
				<div className="relative h-16 my-2">
					<input
						placeholder="Your Address"
						id="address"
						onChange={(e) =>
							setDetails({
								...details,
								address: e.target.value,
							})
						}
						value={details.address}
						className="py-1 transition-colors bg-maincolor placeholder-transparent h-10 peer outline-none focus:border-[#5c73db] focus:border-b-2 absolute top-0 left-0 duration-300 border-b w-full"
						type="text"
					/>
					<label
						htmlFor="address"
						className="peer-focus:text-sm peer-placeholder-shown:text-base peer-placeholder-shown:top-1 -top-4 left-0 text-sm  peer-focus:-top-4 absolute pb-2 transition-all duration-300 font-semibold"
					>
						Address
					</label>
				</div>
				<div className="grid sm:grid-cols-2 my-2 gap-4">
					<div className="relative h-16 ">
						<input
							placeholder="Kanpur"
							id="city"
							onChange={(e) =>
								setDetails({
									...details,
									city: e.target.value,
								})
							}
							value={details.city}
							className="py-1 transition-colors bg-maincolor placeholder-transparent h-10 peer outline-none focus:border-[#5c73db] focus:border-b-2 absolute top-0 left-0 duration-300 border-b w-full"
							type="text"
						/>
						<label
							htmlFor="city"
							className="peer-focus:text-sm peer-placeholder-shown:text-base peer-placeholder-shown:top-1 -top-4 left-0 text-sm  peer-focus:-top-4 absolute pb-2 transition-all duration-300 font-semibold"
						>
							City
						</label>
					</div>

					{/* state */}
					<div className="relative h-16">
						<input
							placeholder="Uttar Pradesh"
							id="state"
							onChange={(e) =>
								setDetails({
									...details,
									state: e.target.value,
								})
							}
							value={details.state}
							className="py-1 transition-colors bg-maincolor placeholder-transparent h-10 peer outline-none focus:border-[#5c73db] focus:border-b-2 absolute top-0 left-0 duration-300 border-b w-full"
							type="text"
						/>
						<label
							htmlFor="state"
							className="peer-focus:text-sm peer-placeholder-shown:text-base peer-placeholder-shown:top-1 -top-4 left-0 text-sm  peer-focus:-top-4 absolute pb-2 transition-all duration-300 font-semibold"
						>
							State
						</label>
					</div>
				</div>
				<div className="grid sm:grid-cols-2 my-2 gap-4">
					<div className="relative h-16 ">
						<input
							placeholder="300033"
							maxLength={6}
							id="pcode"
							onChange={(e) =>
								setDetails({
									...details,
									postalCode: e.target.value,
								})
							}
							value={details.postalCode}
							className="py-1 transition-colors bg-maincolor placeholder-transparent h-10 peer outline-none focus:border-[#5c73db] focus:border-b-2 absolute top-0 left-0 duration-300 border-b w-full"
							type="number"
						/>
						<label
							htmlFor="pcode"
							className="peer-focus:text-sm peer-placeholder-shown:text-base peer-placeholder-shown:top-1 -top-4 left-0 text-sm  peer-focus:-top-4 absolute pb-2 transition-all duration-300 font-semibold"
						>
							Postal Code
						</label>
					</div>

					<div className="relative h-16">
						<input
							placeholder="Landmark"
							id="landmark"
							onChange={(e) =>
								setDetails({
									...details,
									LandMark: e.target.value,
								})
							}
							value={details.LandMark}
							className="py-1 transition-colors bg-maincolor placeholder-transparent h-10 peer outline-none focus:border-[#5c73db] focus:border-b-2 absolute top-0 left-0 duration-300 border-b w-full"
							type="text"
						/>
						<label
							htmlFor="landmark"
							className="peer-focus:text-sm peer-placeholder-shown:text-base peer-placeholder-shown:top-1 -top-4 left-0 text-sm  peer-focus:-top-4 absolute pb-2 transition-all duration-300 font-semibold"
						>
							Famous Landmark
						</label>
					</div>
				</div>
				<div className="my-2">
					<input
						type="checkbox"
						onChange={() => setChecked(!checked)}
						checked={checked}
					/>
					<label className="mx-2">
						I have read and agreed to the
						<span className="text-[#0075FF]">
							Terms & Conditions
						</span>{" "}
						and
						<span className="text-[#0075FF]"> Privacy policy</span>
					</label>
				</div>
				<div className="flex justify-between space-x-5 items-center">
					<button
						onClick={() => {
							dispatch(setChange(1))

						}}
						className="w-full p-2 bg-[#f9f9f9] text-black font-semibold rounded-xl my-2"
					>
						Back
					</button>
					{dataValid ? (
						<button
							onClick={() => {
								{
									details.password === details.confirmPass
										?
										onSignup()
										// handleSave()
										: // setToast(true),
										dispatch(setChange(2))

								}
							}}
							className="w-full p-2 bg-black text-white font-semibold rounded-xl my-2"
						>
							Save
						</button>
					) : (
						<button
							disabled
							className="w-full p-2 bg-[#dacbcb9a] text-black font-semibold rounded-xl my-2"
						>
							Save
						</button>
					)}
				</div>
			</div >
		</>
	)
}

export default Individual