import { baseApi } from "../../api/baseApi";

const eventsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createEvents: builder.mutation({
      query: (data) => ({
        url: "/event/create-event",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["create-enent"],
    }),
    getAllEvents: builder.query({
      query: () => ({
        url: "/event/allEvents",
        method: "GET",
      }),
      providesTags: ["create-enent"],
    }),
    deletEvent: builder.mutation({
      query: (_id) => ({
        url: `/event/delete-event/${_id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["create-enent"],
    }),
  }),
});

export const {
  useCreateEventsMutation,
  useGetAllEventsQuery,
  useDeletEventMutation,
} = eventsApi;
