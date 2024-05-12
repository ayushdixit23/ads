import React from "react";
import { IoIosArrowRoundUp } from "react-icons/io";
import { useSelector } from "react-redux";

const Square3 = ({ display, popularity }) => {
  const totalbudget = useSelector((state) => state.data.three.TotalBudget)
  const audience = useSelector((state) => state.data.three.audience)

  function formatNumberWithCommas(number) {
    const formattedNumber = new Intl.NumberFormat('en-IN').format(number);
    return formattedNumber;
  }

  return (
    <>
      <div className="flex flex-col bg-maincolor dark:text-white justify-center rounded-3xl  md:min-w-[300px] border sm:max-md:text-center mx-3 items-center my-4">
        <div className="text-xl font-medium p-3 px-5 border-b w-full md:w-[300px] rounded-t-3xl">
          Estimated Audience
        </div>

        <div className=" text-[#6E7191] dark:text-white py-6 sm:py-10 my-[3px] w-full md:w-[300px] px-4 flex flex-col bg-maincolor gap-3 rounded-b-3xl">
          <div className=" font-bold text-xl dark:text-white text-black">
            Impressions
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-1">
              <div className="sm:text-3xl text-2xl font-bold dark:text-white text-black">{formatNumberWithCommas(Math.ceil(audience))}</div>

              <div className="mt-1  text-green-600">
                {popularity === 2 && <div className="flex justify-center items-center">
                  <div>
                    <IoIosArrowRoundUp className="text-lg font-semibold" />
                  </div>
                  <div>10%</div>
                </div>}
                {popularity === 3 && <div className="flex justify-center items-center">
                  <div>
                    <IoIosArrowRoundUp className="text-lg font-semibold" />
                  </div>
                  <div>25%</div>
                </div>}
                {popularity === 4 && <div className="flex justify-center items-center">
                  <div>
                    <IoIosArrowRoundUp className="text-lg font-semibold" />
                  </div>
                  <div>35%</div>
                </div>}
              </div>
            </div>


            <div><span className="text-sm">(Appprox.)</span></div>
          </div>
          <div className="text-[#333333] dark:text-white">Based on the data you entered</div>
        </div>
      </div>
    </>
  );
};

export default Square3;
