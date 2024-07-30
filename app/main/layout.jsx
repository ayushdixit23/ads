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
import { ModeToggle } from "../component/ModeToggle";

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

  const path = usePathname("");

  useEffect(() => {
    if (!path.startsWith("/createAd")) {
      const c1 = Cookies.get("post");
      const c2 = Cookies.get("postid");
      if (c1) {
        Cookies.remove("post");
      }
      if (c2) {
        Cookies.remove("postid");
      }
    }
  }, [path]);

  return (
    <>
    

      <div className="flex w-screen h-screen">
        <div className="z-30">
          <MobileNav />
        </div>

       
        <div className="w-full flex bg-[#f7f7f7] dark:bg-[#1E1E1E]">
          <div className={`${path === "/main/dashboard" ? "z-40" : "z-0"}`}>
            {data?.type === "Individual" ? <Sidebar /> : <OSidebar />}
          </div>
          <div
            className={`h-screen w-full flex flex-col overflow-y-scroll dark:bg-black  no-scrollbar
            `}
          >
          
            <div className="h-full">{children}</div>
          </div>
        </div>
      </div>
    </>
  );
}
