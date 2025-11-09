import { baseApi } from "../../api/baseApi";

const BlogsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getallBlogs: builder.query({
      query: ({page,limit,title}) => ({
        url: `/blog/allBlogs`,
        // url: `/blog/allBlogs?page=${page}&title=${title}&limit=${limit}`,
        method: "GET",
        params:{page,limit,title}
      }),
      providesTags: ["all-blog"],
    }),
    createBlogs: builder.mutation({
      query: (data) => ({
        url: "/blog/create-blog",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["all-blog"],
    }),

    updateBlogs: builder.mutation({
      query: ({ _id, data }) => ({
        url: `/blog/update-blog/${_id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["all-blog"],
    }),

    deleteBlogs: builder.mutation({
      query: (_id) => ({
        url: `/blog/delete-blog/${_id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["all-blog"],
    }),
  }),
});

export const {
  useGetallBlogsQuery,
  useCreateBlogsMutation,
  useDeleteBlogsMutation,
  useUpdateBlogsMutation,
} = BlogsApi;
