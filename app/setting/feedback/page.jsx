import React from "react";

const page = () => {
  return (
    <>
      <div className="h-full w-full p-[3%]">
        <h1 className="py-2 font-semibold text-3xl">Submit feedback</h1>
        <p className="text-[#6B7280] dark:text-white my-5">
          We'd really like to hear any feedback that you might have for us! This
          will help us improve our app and make it a better experience for you.
        </p>
        <div className="flex flex-col gap-1">
          <label htmlFor="text" className="dark:text-white text-[#6B7280]">
            Label
          </label>
          <textarea
            className="border-2 shadow-md bg-input rounded-2xl max-h-[80px] min-h-[70px] outline-none p-3"
            name="text"
            id="text"
            cols="10"
            rows="10"
          ></textarea>
        </div>
        <div className="flex justify-end my-3 items-center">
          <div className="bg-[#F1F2F3] mx-2 rounded-lg text-[#6B7280] p-2 px-4 font-medium">
            Cancel
          </div>
          <div className="bg-[#0284FE] rounded-lg text-white p-2 px-4 font-medium">
            Save changes
          </div>
        </div>
      </div>
    </>
  );
};

export default page;
