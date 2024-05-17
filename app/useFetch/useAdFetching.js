import { API } from "@/Essentials";
import axios from "axios";
import { useCallback } from "react";

const useAdsFetching = () => {
	const CampaignFetch = useCallback(async (id) => {
		try {
			const res = await axios.get(`${API}/getallads/${id}`);
			if (res?.data?.success) {
				const ad = res?.data?.ads;
				const content = res?.data?.content;
				const merge = ad?.map((a, i) => ({
					a: a?.h,
					analytics: a?.analytics,
					conversion: a?.conversion,
					popularity: a?.popularity,
					c: content[i]
				}));
				return merge
			}
		} catch (e) {
			console.log(e);
		}
	}, []);

	const CampaignFetchforthirtyDays = useCallback(async (id) => {
		try {
			const res = await axios.get(`${API}/getalladsforthirtyDays/${id}`);
			if (res?.data?.success) {
				const ad = res?.data?.ads;
				const content = res?.data?.content;
				const merge = ad?.map((a, i) => ({
					a: a?.h,
					analytics: a?.analytics,
					conversion: a?.conversion,
					popularity: a?.popularity,
					c: content[i]
				}));
				return merge
			}
		} catch (e) {
			console.log(e);
		}
	}, []);

	return { CampaignFetch, CampaignFetchforthirtyDays }
}

export default useAdsFetching