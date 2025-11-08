import { baseApi } from "../../api/baseApi";

const BookingApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllBooking: builder.query({
      query: ({ page, limit, date }) => {
        const queryParams = new URLSearchParams();

        if (page) queryParams.append("page", page);
        if (limit) queryParams.append("limit", limit);
        if (date) queryParams.append("date", date);

        return {
          url: `/booking/allBooking?${queryParams.toString()}`,
          method: "GET",
        };
      },
      providesTags: ["create-booking"],
    }),

    getSingleBooking: builder.query({
      query: (_id) => ({
        url: `/booking/single-booking/${_id}`,
        method: "GET",
      }),
      providesTags: ["create-booking"],
    }),
    // dashboard stats:
    getbookingStats: builder.query({
      query: (year) => ({
        url: `/user/dashboard/stats/${year}`,
        method: "GET",
      }),
      providesTags: ["bookings"],
    }),
  }),
});

export const { useGetAllBookingQuery, useGetSingleBookingQuery , useGetbookingStatsQuery} = BookingApi;
