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
} from "react-icons/ai";
import { Toaster, toast } from "sonner";
import axios from "axios";
import { API } from "@/Essentials";
import { FaExclamationTriangle } from "react-icons/fa";
import Link from "next/link";
import { useDispatch } from "react-redux";
import Cookies from "js-cookie";
import { useAuthContext } from "../utils/AuthWrapper";
import { setLoad } from "../redux/slice/registerSlice";
import { initOTPless } from "../utils/initOtpless";

const Login = () => {
  const [phone, setPhone] = useState(1);
  const [login, setLogin] = useState(false);
  const router = useRouter();
  const { setAuth, setData } = useAuthContext();
  const [see, setSee] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [number, setNumber] = useState("");
  const [OTP, setOTP] = useState("");
  const [loading, setLoading] = useState(false);
  const [showOTP, setShowOTP] = useState(false);
  const dispatch = useDispatch();

  // function onCaptchaVerify() {
  //   if (typeof window !== "undefined" && !window.recaptchaVerifier) {
  //     window.recaptchaVerifier = new RecaptchaVerifier(
  //       auth,
  //       "recaptcha-container",
  //       {
  //         size: "normal",
  //         callback: (response) => {
  //           onSignup();
  //         },
  //         "expired-callback": () => {},
  //       }
  //     );
  //   }
  // }

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      if (!email.trim() || !password.trim()) {
        setLoading(false);
        toast.error("Please Enter All fields");
        return;
      } else {
        const res = await axios.post(`${API}/checkadvaccount`, {
          email,
          password,
        });

        if (res.data.success) {
          dispatch(setLoad(true));
          setData(res.data?.data);
          const a = await cookieSetter(res.data);
          if (a === true) {
            router.push("/main/dashboard");
            setTimeout(() => {
              setLoading(false);
              dispatch(setLoad(false));
            }, 5000);
          }
        } else {
          if (
            !res.data?.accountexist ||
            res.data.message == "User not found!"
          ) {
            toast.error("Looks Like You Dont Any Account!");
            toast.error("InValid Email Or Password!");
            // router.push("/registration")
          } else {
            toast.error("Something went wrong!");
          }
        }
      }
    } catch (e) {
      console.log(e);
    } finally {
      setTimeout(() => {
        setLoading(false);
        dispatch(setLoad(false));
      }, 35000);
    }
  };

  const cookieSetter = async (data) => {
    try {
      // Calculate the expiration time for 7 days from now
      const expirationDate = new Date();
      expirationDate.setDate(expirationDate.getDate() + 7);

      Cookies.set(`axetkn`, data.access_token, { expires: expirationDate });

      // Set refresh token cookie with expiration time of 7 days
      Cookies.set(`rvktkn`, data.refresh_token, { expires: expirationDate });

      // Assuming `setAuth` is a function to update authentication state
      setAuth(true);

      // Return true to indicate successful cookie setting
      return true;
    } catch (error) {
      // Handle errors, if any
      console.log(error);
    }
  };

  // function onSignup(e) {
  //   e.preventDefault();
  //   setLoading(true);
  //   if (!number.trim() || number.length !== 10) {
  //     toast.error("Please Enter A 10 digit Number!");
  //     setLoading(false);
  //   } else {
  //     const appVerifier = window.recaptchaVerifier;
  //     if (!appVerifier) {
  //       onCaptchaVerify();
  //       setLoading(false);
  //       return;
  //     }
  //     const formatPh = "+91" + number;
  //     signInWithPhoneNumber(auth, formatPh, appVerifier)
  //       .then((confirmationResult) => {
  //         window.confirmationResult = confirmationResult;
  //         setShowOTP(true);
  //       })
  //       .catch((error) => {
  //         console.log(error);
  //         setLoading(false);
  //       })
  //       .finally(() => setLoading(false));
  //   }
  // }

  // async function onOTPVerify(e) {
  //
  //   e.preventDefault();
  //   setLoading(true);
  //   window.confirmationResult
  //     .confirm(OTP)
  //     .then(async (ress) => {
  //       setLoading(false);
  //       const res = await axios.post(`${API}/checkadvaccount`, {
  //         phone: number,
  //       });
  //       if (res.data.success) {
  //         dispatch(setLoad(true));
  //         const a = await cookieSetter(res.data);
  //         if (a === true) {
  //           router.push("/main/dashboard");
  //           setTimeout(() => {
  //             setLoading(false);
  //             dispatch(setLoad(false));
  //           }, 35000);
  //         }
  //       } else {
  //         console.log("something went wrong");
  //       }
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //       setLoading(false);
  //     });
  // }

  // async function onOTPVerify(e) {
  //   e.preventDefault();
  //   const res = await axios.post(`${API}/checkadvaccount`, {
  //     phone: number,
  //   });
  //   if (res.data.success) {
  //     dispatch(setLoad(true));
  //     setData(res.data?.data);
  //     const a = await cookieSetter(res.data);
  //     console.log(a);
  //     if (a === true) {
  //       router.push("/main/dashboard");
  //       setTimeout(() => {
  //         setLoading(false);
  //         dispatch(setLoad(false));
  //       }, 20000);
  //     }
  //   } else {
  //     console.log("something went wrong");
  //   }
  // }

  const phoneAuth = (e) => {
    e.preventDefault();
    setLoading(true);
    console.log(window?.OTPlessSignin, "vnn");
    if (!number.trim() || number.length !== 10) {
      toast.error("Please Enter A 10 digit Number!");
      setLoading(false);
    } else {
    }
    window?.OTPlessSignin.initiate({
      channel: "PHONE",
      phone: number,
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
        phone: number,
        otp: OTP,
        countryCode: "+91",
      });

      // console.log(result, result.status, "result");
      if (result.success) {
        // Check the status of OTP verification
        const res = await axios.post(`${API}/checkadvaccount`, {
          phone: number,
        });

        if (res.data.success) {
          setData(res.data?.data);
          const a = await cookieSetter(res.data);
          if (a === true) {
            router.push("/main/dashboard");
            setTimeout(() => {
              setLoading(false);
              dispatch(setLoad(false));
            }, 3500);
          }
        }

        toast.success("OTP Verified Successfully");
      } else {
        toast.error("OTP Verification Failed");
        setLoading(false);
      }
    } catch (error) {
      console.error("OTP Verification Error:", error);
      toast.error("An error occurred during OTP verification");
      setLoading(false);
    } finally {
      setTimeout(() => {
        setLoading(false);
        dispatch(setLoad(false));
      }, 3500);
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

  return (
    <div className="w-full">
      <Toaster position="bottom-right" />
      {/* <div className="flex justify-center w-full bg-blue-900 items-center">
        <div
          className={` my-2 text-xl bg-yellow-600 text-white text-center p-2 sm:w-[300px] duration-700 absolute  border-2 font-medium ${
            login ? "top-[150px]" : "top-[-100px]"
          }`}
        >
          <div className="flex justify-center items-center space-x-2">
            <FaExclamationTriangle />
            <h1>Please fill all fields</h1>
          </div>
        </div>
      </div> */}

      {/* <div id="otpless-login-page"></div> */}

      <div className="grid bg-white dark:bg-[#1c1d21] px-[3%]">
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
                    <Link href="/registration?step=1">Sign up now</Link>
                  </span>
                </div>
              </div>
            )}

            <form>
              <div
                className={`${
                  phone != 1 ? "flex flex-col justify-center" : "hidden"
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
                    <div className="flex justify-center border-b-2 border-[#222]/50 border-2 dark:border-[#fff]/40 px-2 rounded-xl items-center w-full">
                      <div className="border-r-2 border-[#222]/50 pr-2 dark:border-[#fff]/40 py-2">
                        +91
                      </div>
                      <input
                        maxLength={10}
                        onChange={(e) => setNumber(e.target.value)}
                        value={number}
                        className="p-2 w-full outline-none bg-transparent "
                        type="tel"
                      />
                    </div>
                  </>
                )}
              </div>
              <div
                className={`${
                  phone != 2 ? "flex flex-col justify-center" : "hidden"
                }`}
              >
                <div className="flex flex-col justify-center">
                  <div className="flex justify-between my-2 font-medium items-center">
                    <label>Email</label>
                    <div
                      onClick={() => setPhone(2)}
                      className="text-[#3451f7] cursor-pointer"
                    >
                      Use phone
                    </div>
                  </div>
                  <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="abc@example.com"
                    className="p-3 outline-none bg-transparent border-[#222]/50 border-2 dark:border-[#fff]/40 px-4 rounded-xl"
                    type="Email"
                  />
                </div>
                <div className="flex flex-col justify-center">
                  <div className="flex justify-between my-2  font-medium items-center">
                    <label>Password</label>
                    {/* <div className="text-[#3451f7]">Forgot password</div> */}
                  </div>
                  {see ? (
                    <div className="flex justify-center border-2 border-[#222]/50  dark:border-[#fff]/40  rounded-xl items-center w-full">
                      <input
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter Your Password"
                        className="p-3 outline-none bg-transparent border-[#222]/50  dark:border-[#fff]/40 border-r-2  w-full
                   px-4 rounded-xl rounded-r-none"
                        type="password"
                      />
                      <AiFillEyeInvisible
                        onClick={() => setSee(!see)}
                        className="text-2xl mx-2"
                      />
                    </div>
                  ) : (
                    <div className="flex flex-col">
                      <div className="flex justify-center border-2 border-[#222]/50  dark:border-[#fff]/40  rounded-xl items-center w-full">
                        <input
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          placeholder="Enter Your Password"
                          className="p-3 outline-none bg-transparent border-[#222]/50  dark:border-[#fff]/40 border-r-2  w-full
                px-4 rounded-xl rounded-r-none"
                          type="text"
                        />
                        <AiFillEye
                          onClick={() => setSee(!see)}
                          className="text-2xl mx-2"
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <div className="my-4 gap-4 flex flex-col">
                {phone === 1 ? (
                  <>
                    {loading ? (
                      <button
                        // onClick={handleCreate}
                        disabled
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
                          onClick={verifyOTP}
                          // onClick={onOTPVerify}
                          className="w-full bg-gradient-to-r from-[#5645fe] to-[#7940ef] opacity-90 hover:opacity-100 p-2 rounded-lg text-white font-semibold text-lg"
                        >
                          Continue
                        </button>
                      </>
                    ) : (
                      <>
                        {loading ? (
                          <button
                            disabled
                            className="w-full bg-gradient-to-r from-[#5645fe] to-[#7940ef] opacity-90 hover:opacity-100 flex justify-center items-center p-2 rounded-lg text-white font-semibold text-lg"
                          >
                            <AiOutlineLoading3Quarters className="animate-spin" />
                          </button>
                        ) : (
                          <button
                            // onClick={onSignup}
                            onClick={phoneAuth}
                            // onClick={onOTPVerify}
                            className="w-full bg-gradient-to-r from-[#5645fe] to-[#7940ef] opacity-90 hover:opacity-100 p-2 rounded-lg text-white font-semibold text-lg"
                          >
                            Send OTP
                          </button>
                        )}
                      </>
                    )}
                  </>
                )}
                <div id="recaptcha-container"></div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
