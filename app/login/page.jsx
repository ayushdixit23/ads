"use client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { auth } from "@/firebase.config";
import OTPInput from "react-otp-input";
import {
  AiOutlineLoading3Quarters,
  AiFillEyeInvisible,
  AiFillEye,
  AiOutlineWarning,
} from "react-icons/ai";
import { PiWarningCircleFill } from "react-icons/pi";
import { Toaster, toast } from "sonner"
import axios from "axios";
import { API } from "@/Essentials";
import { FaExclamationTriangle } from "react-icons/fa";
import Lotties from "../component/Lotties";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { changeloading } from "@/app/redux/slice/userData";
import { setCookie } from "cookies-next";
import { storeInSessionStorage } from "../utils/TokenDataWrapper";

const Login = () => {
  const [phone, setPhone] = useState(1);
  const [pop, setPop] = useState(0);
  const [popup, setPopup] = useState(false)
  const [login, setLogin] = useState(false);
  const router = useRouter();
  const [see, setSee] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [number, setNumber] = useState("");
  const [OTP, setOTP] = useState("");
  const [loading, setLoading] = useState(false);
  const [showOTP, setShowOTP] = useState(false);
  const [load, setLoad] = useState(false);
  const [change, setChange] = useState(false)
  const dispatch = useDispatch()
  const [grovyo, setGrovyo] = useState({
    email: "",
    phone: "",
    otp: ""
  })
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

  //validate email
  const validateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };

  // console.log(loading);

  const isValidEmail = validateEmail(email);
  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      if (!email.trim() || !password.trim()) {
        setPop(4);
        setLoading(false);
      } else {
        if (password.length < 8) {
          setPop(1);
          setLoading(false);
          console.log("enter pass greater than 8 chars");
        } else {
          setPop(0);
          if (isValidEmail) {
            const res = await axios.post(`${API}/checkadvaccount`, {
              email,
              password,
            });
            if (res.data.success) {
              await cookieSetter(res.data)
              dispatch(
                changeloading({
                  loading: true,
                  path: `/main/dashboard`,
                })
              );
              router.push("/main/dashboard")
            } else {
              toast.error("Something went wrong!")
            }
          } else {
            // setPop(3);
            setLoading(false);
            toast.error("Invalid Email or Password!")
            console.log("eror");
          }
        }
      }
      // setLoading(false);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false)
    }
  };


  const cookieSetter = async (data) => {
    try {
      storeInSessionStorage(data.sessionId)
      localStorage.setItem(`axetkn${data.sessionId}`, data.access_token)
      localStorage.setItem(`rvktkn${data.sessionId}`, data.refresh_token)
      return true
    } catch (error) {
      console.log(error)
    }
  }
  //signup
  // function onSignup(e) {
  //   e.preventDefault();
  //   setLoading(true);
  //   if (!number.trim()) {
  //     console.log("no number");
  //     setLoading(false);
  //     setPop(5);
  //   } else if (number.length < 10) {
  //     setLoading(false);
  //     setPop(6);
  //   } else {
  //     setPop(0);
  //     const appVerifier = window.recaptchaVerifier;
  //     onCaptchaVerify();
  //     const formatPh = "+91" + number;
  //     signInWithPhoneNumber(auth, formatPh, appVerifier)
  //       .then((confirmationResult) => {
  //         window.confirmationResult = confirmationResult;
  //         setLoading(false);
  //         setShowOTP(true);
  //       })
  //       .catch((error) => {
  //         console.log(error);
  //         setLoading(false);
  //       });
  //   }
  // }

  function onSignup(e) {
    e.preventDefault();
    setLoading(true);
    if (!number.trim()) {
      console.log("no number");
      setLoading(false);
      setPop(5);
    } else if (number.length < 10) {
      setLoading(false);
      setPop(6);
    } else {
      const appVerifier = window.recaptchaVerifier;
      if (!appVerifier) {
        onCaptchaVerify();
        setLoading(false); // Move setLoading inside onCaptchaVerify
        return; // Return early as onCaptchaVerify will set loading state accordingly
      }
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
        .finally(() => setLoading(false)); // Ensure setLoading is always called
    }
  }

  function onOTPVerify(e) {
    e.preventDefault();
    setLoading(true);
    window.confirmationResult
      .confirm(OTP)
      .then(async (ress) => {
        setLoading(false);
        const res = await axios.post(`${API}/checkadvaccount`, {
          phone: number,
        });
        if (res.data.success) {
          const a = await cookieSetter(res.data)
          if (a === true) {
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

  const Oneclicklogin = async (e) => {
    e.preventDefault();
    setPopup(true)
  };

  const loginwithGrovyo = async () => {
    if (!grovyo.email && !grovyo.phone) {
      toast.error("Please enter atleast one field!")
      return
    }
    try {
      setLoad(true)
      const res = await axios.post(`${API}/loginwithgrovyo`, {
        email: grovyo.email,
        phone: grovyo.phone
      })

      if (res.data.success) {
        sessionStorage.setItem("type", res.data.logwithidentity)
        sessionStorage.setItem("value", res.data.value)
        setChange(true)
      }
      setLoad(false)
    } catch (error) {
    } finally {
      setLoad(false)
    }
  }

  const verifyGrovyo = async () => {
    try {
      setLoad(true)
      const type = sessionStorage.getItem("type")
      const value = sessionStorage.getItem("value")
      const res = await axios.post(`${API}/verifyotp`, {
        otp: grovyo.otp,
        type, value
      })
      if (res.data.success) {
        const a = await cookieSetter(res.data)
        if (a === true) {
          router.push("/main/dashboard");
          sessionStorage.removeItem("type")
          sessionStorage.removeItem("value")
        }
      }
      setLoad(false)
    } catch (error) {
      console.log(error)
    } finally {
      setLoad(false)
    }
  }

  if (load) {
    return (
      <>
        <div className="fixed inset-0 w-screen z-50 transition duration-500 bg-black/60 backdrop-blur-md h-screen flex justify-center items-center ">
          <div className="animate-spin">
            <AiOutlineLoading3Quarters className="text-2xl text-white" />
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Toaster position="bottom-right" />
      {
        popup &&
        <div className="fixed inset-0 w-screen z-50 bg-black/60 h-screen flex justify-center items-center backdrop-blur-md">
          <div className="flex flex-col w-[500px] dark:bg-[#273142] rounded-xl bg-white p-3 ">

            {change ? <>
              <div className="flex flex-wrap w-full mb-2">
                <div className="relative w-full flex justify-center gap-4 items-center flex-col z-0 mb-5 group appearance-none label-floating">
                  <div className="text-2xl font-bold mt-5 mb-4 text-center">
                    Enter the OTP received in the Grovyo app.
                  </div>
                  <OTPInput
                    value={grovyo.otp}
                    onChange={(otp) => setGrovyo({ ...grovyo, otp: otp })}
                    numInputs={6}
                    renderSeparator={<span></span>}
                    renderInput={(props) => <input {...props} />}
                    inputStyle={{
                      padding: 2,
                      height: "50px",
                      width: "50px",
                      margin: 6,
                      borderRadius: 7,
                      color: "black",

                      backgroundColor: "#F2F2F2",
                    }}
                  />

                  <div>
                    <button className="flex justify-center items-center bg-[#3451f7] text-white p-2 px-5 rounded-lg" onClick={verifyGrovyo}>Send Otp</button>
                  </div>
                </div>
              </div>
            </> : <div className="flex flex-col mt-6 w-full">
              <div className="text-3xl dark:text-white font-bold text-center">Log In with Grovyo</div>
              <div className="flex gap-3 mt-5 p-3 flex-col w-full">

                <div className="flex flex-wrap w-full mb-2">
                  <div className="relative w-full z-0 mb-5 group appearance-none label-floating">
                    <input onChange={(e) => setGrovyo({ ...grovyo, email: e.target.value })} value={grovyo.email} type="email" className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                    <label htmlFor="tel" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Your Email</label>
                  </div>
                </div>
                <div className="flex items-center justify-center w-full">
                  <hr className="flex-grow border-t-2 border-gray-200 dark:border-gray-700" />
                  <span className="px-3 font-medium text-lg dark:bg-transparent dark:text-white bg-white">
                    or
                  </span>
                  <hr className="flex-grow border-t-2 border-gray-200 dark:border-gray-700" />
                </div>
                <div>
                  <div className="flex flex-wrap w-full mb-2">
                    <div className="relative w-full z-0 mb-5 group appearance-none label-floating">
                      <input maxLength={10} onChange={(e) => setGrovyo({ ...grovyo, phone: e.target.value })} value={grovyo.phone} type="tel" className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                      <label htmlFor="tel" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Your Phone Number</label>
                    </div>
                  </div>

                </div>
              </div>
              <div className="flex justify-center gap-3 py-1 p-3  items-center w">
                <div onClick={() => setPopup(false)} className="p-2 px-4 rounded-xl flex justify-center items-center text-white border border-[#3d4654] w-full">Cancel</div>
                <div onClick={loginwithGrovyo} className="p-2 px-4 rounded-xl flex justify-center items-center bg-black text-white w-full">Continue</div>
              </div>
            </div>}
          </div>
        </div>
      }
      <div className="flex justify-center items-center">
        <div
          className={` my-2 text-xl bg-yellow-600 text-white text-center p-2 sm:w-[300px] duration-700 absolute  border-2 font-medium ${login ? "top-[150px]" : "top-[-100px]"
            }`}
        >
          <div className="flex justify-center items-center space-x-2">
            <FaExclamationTriangle />
            <h1>Please fill all fields</h1>
          </div>
        </div>
      </div>

      <div className="grid bg-maincolor md:grid-cols-2 px-[3%]">
        <div className="flex flex-col justify-center items-center h-[100vh]">
          <div className="lg:w-[60%] md:w-[70%] w-[93%] sm:w-[75%]">
            {showOTP ? (
              <div className="flex flex-col my-2 space-y-2">
                <div className="text-2xl font-semibold">Verification</div>
                <div className="font-medium text-sm">
                  We have sent an Otp on {number}
                  <span
                    onClick={() => {
                      setPhone(2);
                      setShowOTP(false);
                    }}
                    className="text-[#3451f7] cursor-pointer mx-1"
                  >
                    Wrong Number?
                  </span>
                </div>
              </div>
            ) : (
              <div className="flex flex-col my-2 space-y-2">
                <div className="text-2xl font-bold">Log in</div>
                <div className="font-semibold text-sm">
                  Don't have an account yet?
                  <span className="text-[#3451f7] mx-1">
                    <Link href="/registration"> Sign up now</Link>
                  </span>
                </div>
              </div>
            )}

            <form>
              <div
                className={`${phone != 1 ? "flex flex-col justify-center" : "hidden"
                  }`}
              >
                {showOTP ? (
                  <>
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
                  </>
                ) : (
                  <>
                    <div className="flex justify-between my-2 font-medium items-center">
                      <label>Phone</label>
                      <div
                        onClick={() => setPhone(1)}
                        className="text-[#3451f7]"
                      >
                        Use Email
                      </div>
                    </div>
                    <div className="flex justify-center border-b-2 bg-input px-2 border-2 rounded-xl items-center w-full">
                      <div className="border-r-2 pr-2 border-border py-2">+91</div>
                      <input
                        maxLength={10}
                        onChange={(e) => setNumber(e.target.value)}
                        value={number}
                        className="p-2 w-full outline-none  bg-input  "
                        type="tel"
                      />
                    </div>

                    {number === "" && (
                      <>
                        {pop === 5 && (
                          <>
                            <div className="flex items-center p-2 pb-0 mb-1 text-red-600">
                              <AiOutlineWarning />
                              <div className="text-sm ">
                                Please Enter Your Mobile Number
                              </div>
                            </div>
                          </>
                        )}
                      </>
                    )}

                    {number.length >= 1 && number.length < 10 && (
                      <>
                        {pop === 6 && (
                          <>
                            <div className="flex items-center p-2 pb-0 mb-1 text-red-600">
                              <AiOutlineWarning />
                              <div className="text-sm ">
                                Please Enter 10 digit Mobile Number
                              </div>
                            </div>
                          </>
                        )}
                      </>
                    )}
                  </>
                )}
              </div>
              <div
                className={`${phone != 2 ? "flex flex-col justify-center" : "hidden"
                  }`}
              >
                <div className="flex flex-col justify-center">
                  <div className="flex justify-between my-2 font-medium items-center">
                    <label>Email</label>
                    <div onClick={() => setPhone(2)} className="text-[#3451f7]">
                      Use phone
                    </div>
                  </div>
                  <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="abc@example.com"
                    className="p-3 outline-none bg-input border-2 px-4 rounded-xl"
                    type="Email"
                  />
                </div>
                {isValidEmail ? null : (
                  <>
                    {pop === 3 && (
                      <div className="flex items-center p-2 pb-0 mb-1 text-red-600">
                        <AiOutlineWarning />
                        <div className="text-sm ">
                          Invalid Email, Please Enter a Valid Email
                        </div>
                      </div>
                    )}
                  </>
                )}

                {email === "" && (
                  <>
                    {pop === 4 && (
                      <div className="flex items-center p-2 pb-0 mb-1 text-red-600">
                        <AiOutlineWarning />
                        <div className="text-sm ">Please Enter Your Email</div>
                      </div>
                    )}
                  </>
                )}
                <div id="recaptcha-container"></div>
                <div className="flex flex-col justify-center">
                  <div className="flex justify-between my-2  font-medium items-center">
                    <label>Password</label>
                    <div className="text-[#3451f7]">Forgot password</div>
                  </div>
                  {see ? (
                    <div className="flex justify-center border-2 bg-input rounded-xl items-center w-full">
                      <input
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter Your Password"
                        className="p-3 outline-none bg-input border-r-2  w-full
                           px-4 rounded-xl rounded-r-none"
                        type="password"
                      />
                      <AiFillEyeInvisible
                        onClick={() => setSee(!see)}
                        className="text-2xl mx-2"
                      />
                    </div>
                  ) : (
                    <div className="flex justify-center bg-input border-2 rounded-xl items-center w-full">
                      <input
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter Your Password"
                        className="p-3 outline-none bg-input border-r-2  w-full
                        px-4 rounded-xl rounded-r-none"
                        type="text"
                      />
                      <AiFillEye
                        onClick={() => setSee(!see)}
                        className="text-2xl mx-2"
                      />
                    </div>
                  )}
                </div>
                {password.length > 8 ? null : (
                  <>
                    {pop === 1 && (
                      <div className="flex items-center text-red-600 p-2 pb-0 mb-1">
                        <AiOutlineWarning />
                        <div className="text-sm ">
                          Enter Password greater than 8 characters
                        </div>
                      </div>
                    )}
                  </>
                )}

                {pop === 2 && (
                  <div className="flex items-center text-red-600 p-2 mb-1 pb-0">
                    <PiWarningCircleFill />
                    <div className="text-sm ">
                      Incorrect Password, Please try Again
                    </div>
                  </div>
                )}
                {password.length === 0 && (
                  <>
                    {pop === 4 && (
                      <div className="flex items-center p-2 pb-0 mb-1 text-red-600">
                        <AiOutlineWarning />
                        <div className="text-sm ">
                          Please Enter Your Password
                        </div>
                      </div>
                    )}
                  </>
                )}
              </div>
              <div className="my-4 gap-4 flex flex-col">
                {phone === 1 ? (
                  <>
                    {loading && email !== "" && password !== "" ? (
                      <button
                        // onClick={handleCreate}
                        disabled={true}
                        className="w-full bg-gradient-to-r from-[#5645fe] to-[#7940ef] flex justify-center items-center p-2 rounded-lg text-white font-semibold text-lg"
                      >
                        <AiOutlineLoading3Quarters className="animate-spin" />
                      </button>
                    ) : (
                      <button
                        onClick={handleCreate}
                        className="w-full p-2 bg-gradient-to-r from-[#5645fe] cursor-pointer to-[#7940ef] opacity-90 hover:opacity-100  rounded-lg text-white font-semibold text-lg"
                      >
                        Log in
                      </button>
                    )}
                  </>
                ) : (
                  <>
                    {showOTP ? (
                      <>
                        <button
                          onClick={onOTPVerify}
                          className="w-full bg-gradient-to-r from-[#5645fe] to-[#7940ef] opacity-90 hover:opacity-100 p-2 rounded-lg text-white font-semibold text-lg"
                        >
                          Continue
                        </button>
                      </>
                    ) : (
                      <>
                        {loading ? (
                          <button
                            onClick={onSignup}
                            className="w-full bg-gradient-to-r from-[#5645fe] to-[#7940ef] opacity-90 hover:opacity-100 flex justify-center items-center p-2 rounded-lg text-white font-semibold text-lg"
                          >
                            <AiOutlineLoading3Quarters className="animate-spin" />
                          </button>
                        ) : (
                          <button
                            onClick={onSignup}
                            className="w-full bg-gradient-to-r from-[#5645fe] to-[#7940ef] opacity-90 hover:opacity-100 p-2 rounded-lg text-white font-semibold text-lg"
                          >
                            Send OTP
                          </button>
                        )}
                      </>
                    )}
                  </>
                )}

                {/* <div className="flex justify-center items-center my-1 p-2">
                  Or
                </div> */}

                {/* <div className="flex items-center justify-center w-full">
                  <hr className="w-full h-[1px] my-8 bg-gray-200 border-0 dark:bg-gray-700" />
                  <span className="absolute px-3 font-medium text-lg -translate-x-1/2  bg-white  dark:text-black">
                    or
                  </span>
                </div> */}
                <div className="flex items-center justify-center w-full">
                  <hr className="flex-grow border-t-2 border-gray-200 dark:border-gray-700" />
                  <span className="px-3 font-medium text-lg dark:bg-transparent dark:text-white bg-white">
                    or
                  </span>
                  <hr className="flex-grow border-t-2 border-gray-200 dark:border-gray-700" />
                </div>
                <button
                  className="w-full border-2 dark:bg-white dark:text-black dark:border-white border-black p-2 rounded-lg text-black hover:bg-black hover:opacity-75 hover:text-white font-bold text-lg"
                  onClick={Oneclicklogin}
                >
                  Log in with Grovyo
                </button>
              </div>
            </form>
          </div>
        </div>
        <div className="pn:max-md:hidden flex justify-center items-center">
          <Lotties />
        </div>
      </div>
      <div className="flex fixed bottom-7 left-5 md:left-20 flex-wrap items-center w-full dark:text-white text-[#414141] gap-4 text-[12px] select-none">
        <Link href={"../terms"}>T&C</Link>
        <Link href={"../privacy"}>Privacy</Link>
        <Link href={"../contact"}>Contact Us</Link>
        <Link href={"/about"}>About</Link>
        <Link href={"/requestdata"}>Request Data</Link>
        <Link href={"/deleterequest"}>Delete Request</Link>
        <Link href={"../shipping"}>Shipping</Link>
        <Link href={"../cancellation"}>Cancellation</Link>
        <Link href={"../return"}>Return Policy</Link>
      </div>
    </>
  );
};

export default Login;
