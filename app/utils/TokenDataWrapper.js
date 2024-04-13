// import React, { useEffect } from "react";
// import { useDispatch } from "react-redux";
// import useTokenAndData from "./token";
// import { changeloading, sendData } from "../redux/slice/userData";
// import { redirect, usePathname } from "next/navigation";
// import { ThemeProvider } from "@/components/theme-provider";
// // import { getCookie } from 'cookies-next';

// export const storeInSessionStorage = (sessionId) => {
//   try {
//     if (typeof window !== undefined) {

//       sessionStorage.setItem("sessionIdAds", sessionId);
//     }
//   } catch (error) {
//     console.log(error);
//   }
// }

// export const getItemSessionStorage = () => {
//   try {
//     if (typeof window != undefined) {
//       const sessionId = sessionStorage.getItem("sessionIdAds");
//       return sessionId;
//     }
//   } catch (error) {
//     console.log(error);
//   }
// }

// const TokenDataWrapper = ({ children }) => {
//   const { isValid, data } = useTokenAndData();
//   const dispatch = useDispatch();
//   const sessionId = getItemSessionStorage()
//   const path = usePathname()
//   const exactpath = ["/login", "/registration", "/contact", "/rederctmg", "/cancellation", "/deleterequest", "/privacy", "/requestdata", "/return", "/shipping", "/terms"]

//   useEffect(() => {
//     if (isValid) {
//       dispatch(changeloading({ loading: false }));
//       dispatch(sendData(data));
//     }
//     const token = localStorage.getItem(`axetkn`)
//     if (!token && !exactpath.includes(path)) {
//       redirect("/login");
//     }
//     if (token && path === "/login") {
//       redirect("/main/dashboard")
//     }
//   }, [isValid, data, dispatch, sessionId]);
//   return <>
//     <ThemeProvider
//       attribute="class"
//       defaultTheme="system"
//       enableSystem
//       disableTransitionOnChange
//     >
//       {children}
//     </ThemeProvider>
//   </>;
// };

// export default TokenDataWrapper;
