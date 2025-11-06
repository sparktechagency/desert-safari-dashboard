import { baseApi } from "../../api/baseApi";

const packageApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createPackage: builder.mutation({
      query: (formData) => ({
        url: "/package/create-package",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["create-event"],
    }),
    getAllPackage: builder.query({
      query: ({ page, limit }) => ({
        url: `/package/allPackage?limit=${limit}&page=${page}`,
        method: "GET",
      }),
      providesTags: ["create-event"],
    }),
    deletPackge: builder.mutation({
      query: (_id) => ({
        url: `/package/delete-package/${_id}`,
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
    getSInglePackage: builder.query({
      query: (_id) => ({
        url: `/package/single-package/${_id}`,
        method: "GET",
      }),
      providesTags: ["create-event"],
    }),
  }),
});

export const {
  useCreatePackageMutation,
  useGetAllPackageQuery,
  useDeletPackgeMutation,
  useUpdatePackageMutation,
  useGetSInglePackageQuery,
} = packageApi;
