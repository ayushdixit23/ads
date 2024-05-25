// components/LogoutModal.js
"use client";
import { API } from "@/Essentials";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { getData } from "../utils/useful";
import Cookies from "js-cookie";
import { useAuthContext } from "../utils/AuthWrapper";

const LogoutModal = ({ isOpen, onClose }) => {
  const [id, setId] = useState();
  const { data, setAuth, setData } = useAuthContext()
  const router = useRouter();

  const deleteCookies = () => {
    Cookies.remove(`axetkn`)
    Cookies.remove(`rvktkn`)
    setAuth(false)
    setTimeout(() => {
      setData("")
    }, 5000)

    // localStorage.removeItem(`axetkn`)
    // localStorage.removeItem(`rvktkn`)

    router.push("/login")
  }

  const f = async () => {
    try {
      setId(data?.advid)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if (data?.advid) {
      f()
    }
  }, [data?.advid]);
  return (
    <>
      <div>
        {/* Background overlay with blur */}
        {isOpen && (
          <div
            className="fixed inset-0 z-50 bg-black opacity-70 sm:opacity-50 backdrop-blur-2xl"
            onClick={onClose}
          ></div>
        )}

        <div
          className={`fixed inset-0 flex items-center justify-center z-50 ${isOpen ? "block" : "hidden"
            }`}
        >
          <div className="w-[330px] shadow-lg rounded-2xl p-3 sm:p-4 bg-maincolor">
            <div className="py-2">
              <h1 className="text-xl font-semibold py-1">
                Sure Want to LOG OUT
              </h1>
              <h1 className="py-1">Are you sure you want to Log out ?</h1>
            </div>

            <div className="flex w-full justify-center mt-3 gap-2 items-center">
              <button
                onClick={onClose}
                className="p-2 px-5 w-full rounded-md dark:bg-transparent dark:border bg-[#f3f3f3]"
              >
                Cancel
              </button>
              <button
                onClick={deleteCookies}
                className="p-2 px-5 w-full rounded-md bg-[#D92D20] text-white font-medium"
              >
                Log Out
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LogoutModal;
