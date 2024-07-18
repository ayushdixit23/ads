"use client";
import { API } from "@/Essentials";
import { useAuthContext } from "@/app/utils/AuthWrapper";
import { getItemSessionStorage } from "@/app/utils/TokenDataWrapper";
import { getData } from "@/app/utils/useful";
import axios from "axios";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { BiPencil } from "react-icons/bi";

const Page = () => {
  const [edit, setEdit] = useState(false);
  const router = useRouter()
  const [data, setData] = useState({
    accid: '',
    name: '',
    country: '',
    city: '',
    address: '',
    accounttype: '',
    taxinfo: '',
  });

  // const { advid, firstname, lastname, city, address, country, accounttype, taxinfo, userid, advertiserid } = getData()
  const { data: ads } = useAuthContext()

  useEffect(() => {
    setData({
      ...data,
      accid: ads?.advertiserid,
      name: ads?.lastname && ads?.lastname != "undefined"
        ? ads?.firstname + " " + ads?.lastname
        : ads?.firstname,
      country: ads?.country,
      city: ads?.city,
      address: ads?.address,
      accounttype: ads?.accounttype,
      taxinfo: ads?.taxinfo,
    })
  }, [ads?.advid, ads?.firstname, ads?.lastname, ads?.city, ads?.address, ads?.advertiserid, ads?.country, ads?.accounttype, ads?.taxinfo, ads?.userid])

  const handleSave = async () => {
    try {
      const res = await axios.post(`${API}/editadvertiser/${ads?.advid}`, {
        firstname: data?.firstname,
        lastname: data?.lastname && data?.lastname != "undefined" ? data?.lastname : "",
        city: data?.city,
        country: data?.country,
        taxinfo: data?.taxinfo,
        address: data?.address,
        accounttype: data?.accounttype,
      })

      if (res.data?.success) {
        deleteCookies()
        setCookieAds(res.data)
      }
      setEdit(false)
    } catch (e) {
      console.log(e)
    }
  }

  const deleteCookies = () => {
    // deleteCookie(`axetkn${sessionId}`);
    // deleteCookie(`rvktkn${sessionId}`);
    Cookies.remove(`axetkn`)
    Cookies.remove(`rvktkn`)
    // localStorage.removeItem(`axetkn`)
    // localStorage.removeItem(`rvktkn`)
    router.push("/login")
  }

  const setCookieAds = (datas) => {
    // localStorage.setItem(`axetkn`, data.access_token)
    // localStorage.setItem(`rvktkn`, data.refresh_token)
    const expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() + 7);

    Cookies.set(`axetkn`, data.access_token, { expires: expirationDate })
    Cookies.set(`rvktkn`, data.refresh_token, { expires: expirationDate })
  }

  return (
    <>
      <div className="h-full w-full p-[3%]">
        <h1 className="text-xl font-semibold py-2">Payment Methods</h1>
        <div className=" my-5">
          <div className="flex light:hover:bg-[#fafafa] py-2 justify-between items-center">
            <div>Payments Details</div>
            <div className="cursor-pointer">
              <BiPencil onClick={() => setEdit(!edit)} className="text-2xl" />
            </div>
          </div>

          {
            edit ?
              <div className={`${edit ? null : null}`}>
                <div className="flex justify-between  my-2 items-center">
                  <div className="font-semibold">Name</div>
                  <input className="text-[#82888D] dark:bg-[#0d0d0d] border dark:border-[#333] outline-none p-2 rounded-lg" value={data.name} onChange={(e) => {
                    setData({ ...data, name: e.target.value })

                  }} />
                </div>
                <div className="flex justify-between my-2 items-center">
                  <div className="font-semibold">Country</div>
                  <input className="text-[#82888D] dark:bg-[#0d0d0d] border dark:border-[#333] outline-none p-2 rounded-lg" value={data?.country} onChange={(e) => {
                    setData({ ...data, country: e.target.value })
                  }} />

                </div>
                <div className="flex justify-between my-2 items-center">
                  <div className="font-semibold">City</div>
                  <input
                    className="text-[#82888D] dark:bg-[#0d0d0d] border dark:border-[#333] outline-none p-2 rounded-lg"
                    value={data.city}
                    onChange={(e) => {
                      setData({ ...data, city: e.target.value })

                    }}
                  />

                </div>
                <div className="flex justify-between my-2 items-center">
                  <div className="font-semibold">Address</div>
                  <input className="text-[#82888D] dark:bg-[#0d0d0d] border dark:border-[#333] outline-none p-2 rounded-lg" value={data?.address} onChange={(e) => {
                    setData({ ...data, address: e.target.value })

                  }} />
                </div>
                <div className="flex justify-between my-2 items-center">
                  <div className="font-semibold">Account Type</div>
                  <input disabled className="text-[#82888D] dark:bg-[#0d0d0d] border dark:border-[#333] outline-none p-2 rounded-lg" value={data?.accounttype} onChange={(e) => {
                    setData({ ...data, accounttype: e.target.value })

                  }} />
                </div>
                <div className="flex justify-between my-2 items-center">
                  <div className="font-semibold">Tax Info</div>
                  <input className="text-[#82888D] dark:bg-[#0d0d0d] border dark:border-[#333] outline-none p-2 rounded-lg" value={data?.taxinfo} onChange={(e) => {
                    setData({ ...data, taxinfo: e.target.value })

                  }} />

                </div>

                <div className="flex my-2 justify-end">
                  <div className="flex justify-center gap-3 items-center">
                    <div
                      onClick={() => {
                        setEdit
                          (false)
                      }}
                      className="light:border font-medium p-2 px-4 rounded-md border-[#7D899D]">
                      Cancel
                    </div>
                    <div onClick={handleSave} className="p-2 px-4 rounded-md bg-[#2D9AFF] font-medium text-white">
                      Save Changes
                    </div>
                  </div>
                </div>
              </div>
              :
              <div className="">
                <div className="flex justify-between my-2 p-2 w-full items-center">
                  <div className="font-semibold max-w-[50%] text-sm sm:text-base">Name</div>
                  <div className="text-[#82888D] max-w-[50%] max-h-[80px] overflow-y-scroll text-sm sm:text-base no-scrollbar">{data?.name}</div>
                </div>
                <div className="flex justify-between my-2 p-2 w-full items-center">
                  <div className="font-semibold max-w-[50%] text-sm sm:text-base">Country</div>
                  <div className="text-[#82888D] max-w-[50%] max-h-[80px] overflow-y-scroll text-sm sm:text-base no-scrollbar">{data?.country}</div>
                </div>
                <div className="flex justify-between my-2 p-2 w-full items-center">
                  <div className="font-semibold max-w-[50%] text-sm sm:text-base">City</div>
                  <div className="text-[#82888D] max-w-[50%] max-h-[80px] overflow-y-scroll text-sm sm:text-base no-scrollbar">{data?.city}</div>
                </div>
                <div className="flex justify-between my-2 p-2 w-full items-center">
                  <div className="font-semibold text-sm sm:text-base max-w-[30%]">Address</div>
                  <div className="text-[#82888D] max-w-[70%]  pn:max-sm:text-right max-h-[80px] overflow-y-scroll text-sm sm:text-base no-scrollbar">{data?.address}</div>
                </div>
                <div className="flex justify-between my-2 p-2 w-full items-center">
                  <div className="font-semibold max-w-[50%] text-sm sm:text-base">Account Type</div>
                  <div className="text-[#82888D] max-w-[50%] max-h-[80px] overflow-y-scroll text-sm sm:text-base no-scrollbar">{data?.accounttype}</div>
                </div>
                <div className="flex justify-between my-2 p-2 w-full items-center">
                  <div className="font-semibold max-w-[50%] text-sm sm:text-base">Tax Info</div>
                  <div className="text-[#82888D] max-w-[50%] max-h-[80px] overflow-y-scroll text-sm sm:text-base no-scrollbar">{data?.taxinfo}</div>
                </div>
                {/* <div className="flex justify-between my-2 p-2 w-full items-center">
            <div className="font-semibold max-w-[50%]">Language preference</div>
            <div className="text-[#82888D] max-w-[50%] max-h-[80px] overflow-y-scroll no-scrollbar">Not chosen</div>
          </div> */}
                {/* <div className="flex justify-end">
                  <div className="flex justify-center gap-3 items-center">
                    <div className="border-2 font-medium p-2 px-4 rounded-md border-[#7D899D]">
                      Cancel
                    </div>
                    <div className="p-2 px-4 rounded-md bg-[#5585FF] font-medium text-white">
                      Save Changes
                    </div>
                  </div>
                </div> */}

              </div>
          }




        </div>
        <div className="flex justify-between text-sm sm:text-base light:hover:bg-[#fafafa] p-2 my-5 items-center">
          <div>Account ID</div>
          <div>{ads?.advertiserid}</div>
        </div>
      </div>


    </>
  );
};

export default Page;
