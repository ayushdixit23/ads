import { auth } from '@/firebase.config';
import axios from 'axios';
import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';
import Cookies from 'js-cookie';
import React, { useState } from 'react'
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { RxCross2 } from 'react-icons/rx'
import OTPInput from 'react-otp-input';
import { useAuthContext } from '../utils/AuthWrapper';
import { useRouter } from 'next/navigation';
import toast, { Toaster } from 'react-hot-toast';
import { API } from '@/Essentials';

const LoginAccount = ({ setLogin, setPop, login }) => {
	const [loading, setLoading] = useState(false)
	const [number, setNumber] = useState("")
	const [showOTP, setShowOTP] = useState(false)
	const [OTP, setOTP] = useState("")
	const { data, f, setAuth } = useAuthContext()
	const router = useRouter()


	function onCaptchaVerify() {
		if (typeof window !== "undefined" && !window.recaptchaVerifier) {
			window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
				'size': 'normal',
				'callback': (response) => {
					onSignup();
				},
				'expired-callback': () => {
				}
			});
		}
	}

	const cookieSetter = async (data) => {
		try {
			const expirationDate = new Date();
			expirationDate.setDate(expirationDate.getDate() + 7);

			Cookies.set(`axetkn`, data.access_token, { expires: expirationDate })
			Cookies.set(`rvktkn`, data.refresh_token, { expires: expirationDate })
			const cookies = Cookies.get("axetkn")
			await f(cookies)
			setAuth(true)
			return true
		} catch (error) {
			console.log(error)
		}
	}

	function onSignup(e) {
		e.preventDefault();
		setLoading(true);
		if (!number.trim() || number.length !== 10) {
			toast.error("Please Enter A 10 digit Number!")
			setLoading(false);

		} else {
			const appVerifier = window.recaptchaVerifier;
			if (!appVerifier) {
				onCaptchaVerify();
				setLoading(false);
				return;
			}
			console.log("runned")
			const formatPh = "+91" + number;
			signInWithPhoneNumber(auth, formatPh, appVerifier)
				.then((confirmationResult) => {
					window.confirmationResult = confirmationResult;
					setShowOTP(true); // Move setShowOTP here
				})
				.catch((error) => {
					console.log(error);
					setLoading(false);
				})
				.finally(() => setLoading(false));
		}
	}

	async function onOTPVerify(e) {
		e.preventDefault();
		setLoading(true);
		console.log(OTP, "otp")
		window.confirmationResult
			.confirm(OTP)
			.then(async (ress) => {
				const res = await axios.post(`${API}/loginagency/${data?.advid}`, {
					phone: 91 + number,
				});
				if (res.data.success) {
					const a = await cookieSetter(res.data)
					if (a === true) {
						setLoading(false)
						setPop(false)
						toast.success("Account logged in!")
						router.push("/main/dashboard");
					}
				} else {
					console.log("something went wrong");
				}
			})
			.catch((err) => {
				console.log(err);
				setLoading(false);
			});
	}

	if (loading) {
		return <>
			<div className="fixed inset-0 w-screen z-50 bg-black/60 backdrop-blur-md h-screen flex justify-center items-center ">
				<div className="animate-spin">
					<AiOutlineLoading3Quarters className="text-2xl text-white" />
				</div>
			</div>
		</>
	}

	return (
		<>
			<Toaster />

			<div className='w-full flex flex-col gap-3 h-full  dark:text-white text-black p-5'>
				<div className='flex justify-between items-center '>
					<div className='text-2xl font-bold'>Add Account</div>
					<RxCross2 onClick={() => setPop(false)} className='text-2xl font-bold' />
				</div>
				<div>
					Don’t have an accout yet? <span onClick={() => setLogin(!login)} className='font-semibold'>Create Account</span>
				</div>
				<div className='w-full h-full'>
					{showOTP ?
						<div className="py-4 flex justify-center items-center w-full mb-2">
							<OTPInput
								value={OTP}
								onChange={setOTP}
								numInputs={6}
								renderSeparator={<span></span>}
								renderInput={(props) => <input {...props} />}
								inputStyle={{
									padding: 2,
									height: "50px",
									width: "50px",
									margin: 6,
									borderRadius: 14,
									color: "black",
									borderColor: "red",
									border: 1,
									backgroundColor: "#F2F2F2",
								}}
							/>
						</div>
						:
						<div className='w-full relative h-16'>
							<input type="tel" value={number} onChange={(e) => setNumber(e.target.value)} placeholder='Enter Mobile Number' className="py-1 transition-colors bg-transparent placeholder-black dark:placeholder-white h-10 peer outline-none focus:border-[#5c73db] focus:border-b-2 absolute top-0 left-0 duration-300 border-b-2 w-full" />
						</div>}

				</div>

				{showOTP ?

					<>

						{loading ? (
							<div className='bg-[#282828] text-white flex justify-center -mt-3 items-center rounded-md p-3 font-semibold'>
								<AiOutlineLoading3Quarters className="animate-spin" />
							</div>
						) : (
							<div
								onClick={onOTPVerify}
								className='bg-[#282828] text-white flex justify-center -mt-3 items-center rounded-md p-3 font-semibold'>Verify Otp</div>
						)}

					</>
					:
					<>

						{loading ? (
							<div className='bg-[#282828] text-white flex justify-center -mt-3 items-center rounded-md p-3 font-semibold'>
								<AiOutlineLoading3Quarters className="animate-spin" />
							</div>
						) : (
							<div
								onClick={onSignup}
								// onClick={onOTPVerify}
								className='bg-[#282828] text-white flex justify-center -mt-3 items-center rounded-md p-3 font-semibold'>Send Otp</div>
						)}

					</>
				}
				<div id="recaptcha-container"></div>
			</div>
		</>

	)
}

export default LoginAccount