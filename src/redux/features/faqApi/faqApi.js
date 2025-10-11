import { baseApi } from "../../api/baseApi";

const FaqApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getallfaq: builder.query({
      query: () => ({
        url: "/faq/allFaq",
        method: "GET",
      }),
      providesTags: ["all-faq"],
    }),

    createFaq: builder.mutation({
      query: (data) => ({
        url: "/faq/create-faq",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["all-faq"],
    }),

    updateFaq: builder.mutation({
      query: (data) => ({
        url: `/faq/update-faq/${data.id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["all-faq"],
    }),

    deleteFaq: builder.mutation({
      query: (id) => ({
        url: `/faq/delete-faq/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["all-faq"],
    }),
  }),
});

export const {
  useGetallfaqQuery,
  useCreateFaqMutation,
  useDeleteFaqMutation,
  useUpdateFaqMutation,
} = FaqApi;
