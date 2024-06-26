import jwt from "jsonwebtoken"
import { useMemo } from "react";
import { useSelector } from "react-redux";
export const formatDateToString = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Month is zero-based, so add 1
    const day = date.getDate().toString().padStart(2, "0");
    const formattedDate = `${day}/${month}/${year}`;
    // conormattedDate = `${year}-${month}-${day}`;st f
    return formattedDate;
}

export const checkToken = async (token) => {
    try {
        const decodedToken = jwt.decode(token, { complete: true });
        if (decodedToken && decodedToken.header && decodedToken.payload) {
            const issuedAt = decodedToken.payload.iat;
            const currentTimestamp = Math.floor(Date.now() / 1000);
            const isValidIat = issuedAt <= currentTimestamp;
            const expiration = decodedToken.payload.exp;
            const isValidExp = currentTimestamp <= expiration;
            if (isValidIat && isValidExp) {
                return { isValid: true, payload: decodedToken.payload }
            } else {
                return { isValid: false, payload: "" }
            }
        }
    } catch (error) {
        console.log(error)
    }
}

// export const appData = async ()=>{
//     try {
//       const getcookie = Cookies.get("adwkpiz")
//         const de =getcookie? decryptaes(getcookie):null
//         const data = de ? JSON.parse(de) : null
//        return data
//     } catch (error) {
//      console.log(error)
//     }
// }

export const getData = () => {
    const data = useSelector((state) => state.userData.data)
    const memoizedData = useMemo(() => {
        const {
            userid = null,
            advid = null,
            image = null,
            firstname = null,
            lastname = null,
            country = null,
            city = null,
            advertiserid = null,
            address = null,
            accounttype = null,
            taxinfo = null,
            email = null,
            sessionId = null

        } = data || {};

        return {
            userid,
            advid,
            image,
            firstname,
            lastname,
            advertiserid,
            country,
            city,
            address,
            accounttype,
            taxinfo,
            email,
            sessionId
        };
    }, [data]);

    return memoizedData;
}

export const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Month is zero-based, so add 1
    const day = date.getDate().toString().padStart(2, "0");
    const formattedDate = `${year}-${month}-${day}`; // Change the format to YYYY-MM-DD
    return formattedDate;
}


export const returnDay = (dateString) => {
    const date = new Date(dateString); // Parse the ISO string
    if (isNaN(date)) {
        console.log("Invalid date string");
    }
    const day = date.getDate();
    const month = date.toLocaleString("default", { month: "long" });
    // const updated = month.slice(0, 3)
    // const year = date.getFullYear();

    // const formattedDate = `${day} ${updated} ${year}`;
    return day;
};


export const returnMonth = (dateString) => {
    const date = new Date(dateString); // Parse the ISO string
    if (isNaN(date)) {
        console.log("Invalid date string");
    }
    const day = date.getMonth();
    const month = date.toLocaleString("default", { month: "long" });
    // const updated = month.slice(0, 3)
    // const year = date.getFullYear();

    // const formattedDate = `${day} ${updated} ${year}`;
    return month;
};


export function formatNumberToIndianSystem(number) {
    // Convert the number to a string
    const numberString = number.toString();

    // Split the number into integer and fractional parts
    const [integerPart, fractionalPart] = numberString.split('.');

    // Regular expression to insert commas according to the Indian system
    const indianNumberFormat = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

    // Combine the formatted integer part with the fractional part if it exists
    return fractionalPart ? `${indianNumberFormat}.${fractionalPart}` : indianNumberFormat;
}

export function capitalizeFirstLetter(string) {
    if (typeof string !== 'string' || string.length === 0) {
        return string;
    }
    return string.charAt(0).toUpperCase() + string.slice(1);
}