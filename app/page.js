
"use client"
import { useEffect } from "react";
import Lotties from "./component/Lotties";
import { usePathname } from "next/navigation";
import Cookies from "js-cookie";

export default function Home() {
  const path = usePathname("")

  useEffect(() => {

    if (!path.startsWith("/createAd")) {
      const c1 = Cookies.get("post")
      const c2 = Cookies.get("postid")

      if (c1) {
        Cookies.remove("post")
      }
      if (c2) {
        Cookies.remove("postid")
      }

    }
  }, [path])

  return (
    <>
      <Lotties />
    </>
  );
}
