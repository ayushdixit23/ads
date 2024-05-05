"use client"
import { usePathname } from "next/navigation";
import Sidebar from "../component/Sidebar";
import OSidebar from "../component/OrganisationSidebar";
import Link from "next/link";
import { AiOutlinePlus } from "react-icons/ai";
import MobileNav from "../component/MobileNav";
import { ModeToggle } from "../component/ModeToggle";
import { useAuthContext } from "../utils/AuthWrapper";
import { useSelector } from "react-redux";

export default function MainLayout({ children }) {
	const path = usePathname()
	const { data } = useAuthContext()
	const advertiserid = useSelector((state) => state.data.advertiserid)
	const userid = useSelector((state) => state.data.userid)
	const fullname = useSelector((state) => state.data.fullname)
	const image = useSelector((state) => state.data.image)

	function generateRandomNumber() {
		// Generate a random 10-digit number
		const min = Math.pow(10, 9); // Minimum 10-digit number
		const max = Math.pow(10, 10) - 1; // Maximum 10-digit number
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}


	return (
		<>
			<div className="flex w-screen h-screen">
				{data?.type === "Individual" ? <Sidebar /> : <OSidebar />}
				<MobileNav />
				<div className="w-full flex flex-col dark:bg-[#181a20]">
					<div>
						<div className="py-6 flex border-b items-center w-full text-2xl font-semibold px-6">
							{path.startsWith("/main/ads") && <div>Ads</div>}
							{path.startsWith("/main/wallet") && <div>Wallet</div>}
							{path.startsWith("/main/dashboard") && <div className="flex justify-between items-center w-full">
								<div>
									Overview</div>
								<div className="flex justify-center items-center gap-2">
									<ModeToggle />
									<div>
										<Link
											href={advertiserid && userid ? `/createAd?brand=${fullname}&userid=${userid}&advid=${advertiserid}&image=${image}&step=1`
												: `/createAd?adid=${generateRandomNumber()}&step=1`}
											className="flex justify-center cursor-pointer items-center bg-[#1A73E8] text-white p-2 sm:px-4 px-3 rounded-full space-x-1"
										>
											<div>
												<AiOutlinePlus className="font-semibold" />
											</div>
											<div>
												<p className="pr-2 text-base">Create Ad</p>
											</div>
										</Link>
									</div>

								</div>

							</div>}
						</div>
					</div>
					<div className="h-full overflow-y-scroll no-scrollbar">{children}</div>
				</div>
			</div>

		</>
	);
}
