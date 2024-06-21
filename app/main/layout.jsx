"use client";
import { usePathname } from "next/navigation";
import Sidebar from "../component/Sidebar";
import OSidebar from "../component/OrganisationSidebar";
import Link from "next/link";
import { AiOutlinePlus } from "react-icons/ai";
import MobileNav from "../component/MobileNav";
import { useAuthContext } from "../utils/AuthWrapper";
import { useSelector } from "react-redux";
import Cookies from "js-cookie";
import { useEffect } from "react";

export default function MainLayout({ children }) {
  const { data } = useAuthContext();
  const advertiserid = useSelector((state) => state.data.advertiserid);
  const userid = useSelector((state) => state.data.userid);
  const fullname = useSelector((state) => state.data.fullname);
  const image = useSelector((state) => state.data.image);

  function generateRandomNumber() {
    const min = Math.pow(10, 9);
    const max = Math.pow(10, 10) - 1;
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  const path = usePathname("")

  useEffect(() => {
    if (!path.startsWith("/createAd")) {
      const c1 = Cookies.get("post")
      const c2 = Cookies.get("postid")
      if (c1) {
        Cookies.remove("post")
      }
      if (c2) {
        Cookies.remove("postid")
      }
    }
  }, [path])

  return (
    <>
      <div className={`flex flex-col fixed justify-end ${path == "/main/dashboard" ? "z-20" : "z-0"}  items-end w-screen h-screen p-4`}>
        <div className="flex justify-center items-center text-white">
          <div className="animate-bounce">
            <Link
              href={
                advertiserid && userid
                  ? `/createAd?brand=${fullname}&userid=${userid}&advid=${advertiserid}&image=${image}&step=1`
                  : `/createAd?adid=${generateRandomNumber()}&step=1`
              }
              className="flex justify-center cursor-pointer items-center z-50 bg-[#1A73E8] text-white p-2 sm:p-4 px-3 rounded-full space-x-1"
            >
              <div>
                <AiOutlinePlus className="font-semibold text-sm sm:text-xl" />
              </div>

            </Link>
          </div>
        </div>
      </div>
      <div className="flex w-screen h-screen">
        <MobileNav />
        {/* <div className="w-full flex flex-col bg-red-800 dark:bg-[#1E1E1E]">
          <div className="sm:h-[10%] h-[8%]">
            <div className="h-full flex border-b dark:bg-[#0D0D0D] items-center w-full text-2xl font-semibold px-2 sm:px-6">
              <div className="flex justify-between  items-center w-full">
                <div className="flex items-center py-2 gap-2 text-2xl">
                  <Image
                    src={Logo}
                    className="sm:w-[50px] w-[40px] h-[40px] sm:h-[50px]"
                    alt="adspace"
                  />
                  <span className="hidden pp:block font-medium">Adspace</span>
                </div>
                <div className="flex justify-center items-center gap-2">

                  <div>
                    <Link
                      href={
                        advertiserid && userid
                          ? `/createAd?brand=${fullname}&userid=${userid}&advid=${advertiserid}&image=${image}&step=1`
                          : `/createAd?adid=${generateRandomNumber()}&step=1`
                      }
                      className="flex justify-center cursor-pointer items-center bg-[#1A73E8] text-white p-2 sm:px-4 px-3 rounded-full space-x-1"
                    >
                      <div>
                        <AiOutlinePlus className="font-semibold text-sm" />
                      </div>
                      <div>
                        <p className="pr-2 text-[14px] text-sm pp:text-base">Create Ad</p>
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex h-[92%] bg-yellow-900 sm:h-[90%]">
            {data?.type === "Individual" ? <Sidebar /> : <OSidebar />}
            <div className={`h-full w-full overflow-y-scroll bg-[#f7f7f7] dark:bg-black  no-scrollbar
            `
            }>
              {children}
            </div>
          </div>
        </div> */}

        <div className="w-full flex bg-[#f7f7f7] dark:bg-[#1E1E1E]">
          <div className={`${path === "/main/dashboard" ? "z-40" : "z-0"}`}>
            {data?.type === "Individual" ? <Sidebar /> : <OSidebar />}
          </div>
          <div className={`h-screen w-full flex flex-col overflow-y-scroll dark:bg-black  no-scrollbar
            `
          }>
            {/* <div className="h-[10%] flex border-b dark:bg-[#0D0D0D] items-center w-full text-2xl font-semibold px-2 sm:px-6">
              <div className="flex justify-between  items-center w-full">

                <div className="flex justify-center items-center gap-2">

                  <div>
                    <Link
                      href={
                        advertiserid && userid
                          ? `/createAd?brand=${fullname}&userid=${userid}&advid=${advertiserid}&image=${image}&step=1`
                          : `/createAd?adid=${generateRandomNumber()}&step=1`
                      }
                      className="flex justify-center cursor-pointer items-center bg-[#1A73E8] text-white p-2 sm:px-4 px-3 rounded-full space-x-1"
                    >
                      <div>
                        <AiOutlinePlus className="font-semibold text-sm" />
                      </div>
                      <div>
                        <p className="pr-2 text-[14px] text-sm pp:text-base">Create Ad</p>
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
            </div> */}

            <div className="h-full">{children}</div>
          </div>
        </div>
      </div>
    </>
  );
}