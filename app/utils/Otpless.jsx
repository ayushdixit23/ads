"use client";
import { useEffect, useState } from "react";

const useOTPLessSignin = () => {
  const [OTPlessSignin, setOTPlessSignin] = useState(null);
  useEffect(() => {
    const callback = (userinfo) => {
      const emailMap = userinfo.identities.find(
        (item) => item.identityType === "EMAIL"
      );

      const mobileMap = userinfo.identities.find(
        (item) => item.identityType === "MOBILE"
      );

      const token = userinfo.token;

      const email = emailMap?.identityValue;
      const mobile = mobileMap?.identityValue;
      const name = emailMap?.name || mobileMap?.name;

      console.log(userinfo);

      // Implement your custom logic here.
    };

    const OTPlessSignin = new window.OTPless(callback);
    console.log(window.OTPless, OTPlessSignin);
    setOTPlessSignin(OTPlessSignin);

    // if (window.OTPless) {
    //   const OTPlessSignin = new window.OTPless(callback);
    //   console.log(window.OTPless);
    //   setOTPlessSignin(OTPlessSignin);
    // }
  }, []);

  return OTPlessSignin;
};

export default useOTPLessSignin;
