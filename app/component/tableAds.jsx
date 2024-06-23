import { API } from "@/Essentials";
import { TableCell, TableRow } from "@/components/ui/table";
import axios from "axios";
import React, { useState } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import {
  capitalizeFirstLetter,
  formatNumberToIndianSystem,
} from "../utils/useful";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useAuthContext } from "../utils/AuthWrapper";
import toast, { Toaster } from "react-hot-toast";
import { useSelector } from "react-redux";

const TableAds = ({ d, adData, setCampdata }) => {
  const [popup, setPopup] = useState();
  const { data } = useAuthContext();
  const advertiserid = useSelector((state) => state.data.advertiserid);

  const pauseAd = async (id) => {
    try {
      const res = await axios.post(`${API}/pausead/${id}`);
      if (res.data.success) {
        const myData = adData?.map((d) => {
          if (d?.a._id === id) {
            return {
              ...d,
              a: {
                ...d.a,
                status: "paused",
              },
            };
          } else {
            return d;
          }
        });
        setCampdata(myData);
        toast.success("Ad Paused!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const runAd = async (id) => {
    try {
      const res = await axios.post(`${API}/runad/${id}`);
      console.log(res.data);

      if (res.data.success) {
        const myData = adData?.map((d) => {
          if (d?.a._id === id) {
            return {
              ...d,
              a: {
                ...d.a,
                status: "active",
              },
            };
          } else {
            return d;
          }
        });
        setCampdata(myData);
        toast.success("Your Ad is now Active!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const deleteAd = async (adid) => {
    try {
      const aid = data?.type === "Individual" ? data?.advid : advertiserid;
      const res = await axios.post(`${API}/deleteAd/${aid}/${adid}`);
      if (res.data.success) {
        const myData = adData?.filter((d) => d?.a?._id !== adid);
        setCampdata(myData);
        toast.success("Ad Deleted!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Toaster />
      <div
        onClick={() => {
          setPopup(false);
        }}
        className={`fixed inset-0 w-screen h-screen ${
          popup ? "z-40" : "-z-20"
        } `}
      ></div>

      <tr className="bg-white dark:bg-[#0D0D0D] border-b h-[70px]  ">
        <td className="font-medium text-left pl-4">{d?.a?.adname}</td>
        <td className="flex justify-center h-[70px] items-center text-center">
          <div
            className={`text-center max-w-[130px] flex justify-center items-center rounded-lg  px-4 py-2 ${
              d?.a?.status === "review"
                ? "text-[#F9943B] bg-[#F9943B]/10"
                : null
            }
							${d?.a?.status === "active" ? "text-[#03A65A] bg-[#03A65A]/10" : null}
							${
                d?.a?.status === "stopped" || d?.a?.status === "paused"
                  ? "text-[#FC2E20] bg-[#FC2E20]/10"
                  : null
              }`}
          >
            {d?.a?.status === "review"
              ? "In review"
              : capitalizeFirstLetter(d?.a?.status)}
          </div>
        </td>
        <td className="text-center">
          {d?.a?.impressions
            ? formatNumberToIndianSystem(d?.a?.impressions)
            : "No Data Yet"}{" "}
        </td>
        <td className="text-center">
          {d?.conversion ? parseFloat(d?.conversion).toFixed(1) : "No Data Yet"}
        </td>
        <td className="text-center">
          {d?.a?.cpc ? parseFloat(d?.a?.cpc).toFixed(1) : "No Data Yet"}
        </td>
        <td className="text-center">
          {d?.a?.startdate ? d?.a?.startdate : "___"}
        </td>
        <td className="text-center">{d?.a?.enddate}</td>
        <td className="text-center  h-[70px] flex justify-center items-center">
          <div className={`relative `}>
            <BsThreeDotsVertical onClick={() => setPopup(true)} />
            <div
              className={`duration-100 ${
                popup
                  ? "absolute bg-white dark:bg-[#0D0D0D] rounded-xl shadow-md w-auto h-auto p-3 z-40 -left-[50px]"
                  : "w-0 h-0 text-[0px]"
              } `}
            >
              <div
                className={`flex flex-col gap-2 ${
                  popup ? "" : "hidden"
                } justify-center `}
              >
                {(d?.a?.status == "stopped" || d?.a?.status == "paused") && (
                  <div onClick={() => runAd(d?.a?._id)}>Run</div>
                )}
                {d?.a?.status == "active" && (
                  <div onClick={() => pauseAd(d?.a._id)}>Pause</div>
                )}
                <div onClick={() => deleteAd(d?.a._id)}>Delete</div>
              </div>
            </div>
          </div>
        </td>
      </tr>
    </>
  );
};

export default TableAds;
