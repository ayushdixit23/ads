"use client";
import React, { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
// import { PiCardsThreeFill } from "react-icons/pi";
import { PiCardsFill } from "react-icons/pi";
import { MdCampaign } from "react-icons/md";

const MobileNav = () => {
  const router = useRouter();
  const [colors, setColors] = useState(0);
  const path = usePathname()

  useEffect(() => {
    // Retrieve the selected color from sessionStorage
    const storedColor = sessionStorage.getItem("selectedColor");

    if (storedColor !== null) {
      setColors(parseInt(storedColor, 10));
    }
  }, []);

  const handleColor = (i) => {
    setColors(i);

    // Store the selected color in sessionStorage
    sessionStorage.setItem("selectedColor", i.toString());

    switch (i) {
      case 0:
        router.push("/main/dashboard");
        break;
      case 1:
        router.push("/main/wallet");
        break;
      case 2:
        router.push("/setting");
        break;
      case 3:
        router.push("/main/ads");
        break;
      default:
        break;
    }
  };

  return (
    <>
      <div style={{ marginTop: "10rem" }} class="fixed bottom-0 sm:hidden left-0 z-40 w-full h-16 bg-white border-t border-gray-200 dark:bg-black dark:border-gray-600">
        <div class="grid h-full max-w-lg grid-cols-4 mx-auto font-medium">
          <button onClick={() => router.push("/main/dashboard")} type="button" class="inline-flex flex-col hover:bg-gray-50 dark:hover:bg-gray-800 items-center justify-center px-5  group">
            {/* <svg
              className="w-6 h-6 mb-1"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M19 11H5M19 11C20.1046 11 21 11.8954 21 13V19C21 20.1046 20.1046 21 19 21H5C3.89543 21 3 20.1046 3 19V13C3 11.8954 3.89543 11 5 11M19 11V9C19 7.89543 18.1046 7 17 7M5 11V9C5 7.89543 5.89543 7 7 7M7 7V5C7 3.89543 7.89543 3 9 3H15C16.1046 3 17 3.89543 17 5V7M7 7H17"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg> */}
            {/* <PiCardsThreeFill /> */}
            <PiCardsFill className={`w-6 h-6 mb-1 ${path === "/main/dashboard" ? "text-[#2d9aff]" : "text-gray-500 dark:text-gray-400 "}`} />
            <span class={`text-sm  ${path === "/main/dashboard" ? "text-[#2d9aff]" : "text-gray-500 dark:text-gray-400 "} `}>Dashboard</span>
          </button>


          <button onClick={() => router.push("/main/ads")} type="button" class={`inline-flex flex-col hover:bg-gray-50 dark:hover:bg-gray-800 items-center justify-center px-5  group`}>

            <MdCampaign class={`w-6 h-6 mb-1 ${path === "/main/ads" ? "text-[#2d9aff]" : "text-gray-500 dark:text-gray-400 "}`} />
            <span class={`text-sm  ${path === "/main/ads" ? "text-[#2d9aff]" : "text-gray-500 dark:text-gray-400 "} `}>Ads</span>
          </button>
          <button onClick={() => router.push("/main/wallet")} type="button" class="inline-flex flex-col hover:bg-gray-50 dark:hover:bg-gray-800 items-center justify-center px-5  group">
            <svg class={`w-6 h-6 mb-1 ${path === "/main/wallet" ? "text-[#2d9aff]" : "text-gray-500 dark:text-gray-400 "}`} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z"></path>
              <path clip-rule="evenodd" fill-rule="evenodd" d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z"></path>
            </svg>

            <span class={`text-sm  ${path === "/main/wallet" ? "text-[#2d9aff]" : "text-gray-500 dark:text-gray-400 "} `}>Wallet</span>
          </button>
          <button onClick={() => router.push("/setting")} type="button" class="inline-flex flex-col hover:bg-gray-50 dark:hover:bg-gray-800 items-center justify-center px-5  group">
            <svg class={`w-6 h-6 mb-1 ${path.startsWith("/setting") ? "text-[#2d9aff]" : "text-gray-500 dark:text-gray-400 "}`} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <path d="M5 4a1 1 0 00-2 0v7.268a2 2 0 000 3.464V16a1 1 0 102 0v-1.268a2 2 0 000-3.464V4zM11 4a1 1 0 10-2 0v1.268a2 2 0 000 3.464V16a1 1 0 102 0V8.732a2 2 0 000-3.464V4zM16 3a1 1 0 011 1v7.268a2 2 0 010 3.464V16a1 1 0 11-2 0v-1.268a2 2 0 010-3.464V4a1 1 0 011-1z"></path>
            </svg>
            <span class={`text-sm  ${path.startsWith("/setting") ? "text-[#2d9aff]" : "text-gray-500 dark:text-gray-400 "} `}>Settings</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default MobileNav;
