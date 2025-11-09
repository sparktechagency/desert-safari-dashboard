import { baseApi } from "../../api/baseApi";

const TransferApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getallTransfer: builder.query({
      query: ({page,limit,title}) => ({
        url: `/transferOption/allOptions`,
        method: "GET",
        params:{page,limit,title}
      }),
      providesTags: ["transfer"],
    }),
    createTransfer: builder.mutation({
      query: (data) => ({
        url: "/transferOption/create-option",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["transfer"],
    }),

   
  }),
});

export const {
  useGetallTransferQuery,
  useCreateTransferMutation,

} = TransferApi;
