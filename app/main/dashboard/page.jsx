"use client";
import IndividaulDashboard from "@/app/component/IndividualDashboard";
import Loader from "@/app/component/Loader";
import OrganisationDashboard from "@/app/component/OrganisationDashboard";
import { useAuthContext } from "@/app/utils/AuthWrapper";
import Cookies from "js-cookie";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { useSelector } from "react-redux";

const page = () => {
  const { data, f } = useAuthContext();
  const router = useRouter();
  const advertiserid = useSelector((state) => state.data.advertiserid);
  const userid = useSelector((state) => state.data.userid);
  const fullname = useSelector((state) => state.data.fullname);
  const image = useSelector((state) => state.data.image);
  const [loading, setLoading] = useState(true);

  function generateRandomNumber() {
    const min = Math.pow(10, 9);
    const max = Math.pow(10, 10) - 1;
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  useEffect(() => {
    if (!data?.id) {
      setLoading(true);
      const a = Cookies.get("axetkn");
      f(a);
      setLoading(false);
    } else {
      router.refresh();
      setLoading(false);
    }
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <div className="fixed bottom-4 z-40 right-4">
        <div className="animate-bounce ">
          <Link
            href={
              advertiserid && userid
                ? `/createAd?brand=${fullname}&userid=${userid}&advid=${advertiserid}&image=${image}&step=1`
                : `/createAd?adid=${generateRandomNumber()}&step=1`
            }
            className="flex justify-center cursor-pointer items-center z-50 bg-[#1A73E8] text-white p-4 rounded-full space-x-1"
          >
            <div>
              <AiOutlinePlus className="font-semibold text-sm sm:text-xl" />
            </div>
          </Link>
        </div>
      </div>

      <div className="h-full">
        {data?.type === "Individual" ? (
          <IndividaulDashboard />
        ) : (
          <OrganisationDashboard />
        )}
      </div>
    </>
  );
};

export default page;
