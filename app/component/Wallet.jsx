"use client";
import React, { useCallback, useEffect, useState } from "react";
import newWallet from "../assests/newWallet.svg";
import Image from "next/image";
import { AiOutlineLoading3Quarters, AiOutlineSearch } from "react-icons/ai";
import axios from "axios";
import nodataw from "../assests/nodataw.svg";
import { API } from "@/Essentials";
import { RxCross2 } from "react-icons/rx";
import useRazorpay from "react-razorpay";
import { getData } from "../utils/useful";
import { useTheme } from "next-themes";
import FetchWallet from "./FetchWallet";
import Pagination from "./Pagination";

const Wallet = () => {
  const [wallet, setWallet] = useState(0);
  const [money, setMoney] = useState("");
  const [load, setLoad] = useState(true);
  const [payhistory, setPayhistory] = useState([]);
  const [check, setCheck] = useState(false);
  const [inp, setInp] = useState("");
  const [Razorpay] = useRazorpay();
  const { theme } = useTheme()

  const [currentPage, setCurrentPage] = useState(1);
  const [postPerPage, setPostPerPage] = useState(7);
  const lastindex = currentPage * postPerPage;
  const firstIndex = lastindex - postPerPage;
  const postperData = payhistory?.slice(firstIndex, lastindex);
  // const [os, setOs] = useState("");

  const { advid, firstname, lastname } = getData()

  console.log(advid, "advid")
  const fetchdata = useCallback(async () => {
    try {
      setLoad(true)
      const response = await axios.get(`${API}/gettransactions/${advid}`);
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
  }, [advid]);

  useEffect(() => {
    if (advid) {
      fetchdata();
    }
  }, [advid, fetchdata]);

  const handlePayment = useCallback(
    async (e) => {
      e.preventDefault();
      const name = firstname + " " + lastname

      if (advid && inp) {
        try {
          const response = await axios.post(`${API}/addmoneytowallet/${advid}`, {
            amount: inp * 100,
          });

          if (response.data.success === true) {
            const order_id = response.data.order_id;
            const tid = response.data.tid
            var options = {
              "key": "rzp_live_Ms5I8V8VffSpYq", // Enter the Key ID generated from the Dashboard
              "amount": `${inp * 100}`, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
              "currency": "INR",
              "name": "Grovyo", //your business name
              "description": "Adding Money To Wallet - Adspace",
              "image": "https://example.com/your_logo",
              "order_id": `${order_id}`, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
              "callback_url": "http://localhost:3000/status",

              "handler": async (response) => {
                try {
                  setWallet(0)
                  const res = await axios.post(`${API}/updatetransactionstatus/${advid}`, {
                    tid,
                    amount: inp,
                    success: true,
                    payment_id: response.razorpay_payment_id,
                    order_id: response.razorpay_order_id,
                    razorpay_signature: response.razorpay_signature,
                  })
                  window.location.reload()
                } catch (error) {
                  console.log(error)
                }
              },

              "prefill": { //We recommend using the prefill parameter to auto-fill customer's contact information especially their phone number
                "name": name, //your customer's name
                // "email": "gaurav.kumar@example.com",
                // "contact": "9000090000" 
                //Provide the customer's phone number for better conversion rates 
              },
              "notes": {
                "address": "Razorpay Corporate Office"
              },
              "theme": theme === "dark" ? "#000" : "#fff"

            };
            const rzpay = new Razorpay(options);
            rzpay.open();
            rzpay.on('payment.failed', async function (response) {
              console.log(response)

            });
            setLoad(true);
          } else {
            console.log("Add money request failed.");
          }
        } catch (error) {
          console.log(error);
        }
      } else {
        console.log("Something went wrong...");
      }
    },
    [Razorpay, inp]
  );

  if (load) {
    return <div className="flex justify-center
    items-center h-screen dark:bg-[#273142]  bg-white fixed inset-0">
      <div className="animate-spin">
        <AiOutlineLoading3Quarters className="text-xl dark:text-white text-black" />
      </div>

    </div>
  }

  return (
    <>
      <div
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
      </div>

      {/* <div className="py-4 px-5 pn:max-sm:sticky pn:max-sm:top-0 pn:max-sm:left-0 bg-maincolor z-10 w-full">
        <div className="text-2xl font-semibold">Wallet</div>

      </div> */}

      <div className="grid sm:mt-0 grid-cols-1 z-10">
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
