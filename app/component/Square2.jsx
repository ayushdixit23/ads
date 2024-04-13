import React from "react";

const Square2 = () => {
  return (
    <>
      <div className="flex flex-col justify-center items-center rounded-2xl my-10">
        <div className="text-xl font-medium bg-maincolor p-3 px-6 md:w-[250px] w-[300px] rounded-t-2xl">
          Estimated Audience
        </div>
        <div className="text-lg  bg-maincolor dark:text-white text-[#6E7191] py-5 sm:py-10 my-[2px] md:w-[250px] w-[300px] flex justify-center items-center text-center rounded-b-3xl">
          Select Locations to get <br />
          the estimation
        </div>
      </div>
    </>
  );
};

export default Square2;
