import { fetchBaseQuery, createApi } from "@reduxjs/toolkit/query/react"

export const api = createApi({
	reducerPath: "api",
	baseQuery: fetchBaseQuery({
		baseUrl: "https://work.grovyo.xyz/api"
		// baseUrl: "http://192.168.29.225:7190/api"
		// baseUrl: "http://192.168.29.230:7190/api"
		// baseUrl: "http://192.168.1.11:7190/api"
	}),
	endpoints: (builder) => ({
		getCommunity: builder.query({
			query: ({ id }) => `/getcommunitiesforAd/${id}`
		}),
		getPosts: builder.query({
			query: ({ comid, id }) => `/getAllPostsforAd/${id}/${comid}`
		}),
		getRefreshToken: builder.mutation({
			query: ({ refresh_token }) => ({
				url: `/refresh`,
				body: { refresh_token },
				method: "POST",
			})
		}),
		promotePost: builder.mutation({
			query: ({ id, comid, data }) => ({
				url: `/promotedposts/${id}/${comid}`,
				body: data,
				method: "POST"
			})
		})
	})
})

export const {
	useGetCommunityQuery,
	useGetPostsQuery,
	usePromotePostMutation,
	useGetRefreshTokenMutation
} = api