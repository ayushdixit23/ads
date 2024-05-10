"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import koi from "../assests/koiimage.svg";
import axios from "axios";
import { API } from "@/Essentials";
import graph2 from "../assests/Graph.svg";
import d1 from "../assests/d1.png";
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

const OrganisationDashboard = () => {
  const [data, setData] = useState();
  const { data: user } = useAuthContext();
  const [campdata, setCampdata] = useState([]);
  const advertiserid = useSelector((state) => state.data.advertiserid);
  const fullname = useSelector((state) => state.data.fullname);
  const [state, setState] = useState("");
  const [dp, setDp] = useState("");
  const [graph, setGraph] = useState([]);
  const [defaults, setDefaults] = useState("");
  const [loading, setLoading] = useState(false);
  const { CampaignFetch } = useAdsFetching();
  const [toggle, setToggle] = useState(false);
  const dispatch = useDispatch();

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
      const res = await axios.get(`${API}/fetchdashboard/${id}`);
      if (res?.data?.success) {
        setData(res.data.user);
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
        console.log(data);
        setCampdata(data);
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
      setState(user.manageusers[0].fullname);
      setDp(user.manageusers[0].image);
      dispatch(setAdvertiserid(user.manageusers[0].id));
      dispatch(setFullname(user.manageusers[0].fullname));
      dispatch(setImage(user.manageusers[0].image));
      dispatch(setUserid(user.manageusers[0].userid));
    }
  }, [user]);

  console.log(advertiserid, "advid");

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <div className="grid  grid-cols-1 h-[90vh] overflow-y-scroll no-scrollbar w-[100%] bg-[#f7f7f7] dark:bg-black select-none p-2 sm:p-4">
        <div className=" flex flex-col gap-4">
          <div className=" w-full grid md:grid-cols-4 pn:max-md:gap-2 gap-10 grid-cols-2 rounded-xl">
            <div className="bg-white dark:bg-[#0D0D0D] h-[100px]  rounded-2xl">
              <div className="flex gap-2 items-center justify-start pl-6 h-full">
                <div>
                  <Image src={d1} className="w-[60px]" />
                </div>
                <div className="flex flex-col justify-center h-full gap-2 ">
                  <div className="font-semibold">Accounts</div>
                  <div className="flex flex-col w-full min-w-[130px] bg-[#f7f7f7] dark:bg-[#121212]  rounded-xl">
                    <div
                      onClick={() => setToggle(!toggle)}
                      className="flex justify-between items-center relative p-1.5 cursor-pointer h-full gap-2 px-2 w-full text-sm"
                    >
                      <div className="flex items-center gap-2">
                        <div>
                          <img
                            src={dp}
                            className="max-w-[30px] bg-[#f8f8f8] dark:bg-[#181c24] rounded-lg min-h-[30px] min-w-[30px] max-h-[30px]"
                          />
                        </div>
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
                        } absolute left-0 bg-[#f7f7f7] duration-100 dark:bg-[#121212] rounded-xl z-50 w-full`}
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

            {/* <div className="flex justify-center w-full max-h-[100px] items-center pn:max-sm:rounded-md sm:max-md:rounded-xl gap-2 sm:gap-5 p-2 sm:p-3  bg-maincolor md:border-r-2">
								<div className="h-[50px] w-[50px] bg-blue-500 rounded-full flex justify-center items-center p-3" >
									<FaWallet className="h-[35px] w-[35px]" />
								</div>

								<div className="flex flex-col text-xs w-full sm:w-auto justify-center">
									<div>Current Balance</div>
									<div className="sm:text-xl text-base font-semibold">
										{data?.currentbalance ? "₹" + data?.currentbalance : "₹0"}
									</div>
								</div>
							</div> */}

            <div className="bg-white dark:bg-[#0D0D0D] h-[100px]  rounded-2xl">
              <div className="flex gap-2 items-center justify-start pl-6 h-full">
                <div>
                  <Image src={d3} className="w-[60px]" />
                </div>
                <div className="flex flex-col justify-center h-full ">
                  <div className="font-semibold">Total Spent</div>
                  <div className="text-lg pt-[2px] font-semibold">
                    {data?.currentbalance
                      ? "₹" + data?.currentbalance
                      : "₹0.00"}
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-[#0D0D0D] h-[100px]  rounded-2xl">
              <div className="flex gap-2 items-center justify-start pl-6 h-full">
                <div>
                  <Image src={d2} className="w-[60px]" />
                </div>
                <div className="flex flex-col justify-center h-full ">
                  <div className="font-semibold">Current balance</div>
                  <div className="text-lg pt-[3px] font-semibold">
                    {data?.currentbalance
                      ? "₹" + data?.currentbalance
                      : "₹0.00"}
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

            <div className="bg-white dark:bg-[#0D0D0D] h-[100px] rounded-2xl">
              <div className="flex gap-2 items-center justify-start pl-6 h-full">
                <div>
                  <Image src={d4} className="w-[60px]" />
                </div>
                <div className="flex flex-col justify-center h-full ">
                  <div className="font-semibold">Total campaign</div>
                  <div className="text-lg pt-[3px] font-semibold">
                    {data?.currentbalance ? "₹" + data?.currentbalance : 5}
                  </div>
                </div>
              </div>
            </div>
          </div>
          {campdata?.length > 0 ? (
            <div className="w-full bg-white dark:bg-[#0D0D0D] rounded-xl pn:max-sm:mb-[100px] sm:min-h-[400px] sm:max-h-[450px]">
              {data?.currentbalance ? (
                <>
                  <div className="flex mb-3 justify-between w-full flex-wrap">
                    <div className="flex justify-center items-center">
                      <div className="p-2">
                        <Select
                          onValueChange={(selectValue) => {
                            const data = campdata.find(
                              (va) => va.a._id === selectValue
                            );
                            setValue({
                              click: data.a.clicks,
                              views: data.a.views,
                              impressions: data.a.impressions,
                              cpc: data.a.cpc,
                            });

                            setAdValues({
                              ...adValues,
                              totalspent: data.a.totalspent,
                              conversion: data.conversion,
                              popularity: data.popularity,
                            });
                            if (data) {
                              const adsGraph = data.a.adsDetails.map((d) => {
                                return {
                                  ...d,
                                  time: formatDateToString(d.time),
                                };
                              });
                              setGraph(adsGraph);
                            }
                          }}
                          className="bg-maincolor"
                        >
                          <SelectTrigger className="pp:w-[180px]">
                            <SelectValue placeholder={defaults} />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              {campdata?.length > 0 &&
                                campdata?.map((d, i) => (
                                  <SelectItem key={i} value={d?.a?._id}>
                                    {d?.a?.adname}
                                  </SelectItem>
                                ))}
                            </SelectGroup>
                          </SelectContent>
                        </Select>
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

                    <div className="flex justify-center pn:max-sm:gap-2 pr-4 pt-3 sm:justify-between flex-wrap">
                      <div
                        onClick={() =>
                          setCheck({
                            ...check,
                            click: !check.click,
                          })
                        }
                        className={`flex justify-center ${
                          check.click ? "bg-yellow-600" : ""
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
                          check.impressions ? "bg-red-600" : ""
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
                          check.cpc ? "bg-green-700" : ""
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
                          check.views ? "bg-white text-black" : ""
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
                    <div className="relative h-full pn:max-sm:-left-8 top-0 w-full pn:max-sm:h-[300px]">
                      {graph && graph?.length > 0 && (
                        <ResponsiveContainer className={``}>
                          <LineChart
                            width={730}
                            height={250}
                            data={graph}
                            // margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                          >
                            <XAxis dataKey="time" />
                            <YAxis className="pn:max-sm:text-xs" />
                            <Tooltip />
                            {/* <Legend /> */}
                            {check.click && (
                              <Line
                                type="monotone"
                                dataKey="click"
                                stroke="#D97706"
                              />
                            )}
                            {check.views && (
                              <Line
                                type="monotone"
                                dataKey="views"
                                stroke="#000"
                              />
                            )}
                            {check.impressions && (
                              <Line
                                type="monotone"
                                dataKey="impressions"
                                stroke="#E53E3E"
                              />
                            )}
                            {check.cpc && (
                              <Line
                                type="monotone"
                                dataKey="cpc"
                                stroke="#047857"
                              />
                            )}
                          </LineChart>
                        </ResponsiveContainer>
                      )}

                      <>
                        {" "}
                        {graph?.length === 0 && (
                          <div className="w-full h-full flex justify-center items-center text-2xl font-semibold">
                            No Data At The Moment
                          </div>
                        )}
                      </>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="w-full h-full flex flex-col gap-3 justify-center items-center font-semibold">
                    <div className="text-2xl">Not Enough Money to run ad!</div>
                    <div className="text-xl">Add Money to Wallet</div>
                    <div>
                      <Link
                        href={"/main/wallet"}
                        className="flex justify-center gap-2 bg-blue-500 p-2 px-5 rounded-xl items-center"
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
              className="flex flex-col w-full justify-center
						items-center h-full font-semibold bg-white dark:bg-[#0D0D0D] select-none p-2 sm:p-4 "
            >
              <Image src={noads} className="max-w-[350px]" />
              <div className="my-5 text-xl">Create Your First Ad!</div>
              <div>
                <Link
                  className="bg-blue-600 text-white p-2 px-7 rounded-xl font-semibold"
                  href="/createAd?step=1"
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
