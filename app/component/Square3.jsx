import React from "react";

const Square3 = ({ display }) => {
  return (
    <>
      <div className="flex flex-col bg-maincolor dark:text-white justify-center rounded-3xl  md:min-w-[300px] border sm:max-md:text-center mx-3 items-center my-4">
        <div className="text-xl font-medium p-3 px-5 border-b w-full md:w-[300px] rounded-t-3xl">
          Estimated Audience
        </div>

        <div className="text-lg text-[#6E7191] dark:text-white py-6 sm:py-10 my-[3px] w-full md:w-[300px] px-4 flex flex-col bg-maincolor space-y-3 rounded-b-3xl">
          <div className="sm:text-3xl text-xl font-semibold dark:text-white text-black">
            {/* {data ? <>{data.map((d, i) => d.audience)}</> : "__________"} */}
            {display}-{display + 1000}
          </div>
          <div className="text-[#333333] dark:text-white">Based on the targeted locations</div>
        </div>
      </div>
    </>
  );
};

export default Square3;
