"use client";
import { usePathname } from "next/navigation";
import Sidebar from "../component/Sidebar";
import OSidebar from "../component/OrganisationSidebar";
import Link from "next/link";
import { AiOutlinePlus } from "react-icons/ai";
import MobileNav from "../component/MobileNav";
import { ModeToggle } from "../component/ModeToggle";
import { useAuthContext } from "../utils/AuthWrapper";
import { useSelector } from "react-redux";
import Logo from "../assests/Logo.png";
import Image from "next/image";
import Cookies from "js-cookie";
import { useEffect } from "react";

export default function MainLayout({ children }) {
  const { data } = useAuthContext();
  const advertiserid = useSelector((state) => state.data.advertiserid);
  const userid = useSelector((state) => state.data.userid);
  const fullname = useSelector((state) => state.data.fullname);
  const image = useSelector((state) => state.data.image);

  function generateRandomNumber() {
    // Generate a random 10-digit number
    const min = Math.pow(10, 9); // Minimum 10-digit number
    const max = Math.pow(10, 10) - 1; // Maximum 10-digit number
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
      <div className="flex w-screen h-screen">
        <MobileNav />
        <div className="w-full flex   flex-col dark:bg-[#1E1E1E]">
          <div className="h-[10%]">
            <div className="h-full flex border-b dark:bg-[#0D0D0D] items-center w-full text-2xl font-semibold px-6">
              {/* {path.startsWith("/main/ads") && <div>Ads</div>}
              {path.startsWith("/main/wallet") && <div>Wallet</div>}
              {path.startsWith("/main/dashboard") && (
                <div className="flex justify-between items-center w-full">
                  <div>Dashboard</div>
                  <div className="flex justify-center items-center gap-2">
                    <ModeToggle />
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
                          <AiOutlinePlus className="font-semibold" />
                        </div>
                        <div>
                          <p className="pr-2 text-base">Create Ad</p>
                        </div>
                      </Link>
                    </div>
                  </div>
                </div>
              )} */}
              <div className="flex justify-between  items-center w-full">
                <div className="flex items-center py-2 gap-2 text-2xl">
                  <Image
                    src={Logo}
                    className="w-[50px] h-[50px]"
                    alt="adspace"
                  />
                  <span className="hidden pp:block font-medium">Adspace</span>
                </div>
                <div className="flex justify-center items-center gap-2">
                  <ModeToggle />
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
                        <AiOutlinePlus className="font-semibold" />
                      </div>
                      <div>
                        <p className="pr-2 text-sm pp:text-base">Create Ad</p>
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex h-[90%]">
            {data?.type === "Individual" ? <Sidebar /> : <OSidebar />}
            <div className="h-full w-full overflow-y-scroll no-scrollbar">
              {children}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
