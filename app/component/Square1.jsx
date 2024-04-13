import React from "react";
const Square1 = () => {
  // const [square, setSquare] = useState(0);

  return (
    <>
      <div className="bg-[#fafafa] dark:bg-[#273142] w-full">
        <div className="flex py-3 justify-center items-center gap-4 sm:gap-8">
          <div className="flex flex-col gap-2 items-center">
            <span className="px-2">
              {/* <AiFillCheckCircle className="text-2xl font-semibold" /> */}
              <div className="flex justify-center w-6 h-6 border border-black rounded-full items-center">
                1
              </div>
            </span>
            <h1 className="pn:max-sm:text-xs">Set up Ad</h1>
          </div>
          <div className="flex flex-col gap-2 items-center">
            <span className="px-2">
              {/* <AiFillCheckCircle className="text-2xl font-semibold" /> */}
              <div className="flex justify-center w-6 h-6 border border-black rounded-full items-center">
                2
              </div>
            </span>
            <h1 className="pn:max-sm:text-xs">Select Target</h1>
          </div>
          <div className="flex flex-col gap-2 items-center">
            <span className="px-2">
              {/* <AiFillCheckCircle className="text-2xl font-semibold" /> */}
              <div className="flex justify-center w-6 h-6 border border-black rounded-full items-center">
                3
              </div>
            </span>
            <h1 className="pn:max-sm:text-xs">Preview & Launch</h1>
          </div>
          <div className="line"></div>
        </div>
      </div>
    </>
  );
};

export default Square1;
