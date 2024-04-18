"use client";
import React, { useEffect, useState } from "react";
import { BiWallet } from "react-icons/bi";
import { FiSettings } from "react-icons/fi";
import { AiOutlineBarChart } from "react-icons/ai";
import { RiAdvertisementLine } from "react-icons/ri";
import { useRouter } from "next/navigation";

const MobileNav = () => {
  const router = useRouter();
  const [colors, setColors] = useState(0);

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
      <div style={{ marginTop: "10rem" }} className="fixed left-0 w-full sm:hidden bottom-0 bg-maincolor z-10 p-2">
        <div className="flex justify-center items-center w-full">
          <ul className="flex justify-around gap-2 items-center w-full">
            <li
              onClick={() => {
                handleColor(0);
              }}
            >
              <div className="flex flex-col justify-center gap-2 hover:text-blue-500 items-center">
                <div>
                  <AiOutlineBarChart
                    className={`text-[26px] ${colors === 0 ? "text-blue-600 " : null
                      }`}
                  />
                </div>
                <div className={`text-sm ${colors === 0 ? "text-blue-600 " : null}`}>
                  Overview
                </div>
              </div>
            </li>

            <li
              onClick={() => {
                handleColor(1);
              }}
            >
              <div
                className={` flex flex-col justify-center gap-2 hover:text-blue-500 items-center ${colors === 1 ? "text-blue-600 " : null
                  }`}
              >
                <div>
                  <BiWallet className={` text-[26px]`} />
                </div>
                <div className={`text-sm ${colors === 1 ? "text-blue-600 " : null}`}>
                  Wallet
                </div>
              </div>
            </li>
            <li
              onClick={() => {
                handleColor(3);
              }}
            >
              <div
                className="flex flex-col justify-center gap-2 hover:text-blue-500 items-center"
                href="/main/ads"
              >
                <div>
                  <RiAdvertisementLine
                    className={`text-[26px] ${colors === 3 ? "text-blue-600 " : null
                      }`}
                  />
                </div>
                <div className={`text-sm ${colors === 3 ? "text-blue-600 " : null}`}>
                  Ads
                </div>
              </div>
            </li>
            <li
              onClick={() => {
                handleColor(2);
              }}
            >
              <div
                className="flex flex-col justify-center gap-2 hover:text-blue-500 items-center"
                href="/setting"
              >
                <div>
                  <FiSettings
                    className={`text-[26px] ${colors === 2 ? "text-blue-600 " : null
                      }`}
                  />
                </div>
                <div className={`text-sm ${colors === 2 ? "text-blue-600 " : null}`}>
                  Settings
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default MobileNav;
