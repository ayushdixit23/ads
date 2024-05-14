"use client";
import React, { useCallback, useEffect, useState } from "react";
import newWallet from "../assests/newWallet.svg";
import Image from "next/image";
import { AiOutlineLoading3Quarters, AiOutlineSearch } from "react-icons/ai";
import axios from "axios";
import nodataw from "../assests/nodataw.svg";
import { API } from "@/Essentials";
import { RxCross2 } from "react-icons/rx";
// import { getData } from "../utils/useful";
import { useTheme } from "next-themes";
import FetchWallet from "./FetchWallet";
import Pagination from "./Pagination";
import { useRouter } from "next/navigation";
import Loader from "./Loader";
import { useAuthContext } from "../utils/AuthWrapper";

const Wallet = () => {
  const [wallet, setWallet] = useState(0);
  const [money, setMoney] = useState("");
  const [load, setLoad] = useState(true);
  const [payhistory, setPayhistory] = useState([]);
  const [check, setCheck] = useState(false);
  const [inp, setInp] = useState("");
  const router = useRouter()

  const [currentPage, setCurrentPage] = useState(1);
  const [postPerPage, setPostPerPage] = useState(7);
  const lastindex = currentPage * postPerPage;
  const firstIndex = lastindex - postPerPage;

  const postperData = payhistory?.slice(firstIndex, lastindex);
  // const [os, setOs] = useState("");

  // const { advid, firstname, lastname } = getData()
  const { data } = useAuthContext()

  const fetchdata = useCallback(async () => {
    try {
      setLoad(true)
      const response = await axios.get(`${API}/gettransactions/${data?.advid}`);
      if (response.data.success) {
        setMoney(response.data.amount);
        const pay = response.data.transaction;
        setPayhistory(pay);
        setCheck(true);
      } else {
        setCheck(false);
      }
      setLoad(false)
    } catch (error) {
      console.log(error);
      setCheck(false);
    } finally {
      setLoad(false)
    }
  }, [data?.advid]);

  useEffect(() => {
    if (data?.advid) {
      fetchdata();
    }
  }, [data?.advid, fetchdata]);

  const handlePayment =
    async (e, value) => {
      e.preventDefault();
      const name = data?.firstname + " " + data?.lastname

      if (data?.advid) {
        try {
          // const response = await axios.post(`${API}/addmoneytowallet/${data?.advid}`, {
          //   amount: inp * 100,
          // });
          const response = await axios.post(`${API}/addmoneytowallet/${data?.advid}`, {
            amount: value * 100,
          });

          console.log(response.data)
          if (response.data.success) {

            router.push(response.data.url)
          }
        } catch (error) {
          console.log(error);
        }
      } else {
        console.log("Something went wrong...");
      }
    }

  if (load) {
    return <Loader />
  }

  return (
    <>
      {/* <div
        className={`${wallet === 1
          ? "fixed inset-0 z-40 bg-black opacity-50 backdrop-blur-2xl"
          : "hidden"
          }`}
      >
        {" "}
      </div>
      <div
        className={`${wallet === 1
          ? "fixed inset-0 flex items-center p-3 justify-center z-50"
          : "hidden"
          }`}
      >
        <div className="sm:w-[58%] w-[85%] md:w-[43%] h-auto rounded-2xl bg-maincolor p-5 sm:p-[2%]">
          <div className="flex justify-end">
            <RxCross2
              onClick={() => setWallet(0)}
              className="text-xl font-semibold"
            />
          </div>
          <h1 className="text-xl py-2 font-semibold">Enter money</h1>
          <input
            value={inp}
            onChange={(e) => setInp(e.target.value)}
            type="number"
            className="p-2 w-full my-1 outline-none rounded-xl dark:bg-[#273142] dark:border-border dark:border bg-[#f4f5f7]"
          />
          <div className="text-sm py-2 underline">Min 100 rs</div>
          <div>
            <h1 className="text-lg font-semibold py-3">Recommended</h1>
            <div className="flex items-center gap-2 flex-wrap">
              <div
                onClick={() => setInp(199)}
                className="p-3 rounded-xl cursor-pointer dark:bg-[#273142] dark:border-border dark:border bg-[#f4f5f7] "
              >
                199 rs
              </div>
              <div
                onClick={() => setInp(299)}
                className="p-3 rounded-xl cursor-pointer dark:bg-[#273142] dark:border-border dark:border bg-[#f4f5f7] "
              >
                299 rs
              </div>
              <div
                onClick={() => setInp(499)}
                className="p-3 rounded-xl cursor-pointer dark:bg-[#273142] dark:border-border dark:border bg-[#f4f5f7] "
              >
                499 rs
              </div>
              <div
                onClick={() => setInp(899)}
                className="p-3 rounded-xl cursor-pointer dark:bg-[#273142] dark:border-border dark:border bg-[#f4f5f7] "
              >
                899 rs
              </div>
            </div>
          </div>
          <div className="flex justify-center mt-7 items-center">
            <button
              onClick={handlePayment}
              className="md:w-[60%] w-[80%] p-2 px-5 text-sm pn:max-sm:px-6 my-3 bg-[#5C73DB] rounded-xl text-white sm:text-lg font-semibold
            "
            >
              Proceed to Payment
            </button>
          </div>
        </div>
      </div> */}


      {
        wallet == 1 &&
        <div className="fixed inset-0 sm:h-screen w-full flex justify-center items-center h-full bg-black/70 z-20">
          <div className="bg-[#273142] p-6 rounded-xl">
            <div className="flex justify-end items-center ">
              <RxCross2 onClick={() => setWallet(0)} className="text-2xl font-semibold" />
            </div>
            <div class=" flex justify-center items-center">

              <div class="">
                <div class="pt-24 flex flex-row">
                  {/* <!-- Basic Card --> */}
                  <div class="w-96 p-8 bg-white text-center rounded-3xl pr-16 shadow-xl">
                    <h1 class="text-black font-semibold text-2xl">Basic</h1>
                    <p class="pt-2 tracking-wide">
                      <span class="text-black align-top">₹ </span>
                      <span class="text-3xl text-black font-semibold">15000</span>
                      <span class="text-black font-medium">/ month</span>
                    </p>
                    <hr class="mt-4 border-1" />
                    <div class="pt-8">
                      <p class="font-semibold text-gray-400 text-left">

                        <span class="pl-2">
                          Get Impressions above <span class="text-black">30,000+</span>
                        </span>
                      </p>
                      <p class="font-semibold text-gray-400 text-left pt-5">

                        <span class="pl-2">
                          Average Audience <span class="text-black">10,000+</span>
                        </span>
                      </p>
                      <p class="font-semibold text-gray-400 text-left pt-5">

                        <span class="pl-2">
                          <span class="text-black">Clicks: </span>500+
                        </span>
                      </p>

                      <div class="">
                        <p onClick={(e) => handlePayment(e, 15000)} class="w-full py-4 bg-blue-600 mt-8 rounded-xl text-white">
                          <span class="font-medium">
                            Choose Plan
                          </span>

                        </p>
                      </div>
                    </div>
                  </div>
                  {/* <!-- StartUp Card --> */}
                  <div class="w-80 p-8 bg-gray-900 text-center rounded-3xl text-white border-4 shadow-xl border-white transform scale-125">
                    <h1 class="text-white font-semibold text-2xl">Startup</h1>
                    <p class="pt-2 tracking-wide">
                      <span class="text-gray-400 align-top">₹ </span>
                      <span class="text-3xl font-semibold">25000</span>
                      <span class="text-gray-400 font-medium">/ user</span>
                    </p>
                    <hr class="mt-4 border-1 border-gray-600" />
                    <div class="pt-8">
                      <p class="font-semibold text-gray-400 text-left">

                        <span class="pl-2">
                          Get Impressions above <span class="text-white">70,000+</span>
                        </span>
                      </p>
                      <p class="font-semibold text-gray-400 text-left pt-5">

                        <span class="pl-2">
                          Average Audience <span class="text-white">20,000+</span>
                        </span>
                      </p>
                      <p class="font-semibold text-gray-400 text-left pt-5">

                        <span class="pl-2">
                          <span class="text-white">Clicks: </span>1000+
                        </span>
                      </p>

                      <div class="">
                        <p onClick={(e) => handlePayment(e, 25000)} class="w-full py-4 bg-blue-600 mt-8 rounded-xl text-white">
                          <span class="font-medium">
                            Choose Plan
                          </span>

                        </p>
                      </div>
                    </div>
                    <div class="absolute top-4 right-4">
                      <p class="bg-blue-700 font-semibold px-4 py-1 rounded-full uppercase text-xs">Popular</p>
                    </div>
                  </div>
                  {/* <!-- Enterprise Card --> */}
                  <div class="w-96 p-8 bg-white text-center rounded-3xl pl-16 shadow-xl">
                    <h1 class="text-black font-semibold text-2xl">Enterprise</h1>
                    <p class="pt-2 tracking-wide">
                      <span class="text-black align-top">₹ </span>
                      <span class="text-3xl text-black font-semibold">30000</span>
                      <span class="text-black font-medium">/ user</span>
                    </p>
                    <hr class="mt-4 border-1" />
                    <div class="pt-8">
                      <p class="font-semibold text-gray-400 text-left">

                        <span class="pl-2">
                          Get Impressions above <span class="text-black">1,00,000+</span>
                        </span>
                      </p>
                      <p class="font-semibold text-gray-400 text-left pt-5">

                        <span class="pl-2">
                          Average Audience <span class="text-black">30,000+</span>
                        </span>
                      </p>
                      <p class="font-semibold text-gray-400 text-left pt-5">

                        <span class="pl-2">
                          <span class="text-black">Clicks: </span>2000+
                        </span>
                      </p>

                      <div class="">
                        <p onClick={(e) => handlePayment(e, 30000)} class="w-full py-4 bg-blue-600 mt-8 rounded-xl text-white">
                          <span class="font-medium">
                            Choose Plan
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      }

      {/* <div className="py-4 px-5 pn:max-sm:sticky pn:max-sm:top-0 pn:max-sm:left-0 bg-maincolor z-10 w-full">
        <div className="text-2xl font-semibold">Wallet</div>

      </div> */}
      <div className="grid grid-cols-1 h-full overflow-y-scroll no-scrollbar w-[100%] bg-[#f7f7f7] dark:bg-black select-none p-2 sm:p-4">
        {/* <div className="grid sm:mt-0 grid-cols-1 w-full  dark:bg-red-800 z-10"> */}
        <div className="grid grid-cols-1 sm:m-5 w-full sm:w-[95%] ">
          <div className="flex p-3 sm:flex-row flex-col gap-4">
            <div className="md:w-[75%] bg-maincolor p-3 pb-5 sm:w-[60%] border rounded-2xl">
              <div className="flex items-center space-x-2">
                <div>
                  <Image src={newWallet} alt="wallet" />
                </div>
                <div className="sm:text-2xl text-xl font-semibold my-2 py-2">
                  My Current Balance
                </div>
              </div>
              <div className="text-[#1A73E8] mt-3 bg-[#2ECFF1]/10 rounded-2xl px-4 ">
                <div className="sm:text-3xl text-xl font-semibold py-2">
                  &#x20B9; {money ? money : 0}
                </div>
                <div className="pb-2">Current Balance</div>
              </div>
            </div>
            {/* hshs */}
            <div
              onClick={() => setWallet(1)}
              className="md:w-[25%] bg-maincolor sm:w-[40%] flex flex-col w-full border p-2 rounded-2xl space-y-3 justify-center items-center"
            >
              <div>
                <Image src={newWallet} width={80} height={80} alt="money" />
              </div>
              <div className="font-semibold pb-4">Add Funds </div>
            </div>
          </div>

          {/* no data */}
          {payhistory.length === 0 && (
            <div
              className={`p-3 ${payhistory.length === 0 && " pn:max-sm:mb-[5rem]"
                } `}
            >
              <div className="flex justify-between bg-maincolor items-center w-full border md:hidden rounded-t-2xl py-5 px-3 sm:px-[4%]">
                <div className="sm:text-2xl text-lg font-semibold">
                  All Transaction Details
                </div>
                <div className="flex pn:max-sm:hidden justify-center items-center space-x-2 md:w-[30%]">
                  <div className="w-full border px-3 rounded-full ">
                    <input
                      type="text"
                      className="w-full p-2 outline-none bg-transparent rounded-full"
                      placeholder="'Search Transaction id'"
                    />
                  </div>
                  <div className="bg-[#1A73E8] p-2 rounded-full">
                    <AiOutlineSearch className="text-2xl text-white" />
                  </div>
                </div>
              </div>
              <div className="flex flex-col w-full justify-center bg-maincolor p-2 mb-3 py-5 md:hidden items-center">
                <div>
                  <div className="flex justify-center items-center">
                    <Image src={nodataw} alt="nodataw" />
                  </div>
                  <div className="text-xl font-semibold text-center py-2">
                    No transactions
                  </div>
                  <div className="py-2 text-sm text-[#8B8D97]">
                    You have no transactions during this period.
                  </div>
                </div>
              </div>
            </div>
          )}

          <FetchWallet data={postperData} length={payhistory.length} />
          <div className="px-4">
            {payhistory.length > postPerPage && <Pagination
              postPerPage={postPerPage}
              setCurrentPage={setCurrentPage}
              currentPage={currentPage}
              firstIndex={firstIndex}
              lastindex={lastindex}
              length={payhistory.length}
            />
            }
          </div>

        </div>
      </div>
    </>
  );
};

export default Wallet;
