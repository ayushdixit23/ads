"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import Sidebar from "../component/Sidebar";
import LogoutModal from "../component/LogOut";
import MobileNav from "../component/MobileNav";
import Image from "next/image";
// import { getData } from "../utils/useful";
import { usePathname, useRouter } from "next/navigation";
import { useAuthContext } from "../utils/AuthWrapper";
import Logo from "../assests/Logo.png";
import OSidebar from "../component/OrganisationSidebar";
import { ModeToggle } from "../component/ModeToggle";
import { MdFeedback, MdOutlineLogout, MdPayments } from "react-icons/md";
import { FaUserCheck } from "react-icons/fa";

export default function SettingLayout({ children }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isChildrenHidden, setIsChildrenHidden] = useState(false);
  const [user, setUser] = useState({ name: "", image: "", accountid: "" });
  // const { image, firstname, data?.lastname, advertiserid } = getData()
  const { data } = useAuthContext();
  const path = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (data?.image && data?.firstname && data?.advertiserid)
      setUser({
        name: data?.firstname + " " + data?.lastname,
        image: data?.image,
        accountid: data?.advertiserid,
      });
  }, [data?.image, data?.firstname, data?.advertiserid]);

  const handleToggleChildren = () => {
    setIsChildrenHidden(!isChildrenHidden);
  };

  const handleLogout = () => {
    setIsModalOpen(false);

    // Add your logout logic here
  };

  (() => {
    if (
      typeof window !== "undefined" &&
      window.history &&
      window.history.pushState
    ) {
      window.addEventListener("popstate", function () {
        // Check if 'setIsChildrenHidden' is defined and is a function before calling it
        if (typeof setIsChildrenHidden === "function") {
          setIsChildrenHidden(false);
        }
      });
    } else {
      console.warn("History API is not supported by this browser");
    }
  })();

  return (
    <div className="flex w-screen  h-screen">
      <MobileNav />
      <div className="w-full flex flex-col dark:bg-[#1E1E1E]">
        <div className="flex h-[100%]">
          {data?.type === "Individual" ? <Sidebar /> : <OSidebar />}

          <div className="bg-[#f8f8f8] max-h-screen  dark:bg-black grid grid-cols-1 w-full h-full overflow-y-scroll no-scrollbar p-[2%]">
            <div className="grid md:grid-cols-3  sm:grid-cols-5 grid-cols-1 sm:gap-4 md:gap-8">
              <div
                className={`md:col-span-1 sm:col-span-2 h-[90%] rounded-2xl bg-white dark:bg-[#0D0D0D] max-h-screen sm:max-md:p-[2%] p-[3%] ${
                  isChildrenHidden ? "pn:max-sm:hidden" : " pn:max-sm:w-full"
                }`}
              >
                <div className="flex flex-col">
                  <div className="flex items-center gap-3 bg-[#f9f9f9] dark:bg-[#0D0D0D]  sm:max-md:p-2 p-4 rounded-xl">
                    <div>
                      {user.image && (
                        <Image
                          src={user?.image}
                          width={60}
                          height={60}
                          className="min-w-[50px] max-w-[50px] max-h-[50px] min-h-[50px] w-full h-full object-cover rounded-xl"
                          alt="profile"
                        />
                      )}
                    </div>
                    <div>
                      <div className="text-lg sm:max-md:text-base font-semibold">
                        {user?.name}
                      </div>
                      <div className="font-medium ">{user?.accountid}</div>
                    </div>
                  </div>
                  <Link
                    onClick={() => setIsChildrenHidden(true)}
                    href="/setting/billing"
                    className={`text-base rounded-xl ${
                      path == "/setting" || path == "/setting/billing"
                        ? "sm:bg-blue-600 sm:text-white"
                        : ""
                    } flex items-center gap-2  my-2 p-2 py-3 `}
                  >
                    <div>
                      <MdPayments className="text-xl" />
                    </div>
                    <div> Billing and Payments</div>
                  </Link>
                  <Link
                    onClick={() => setIsChildrenHidden(true)}
                    href="/setting/verification"
                    className={`text-base rounded-xl ${
                      path == "/setting/verification"
                        ? "bg-blue-600 text-white"
                        : ""
                    } flex items-center gap-2  my-2 p-2 py-3 `}
                  >
                    <div>
                      <FaUserCheck className="text-xl" />
                    </div>
                    <div> Advertiser Verification</div>
                  </Link>

                  <Link
                    href="/setting/feedback"
                    onClick={() => setIsChildrenHidden(true)}
                    className={`text-base rounded-xl ${
                      path == "/setting/feedback"
                        ? "bg-blue-600 text-white"
                        : ""
                    } flex items-center gap-2  my-2 p-2 py-3 `}
                  >
                    <div>
                      <MdFeedback className="text-xl" />
                    </div>
                    <div>Feedback</div>
                  </Link>
                  <div
                    onClick={() => setIsModalOpen(true)}
                    className=" text-base p-2 py-3 text-red-700 my-1 flex items-center gap-2 rounded-xl "
                  >
                    <MdOutlineLogout className="text-xl" />
                    Log Out
                  </div>
                  <LogoutModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    // onLogout={handleLogout}
                  />
                </div>
              </div>
              <div
                className={`dark:bg-[#0D0D0D] bg-white overflow-y-scroll no-scrollbar max-h-screen md:col-span-2 sm:col-span-3 rounded-xl ${
                  isChildrenHidden ? "" : "pn:max-sm:hidden"
                }`}
              >
                {children}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// <div>
//   <div className="sm:h-[76px] h-[68px] flex border-b dark:bg-[#0D0D0D] items-center w-full text-2xl font-semibold  px-3 sm:px-6">

//     <div className="flex justify-between items-center w-full">
//       <div className="flex items-center py-2 gap-2 text-2xl">

//         <Image
//           src={Logo}
//           className="w-[50px] h-[50px]"
//           alt="adspace"
//         />
//         <span className="hidden sm:block font-semibold">Adspace</span>
//       </div>
//       <ModeToggle />
//     </div>
//   </div>
// </div>
