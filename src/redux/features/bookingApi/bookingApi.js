import { baseApi } from "../../api/baseApi";

const BookingApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllBooking: builder.query({
      query: ({ page, limit }) => ({
        url: `/booking/allBooking?limit=1&page=${page}&limit=${limit}`,
        method: "GET",
      }),
      providesTags: ["create-booking"],
    }),

    getSingleBooking: builder.query({
      query: (_id) => ({
        url: `/booking/single-booking/${_id}`,
        method: "GET",
      }),
      providesTags: ["create-booking"],
    }),
  }),
});

export const { useGetAllBookingQuery, useGetSingleBookingQuery } = BookingApi;
