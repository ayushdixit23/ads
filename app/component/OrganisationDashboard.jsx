"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import koi from "../assests/koiimage.svg";
import axios from "axios";
import { API } from "@/Essentials";
import graph2 from "../assests/Graph.svg";
import d1 from "../assests/d1.png";
import styles from "../CustomScrollbarComponent.module.css";
import d2 from "../assests/d2.png";
import d3 from "../assests/d3.png";
import d4 from "../assests/d4.png";
import noads from "../assests/noads.svg";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Link from "next/link";
import dashp2 from "../assests/Pic1.svg";
import {
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import useAdsFetching from "../useFetch/useAdFetching";
import Loader from "../component/Loader";
import { FaWallet } from "react-icons/fa";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { useAuthContext } from "@/app/utils/AuthWrapper";
import {
  setAdvertiserid,
  setFullname,
  setImage,
  setUserid,
} from "@/app/redux/slice/dataSlice";
import { useDispatch, useSelector } from "react-redux";
import { formatDateToString, returnDay } from "../utils/useful";
import { useTheme } from "next-themes";

const OrganisationDashboard = () => {
  const [data, setData] = useState();
  const [adD, setAdD] = useState({
    name: "",
    media: "",
    type: "",
  });
  const [idToCheck, setIdToCheck] = useState("");
  const { data: user } = useAuthContext();
  const [day7, setDay7] = useState(7);
  const [dswic, setDswic] = useState(false);
  const [campdata, setCampdata] = useState([]);
  const advertiserid = useSelector((state) => state.data.advertiserid);
  const userid = useSelector((state) => state.data.userid);
  const fullname = useSelector((state) => state.data.fullname);
  const image = useSelector((state) => state.data.image);
  const [state, setState] = useState("");
  const [months, setMonths] = useState(null);
  const [dp, setDp] = useState("");
  const [graph, setGraph] = useState([]);
  const [defaults, setDefaults] = useState("");
  const [loading, setLoading] = useState(false);
  const { CampaignFetch, CampaignFetchforthirtyDays } = useAdsFetching();
  const [toggle, setToggle] = useState(false);
  const dispatch = useDispatch();
  const [adsData, setAdsData] = useState([]);
  const [currentbalance, setCurrentBalance] = useState(null);
  const { theme } = useTheme();
  const [activeData, setActiveData] = useState({
    totalspent: 0,
    totalads: "",
  });
  const [swit, setSwit] = useState(false);

  const [check, setCheck] = useState({
    click: true,
    impressions: false,
    cpc: false,
    views: false,
  });

  const [adValues, setAdValues] = useState({
    totalspent: "",
    conversion: "",
    popularity: "",
  });
  const [value, setValue] = useState({
    click: "",
    impressions: "",
    cpc: "",
    views: "",
  });

  const fetchData = async (id) => {
    try {
      const res = await axios.get(`${API}/fetchdashboardO/${id}/${user.advid}`);
      if (res?.data?.success) {
        console.log(res.data);
        setData(res.data.user);
        setCurrentBalance(res.data.currentbalance);
        setAdsData(res.data.data);
        res.data.data.map((d) => {
          if (d?.id == advertiserid) {
            setActiveData({
              ...activeData,
              totalads: d?.totalads,
              totalspent: d?.totalSpent,
            });
          }
        });
      }
    } catch (e) {
      console.log(e);
    }
  };

  const f = async () => {
    try {
      if (advertiserid) {
        setLoading(true);
        fetchData(advertiserid);
        const data = await CampaignFetch(advertiserid);

        setIdToCheck(data[0]?.a?._id);
        setCampdata(data);
        setAdD({
          ...adD,
          name: data[0]?.a?.adname,
          media: data[0]?.a?.url,
          type: data[0]?.a?.content[0].extension.startsWith("image")
            ? "image"
            : "video",
        });
        setDefaults(data[0]?.a?.adname);
        const adsGraph = data[0]?.analytics.map((d) => {
          return {
            ...d,
            // time: formatDateToString(d?.creation),
            time: returnDay(d?.creation),
            cpc: parseFloat(d?.cpc?.toFixed(1)),
          };
        });
        setGraph(adsGraph);
        const adsMonths = data[0]?.analytics.map((d) =>
          returnMonth(d?.creation)
        );
        const uniqueMonths = [...new Set(adsMonths)];
        setMonths(uniqueMonths);
        setValue({
          click: data[0]?.a?.clicks,
          views: data[0]?.a?.views,
          impressions: data[0]?.a?.impressions,
          cpc: data[0]?.a?.cpc,
        });
        setAdValues({
          ...adValues,
          totalspent: data[0]?.a.totalspent,
          conversion: data[0]?.conversion,
          popularity: data[0]?.popularity,
        });

        setLoading(false);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    f();
  }, [advertiserid]);

  useEffect(() => {
    if (!advertiserid) {
      setLoading(true);
    }
  }, [advertiserid]);

  useEffect(() => {
    if (user) {
      setState(user?.manageusers?.[0]?.fullname);
      setDp(user?.manageusers?.[0]?.image);
      dispatch(setAdvertiserid(user?.manageusers?.[0]?.id));
      dispatch(setFullname(user?.manageusers?.[0]?.fullname));
      dispatch(setImage(user?.manageusers?.[0]?.image));
      dispatch(setUserid(user?.manageusers?.[0]?.userid));
      adsData.map((f) => {
        if (f?.id === user?.manageusers?.[0]?.id) {
          setActiveData({
            ...activeData,
            totalads: f?.totalads,
            totalspent: f?.totalSpent,
          });
        }
      });
    }
  }, [user]);

  console.log(user, "sue");

  useEffect(() => {
    setState(fullname);
    setDp(image);
  }, [advertiserid]);

  if (loading) {
    return <Loader />;
  }

  console.log(campdata);

  return (
    <>
      <div
        className={`grid grid-cols-1 h-full overflow-y-scroll ${styles.customScrollbar} w-[100%] bg-[#f7f7f7] dark:bg-[#141414] select-none p-2 sm:p-4`}
      >
        <div className="flex flex-col gap-5">
          <div className=" w-full grid md:grid-cols-4 pn:max-md:gap-2 gap-10 grid-cols-2 rounded-xl">
            <div className="bg-white dark:bg-[#0D0D0D] h-[80px] pp:h-[100px]  rounded-2xl">
              <div className="flex gap-2 items-center justify-start pl-4 md:pl-3 lg:pl-6 h-full">
                <div>
                  {/* <Image src={d1} /> */}
                  <img
                    src={dp}
                    alt=""
                    className="min-w-[35px] max-h-[35px] max-w-[35px] min-h-[35px]  pp:min-w-[60px] pp:min-h-[60px] pp:max-w-[60px] pp:max-h-[60px] dark:bg-[#181c24] rounded-3xl"
                  />
                </div>
                <div className="flex flex-col justify-center h-full gap-2 ">
                  <div className="font-semibold text-xs pp:text-sm sm:text-base">
                    Accounts
                  </div>
                  <div className="flex flex-col w-full pp:min-w-[130px] bg-[#f7f7f7] dark:bg-[#121212] rounded-xl">
                    <div
                      onClick={() => setToggle(!toggle)}
                      className="flex justify-between items-center relative p-1.5 cursor-pointer h-full gap-2 px-2 w-full text-sm"
                    >
                      <div className="flex items-center gap-2">
                        {/* <div>
                          <img
                            src={dp}
                            className="max-w-[30px] bg-[#f8f8f8] dark:bg-[#181c24] rounded-lg min-h-[30px] min-w-[30px] max-h-[30px]"
                          />
                        </div> */}
                        <div className="text-[#0d0d0d] text-xs dark:text-white font-semibold">
                          {state}
                        </div>
                      </div>

                      <div className="text-lg ">
                        {toggle ? (
                          <IoIosArrowUp onClick={() => setToggle(!toggle)} />
                        ) : (
                          <IoIosArrowDown onClick={() => setToggle(!toggle)} />
                        )}
                      </div>

                      <div
                        className={` ${
                          toggle
                            ? "top-[45px]"
                            : "top-0 border-none text-[0px] w-[0px] h-[0px]"
                        } absolute left-0 bg-[#f7f7f7] duration-100 dark:bg-[#121212] rounded-xl z-50 w-[150px] pp:w-full`}
                      >
                        <div className="flex flex-col gap-3 px-2 py-1 max-h-[300px] overflow-y-scroll no-scrollbar">
                          {user?.manageusers?.map((d, i) => (
                            <div
                              onClick={() => {
                                dispatch(setAdvertiserid(d?.id));
                                dispatch(setUserid(d?.userid));
                                dispatch(
                                  setFullname(
                                    d?.lastname ? d?.fullname : d?.firstname
                                  )
                                );
                                adsData.map((f) => {
                                  if (f?.id === d?.id) {
                                    setActiveData({
                                      ...activeData,
                                      totalads: f?.totalads,
                                      totalspent: f?.totalSpent,
                                    });
                                  }
                                });
                                dispatch(setImage(d?.image));
                                setDp(d?.image);
                                setState(
                                  d?.lastname ? d?.fullname : d?.firstname
                                );
                                setToggle(false);
                              }}
                              key={i}
                              className="flex gap-2 py-1 items-center w-full rounded-lg light:hover:bg-[#ffffff]"
                            >
                              <div className="">
                                <img
                                  src={d?.image}
                                  className={`${
                                    toggle
                                      ? "max-w-[30px] bg-[#f8f8f8] dark:bg-[#181c24] rounded-lg min-h-[30px] min-w-[30px] max-h-[30px]"
                                      : "w-0 h-0"
                                  } duration-100`}
                                  alt="image"
                                />
                              </div>
                              <div className="flex flex-col">
                                <div
                                  className={`text-xs ${
                                    toggle ? "" : " hidden"
                                  }`}
                                >
                                  {d?.lastname ? d?.fullname : d?.firstname}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-[#0D0D0D] h-[80px] pp:h-[100px]  rounded-2xl">
              <div className="flex gap-2 items-center justify-start pl-4 md:pl-3 lg:pl-6 h-full">
                <div>
                  <Image src={d3} className="w-[35px] pp:w-[60px]" />
                </div>
                <div className="flex flex-col justify-center h-full ">
                  <div className="font-semibold text-xs pp:text-sm sm:text-base">
                    Total Spent
                  </div>
                  <div className="text-xs pp:text-sm sm:text-base pt-[3px] font-semibold">
                    {activeData.totalspent
                      ? "₹" + activeData.totalspent
                      : "₹0.00"}
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-[#0D0D0D] h-[80px] pp:h-[100px]  rounded-2xl">
              <div className="flex gap-2 items-center justify-start pl-4 md:pl-3 lg:pl-6 h-full">
                <div>
                  <Image src={d2} className="w-[35px] pp:w-[60px]" />
                </div>
                <div className="flex flex-col justify-center h-full ">
                  <div className="font-semibold  text-xs pp:text-sm sm:text-base">
                    Current balance
                  </div>
                  <div className="text-xs pp:text-sm sm:text-base pt-[3px] font-semibold">
                    {currentbalance ? "₹" + currentbalance : "₹0.00"}
                  </div>
                </div>
              </div>
            </div>

            {/* <div className="flex justify-center max-h-[100px] items-center gap-2 pn:max-sm:rounded-md sm:max-md:rounded-xl sm:gap-5 p-2 sm:p-3  bg-maincolor md:border-r-2">
								<div>
									<Image
										src={dashp2}
										alt="dashp2"
										priority={true}
										className="pp:min-w-[50px] h-[30px] w-[30px] pp:min-h-[50px]"
									/>
								</div>
								<div className="flex flex-col text-xs justify-center">
									<div>Total Conversion</div>
									<div className="sm:text-xl text-sm font-semibold">
										{adValues.conversion
											? parseFloat(adValues.conversion).toFixed(1) + "%"
											: "No Data Yet"}
									</div>
								</div>
							</div> */}
            {/* <div className="flex sm:justify-center max-h-[100px] items-center p-2 sm:p-3 pn:max-sm:rounded-md sm:max-md:rounded-xl gap-2 sm:gap-5 md:rounded-tr-2xl md:rounded-br-2xl bg-maincolor ">
								<div className="flex flex-col ml-3 text-xs">
									<div>Ad Popularitiy</div>
									<div className="sm:text-xl text-sm font-semibold">
										{adValues.popularity ? parseFloat(adValues.popularity).toFixed(1) + "%" : "No Data Yet"}
									</div>
								</div>
								<div>
									<Image
										src={graph2}
										alt="pic"
										className="pp:min-w-[50px] h-[30px] w-[30px] pp:min-h-[50px]"
									/>
								</div>
							</div> */}

            <div className="bg-white dark:bg-[#0D0D0D] h-[80px] pp:h-[100px]  rounded-2xl">
              <div className="flex gap-2 items-center justify-start pl-4 md:pl-3 lg:pl-6 h-full">
                <div>
                  <Image src={d4} className="w-[35px] pp:w-[60px]" />
                </div>
                <div className="flex flex-col justify-center h-full ">
                  <div className="font-semibold text-xs pp:text-sm sm:text-base">
                    Total campaign
                  </div>
                  <div className="text-xs pp:text-sm sm:text-base pt-[3px] font-semibold">
                    {activeData.totalads ? activeData.totalads : 0}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {campdata?.length > 0 && currentbalance && (
            <div className="bg-white flex flex-col gap-5 p-3 px-5 justify-center rounded-xl dark:bg-[#0D0D0D]">
              <div className="text-xl font-semibold">Overview</div>
              <div className="flex items-center ">
                <div
                  onClick={async () => {
                    setDay7(7);
                    const data = await CampaignFetch(advertiserid);
                    const filteredData = data.filter(
                      (item) => item.a?._id === idToCheck
                    );
                    setCampdata(data);
                    setAdD({
                      ...adD,
                      name: filteredData[0]?.a?.adname,
                      media: filteredData[0]?.a?.url,
                      type: filteredData[0]?.a?.content[0]?.extension.startsWith(
                        "image"
                      )
                        ? "image"
                        : "video",
                    });
                    setDefaults(filteredData[0]?.a?.adname);
                    const adsGraph = filteredData[0]?.analytics.map((d) => {
                      return {
                        ...d,
                        // time: formatDateToString(d?.creation),
                        time: returnDay(d?.creation),
                        cpc: parseFloat(d?.cpc.toFixed(1)),
                      };
                    });
                    setGraph(adsGraph);
                    const adsMonths = filteredData[0]?.analytics.map((df) =>
                      returnMonth(df?.creation)
                    );
                    const uniqueMonths = [...new Set(adsMonths)];
                    setMonths(uniqueMonths);

                    setValue({
                      click: filteredData[0]?.a?.clicks,
                      views: filteredData[0]?.a?.views,
                      impressions: filteredData[0]?.a?.impressions,
                      cpc: filteredData[0]?.a?.cpc,
                    });
                    setAdValues({
                      ...adValues,
                      totalspent: filteredData[0]?.a.totalspent,
                      conversion: filteredData[0]?.conversion,
                      popularity: filteredData[0]?.popularity,
                    });
                  }}
                  className={`p-1 px-4 rounded-l-lg text-sm border z-30 ${
                    day7 == 7 ? "bg-[#2d9aff] text-white " : null
                  } border-[#ced3d9] dark:border-[#262c31] font-semibold`}
                >
                  7 days
                </div>
                <div
                  onClick={async () => {
                    setDay7(30);
                    const data = await CampaignFetchforthirtyDays(advertiserid);
                    const filteredData = data.filter(
                      (item) => item.a?._id === idToCheck
                    );
                    setCampdata(data);
                    setAdD({
                      ...adD,
                      name: filteredData[0]?.a?.adname,
                      media: filteredData[0]?.a?.url,
                      type: filteredData[0]?.a?.content[0]?.extension.startsWith(
                        "image"
                      )
                        ? "image"
                        : "video",
                    });
                    setDefaults(filteredData[0]?.a?.adname);

                    const adsGraph = filteredData[0]?.analytics.map((d) => {
                      return {
                        ...d,
                        // time: formatDateToString(d?.creation),
                        time: returnDay(d?.creation),
                        cpc: parseFloat(d?.cpc.toFixed(1)),
                      };
                    });
                    setGraph(adsGraph);
                    const adsMonths = filteredData[0]?.analytics.map((df) =>
                      returnMonth(df?.creation)
                    );
                    const uniqueMonths = [...new Set(adsMonths)];
                    setMonths(uniqueMonths);

                    setValue({
                      click: filteredData[0]?.a?.clicks,
                      views: filteredData[0]?.a?.views,
                      impressions: filteredData[0]?.a?.impressions,
                      cpc: filteredData[0]?.a?.cpc,
                    });
                    setAdValues({
                      ...adValues,
                      totalspent: filteredData[0]?.a?.totalspent,
                      conversion: filteredData[0]?.conversion,
                      popularity: filteredData[0]?.popularity,
                    });
                  }}
                  className={`p-1 px-4 rounded-r-lg z-30 text-sm border ${
                    day7 == 30 ? "bg-[#2d9aff] text-white " : null
                  } border-[#ced3d9] dark:border-[#262c31] font-semibold`}
                >
                  30 Days
                </div>
                {/* <div></div> */}
              </div>
            </div>
          )}

          {campdata?.length > 0 ? (
            <div className="w-full bg-white dark:bg-[#0D0D0D] rounded-xl pn:max-sm:mb-[100px] sm:min-h-[400px] sm:max-h-[450px]">
              {currentbalance ? (
                <>
                  <div className="flex mb-3 justify-between w-full flex-wrap">
                    <div className="flex justify-center items-center">
                      <div className="p-2 flex items-center gap-5 w-full">
                        <div className="flex  flex-col w-full min-w-[160px] bg-[#f7f7f7] dark:bg-[#121212] rounded-xl">
                          <div
                            onClick={() => setSwit(!swit)}
                            className="flex justify-between items-center relative p-1.5 cursor-pointer h-full gap-2 px-2 w-full text-sm"
                          >
                            <div className="flex items-center gap-2">
                              <div>
                                {adD.type === "image" ? (
                                  <img
                                    src={adD.media}
                                    className="max-w-[30px] bg-[#f8f8f8] dark:bg-[#181c24] rounded-lg min-h-[30px] min-w-[30px] max-h-[30px]"
                                  />
                                ) : (
                                  <video
                                    src={adD.media}
                                    className="max-w-[30px] bg-[#f8f8f8] dark:bg-[#181c24] rounded-lg min-h-[30px] min-w-[30px] max-h-[30px]"
                                  />
                                )}
                              </div>
                              <div className="text-[#0d0d0d] text-xs dark:text-white font-semibold">
                                {adD.name}
                              </div>
                            </div>

                            <div className="text-lg ">
                              {swit ? (
                                <IoIosArrowUp onClick={() => setSwit(!swit)} />
                              ) : (
                                <IoIosArrowDown
                                  onClick={() => setSwit(!swit)}
                                />
                              )}
                            </div>

                            <div
                              className={` ${
                                swit
                                  ? "top-[45px]"
                                  : "top-0 border-none text-[0px] w-[0px] h-[0px]"
                              } absolute left-0 bg-[#f7f7f7] duration-100 dark:bg-[#121212] rounded-xl z-50 w-full`}
                            >
                              <div className="flex flex-col gap-3 px-2 py-1 max-h-[300px] overflow-y-scroll no-scrollbar">
                                {campdata?.map((d, i) => (
                                  <div
                                    onClick={() => {
                                      setIdToCheck(d?.a?._id);
                                      setAdD({
                                        name: d?.a?.adname,
                                        media: d?.a?.url,
                                        type: d?.a?.content[0]?.extension.startsWith(
                                          "image"
                                        )
                                          ? "image"
                                          : "video",
                                      });
                                      setValue({
                                        ...value,
                                        click: d?.a?.clicks,
                                        views: d?.a?.views,
                                        impressions: d?.a?.impressions,
                                        cpc: d?.a?.cpc,
                                      });

                                      setAdValues({
                                        ...adValues,
                                        totalspent: d?.a?.totalspent,
                                        conversion: d?.conversion,
                                        popularity: d?.popularity,
                                      });
                                      if (d) {
                                        const adsGraph = d?.analytics.map(
                                          (d) => {
                                            return {
                                              ...d,
                                              // time: formatDateToString(d?.creation),
                                              time: returnDay(d?.creation),
                                              cpc: parseFloat(
                                                d?.cpc.toFixed(1)
                                              ),
                                            };
                                          }
                                        );
                                        setGraph(adsGraph);
                                        const adsMonths = d?.analytics.map(
                                          (df) => returnMonth(df?.creation)
                                        );
                                        const uniqueMonths = [
                                          ...new Set(adsMonths),
                                        ];
                                        setMonths(uniqueMonths);
                                      }
                                    }}
                                    key={i}
                                    className="flex gap-2 py-1 items-center w-full rounded-lg light:hover:bg-[#ffffff]"
                                  >
                                    <div className="">
                                      {d?.a?.content[0]?.extension.startsWith(
                                        "image"
                                      ) ? (
                                        <img
                                          src={d?.a?.url}
                                          className={`${
                                            swit
                                              ? "max-w-[30px] bg-[#f8f8f8] dark:bg-[#181c24] rounded-lg min-h-[30px] min-w-[30px] max-h-[30px]"
                                              : "w-0 h-0"
                                          } duration-100`}
                                          alt="image"
                                        />
                                      ) : (
                                        <video
                                          src={d?.a?.url}
                                          className={`${
                                            swit
                                              ? "max-w-[30px] bg-[#f8f8f8] dark:bg-[#181c24] rounded-lg min-h-[30px] min-w-[30px] max-h-[30px]"
                                              : "w-0 h-0"
                                          } duration-100`}
                                        />
                                      )}
                                    </div>
                                    <div className="flex flex-col">
                                      <div
                                        className={`text-xs ${
                                          swit ? "" : " hidden"
                                        }`}
                                      >
                                        {d?.a?.adname}
                                      </div>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* <div className="flex flex-col  w-full min-w-[160px] bg-[#f7f7f7] dark:bg-[#121212] rounded-xl">
                          <div
                            onClick={() => setDswic(!dswic)}
                            className="flex justify-between items-center relative p-1.5 cursor-pointer h-full gap-2 px-2 w-full text-sm"
                          >
                            <div className="flex items-center gap-2">

                              <div className="text-[#0d0d0d] text-xs dark:text-white font-semibold">
                                {`${day7} days`}
                              </div>
                            </div>

                            <div className="text-lg ">
                              {dswic ? (
                                <IoIosArrowUp onClick={() => setDswic(!dswic)} />
                              ) : (
                                <IoIosArrowDown onClick={() => setDswic(!dswic)} />
                              )}
                            </div>

                            <div
                              className={` ${dswic
                                ? "top-[45px]"
                                : "top-0 border-none text-[0px] w-[0px] h-[0px]"
                                } absolute left-0 bg-[#f7f7f7] duration-100 dark:bg-[#121212] rounded-xl z-50 w-full`}
                            >
                              <div className="flex flex-col gap-3 px-2 py-1 max-h-[300px] overflow-y-scroll no-scrollbar">
                                <div onClick={async () => {
                                  setDay7(7)
                                  const data = await CampaignFetch(advertiserid)
                                  setCampdata(data);
                                  setAdD({
                                    ...adD,
                                    name: data[0].a.adname,
                                    media: data[0].a.url,
                                    type: data[0].a.content[0].extension.startsWith("image") ? "image" : "video"
                                  })
                                  setDefaults(data[0].a.adname);
                                  setGraph(data[0].analytics);
                                  setValue({
                                    click: data[0].a.clicks,
                                    views: data[0].a.views,
                                    impressions: data[0].a.impressions,
                                    cpc: data[0].a.cpc,
                                  });
                                  setAdValues({
                                    ...adValues,
                                    totalspent: data[0].a.totalspent,
                                    conversion: data[0].conversion,
                                    popularity: data[0].popularity,
                                  });
                                }}>7 Days</div>
                                <div onClick={async () => {
                                  setDay7(30)
                                  const data = await CampaignFetchforthirtyDays(advertiserid)
                                  setCampdata(data);
                                  setAdD({
                                    ...adD,
                                    name: data[0].a.adname,
                                    media: data[0].a.url,
                                    type: data[0].a.content[0].extension.startsWith("image") ? "image" : "video"
                                  })
                                  setDefaults(data[0].a.adname);
                                  setGraph(data[0].analytics);
                                  setValue({
                                    click: data[0].a.clicks,
                                    views: data[0].a.views,
                                    impressions: data[0].a.impressions,
                                    cpc: data[0].a.cpc,
                                  });
                                  setAdValues({
                                    ...adValues,
                                    totalspent: data[0].a.totalspent,
                                    conversion: data[0].conversion,
                                    popularity: data[0].popularity,
                                  });
                                }
                                }>30 Days</div>

                              </div>
                            </div>
                          </div>
                        </div> */}
                      </div>
                      {/* <div>
                    <Select className="bg-maincolor">
                      <SelectTrigger className="pp:w-[180px]">
                        <SelectValue placeholder="1 day" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectItem value="1 day">1 day</SelectItem>
                          <SelectItem value="7 days">7 days</SelectItem>
                          <SelectItem value="30 days">30 days</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div> */}
                    </div>

                    <div className="flex justify-center z-30 pn:max-sm:gap-2 pr-4 pt-3 sm:justify-between flex-wrap">
                      <div
                        onClick={() =>
                          setCheck({
                            ...check,
                            click: !check.click,
                          })
                        }
                        className={`flex justify-center ${
                          check.click ? "bg-[#ffa800] text-[#fff]" : ""
                        } cursor-pointer pn:max-sm:rounded-xl sm:rounded-l-xl w-[150px] border border-l-none p-2 items-center`}
                      >
                        <div className="flex  w-full p-2 gap-1 font-semibold flex-col">
                          <div>Click</div>
                          <div>{value.click}</div>
                        </div>
                      </div>
                      <div
                        onClick={() =>
                          setCheck({
                            ...check,
                            impressions: !check.impressions,
                          })
                        }
                        className={`flex justify-center ${
                          check.impressions ? "bg-[#00c7be] text-[#fff]" : ""
                        } cursor-pointer pn:max-sm:rounded-xl w-[150px] border border-l-none border-r-none p-2 items-center`}
                      >
                        <div className="flex  w-full p-2 gap-1 font-semibold flex-col">
                          <div>Impressions</div>
                          <div>{value.impressions}</div>
                          {/* <div>0</div> */}
                        </div>
                      </div>
                      <div
                        onClick={() =>
                          setCheck({
                            ...check,
                            cpc: !check.cpc,
                          })
                        }
                        className={`flex justify-center ${
                          check.cpc ? "bg-[#34c759] text-[#fff]" : ""
                        } cursor-pointer pn:max-sm:rounded-xl w-[150px] border border-l-none border-r-none p-2 items-center`}
                      >
                        <div className="flex w-full p-2 gap-1 font-semibold flex-col">
                          <div>Cost</div>

                          <div>₹ {parseFloat(value.cpc).toFixed(1)}</div>
                        </div>
                      </div>
                      <div
                        onClick={() =>
                          setCheck({
                            ...check,
                            views: !check.views,
                          })
                        }
                        className={`flex justify-center ${
                          check.views ? "bg-[#32ade6] text-[#fff]" : ""
                        } cursor-pointer pn:max-sm:rounded-xl sm:rounded-r-xl w-[150px] border p-2 items-center`}
                      >
                        <div className="flex  w-full p-2 gap-1 font-semibold flex-col">
                          <div>Views</div>

                          <div>{value.views}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="w-full bg-white dark:bg-[#0D0D0D] rounded-xl  h-full pn:max-sm:h-[300px]">
                    <div className="relative h-full pn:max-sm:-left-5 top-0 w-full pn:max-sm:h-[300px]">
                      <ResponsiveContainer
                        style={{ zIndex: 10 }}
                        className={``}
                      >
                        <LineChart
                          width={730}
                          height={250}
                          data={graph}
                          // margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                        >
                          <XAxis dataKey="time" />
                          <YAxis
                            className="pn:max-sm:text-xs"
                            axisLine={false}
                            allowDecimals={false}
                          />
                          <Tooltip
                            contentStyle={{
                              backgroundColor:
                                theme === "dark" ? "#273142" : "#333333",
                              borderRadius: "12px",
                              border: "none",
                            }}
                            cursor={{
                              fill: theme === "light" ? "#f8f9fc" : "#1B2431",
                            }}
                          />
                          {/* <Legend /> */}

                          {check.click && (
                            <Line
                              type="monotone"
                              dataKey="click"
                              stroke="#ffa800"
                            />
                          )}
                          {check.views && (
                            <Line
                              type="monotone"
                              dataKey="views"
                              stroke="#32ade6"
                            />
                          )}
                          {check.impressions && (
                            <Line
                              type="monotone"
                              dataKey="impressions"
                              stroke="#00c7be"
                            />
                          )}
                          {check.cpc && (
                            <Line
                              type="monotone"
                              dataKey="cpc"
                              stroke="#34c759"
                            />
                          )}
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="w-full h-full flex flex-col gap-3 bg-white dark:bg-[#0D0D0D] justify-center items-center font-semibold">
                    <div className="text-2xl">Not Enough Money to run ad!</div>
                    <div className="text-xl">Add Money to Wallet</div>
                    <div className="z-30">
                      <Link
                        href={"/main/wallet"}
                        className="flex justify-center gap-2 text-white bg-blue-500 p-2 px-5 rounded-xl items-center"
                      >
                        Add
                        <FaWallet />
                      </Link>{" "}
                    </div>
                  </div>
                </>
              )}
            </div>
          ) : (
            <div
              className="flex flex-col  mb-[70px] sm:mb-0 w-full justify-center
						items-center h-full font-semibold bg-white dark:bg-[#0D0D0D] select-none p-2 sm:p-4 "
            >
              <Image src={noads} className="max-w-[250px] sm:max-w-[350px]" />
              <div className="my-5 text-xl">Create Your First Ad!</div>
              <div className="z-30">
                <Link
                  className="bg-blue-600  text-white p-2 px-7 rounded-xl font-semibold"
                  href={`/createAd?brand=${fullname}&userid=${userid}&advid=${advertiserid}&image=${image}&step=1`}
                >
                  Create Ad !
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default OrganisationDashboard;
