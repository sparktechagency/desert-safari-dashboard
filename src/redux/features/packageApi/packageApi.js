import { baseApi } from "../../api/baseApi";

const packageApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createPackage: builder.mutation({
      query: (data) => ({
        url: "/package/create-package",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["create-event"],
    }),
    getAllPackage: builder.query({
      query: () => ({
        url: "/package/allPackage",
        method: "GET",
      }),
      providesTags: ["create-event"],
    }),
    deletPackge: builder.mutation({
      query: (_id) => ({
        url: `/event/delete-event/${_id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["create-event"],
    }),
    UpdatePackage: builder.mutation({
      query: ({ _id, data }) => ({
        url: `/package/update-package/${_id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["create-event"],
    }),
  }),
});

export const {
  useCreatePackageMutation,
  useGetAllPackageQuery,
  useDeletPackgeMutation,
  useUpdatePackageMutation,
} = packageApi;
