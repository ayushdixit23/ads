// import { useState, useEffect, useCallback } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import jwt from "jsonwebtoken";
// import { useRouter } from "next/navigation";
// import { changeloading, sendData } from "../redux/slice/userData";
// import { useGetRefreshTokenMutation } from "../redux/slice/apiSlice";
// import { checkToken } from "./useful";
// import { getItemSessionStorage } from "./TokenDataWrapper";
// // import { setCookie, getCookie, deleteCookie } from "cookies-next"

// const useTokenAndData = () => {
//   const [isValid, setIsValid] = useState(false);
//   const sessionId = getItemSessionStorage()
//   const [token, setToken] = useState("")
//   const path = useSelector((state) => state.userData.path);
//   const router = useRouter();
//   const [data, setData] = useState(null);
//   const dispatch = useDispatch();
//   const [refreshedtokenAgain] = useGetRefreshTokenMutation()

//   useEffect(() => {
//     const token = localStorage.getItem(`axetkn`)
//     setToken(token)
//   }, [sessionId])

//   const refreshAccessToken = useCallback(async (refreshToken) => {
//     try {
//       const res = await refreshedtokenAgain({ refresh_token: refreshToken });
//       const { access_token, success } = res.data;
//       if (success) {
//         return { access_token, refresh_token: refreshToken };
//       } else {
//         console.error("Failed to refresh token");
//         return Promise.reject("Failed to refresh token");
//       }
//     } catch (err) {
//       console.error(err);
//       return Promise.reject("Failed to refresh token");
//     }
//   }, [refreshedtokenAgain]);

//   const checkRefreshTokenValidity = useCallback(() => {
//     try {
//       const refreshToken = localStorage.getItem(`rvktkn`)
//       if (!refreshToken) {
//         console.error("No refresh token found");
//         return false;
//       }

//       const decodedRefreshToken = jwt.decode(refreshToken);
//       const currentTimestamp = Math.floor(Date.now() / 1000);
//       const expiration = decodedRefreshToken.exp;
//       const isValid = currentTimestamp <= expiration;
//       return isValid;
//     } catch (error) {
//       console.error("Error checking refresh token validity:", error);
//       return false;
//     }
//   }, []);

//   const refresh = useCallback(async () => {
//     const refreshToken = localStorage.getItem(`rvktkn`)

//     if (!refreshToken) {
//       console.error("No refresh token found");
//       return Promise.reject("No refresh token found");
//     }
//     try {
//       const newToken = await refreshAccessToken(refreshToken);
//       if (newToken) {
//         localStorage.setItem(`axetkn`, newToken.access_token)
//       }
//     } catch (error) {
//       console.error("Error during token refresh:", error);
//     }
//   }, [refreshAccessToken]);

//   const generateData = useCallback(
//     async (qrtoken) => {
//       try {
//         const tokentoInclude = token || qrtoken
//         if (tokentoInclude) {
//           const { check, payload } = await checkToken(tokentoInclude)
//           if (check) {
//             setIsValid(true);
//             dispatch(changeloading({ loading: false }))
//             setData(payload)
//             dispatch(sendData(payload))
//             if (path) {
//               router.push(`${path}`);
//             }
//           } else if (checkRefreshTokenValidity()) {
//             await refresh()
//           } else {
//             setIsValid(false);
//             // deleteCookie(`axetkn${sessionId}`);
//             // deleteCookie(`rvktkn${sessionId}`);
//             localStorage.removeItem(`axetkn`)
//             localStorage.removeItem(`rvktkn`)
//           }
//         }
//       } catch (e) {
//         console.error(e);
//         setIsValid(false);
//         localStorage.removeItem(`axetkn`)
//         localStorage.removeItem(`rvktkn`)
//         // deleteCookie(`rvktkn${sessionId}`);
//       }
//     },
//     [token]
//   );

//   useEffect(() => {
//     generateData();
//   }, [token]);

//   return { isValid, data, generateData };
// };

// export default useTokenAndData;
