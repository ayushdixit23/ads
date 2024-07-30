"use client";
import React, { useEffect, useState } from "react";
import { API } from "@/Essentials";
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { auth } from "../../firebase.config";
import { BsArrowRight, BsCheckLg } from "react-icons/bs";
import Individual from "../spliting/Individual";
import indiv from "../assests/individ.png"
import organis from "../assests/organis.png"
import affic from "../assests/affit.png"
import Organisation from "../spliting/Organisation";
import { useDispatch, useSelector } from "react-redux";
import { setChange } from "../redux/slice/registerSlice";
import OTPInput from "react-otp-input";
// import { getCookie } from "cookies-next";
import { decryptaes } from "../utils/security";
import Cookies from "js-cookie";
import { useAuthContext } from "../utils/AuthWrapper";
import Image from "next/image";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import toast from "react-hot-toast";
import { initOTPless } from "../utils/initOtpless";

const Register = () => {
	const [radio, setRadio] = useState(1);
	const { setAuth, setData: setUserData } = useAuthContext()
	const dispatch = useDispatch()
	const params = useSearchParams()
	const registerChange = params?.get("step")
	const change = useSelector((state) => state.register.change)
	const [data, setData] = useState("")
	const cookie = Cookies.get("rigdta")
	const [aff, setAff] = useState(false)
	const [load, setLoad] = useState(false)
	const [details, setDetails] = useState({
		firstName: "",
		lastName: "",
		phoneNumber: "",
		email: "",
		address: "",
		myImage: "",
		city: "",
		state: "",
		postalCode: "",
		LandMark: "",
		PAN: "",
		type: "Individual",
		GST: "",
		Organistaion: "",
		password: "",
		confirmPass: "",
	});

	useEffect(() => {
		dispatch(setChange(Number(registerChange)))
	}, [params])

	useEffect(() => {
		if (cookie) {
			const data = JSON.parse(decryptaes(cookie))
			console.log(data, "data")
			setData(data)
		}
	}, [cookie])

	const [checked, setChecked] = useState(false);
	const router = useRouter();
	const [loading, setLoading] = useState(false);
	const [showOTP, setShowOTP] = useState(false);
	const [OTP, setOTP] = useState("");

	useEffect(() => {
		if (data) {
			const { firstname, lastname, email, dp, phone, address, city, state, pincode, landmark } = data
			setDetails({
				...details,
				myImage: dp,
				firstName: firstname || "",
				phoneNumber: phone || "",
				lastName: lastname || "",
				email: email || "",
				address: address || "",
				city: city || "",
				state: state || "",
				postalCode: pincode || "",
				LandMark: landmark || ""
			})
		}
	}, [data])

	const validateData = () => {
		if (details.type === "Individual") {
			if (
				details.firstName === "" ||
				details.lastName === "" ||
				details.phoneNumber === "" ||
				details.email === "" ||
				details.myImage === "" ||
				checked === false
			) {
				return false;
			} else {
				return true;
			}
		}
		if (details.type === "Organization") {
			if (aff) {
				if (
					details.firstName === "" ||
					details.lastName === "" ||
					details.phoneNumber === "" ||
					details.email === "" ||

					details.Organistaion === "" ||
					details.PAN === "" ||
					details.myImage === "" ||
					checked === false
				) {
					return false;
				} else {
					return true;
				}
			} else {
				if (
					details.firstName === "" ||
					details.lastName === "" ||
					details.phoneNumber === "" ||
					details.email === "" ||
					details.address === "" ||
					details.city === "" ||
					details.state === "" ||
					details.postalCode === "" ||
					details.LandMark === "" ||

					details.Organistaion === "" ||
					details.PAN === "" ||
					details.myImage === "" ||
					checked === false
				) {
					return false;
				} else {
					return true;
				}
			}

		}
	};

	function generateRandomNumber() {
		const min = Math.pow(10, 9);
		const max = Math.pow(10, 10) - 1;
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}

	const dataValid = validateData();

	const handleSave = async () => {
		setLoad(true)
		try {
			const formDataToSend = new FormData();
			formDataToSend.append("lastname", details.lastName);
			formDataToSend.append("firstname", details.firstName);
			formDataToSend.append("city", details.city);
			formDataToSend.append("state", details.state);
			formDataToSend.append("landmark", details.LandMark);
			formDataToSend.append("email", details.email);
			formDataToSend.append("phone", 91 + details.phoneNumber);
			formDataToSend.append("type", details.type);
			formDataToSend.append("pincode", details.postalCode);
			formDataToSend.append("address", details.address);
			formDataToSend.append("image", details.img);
			formDataToSend.append("organizationname", details.Organistaion);
			formDataToSend.append("pan", details.PAN);
			formDataToSend.append("isAffiliater", aff)
			formDataToSend.append("gst", details.GST);
			formDataToSend.append("password", details.password);
			formDataToSend.append("retypepassword", details.confirmPass);

			const res = await axios.post(`${API}/createadvacc`, formDataToSend);
			if (res?.data?.success) {

				const expirationDate = new Date();
				expirationDate.setDate(expirationDate.getDate() + 7);

				Cookies.set(`axetkn`, res.data.access_token, { expires: expirationDate })

				Cookies.set(`rvktkn`, res.data.refresh_token, { expires: expirationDate })

				setLoad(false)
				setAuth(true)
				setUserData(res.data.data)

				if (!res.data.accountexists) {
					if (res.data?.type === "Individual") {
						router.push(`/createAd?adid=${generateRandomNumber()}&step=1`)
					} else if (res.data?.type === "Organization") {
						router.push(`/createAd?brand=${res.data?.fullname}&userid=${res.data?.userid}&advid=${res.data?.advertiserid}&image=${res.data?.image}&step=1`)
					} else {
						router.push("/main/dashboard");
					}
					sessionStorage.setItem("firstTimeUser", true)
				} else {
					toast.success("Account Already Exists!")
					setTimeout(() => {
						router.push("/main/dashboard")
					}, 2000)
				}

				setTimeout(() => {
					dispatch(setChange(1))
				}, 2000)
			}
		} catch (err) {
			console.log(err);
		} finally {
			setLoad(false)
		}
	};


	useEffect(() => {
		const isPageReloaded = window.performance.navigation.type === 1;
		if (isPageReloaded) {
			console.log('Page is reloaded');
			router.push("/registration?step=1")
		} else {
			console.log('Page is not reloaded');
		}
	}, []);


	const hundle = () => {
		setRadio(1);
		setAff(false)
		setDetails({
			...details, type: "Individual", Organistaion: "", PAN: "", GST: "", address: "", city: "",
			state: "",
			postalCode: "",
			LandMark: "",
		});
	};

	const hundl = () => {
		setRadio(2);
		setAff(false)
		setDetails({ ...details, type: "Organization" });
	};

	const alagaff = () => {
		setRadio(2);
		setAff(true)
		setDetails({ ...details, type: "Organization" });
	};

	// function onCaptchaVerify() {
	// 	if (!window.recaptchaVerifier) {
	// 		window.recaptchaVerifier = new RecaptchaVerifier(
	// 			auth,
	// 			"recaptcha-container",
	// 			{
	// 				size: "invisible",
	// 				callback: (response) => {
	// 					onSignup();
	// 				},
	// 				"expired-callback": () => {
	// 					// Response expired. Ask the user to solve reCAPTCHA again.
	// 					// ...
	// 				},
	// 			}
	// 		);
	// 	}
	// }

	function onSignup() {
		setLoading(true);
		onCaptchaVerify();
		setSeconds(30);
		const appVerifier = window.recaptchaVerifier;

		const formatPh = "+91" + details.phoneNumber;
		signInWithPhoneNumber(auth, formatPh, appVerifier)
			.then((confirmationResult) => {
				console.log(confirmationResult)
				window.confirmationResult = confirmationResult;
				console.log("first")
				setLoading(false);
				setShowOTP(true);
				dispatch(setChange(3))
			})
			.catch((error) => {
				console.log(error);
				setLoading(false);
			});
	}

	const handleChangePhotoClick = () => {
		document.getElementById("image").click();
	};


	const phoneAuth = (e) => {
		e.preventDefault();
		setLoading(true);

		if (!details.phoneNumber.trim() || details.phoneNumber.length !== 10) {
			toast.error("Please Enter A 10 digit Number!");
			setLoading(false);
		} else {
		}
		window?.OTPlessSignin.initiate({
			channel: "PHONE",
			phone: details.phoneNumber,
			countryCode: "+91",
		});
		setShowOTP(true);
		setLoading(false);
	};

	const verifyOTP = async (e) => {
		e.preventDefault();
		setLoading(true);

		// Assuming OTPlessSignin.verify returns a promise
		try {
			const result = await window?.OTPlessSignin.verify({
				channel: "PHONE",
				phone: details.phoneNumber,
				otp: OTP,
				countryCode: "+91",
			});

			// console.log(result, result.status, "result");
			if (result.success) {
				await handleSave()
				setLoading(false);

			} else {
				toast.error("OTP Verification Failed");
				setLoading(false);
			}
		} catch (error) {
			console.error("OTP Verification Error:", error);
			toast.error("An error occurred during OTP verification");
			setLoading(false);
		}
	};

	const callback = (userinfo) => {
		const mobileMap = otplessUser?.identities.find(
			(item) => item.identityType === "MOBILE"
		)?.identityValue;

		const token = otplessUser?.token;

		const mobile = mobileMap?.identityValue;

		console.log(userinfo, "userinfo");

		// Implement your custom logic here.
	};
	useEffect(() => initOTPless(callback), []);

	if (load) {
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
			<div className=" w-full bg-maincolor text-text px-2">
				<div className=" px-[2%] ">


					{/* <div
            className={`${change === 1 ? "flex border-2 bg-red-800 rounded-xl flex-col px-3 mt-4" : "hidden"}`}
          >

            <div className="flex justify-center flex-col my-5 w-full">
              <div className="text-2xl py-2 font-semibold">Who are you?</div>
              <div className="flex flex-col gap-3 my-4">
                <div className="text-xl flex items-center font-semibold">

                  <input checked={details.type === "Individual"} onClick={hundle} type="radio" className="w-[17px] h-[17px]" name="type" id="indiv" />
                  <div className="mx-1">Individual</div>
                </div>
                <div className="text-xl flex items-center font-semibold">
                 
                  <input onClick={hundl} type="radio" className="w-[17px] h-[17px]" name="type" id="organ" />
                  <div className="mx-1">Organisation/Affiliator</div>
                </div>
              </div>
            </div>
            <div
              onClick={() =>
                radio == 1 || radio == 2 ? dispatch(setChange(2)) : dispatch(setChange(1))
              }
              className="p-2 flex justify-center items-center gap-2 my-5 rounded-xl max-w-[130px] px-5 border font-medium"
            >
              <div>Go Next</div>
              <div>
                <BsArrowRight />
              </div>
            </div>
          </div> */}

					<div className={` ${change === 1 ? "flex flex-col gap-7 w-full items-center" : "hidden"} `}>
						<div onClick={hundle} className={`flex p-2 px-3 sm:px-5 ${details.type === "Individual" ? "border-2 border-blue-600 rounded-lg" : ""} sm:flex-row flex-col gap-2 sm:gap-4 w-full sm:items-center`}>
							<div>
								<Image src={indiv} className="min-w-[70px] min-h-[70px] max-w-[70px] max-h-[70px]" />
							</div>
							<div className="flex flex-col gap-1">
								<div className="text-lg font-semibold">Individual</div>
								<div className="text-sm">Individual: Advertise your own app or service to gain traction within the Grovyo user base.</div>
							</div>
						</div>

						<div onClick={alagaff} className={`flex p-2 px-3 sm:px-5 ${aff ? "border-2 border-blue-600 rounded-lg" : ""} sm:flex-row flex-col gap-2 sm:gap-4 w-full sm:items-center`}>
							<div>
								<Image src={affic} className="min-w-[70px] min-h-[70px] max-w-[70px] max-h-[70px]" />
							</div>
							<div className="flex flex-col gap-1">
								<div className="text-lg font-semibold">Affiliater</div>
								<div className="text-sm">Affiliater: Run ads for multiple accounts and earn cashback on your ad spend.  Run ads and receive up to <span className="font-semibold text-green-600">30% cashback</span> on your ad spend directly in your bank account.</div>
							</div>
						</div>
						<div onClick={hundl} className={`flex p-2 px-3 sm:px-5 ${(details.type === "Organization" && aff === false) ? "border-2 border-blue-600 rounded-lg" : ""} sm:flex-row flex-col gap-2 sm:gap-4 w-full sm:items-center`}>
							<div>
								<Image src={organis} className="min-w-[70px] min-h-[70px] max-w-[70px] max-h-[70px]" />
							</div>
							<div className="flex flex-col gap-1">
								<div className="text-lg font-semibold">Organization</div>
								<div className="text-sm">Organization: Promote your company's apps and services to a wider audience. Run ads and receive up to <span className="font-semibold text-green-600">10% cashback</span> on your ad spend directly in your bank account.</div>
							</div>
						</div>
					</div>
					<div
						onClick={() => {

							radio == 1 || radio == 2 ?
								(
									router.push("/registration?step=2")

								)
								: (router.push("/registration?step=1")

								)

						}
						}
						className={`${change === 1 ? "p-2 flex justify-center items-center gap-2 my-5 rounded-xl max-w-[130px] px-5 border font-medium" : "hidden"} `}
					>
						<div>Go Next</div>
						<div>
							<BsArrowRight />
						</div>
					</div>

					<div className={`${change === 2 ? "" : "hidden"}`}>
						{radio === 1 && (<Individual
							details={details}
							handleSave={handleSave}
							handleChangePhotoClick={handleChangePhotoClick}
							setDetails={setDetails}
							setChecked={setChecked}
							router={router}
							checked={checked}
							dispatch={dispatch}
							dataValid={dataValid}
							setChange={setChange}
							// onSignup={onSignup}
							onSignup={phoneAuth}
						/>)
						}
						{radio === 2 && (<Organisation
							details={details}
							handleChangePhotoClick={handleChangePhotoClick}
							setDetails={setDetails}
							handleSave={handleSave}
							dispatch={dispatch}
							aff={aff}
							router={router}
							dataValid={dataValid}
							setChecked={setChecked}
							checked={checked}
							setChange={setChange}
							// onSignup={onSignup}
							onSignup={phoneAuth}
						/>)
						}
					</div>
					<div className={`${change === 3 ? "" : "hidden"}`}>
						<div className="flex justify-center gap-4 font-medium p-2 pn:max-vs:max-w-[300px] vs:max-sm:min-w-[350px] w-full items-center">
							<div className="flex flex-col gap-3 items-center">
								<div className="py-3">
									{" "}
									<div>We're Sending an SMS to phone numbber</div>
									<div>
										+ 91 {details.phoneNumber}{" "}
										<span className="text-[#0075ff]">Wrong Number ?</span>
									</div>
								</div>
								<div className="py-4">
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

								{/* <div className="text-black font-semibold flex text-[15px] pt-8">
									<div className="text-center">
										{come === 1 ? (
											<div className="space-x-4  ">
												<div className="text-[#3e3e3e]">
													Don't receive code ?
												</div>
												<button
													className={` text-blue-600 rounded ${isActive ? "" : ""
														}`}
													onClick={toggleTimer}
												>
													Request Again
												</button>
											</div>
										) : (
											<h1
												className={` ${come === 1 ? "hidden" : "text-[16px] text-[#3e3e3e]"
													}`}
											>
												Resend: 00:{seconds}
											</h1>
										)}
									</div>
								</div> */}
							</div>
						</div>
						<div className="flex pn:max-sm:flex-col sm:justify-between gap-3 my-3 sm:gap-5 sm:items-center">
							<button
								onClick={() => {
									router.push("/registration?step=2")

								}}
								className="w-full p-2 border border-[#f9f9f9] text-black dark:text-white font-semibold rounded-xl sm:my-2"
							>
								Back
							</button>
							<button
								onClick={(e) => {
									router.push("/registration?step=3")
									// onOTPVerify();
									// handleSave();
									verifyOTP(e)
									// router.push("/login");
								}}
								className="w-full p-2 bg-[#2D9AFF] text-white font-semibold rounded-xl sm:my-2"
							>
								Save
							</button>
						</div>
						<div id="recaptcha-container"></div>
					</div>
				</div>
			</div >
		</>
	);
};

export default Register;
