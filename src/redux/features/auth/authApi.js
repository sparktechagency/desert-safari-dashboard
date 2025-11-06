import { baseApi } from "../../api/baseApi";

const AuthAPi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (userInfo) => ({
        url: "/auth/login",
        method: "POST",
        body: userInfo,
      }),
    }),
    forgatePassword: builder.mutation({
      query: (email) => ({
        url: "/auth/forgotPass",
        method: "POST",
        body: email,
      }),
    }),
    verifyOtp: builder.mutation({
      query: (data) => ({
        url: "/auth/verifyOtp",
        method: "POST",
        body: data,
      }),
    }),
    resetPassword: builder.mutation({
      query: (data) => ({
        url: "/auth/resetPass",
        method: "POST",
        body: data,
      }),
    }),
  }),
});
export const {
  useLoginMutation,
  useForgatePasswordMutation,
  useVerifyOtpMutation,
  useResetPasswordMutation,
} = AuthAPi;
