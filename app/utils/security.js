import aesjs from "aes-js";
const getKey = () => {
  try {
    return JSON.parse(process.env.NEXT_PUBLIC_KEY);
  } catch (e) {
    console.log(e)
  }
};

const key = getKey();

export const encryptaes = (data) => {
  try {
    const textBytes = aesjs.utils.utf8.toBytes(data);
    const aesCtr = new aesjs.ModeOfOperation.ctr(key, new aesjs.Counter(5));
    const encryptedBytes = aesCtr.encrypt(textBytes);
    const encryptedHex = aesjs.utils.hex.fromBytes(encryptedBytes);
    return encryptedHex;
  } catch (e) {
    console.log(e);
  }
};

export const decryptaes = (data) => {
  try {
    const encryptedBytes = aesjs.utils.hex.toBytes(data);
    const aesCtr = new aesjs.ModeOfOperation.ctr(key, new aesjs.Counter(5));
    const decryptedBytes = aesCtr.decrypt(encryptedBytes);
    const decryptedText = aesjs.utils.utf8.fromBytes(decryptedBytes);
    return decryptedText;
  } catch (e) {
    console.log(e)
  }
};



// const callback = (userinfo) => {
//   const emailMap = otplessUser.identities.find(
//     (item) => item.identityType === "EMAIL"
//   );

//   const mobileMap = otplessUser.identities.find(
//     (item) => item.identityType === "MOBILE"
//   )?.identityValue;

//   const token = otplessUser.token;

//   const email = emailMap?.identityValue;

//   const mobile = mobileMap?.identityValue;

//   const name = emailMap?.name || mobileMap?.name;

//   console.log(userinfo);

// };
// // Initialize OTPLESS SDK with the defined callback.
// export const OTPlessSignin = new OTPless(callback);


