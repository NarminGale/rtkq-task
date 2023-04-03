import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api",
  tagTypes: ["Posts"],
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3500/" }),
  endpoints: (builder) => ({
    getPosts: builder.query({
      query: () => "posts",
      providesTags: ["Posts"],
      transformResponse: (res) => res.sort((a, b) => b.id - a.id),
    }),
    addPost: builder.mutation({
      query: (body) => ({
        url: "posts",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Posts"],
    }),
    deletePost: builder.mutation({
      query: (id) => ({
        url: `posts/${id}`,
        method: "DELETE",
        id,
      }),
      invalidatesTags: ["Posts"],
    }),
  }),
});

export const { useGetPostsQuery, useAddPostMutation, useDeletePostMutation } =
  apiSlice;
