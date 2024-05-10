import React from 'react'
import { AiOutlineEdit, AiTwotoneEdit } from 'react-icons/ai'
import { BsCheckLg, BsThreeDots } from 'react-icons/bs'
import adss from "../assests/defaultads.jpg";
import { formatDateToString } from '../utils/useful';
import Link from 'next/link';
const Ad3 = ({
  setStep,
  // step,
  three,
  dispatch,
  pricebyDay,
  totalPrice,
  tax,
  date,
  communityData,
  addTax,
}) => {

  return (
    <>
      <div className="flex justify-center pb-[100px] gap-4 px-[2%] w-full pn:max-md:hidden">
        <div
          className={`flex bg-[#F0F2F5] dark:bg-[#181a20] h-full p-4 px-[2%] md:min-w-[800px] lg:min-w-[1024px] my-4 pn:max-md:hidden rounded-2xl flex-col`}
        >
          <div className="md:min-w-[800px] lg:min-w-[1024px] bg-maincolor rounded-2xl h-full py-5 px-5">
            <div className="flex justify-between items-center">
              <div className="text-xl font-semibold py-2">Preview</div>
              <Link href="/createAd?step=1"
                onClick={() => dispatch(setStep(0))}
                // onClick={() => setStep(0)}
                className="flex justify-center border cursor-pointer hover:bg-[#4C9AFF] p-1 px-4 rounded-full items-center"
              >
                <div>
                  <AiOutlineEdit />
                </div>
                <div className="font-medium mx-1">Edit</div>
              </Link>
            </div>
            <div className="grid grid-cols-2 px-2">
              <div className="flex flex-col space-y-2 my-1">
                <div className="  dark:text-white text-[#333333]">Ad Name</div>
                <div className="font-medium">{three.adName}</div>
              </div>
              <div className="flex flex-col space-y-2 my-1">
                <div className=" dark:text-white text-[#333333]">Ad Goal</div>
                <div className="font-medium">{three.goal}</div>
              </div>
            </div>

            <div className="w-full my-3 h-[1px] dark:bg-[#e7ecf2] bg-[#D4D5D7]"></div>

            <div className="grid grid-cols-2 px-2">
              {/* <div className="my-3">
                    <h1 className="text-lg font-semibold py-2">Budget</h1>
                    <div className="flex items-center gap-5 ">
                      <div className="flex flex-col space-y-2 my-1">
                        <div className=" dark:text-white text-[#333333]">Total Budget</div>
                        <div className="font-medium">
                          {Math.ceil(pricebyDay)}
                        </div>
                      </div>
                      <div className="flex flex-col space-y-2 my-1">
                        <div className=" dark:text-white text-[#333333]">Daily Budget</div>
                        <div className="font-medium">
                          {Math.ceil(totalPrice)}
                        </div>
                      </div>
                    </div>
                  </div> */}

              <div className="my-3">
                <h1 className="text-lg font-semibold py-2">Date & Time</h1>
                <div className="flex items-center gap-5">
                  <div className="flex flex-col space-y-2 my-1">
                    <div className=" dark:text-white text-[#333333]">Start Date</div>
                    <div className="font-medium">{formatDateToString(three.startDate)}</div>
                  </div>
                  <div className="flex flex-col space-y-2 my-1">
                    <div className=" dark:text-white text-[#333333]">End Date</div>
                    <div className="font-medium"> {date
                      ? formatDateToString(three.endDate) > formatDateToString(three.startDate)
                        ? formatDateToString(three.endDate)
                        : null
                      : "Not Selected"}</div>
                  </div>

                  {/* <div className="flex flex-col space-y-2 my-1">
                        <div className=" dark:text-white text-[#333333]">Ad Duration</div>
                        <div className="font-medium">{three.duration}</div>
                      </div> */}
                </div>
              </div>
            </div>

            <div className="w-full my-3 h-[1px] dark:bg-[#e7ecf2] bg-[#D4D5D7]"></div>

            <div className="my-3">
              <h1 className="text-xl font-semibold py-2">Target People</h1>
              <div className="flex items-center gap-7 px-2">
                <div className="flex flex-col space-y-2 my-1">
                  <div className=" dark:text-white text-[#333333]">Gender</div>
                  <div className="font-medium">{three.gender}</div>
                </div>
                <div className="flex flex-col space-y-2 my-1">
                  <div className=" dark:text-white text-[#333333]">Age Group</div>
                  <div className="font-medium">
                    {three.selectedAgeRange
                      ? three.selectedAgeRange
                      : "All age group"}
                  </div>
                </div>
                <div className="flex flex-col space-y-2 my-1">
                  <div className=" dark:text-white text-[#333333]">Call to Action</div>
                  <div className="font-medium">{three.Action}</div>
                </div>
                <div className="flex flex-col space-y-2 my-1">
                  <div className=" dark:text-white text-[#333333]">Category</div>
                  <div className="font-medium">{three.category}</div>
                </div>
              </div>
            </div>

            <div className="w-full my-3 h-[1px] dark:bg-[#e7ecf2] bg-[#D4D5D7]"></div>

            <div className="my-3">
              <div className="flex justify-between items-center">
                <div className="text-xl font-semibold py-2">Locations</div>
              </div>
              <div className="flex my-2 items-center space-x-3">
                <div className="flex flex-wrap my-2 items-center space-x-3">
                  {three.location.map((loc, i) => (
                    <div
                      key={i}
                      className="bg-[#F3F4F6] dark:bg-border font-semibold p-1 px-3 rounded-full"
                    >
                      {loc}
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="my-3">
              <div className="flex justify-between items-center">
                <div className="text-xl font-semibold py-2">Type of ad</div>
              </div>
              <div className="flex my-2 items-center space-x-3">

                <div
                  className="bg-[#F3F4F6] dark:bg-maincolor font-semibold p-1 px-3 rounded-full"
                >
                  {three.type}
                </div>
              </div>
            </div>
          </div>

          {/* <div className=" lg:min-w-[700px] bg-maincolor  my-4 rounded-2xl py-5 px-5">
                <div className="bg-[#FAFAFA] dark:bg-maincolor flex justify-between py-5 my-3 px-1 items-center">
                  <div className="flex justify-center space-x-2 sm:space-x-4 items-center">
                    <div>
                      <img
                        src={three.pic}
                        alt="ads"
                        className="rounded-xl object-cover w-[70px] h-[70px]"
                      />
                    </div>
                    <div>
                      <div className="flex items-center space-x-1">
                        <span className="font-medium">{three.Headline ?
                          three.Headline.length > 10 ? `${three.Headline.slice(0, 10)}...` : three.Headline
                          : "Neve a bad meal"}</span>
               
                    
                      </div>
                      <div className=" text-sm "> {three.Description != ""
                        ? three.Description.length > 20 ? `${three.Description.slice(0, 20)}...` : three.Description
                        : "healthy and sweet dishes"}</div>
                      
                    </div>
                  </div>
                 
                </div>
              </div> */}
          {/* <div className="lg:min-w-[700px] bg-maincolor my-4 rounded-2xl py-5 px-5">
                <div className="flex flex-col gap-4">
                  <div className="flex flex-col gap-1">
                    <div className="font-bold">Payment Details</div>
                    <div className=" dark:text-white text-[#333333] text-sm">
                      Your Ad will run for 7 days
                    </div>
                  </div>
                  <div className="bg-[#FAFAFA] dark:bg-maincolor p-5 rounded-2xl">
                    <div className="flex flex-col gap-2">
                      <div className="flex justify-between p-[2px] items-center">
                        <div className="font-medium">Ad Budget</div>
                        <div>₹ {Math.ceil(pricebyDay)}</div>
                      </div>
                    

                      <div className="flex justify-between p-[2px] items-center">
                        <div className="font-medium">Taxes and Charges</div>
                        <div>₹ {Math.ceil(tax)}</div>
                      </div>
                      <div className="flex justify-between p-[2px] items-center">
                        <div className="font-medium">Total</div>
                        <div className="font-semibold">
                          ₹ {Math.ceil(addTax)}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div> */}
        </div>

        {/* <div className="flex flex-col">
              <Square3 />
              <Square4 />
            </div> */}
      </div>

      {/* mobile step-2 */}
      <div className="md:hidden pb-[180px]">
        <div className="flex dark:bg-[#181a20] bg-white flex-col">
          {/* <div className="fixed w-full top-0 z-50 bg-maincolor">
              <div className="flex shadow-lg justify-between px-5 items-center py-2">
                <div className="text-[#555555] text-xl py-2 font-semibold">
                  Ad SetUp
                </div>
                <div className="flex justify-center pn:max-sm:hidden items-center gap-3 ">
                  <div
                    onClick={() => setStep(1)}
                    className="border-b cursor-pointer hidden border-black"
                  >
                    Discard
                  </div>

                  <div
                    onClick={sendData}
                    className="p-2 px-7  rounded-full cursor-pointer bg-[#2D9AFF] text-white"
                  >
                  
                    Save
                   
                  </div>
                </div>
              </div>
            </div> */}
          {/* <div>
              <div
                style={{ marginTop: "4rem" }}
                className="flex justify-center bg-[#fafafa] dark:bg-maincolor pt-5 py-3 mt-3 pn:max-sm:text-xs text-center px-3"
              >
                <div className=" flex flex-col gap-1 justify-center items-center">
                  <div
                    className={` h-10 w-10 rounded-full mr-2 flex items-center justify-center ${step > 0
                      ? "bg-[#27AE60] text-white"
                      : "bg-green-300 text-white"
                      }`}
                  >
                    {step >= 1 ? (
                      <BsCheckLg className="text-lg font-bold" />
                    ) : (
                      1
                    )}
                  </div>

                  <div
                    className={` flex items-center font-semibold flex-col ${step >= 0 ? "text-[#27AE60]" : null
                      }`}
                  >
                    Set up Ad
                  </div>
                </div>

                <div
                  className={`border-[#f9f9f9] border-dashed border-t-2 pn:max-sm:w-10 sm:w-20 mt-5 ${step >= 0 ? "border-black " : "border-black"
                    }`}
                />

                <div className="flex flex-col gap-1 justify-center items-center">
                  <div
                    className={`h-10 w-10 rounded-full flex items-center justify-center ${step >= 1
                      ? "bg-[#27AE60] text-white"
                      : "bg-green-300 text-white"
                      }`}
                  >
                    {step >= 1 ? (
                      <BsCheckLg className="text-lg font-bold" />
                    ) : (
                      2
                    )}
                  </div>

                  <div
                    className={` flex items-center flex-col ${step >= 1 ? "text-[#27AE60] " : "text-green-300"
                      }`}
                  >
                    Select target
                  </div>
                </div>
                <div
                  className={`border-[#f9f9f9] border-dashed border-t-2 pn:max-sm:w-10 sm:w-20 mt-5 ${step >= 1 ? "border-black " : "border-black"
                    }`}
                />
                <div className="flex flex-col gap-1 justify-center -ml-4 items-center">
                  <div
                    className={`bg-[#f9f9f9] h-10 w-10 rounded-full flex items-center justify-center ${step >= 2
                      ? "bg-blue-600 text-white"
                      : "bg-green-300 text-white"
                      }`}
                  >
                    3
                  </div>

                  <div
                    className={` flex items-center flex-col justify-center ${step === 2 ? "text-blue-600 " : "text-green-300"
                      }`}
                  >
                    Preview & Launch
                  </div>
                </div>
              </div>
            </div> */}
          <div className="grid bg-[#F0F2F5] dark:bg-[#181a20] grid-cols-1">
            {/* <div className="flex flex-col">
                {" "}
                <Square3 />
                <Square4 />
              </div> */}
            <div className="flex md:hidden flex-col px-3">
              <div className="bg-maincolor w-full my-4 rounded-2xl py-5 px-3">
                <div className="flex justify-between items-center">
                  <div className="text-xl font-semibold py-2">Ad Details</div>
                  <Link href="/createAd?step=1"
                    onClick={() => dispatch(setStep(0))}
                    className="flex cursor-pointer justify-center border border-black p-1 px-3 sm:px-4 rounded-full items-center"
                  >
                    <div>
                      <AiOutlineEdit />
                    </div>
                    <div className="font-medium mx-1">Edit</div>
                  </Link>
                </div>
                <div className="grid sm:grid-cols-2 gap-1 my-2">
                  <div className="flex flex-col space-y-2 my-1">
                    <div className=" dark:text-white text-[#333333]">Ad Name</div>
                    <div className="font-medium">{three.adName}</div>
                  </div>
                  <div className="flex flex-col space-y-2 my-1">
                    <div className=" dark:text-white text-[#333333]">Ad Goal</div>
                    <div className="font-medium">{three.goal}</div>
                  </div>
                </div>

                <div className="w-full my-3 h-[1px] dark:bg-[#e7ecf2] bg-[#D4D5D7]"></div>

                <div className="grid sm:grid-cols-2 px-2">
                  {/* <div className="my-3">
                      <h1 className="text-lg font-semibold py-2">Budget</h1>
                      <div className="flex items-center gap-5 ">
                        <div className="flex flex-col space-y-2 my-1">
                          <div className=" dark:text-white text-[#333333]">Total Budget</div>
                          <div className="font-medium">
                            {Math.ceil(pricebyDay)}
                          </div>
                        </div>
                        <div className="flex flex-col space-y-2 my-1">
                          <div className=" dark:text-white text-[#333333]">Daily Budget</div>
                          <div className="font-medium">
                            {Math.ceil(totalPrice)}
                          </div>
                        </div>
                      </div>
                    </div> */}

                  <div className="my-3">
                    <h1 className="text-lg font-semibold py-2">
                      Date & Time
                    </h1>
                    <div className="flex items-center space-x-5 ">
                      <div className="flex flex-col space-y-2 my-1">
                        <div className=" dark:text-white text-[#333333]">Start Date</div>
                        <div className="font-medium">{formatDateToString(three.startDate)}</div>
                      </div>
                      <div className="flex flex-col space-y-2 my-1">
                        <div className=" dark:text-white text-[#333333]">End Date</div>
                        <div className="font-medium">
                          {date
                            ? formatDateToString(three.endDate) > formatDateToString(three.startDate)
                              ? formatDateToString(three.endDate)
                              : null
                            : "Not Selected"}
                        </div>
                      </div>
                      {/* <div className="flex flex-col space-y-2 my-1">
                          <div className=" dark:text-white text-[#333333]">Ad Duration</div>
                          <div className="font-medium">{three.duration}</div>
                        </div> */}
                    </div>
                  </div>
                </div>

                <div className="w-full my-3 h-[1px] dark:bg-[#e7ecf2] bg-[#D4D5D7]"></div>

                <div className="my-3">
                  <h1 className="text-xl font-semibold py-2">
                    Target People
                  </h1>
                  <div className="grid grid-cols-2">
                    <div className="flex flex-col space-y-2 my-1">
                      <div className=" dark:text-white text-[#333333]">Gender</div>
                      <div className="font-medium">{three.gender}</div>
                    </div>
                    <div className="flex flex-col space-y-2 my-1">
                      <div className=" dark:text-white text-[#333333]">Age Group</div>
                      <div className="font-medium">
                        {" "}
                        {three.selectedAgeRange
                          ? three.selectedAgeRange
                          : "All age group"}
                      </div>
                    </div>
                    <div className="flex flex-col space-y-2 my-1">
                      <div className=" dark:text-white text-[#333333]">Call to Action</div>
                      <div className="font-medium">{three.Action}</div>
                    </div>
                    <div className="flex flex-col space-y-2 my-1">
                      <div className=" dark:text-white text-[#333333]">Category</div>
                      <div className="font-medium">{three.category}</div>
                    </div>
                  </div>
                </div>

                <div className="w-full my-3 h-[1px] dark:bg-[#e7ecf2] bg-[#D4D5D7]"></div>

                <div className="my-3">
                  <div className="flex justify-between items-center">
                    <div className="text-xl font-semibold py-2">
                      Locations
                    </div>
                  </div>
                  <div className="flex flex-wrap my-2 items-center space-x-3">
                    {three.location.map((loc, i) => (
                      <div
                        key={i}
                        className="bg-[#F3F4F6]  dark:bg-border font-semibold p-1 px-3 rounded-full"
                      >
                        {loc}
                      </div>
                    ))}
                  </div>
                </div>
                <div className="my-3">
                  <div className="flex justify-between items-center">
                    <div className="text-xl font-semibold py-2">
                      Type of ad
                    </div>
                  </div>
                  <div className="flex my-2 items-center space-x-3">
                    {/* {three.type.map((data, i) => (
                        <div
                          key={i}
                          className="bg-[#F3F4F6] dark:bg-maincolor font-semibold p-1 px-3 rounded-full"
                        >
                          {data}
                        </div>
                      ))} */}
                    <div
                      className="bg-[#F3F4F6] dark:bg-maincolor font-semibold p-1 px-3 rounded-full"
                    >
                      {three.type}
                    </div>

                  </div>
                </div>
              </div>

              {/* <div className="w-full bg-maincolor my-4 rounded-2xl py-5 px-5">
                  <div className="bg-[#FAFAFA] dark:bg-maincolor flex justify-between py-5 my-3 px-1 items-center">
                    <div className="flex justify-center space-x-2 sm:space-x-4 items-center">
                      <div>
                        <img
                          src={three.pic ? three.pic : adss}
                          alt="ads"
                          className="object-cover rounded-xl w-[80px] h-[80px]"
                        />
                      </div>
                      <div>
                        <div className="flex items-center space-x-1">
                          <span className="font-medium">
                            {three.Headline ?
                              three.Headline.length > 5 ? `${three.Headline.slice(0, 5)}...` : three.Headline
                              : "Never have a bad meal"}
                          </span>
                          
                        </div>
                        <div className=" text-sm max-w-[87%]">
                          {three.Description != ""
                            ? three.Description.length > 10 ? `${three.Description.slice(0, 10)}...` : three.Description
                            : "healthy and sweet dishes"}
                        </div>
                       
                      </div>
                    </div>
         
                  </div>
                </div> */}
              {/* 
                <div

                  className="w-full bg-maincolor my-4 rounded-2xl py-5 px-5"
                >
                  <div className="flex flex-col gap-4">
                    <div className="flex flex-col gap-1">
                      <div className="font-bold">Payment Details</div>

                    </div>
                    <div className="bg-[#FAFAFA] dark:bg-maincolor p-3 rounded-2xl">
                      <div className="flex flex-col gap-2">
                        <div className="flex justify-between p-[2px] items-center">
                          <div className="font-medium">Ad Budget</div>
                          <div>₹ {Math.ceil(pricebyDay)}</div>
                        </div>
                      

                        <div className="flex justify-between p-[2px] items-center">
                          <div className="font-medium">Taxes and Charges</div>
                          <div>₹ {Math.ceil(tax)}</div>
                        </div>

                        <div className="w-full h-1 border-t border-black"></div>

                        <div className="flex justify-between p-[2px] items-center">
                          <div className="font-medium">Total</div>
                          <div className="font-semibold">
                            ₹ {Math.ceil(addTax)}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div> */}
            </div>
            {/* <div className="sm:hidden fixed bottom-0 bg-maincolor w-full p-3">
                <button className="bg-[#2D9AFF] text-lg font-medium rounded-2xl text-white p-3 w-full">

                  Save
                </button>
              </div> */}
          </div>
        </div>
      </div>
    </>
  )
}

export default Ad3