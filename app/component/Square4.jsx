import React from "react";

const Square4 = ({ ctr, price, display, duration, daily }) => {
  // const [count, setCount] = useState(1);
  return (
    <>
      <div className="flex flex-col bg-maincolor dark:border-border border md:min-w-[300px] rounded-2xl mx-3 my-5 p-2">
        {/* <div className="flex justify-around  text-lg font-medium  border-b w-full items-center">
          <div
            onClick={() => setCount(1)}
            className={`p-2 ${
              count === 1 ? "active [&.active]:border-b  focus:border-b" : null
            } border-blue-600 hover:border-b`}
          >
            1-day
          </div>
          <div
            onClick={() => setCount(2)}
            className={`p-2 ${
              count === 2 ? "active [&.active]:border-b  focus:border-b" : null
            } border-blue-600 hover:border-b`}
          >
            7-days
          </div>
          <div
            onClick={() => setCount(3)}
            className={`p-2 ${
              count === 3 ? "active [&.active]:border-b focus:border-b" : null
            } border-blue-600 hover:border-b`}
          >
            30-days
          </div>
        </div> */}
        <div
        // className={`${count === 1 ? null : "hidden"}`}
        >
          <div className="p-2 my-3 px-4">
            <span className="border-dashed border-b py-1 border-black">
              {duration == 1 ? (
                <>
                  {duration ? duration : 1}-<>day</>
                </>
              ) : (
                <>
                  {duration}-<>days</>
                </>
              )}{" "}
              Ad Budget
            </span>
            <h1 className="sm:text-xl text-lg py-1 font-semibold">
              &#x20B9; {price ? Math.ceil(price) : 0}
            </h1>
          </div>
          <div className="p-2 my-3 px-4">
            <span className="border-dashed border-b py-1 border-black">
              Daily Budget
            </span>
            <h1 className="sm:text-xl text-lg py-1 font-semibold">
              &#x20B9; {daily ? Math.ceil(daily) : 0}
            </h1>
          </div>
          <div className="p-2 px-4">
            <span className="border-dashed  py-1 border-b border-black">
              {duration ? duration : 1}- day Impression
            </span>
            <h1 className="sm:text-xl text-lg py-1 font-semibold">
              {display ? (
                <>
                  {display + 500}-{display + 2000}
                </>
              ) : (
                0
              )}
            </h1>
          </div>
          <div className="p-2 px-4">
            <span className="border-dashed  py-1 border-b border-black">
              CTR
            </span>
            <h1 className="sm:text-xl text-lg py-1 font-semibold">
              {ctr ? (
                <>
                  {Math.abs(ctr - 0.001 * 100).toFixed(2)}%-
                  {(ctr * 100).toFixed(2)}%
                </>
              ) : (
                <>0.95% - 2%</>
              )}
            </h1>
          </div>
          {/* <div className="p-2 px-4">
            <span className="border-dashed  py-1 border-b border-black">
              1 -day clicks
            </span>
            <h1 className="sm:text-xl text-lg py-1 font-semibold">66 - 220</h1>
          </div>
          <div className="p-2 px-4">
            <span className="border-dashed  py-1 border-b border-black">
              1 -day cost per clicks
            </span>
            <h1 className="sm:text-xl text-lg py-1 font-semibold">
              &#x20B9; 55.35 - &#x20B9; 82.88
            </h1>
          </div>
          <div className="px-4 py-2 text-[#222222]">
            Based on the selected parameters
          </div> */}
        </div>

        {/* <div className={`${count === 2 ? null : "hidden"}`}>
          <div className="p-2 my-3 px-4">
            <span className="border-dashed border-b py-1 border-black">
              7- day spend
            </span>
            <h1 className="sm:text-xl text-lg py-1 font-semibold">
              &#x20B9; 4,200.00 - &#x20B9; 15,024.00
            </h1>
          </div>
          <div className="p-2 px-4">
            <span className="border-dashed  py-1 border-b border-black">
              7- day Impression
            </span>
            <h1 className="sm:text-xl text-lg py-1 font-semibold">
              7,100 - 29,000
            </h1>
          </div>
          <div className="p-2 px-4">
            <span className="border-dashed  py-1 border-b border-black">
              CTR
            </span>
            <h1 className="sm:text-xl text-lg py-1 font-semibold">
              0.64% - 0.98%
            </h1>
          </div>
          <div className="p-2 px-4">
            <span className="border-dashed  py-1 border-b border-black">
              7 -day clicks
            </span>
            <h1 className="sm:text-xl text-lg py-1 font-semibold">66 - 220</h1>
          </div>
          <div className="p-2 px-4">
            <span className="border-dashed  py-1 border-b border-black">
              7 -day cost per clicks
            </span>
            <h1 className="sm:text-xl text-lg py-1 font-semibold">
              &#x20B9; 55.35 - &#x20B9; 82.88
            </h1>
          </div>
          <div className="px-4 py-2 text-[#222222]">
            Based on the selected parameters
          </div>
        </div>
        <div className={`${count === 3 ? null : "hidden"}`}>
          <div className="p-2 my-3 px-4">
            <span className="border-dashed border-b py-1 border-black">
              30- day spend
            </span>
            <h1 className="sm:text-xl text-l gpy-1 font-semibold">
              &#x20B9; 4,200.00 - &#x20B9; 15,024.00
            </h1>
          </div>
          <div className="p-2 px-4">
            <span className="border-dashed  py-1 border-b border-black">
              30- day Impression
            </span>
            <h1 className="sm:text-xl text-lg py-1 font-semibold">
              7,100 - 29,000
            </h1>
          </div>
          <div className="p-2 px-4">
            <span className="border-dashed  py-1 border-b border-black">
              CTR
            </span>
            <h1 className="sm:text-xl text-lg py-1 font-semibold">
              0.64% - 0.98%
            </h1>
          </div>
          <div className="p-2 px-4">
            <span className="border-dashed  py-1 border-b border-black">
              30 -day clicks
            </span>
            <h1 className="sm:text-xl text-lg py-1 font-semibold">66 - 220</h1>
          </div>
          <div className="p-2 px-4">
            <span className="border-dashed py-1 border-b border-black">
              30 -day cost per clicks
            </span>
            <h1 className="sm:text-xl text-lg py-1 font-semibold">
              &#x20B9; 55.35 - &#x20B9; 82.88
            </h1>
          </div>
          <div className="px-4 py-2 text-[#222222]">
            Based on the selected parameters
          </div>
        </div> */}
      </div>
    </>
  );
};

export default Square4;
