"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import Sidebar from "../component/Sidebar";
import LogoutModal from "../component/LogOut";
import MobileNav from "../component/MobileNav";
import Image from "next/image";
// import { getData } from "../utils/useful";
import { useRouter } from "next/navigation";
import { useAuthContext } from "../utils/AuthWrapper";
import OSidebar from "../component/OrganisationSidebar";

export default function SettingLayout({ children }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isChildrenHidden, setIsChildrenHidden] = useState(false);
  const [user, setUser] = useState({ name: "", image: "", accountid: "" });
  // const { image, firstname, data?.lastname, advertiserid } = getData()
  const { data } = useAuthContext()

  const router = useRouter()

  useEffect(() => {
    if (data?.image && data?.firstname && data?.advertiserid)
      setUser({
        name: data?.firstname + " " + data?.lastname,
        image: data?.image,
        accountid: data?.advertiserid,
      })
  }, [data?.image, data?.firstname, data?.advertiserid]);

  const handleToggleChildren = () => {
    setIsChildrenHidden(!isChildrenHidden);
  };

  const handleLogout = () => {
    setIsModalOpen(false);

    // Add your logout logic here
  };

  const deleteCookies = () => {
    // deleteCookie(`axetkn${sessionId}`);
    // deleteCookie(`rvktkn${sessionId}`);
    localStorage.removeItem(`axetkn`)
    localStorage.removeItem(`rvktkn`)
    router.push("/login")
  }

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

  // return (
  //   <>
  // <div className="flex w-screen h-screen">
  //   <div>
  //     {data?.type === "Individual" ? <Sidebar /> : <OSidebar />}
  //   </div>
  //   <div>
  //     <MobileNav />
  //   </div>
  //   <div
  //     className={`w-full max-h-screen overflow-y-scroll no-scrollbar`}
  //   >
  //     <div className="py-4 w-full px-5 h-[12%] shadow-md bg-maincolor">
  //       <div className="text-2xl py-2 font-semibold">Settings</div>
  //     </div>
  //     <div className="bg-[#f8f8f8] max-h-screen dark:bg-[#181a20] grid grid-cols-1 w-full h-[88%] overflow-y-scroll no-scrollbar p-[2%]">
  //       <div className="grid md:grid-cols-3 sm:grid-cols-5 grid-cols-1 sm:gap-4 md:gap-8">
  //         <div
  //           className={`md:col-span-1  sm:col-span-2 h-[90%] rounded-2xl bg-maincolor max-h-screen sm:max-md:p-[2%] p-[3%] ${isChildrenHidden
  //             ? "pn:max-sm:hidden"
  //             : " pn:max-sm:w-full"
  //             }`}
  //         >
  //           <div className="flex flex-col">
  //             <div className="flex items-center gap-3 bg-[#f9f9f9] dark:bg-maincolor dark:border dark:border-border sm:max-md:p-2 p-4 rounded-xl">
  //               <div>
  //                 {user.image && <Image
  //                   src={user?.image}
  //                   width={60}
  //                   height={60}
  //                   className="min-w-[50px] w-full h-full object-cover rounded-xl"
  //                   alt="profile"
  //                 />}
  //               </div>
  //               <div>
  //                 <div className="text-lg sm:max-md:text-base font-semibold">
  //                   {" "}
  //                   {user?.name}
  //                 </div>
  //                 <div className="font-medium ">{user?.accountid}</div>
  //               </div>
  //             </div>
  //             <Link
  //               onClick={() => setIsChildrenHidden(true)}
  //               href="/setting/billing"
  //               className="text-base rounded-xl focus:bg-[#f9f9f9] dark:hover:bg-[#3d4654] dark:focus:bg-[#3d4654] hover:bg-[#f9f9f9] my-2 p-2 py-3  font-semibold"
  //             >
  //               Billing and Payments
  //             </Link>
  //             <Link
  //               onClick={() => setIsChildrenHidden(true)}
  //               href="/setting/verfication"
  //               className="text-base p-2 py-3 my-2 rounded-xl dark:hover:bg-[#3d4654] dark:focus:bg-[#3d4654] focus:bg-[#f9f9f9] hover:bg-[#f9f9f9] font-semibold"
  //             >
  //               Advertiser Verification
  //             </Link>

  //             <Link
  //               href="/setting/feedback"
  //               className=" text-base p-2 py-3 dark:hover:bg-[#3d4654] dark:focus:bg-[#3d4654] my-2 rounded-xl focus:bg-[#f9f9f9] hover:bg-[#f9f9f9] font-semibold"
  //             >
  //               Feedback
  //             </Link>
  //             <div
  //               onClick={() => setIsModalOpen(true)}
  //               className=" text-base p-2 py-3 dark:hover:bg-[#3d4654] dark:focus:bg-[#3d4654] my-1 rounded-xl focus:bg-[#f9f9f9] hover:bg-[#f9f9f9] font-semibold"
  //             >
  //               Log Out
  //             </div>
  //             <LogoutModal
  //               isOpen={isModalOpen}
  //               onClose={() => setIsModalOpen(false)}
  //               // onLogout={handleLogout}
  //               onLogout={deleteCookies}
  //             />
  //           </div>
  //         </div>
  //         <div
  //           className={`bg-maincolor overflow-y-scroll no-scrollbar max-h-screen md:col-span-2 sm:col-span-3 rounded-xl ${isChildrenHidden ? "" : "pn:max-sm:hidden"
  //             }`}
  //         >
  //           {children}
  //         </div>
  //       </div>
  //     </div>
  //   </div>

  // </div>
  //   </>



  // );

  return (
    < div className="flex w-screen h-screen" >
      <MobileNav />
      <div className="w-full flex flex-col dark:bg-[#1E1E1E]">
        <div>
          <div className="h-[76px] flex border-b dark:bg-[#0D0D0D] items-center w-full text-2xl font-semibold px-6">
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
                {/* <Image
                src={user.image}
                className="w-[50px] h-[50px]"
                alt="adspace"
              /> */}
                <span className="hidden pp:block font-semibold ">Adspace</span>
              </div>

            </div>
          </div>
        </div>
        <div className="flex h-[90%] ">
          {data?.type === "Individual" ? <Sidebar /> : <OSidebar />}
          {/* <div className="h-full w-full overflow-y-scroll no-scrollbar">
            {children}
          </div> */}

          <div className="bg-[#f8f8f8] max-h-screen dark:bg-[#181a20] grid grid-cols-1 w-full h-full overflow-y-scroll no-scrollbar p-[2%]">
            <div className="grid md:grid-cols-3 sm:grid-cols-5 grid-cols-1 sm:gap-4 md:gap-8">
              <div
                className={`md:col-span-1  sm:col-span-2 h-[90%] rounded-2xl bg-maincolor max-h-screen sm:max-md:p-[2%] p-[3%] ${isChildrenHidden
                  ? "pn:max-sm:hidden"
                  : " pn:max-sm:w-full"
                  }`}
              >
                <div className="flex flex-col">
                  <div className="flex items-center gap-3 bg-[#f9f9f9] dark:bg-maincolor dark:border dark:border-border sm:max-md:p-2 p-4 rounded-xl">
                    <div>
                      {user.image && <Image
                        src={user?.image}
                        width={60}
                        height={60}
                        className="min-w-[50px] w-full h-full object-cover rounded-xl"
                        alt="profile"
                      />}
                    </div>
                    <div>
                      <div className="text-lg sm:max-md:text-base font-semibold">
                        {" "}
                        {user?.name}
                      </div>
                      <div className="font-medium ">{user?.accountid}</div>
                    </div>
                  </div>
                  <Link
                    onClick={() => setIsChildrenHidden(true)}
                    href="/setting/billing"
                    className="text-base rounded-xl focus:bg-[#f9f9f9] dark:hover:bg-[#3d4654] dark:focus:bg-[#3d4654] hover:bg-[#f9f9f9] my-2 p-2 py-3  font-semibold"
                  >
                    Billing and Payments
                  </Link>
                  <Link
                    onClick={() => setIsChildrenHidden(true)}
                    href="/setting/verfication"
                    className="text-base p-2 py-3 my-2 rounded-xl dark:hover:bg-[#3d4654] dark:focus:bg-[#3d4654] focus:bg-[#f9f9f9] hover:bg-[#f9f9f9] font-semibold"
                  >
                    Advertiser Verification
                  </Link>

                  <Link
                    href="/setting/feedback"
                    className=" text-base p-2 py-3 dark:hover:bg-[#3d4654] dark:focus:bg-[#3d4654] my-2 rounded-xl focus:bg-[#f9f9f9] hover:bg-[#f9f9f9] font-semibold"
                  >
                    Feedback
                  </Link>
                  <div
                    onClick={() => setIsModalOpen(true)}
                    className=" text-base p-2 py-3 dark:hover:bg-[#3d4654] dark:focus:bg-[#3d4654] my-1 rounded-xl focus:bg-[#f9f9f9] hover:bg-[#f9f9f9] font-semibold"
                  >
                    Log Out
                  </div>
                  <LogoutModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    // onLogout={handleLogout}
                    onLogout={deleteCookies}
                  />
                </div>
              </div>
              <div
                className={`bg-maincolor overflow-y-scroll no-scrollbar max-h-screen md:col-span-2 sm:col-span-3 rounded-xl ${isChildrenHidden ? "" : "pn:max-sm:hidden"
                  }`}
              >
                {children}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div >
  )


}
