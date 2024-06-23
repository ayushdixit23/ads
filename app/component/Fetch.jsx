import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Image from "next/image";
import dsh from "../assests/dsh.svg";
import { FaAngleDown } from "react-icons/fa";
import { AiOutlinePlus } from "react-icons/ai";
import TableAds from "./tableAds";
import { useSelector } from "react-redux";
import { useAuthContext } from "../utils/AuthWrapper";

const Fetch = ({ data, length, router, setCampdata }) => {
  const { data: user } = useAuthContext();
  const advertiserid = useSelector((state) => state.data.advertiserid);
  const userid = useSelector((state) => state.data.userid);
  const fullname = useSelector((state) => state.data.fullname);
  const image = useSelector((state) => state.data.image);

  function generateRandomNumber() {
    const min = Math.pow(10, 9);
    const max = Math.pow(10, 10) - 1;
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  return (
    <>
      <div className="sm:h-[100vh] p-3  bg-transparent w-full min-w-full container no-scrollbar ">
        {length > 0 ? (
          <div className="bg-white dark:bg-[#0D0D0D] min-w-[1110px] rounded-xl h-full sm:p-2 w-full">
            <table className="w-full text-sm overflow-x-scroll z-50 no-scrollbar text-left rtl:text-right min-w-full  text-gray-500 dark:text-gray-400">
              <thead className="text-xs h-[50px] text-gray-700 uppercase  border-b rounded-xl dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    NAME
                  </th>
                  <th scope="col" className="text-center px-6 py-3">
                    STATUS
                  </th>
                  <th scope="col" className="text-center px-6 py-3">
                    IMPRESSIONS
                  </th>
                  <th scope="col" className="text-center px-6 py-3">
                    CONVERSION
                  </th>
                  <th scope="col" className="text-center px-6 py-3">
                    CPC
                  </th>
                  <th scope="col" className="text-center px-6 py-3">
                    START DATE
                  </th>
                  <th scope="col" className="text-center px-6 py-3">
                    END Date
                  </th>
                  <th scope="col" className="text-center px-6 py-3">
                    ACTIONS
                  </th>
                </tr>
              </thead>
              <tbody>
                {data?.map((d, i) => (
                  <TableAds
                    adData={data}
                    setCampdata={setCampdata}
                    key={i}
                    d={d}
                  />
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <>
            <div className="flex justify-center my-6 mb-7 items-center">
              <div>
                <div className="flex justify-center items-center">
                  <Image src={dsh} alt="dsh" />
                </div>
                <div className="text-xl font-semibold text-center py-2">
                  No Analytics Yet?
                </div>
                <div className="py-2 text-sm text-[#8B8D97]">
                  Add a new Campaign to see Live Analytics here.
                </div>
                <div className="text-white cursor-pointer bg-[#2D9AFF] flex justify-center items-center p-2 rounded-xl gap-3">
                  <div>
                    <AiOutlinePlus />
                  </div>
                  <div
                    onClick={() => {
                      if (advertiserid && userid) {
                        router.push(
                          `/createAd?brand=${fullname}&userid=${userid}&advid=${advertiserid}&image=${image}&step=1`
                        );
                      } else {
                        router.push(
                          `/createAd?adid=${generateRandomNumber()}&step=1`
                        );
                      }
                    }}
                  >
                    Create Ad
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-between  items-center border-y-2 p-3">
              <div className="font-semibold">
                {length}
                Ads
              </div>
              <div className="flex justify-center gap-5 items-center">
                <div className="flex justify-center space-x-1 p-1 px-3 border-2 rounded-full items-center">
                  <div>{length}</div>
                  <div>
                    <FaAngleDown />
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Fetch;
