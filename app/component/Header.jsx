import Link from "next/link";
import React from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { ModeToggle } from "./ModeToggle";

const Header = () => {
  // const [data, setData] = useState([]);
  // const createAD = async () => {
  //   const id = sessionStorage.getItem("id");
  //   try {
  //     const res = await axios.post(`${API}/newad/${id}`);
  //     const data = await res?.data;
  //     if (data?.success) {
  //       const {} = data;
  //     }
  //     console.log(data);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  function generateRandomNumber() {
    // Generate a random 10-digit number
    const min = Math.pow(10, 9); // Minimum 10-digit number
    const max = Math.pow(10, 10) - 1; // Maximum 10-digit number
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  return (
    <>
      <div className="flex justify-between  bg-maincolor items-center px-4 sm:px-[2%]">
        <div className="sm:text-3xl text-xl py-5 font-semibold">Overview</div>
        <div className="flex justify-center items-center gap-2">
          <ModeToggle />
          <Link
            href={`/createAd?adid=${generateRandomNumber()}=step=1`}
            className="flex justify-center cursor-pointer items-center bg-[#1A73E8] text-white p-2 sm:px-4 px-3 rounded-full space-x-2"
          >
            <div>
              <AiOutlinePlus className="text-xl font-semibold" />
            </div>
            <div>
              <p className="pr-2 ">Create Ad</p>
            </div>
          </Link>
        </div>

      </div>
    </>
  );
};

export default Header;
