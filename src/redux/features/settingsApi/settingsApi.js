import { baseApi } from "../../api/baseApi";

const SettingsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createAndUpdateAboutUs: builder.mutation({
      query: (data) => ({
        url: "/about/create-or-update",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["about-us"],
    }),
    getAboutUs: builder.query({
      query: () => ({
        url: "/about/retrive",
        method: "GET",
      }),
      providesTags: ["about-us"],
    }),
    createPrivacyPolicy: builder.mutation({
      query: (data) => ({
        url: "/privacy/create-or-update",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["privacy-policy"],
    }),
    getPrivacyPolicy: builder.query({
      query: () => ({
        url: "/privacy/retrive",
        method: "GET",
      }),
      providesTags: ["privacy-policy"],
    }),
    createTermsAndConditions: builder.mutation({
      query: (data) => ({
        url: "/terms/create-or-update",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["trems-condition"],
    }),
    getTermsAndConditions: builder.query({
      query: () => ({
        url: "/terms/retrive",
        method: "GET",
      }),
      providesTags: ["trems-condition"],
    }),

    // refund:
    getAllRefund: builder.query({
      query: () => ({
        url: "/refund/retrive",
        method: "GET",
      }),
      providesTags: ["refund-policy"],
    }),
    createRefund: builder.mutation({
      query: (data) => ({
        url: "/refund/create-or-update",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["refund-policy"],
    }),
  }),
});

export const {
  useCreateAndUpdateAboutUsMutation,
  useGetAboutUsQuery,
  useCreatePrivacyPolicyMutation,
  useGetPrivacyPolicyQuery,
  useCreateTermsAndConditionsMutation,
  useGetTermsAndConditionsQuery,

  useGetAllRefundQuery,
  useCreateRefundMutation,
} = SettingsApi;
