import Image from "next/image";
import React from "react";
import { GrFormAdd } from "react-icons/gr";
import Asterik from "../component/Asterik";
import toast from "react-hot-toast";
import axios from "axios";

const Organisation = ({
  details,
  handleChangePhotoClick,
  setDetails,
  dispatch,
  setChecked,
  aff,
  checked,
  router,

  handleSave,
  setChange,
  onSignup,
  dataValid,
}) => {
  const handlePin = async (e) => {
    try {
      const i = e.target.value;

      setDetails({
        ...details,
        postalCode: i,
      });

      if (i.length === 6) {
        const res = await axios.get(`
			  https://api.postalpincode.in/pincode/${i}
			`);

        if (res?.status === 200) {
          setDetails({
            ...details,
            city: res.data[0].PostOffice[0].District,
            state: res.data[0].PostOffice[0].State,
            postalCode: res.data[0].PostOffice[0].Pincode,
          });
          // setState(res.data[0].PostOffice[0].State);
          // setCity(res.data[0].PostOffice[0].District);
          // setCounty(res.data[0].PostOffice[0].Country);
        }
      }
    } catch (e) {
      // detecterror({ e });
      console.log(e);
    }
  };

  return (
    <>
      <div className="flex justify-center  px-[2%] flex-col">
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
                  className="w-full h-full object-cover"
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
            placeholder=""
            accept="image/*"
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
        {details.myImage != "" ? (
          <button
            onClick={handleChangePhotoClick}
            className="text-sm pb-2 text-[#0075ff] "
          >
            Change Picture
          </button>
        ) : (
          <></>
        )}
        <div className="grid sm:grid-cols-2 gap-4 my-2 mt-4">
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
              <Asterik text={"First Name"} />
            </label>
          </div>

          {/* sec */}
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
              <Asterik text={"Last Name"} />
            </label>
          </div>

          {/* organ */}
        </div>
        <div className="relative my-2 w-full h-16">
          <input
            placeholder="Your Organisation"
            id="organisation"
            onChange={(e) =>
              setDetails({
                ...details,
                Organistaion: e.target.value,
              })
            }
            value={details.Organistaion}
            className="py-1 transition-colors bg-maincolor placeholder-transparent h-10 peer outline-none focus:border-[#5c73db] focus:border-b-2 absolute top-0 left-0 duration-300 border-b w-full"
            type="text"
          />
          <label
            htmlFor="organisation"
            className="peer-focus:text-sm peer-placeholder-shown:text-base peer-placeholder-shown:top-1 -top-4 left-0 text-sm  peer-focus:-top-4 absolute pb-2 transition-all duration-300 font-semibold"
          >
            <Asterik text={"Organisation Name"} />
          </label>
        </div>
        {/* pan */}
        <div className="relative my-2 w-full h-16">
          <input
            placeholder="Your PAN"
            id="pan"
            maxLength={10}
            onChange={(e) =>
              setDetails({
                ...details,
                PAN: e.target.value,
              })
            }
            value={details.PAN}
            className="py-1 transition-colors bg-maincolor placeholder-transparent h-10 peer outline-none focus:border-[#5c73db] focus:border-b-2 absolute top-0 left-0 duration-300 border-b w-full"
            type="text"
          />
          <label
            htmlFor="pan"
            className="peer-focus:text-sm peer-placeholder-shown:text-base peer-placeholder-shown:top-1 -top-4 left-0 text-sm  peer-focus:-top-4 absolute pb-2 transition-all duration-300 font-semibold"
          >
            <Asterik text={"Pan"} />
          </label>
        </div>
        {/* gst */}
        <div className="relative my-2 w-full h-16">
          <input
            placeholder="18%"
            id="gst"
            maxLength={15}
            onChange={(e) =>
              setDetails({
                ...details,
                GST: e.target.value,
              })
            }
            value={details.GST}
            className="py-1 transition-colors bg-maincolor placeholder-transparent h-10 peer outline-none focus:border-[#5c73db] focus:border-b-2 absolute top-0 left-0 duration-300 border-b w-full"
            type="number"
          />
          <label
            htmlFor="gst"
            className="peer-focus:text-sm peer-placeholder-shown:text-base peer-placeholder-shown:top-1 -top-4 left-0 text-sm  peer-focus:-top-4 absolute pb-2 transition-all duration-300 font-semibold"
          >
            GST
          </label>
        </div>
        {/* <div className="my-3 mb-4">
			<input
			  id="image"
			  placeholder="abc@gmail.com"
			  onChange={(e) => handleFileChange(e)}
			  className="w-full"
			  type="file"
			/>
		  </div> */}
        {/* file| */}
        <div className="grid sm:grid-cols-2 my-2 gap-4">
          <div className="relative h-16">
            <input
              placeholder="1234567890"
              maxLength={10}
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
              <Asterik text={"Phone Number"} />
            </label>
          </div>
          <div className=" relative w-full h-16">
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
              <Asterik text={"Email"} />
            </label>
          </div>
        </div>
        <div className="grid sm:grid-cols-2 my-2 gap-4">
          <div className="relative h-16">
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
              <Asterik text={"Password"} />
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
              <Asterik text={"Confirm Password"} />
            </label>
          </div>
        </div>
        {aff == false && (
          <div className="grid sm:grid-cols-2 my-2 gap-4">
            <div className="relative h-16 ">
              <input
                placeholder="300033"
                id="pcode"
                maxLength={6}
                onChange={(e) => handlePin(e)}
                value={details.postalCode}
                className="py-1 transition-colors bg-maincolor placeholder-transparent h-10 peer outline-none focus:border-[#5c73db] focus:border-b-2 absolute top-0 left-0 duration-300 border-b w-full"
                type="number"
              />
              <label
                htmlFor="pcode"
                className="peer-focus:text-sm peer-placeholder-shown:text-base peer-placeholder-shown:top-1 -top-4 left-0 text-sm  peer-focus:-top-4 absolute pb-2 transition-all duration-300 font-semibold"
              >
                <Asterik text={"Postal Code"} />
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
                <Asterik text={"Famous Landmark"} />
              </label>
            </div>
          </div>
        )}
        {aff == false && (
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
              <Asterik text={"Address"} />
            </label>
          </div>
        )}
        {/* city */}
        {aff == false && (
          <div className="grid sm:grid-cols-2 my-2 gap-4">
            <div className="relative h-16">
              <input
                placeholder="Kanpur"
                disabled
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
                <Asterik text={"City"} />
              </label>
            </div>

            {/* state */}
            <div className="relative h-16">
              <input
                placeholder="Uttar Pradesh"
                id="state"
                disabled
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
                <Asterik text={"State"} />
              </label>
            </div>
          </div>
        )}
        {/* postal */}

        <div className="my-2">
          <input
            type="checkbox"
            onChange={() => setChecked(!checked)}
            checked={checked}
          />
          <label className="mx-2">
            I have read and agreed to the{" "}
            <span className="text-[#0075FF]"> Terms & Conditions</span> and
            <span className="text-[#0075FF]"> Privacy policy</span>
          </label>
        </div>
        <div className="flex justify-between space-x-5 items-center">
          <button
            onClick={() => {
              // dispatch(setChange(1))
              router.push("/registration?step=1");
            }}
            className="w-full p-2 border border-[#f9f9f9] text-black dark:text-white  font-semibold rounded-xl my-2"
          >
            Back
          </button>
          {dataValid ? (
            <button
              onClick={(e) => {
                {
                  if (details.password === details.confirmPass) {
                    // dispatch(setChange(3))
                    router.push("/registration?step=3");
                    onSignup(e);
                    // handleSave();
                  } else {
                    toast.error("Password & Confirm Password Doesnt Match");
                    dispatch(setChange(2));
                  }
                }
              }}
              className="w-full p-2 bg-[#2D9AFF] text-white font-semibold rounded-xl my-2"
            >
              Save
            </button>
          ) : (
            <button className="w-full p-2 bg-[#ccc] text-black font-semibold rounded-xl my-2">
              Save
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default Organisation;
