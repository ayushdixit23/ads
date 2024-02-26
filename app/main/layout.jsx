"use client"
import { usePathname } from "next/navigation";
import Sidebar from "../component/Sidebar";
import Link from "next/link";
import { AiOutlinePlus } from "react-icons/ai";

export default function MainLayout({ children }) {
	const path = usePathname()
	return (
		<>
			<div className="flex w-screen h-screen">
				<Sidebar />
				<div className="w-full flex flex-col dark:bg-[#181a20]">
					<div>
						<div className="py-6 flex border-b items-center w-full text-2xl font-semibold px-6">
							{path === "/main/ads" && <div>Ads</div>}
							{path === "/main/community" && <div>Community</div>}
							{path === "/main/dashboard" && <div className="flex justify-between items-center w-full">
								<div>
									Overview</div>
								<Link
									href="/createAd?step=1"
									className="flex justify-center cursor-pointer text-base items-center bg-[#1A73E8] text-white p-2 sm:px-4 px-3 rounded-full space-x-2"
								>
									<div>
										<AiOutlinePlus className="text-xl font-semibold" />
									</div>
									<div>
										<p className="pr-2 ">Create Ad</p>
									</div>
								</Link>
							</div>}
						</div>
					</div>
					<div className="h-full overflow-y-scroll no-scrollbar">{children}</div>
				</div>
			</div>
			<div>

			</div>
		</>
	);
}
