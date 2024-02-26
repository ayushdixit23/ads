import React from "react";
import dynamic from "next/dynamic";
const Lottie = dynamic(() => import("lottie-react"), { ssr: false })
import animation from "../assests/animation.json";

const Lotties = () => <Lottie animationData={animation} loop={true} />;

export default Lotties;
