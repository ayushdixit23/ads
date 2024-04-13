"use client"
import useAdFetching from '@/app/useFetch/useAdFetching';
// import { getData } from '@/app/utils/useful';
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation';
import Fetch from '@/app/component/Fetch';
import Pagination from '@/app/component/Pagination';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import Loader from '@/app/component/Loader';
import { useAuthContext } from '@/app/utils/AuthWrapper';

const page = () => {
	const [campdata, setCampdata] = useState([]);
	const router = useRouter()
	// const { data?.advid } = getData()
	const { data } = useAuthContext()
	const { CampaignFetch } = useAdFetching()
	const [loading, setLoading] = useState(true)
	const [currentPage, setCurrentPage] = useState(1);
	const [postPerPage, setPostPerPage] = useState(5);
	const lastindex = currentPage * postPerPage;
	const firstIndex = lastindex - postPerPage;
	const postperData = campdata?.slice(firstIndex, lastindex);

	const fetchData = async () => {
		const datas = await CampaignFetch(data?.advid)
		setCampdata(datas)
		setLoading(false)
	}

	useEffect(() => {
		if (data?.advid) {
			setLoading(true)
			fetchData()
		}
	}, [data?.advid])

	if (loading) {
		return <Loader />
	}

	return (
		<>
			<Fetch data={postperData} length={campdata.length} router={router} />
			{campdata?.length > postPerPage && <Pagination
				postPerPage={postPerPage}
				setCurrentPage={setCurrentPage}
				currentPage={currentPage}
				firstIndex={firstIndex}
				lastindex={lastindex}
				length={campdata.length}
			/>
			}
		</>
	)
}

export default page

