import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const listingAPI = createApi({
  reducerPath: "listingApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_SERVER}/api/v1`,
    credentials: "include",
  }),
  tagTypes: ["Listing", "KYC", "Bookings"],
  endpoints: (builder) => ({
    search: builder.query({
      query: ({ city, startDate, endDate }) => {
        const queryParams = new URLSearchParams();
        if (city) queryParams.append("location", city);
        return {
          method: "GET",
          url: `/listings/search?${queryParams.toString()}`,
          credentials: "include",
        };
      },
      providesTags: ["Listing"],
    }),
    getUserlisting: builder.query({
      query: () => ({
        method: "GET",
        url: `/listings/getuserlisting`,
        credentials: "include",
      }),
      providesTags: ["Listing"],
    }),
    getAllListings: builder.query({
      query: () => ({
        method: "GET",
        url: `/listings/all`,
        credentials: "include",
      }),
      providesTags: ["Listing"],
    }),
    createListing: builder.mutation({
      query: (body) => ({
        method: "POST",
        url: `/listings/create`,
        credentials: "include",
        body,
      }),
      invalidatesTags: ["Listing"],
    }),
    updateListing: builder.mutation({
      query: (body, id) => ({
        method: "PUT",
        url: `/listings/update/${id}`,
        credentials: "include",
        body,
      }),
      invalidatesTags: ["Listing"],
    }),
    deleteListing: builder.mutation({
      query: (id) => ({
        method: "DELETE",
        url: `/listings/delete/${id}`,
        credentials: "include",
      }),
      invalidatesTags: ["Listing"],
    }),

    //kyc section
    createkyc: builder.mutation({
      query: (body) => ({
        method: "POST",
        url: `/kyc/application`,
        credentials: "include",
        body,
      }),
      providesTags: ["KYC"],
    }),
    getkycstatus: builder.query({
      query: () => ({
        method: "GET",
        url: `/kyc/status`,
        credentials: "include",
      }),
      providesTags: ["KYC"],
    }),

    //Booking section
    createBooking: builder.mutation({
      query: (body) => ({
        method: "POST",
        url: `/bookings/createBooking`,
        credentials: "include",
        body,
      }),
      invalidatesTags: ["Bookings"],
    }),
    getBookingLandlord: builder.query({
      query: () => ({
        method: "GET",
        url: `/bookings/landlord/bookings`,
        credentials: "include",
      }),
      providesTags: ["Bookings"],
    }),
    GetUserBookings: builder.query({
      query: () => ({
        method: "GET",
        url: `/bookings/getBookingByUser`,
        credentials: "include",
      }),
      providesTags: ["Bookings"],
    }),
    updateBooking: builder.mutation({
      query: ({ id, ...rest }) => ({
        method: "PUT",
        url: `/bookings/updateBooking/${id}`,
        credentials: "include",
        body: rest,
      }),
      invalidatesTags: ["Bookings"],
    }),
    deleteBooking: builder.mutation({
      query: (id) => ({
        method: "DELETE",
        url: `/bookings/deleteBooking/${id}`,
        credentials: "include",
      }),
      invalidatesTags: ["Bookings"],
    }),
    checkStatus: builder.query({
      query: () => ({
        method: "GET",
        url: `/bookings/checkStatus`,
        credentials: "include",
      }),
      providesTags: ["Bookings"],
    }),
  }),
});

export const {
  useSearchQuery,
  useGetUserlistingQuery,
  useCreateListingMutation,
  useDeleteListingMutation,
  useGetAllListingsQuery,
  useUpdateListingMutation,
  useCreatekycMutation,
  useGetkycstatusQuery,
  useCreateBookingMutation,
  useGetBookingLandlordQuery,
  useGetUserBookingsQuery,
  useUpdateBookingMutation,
  useDeleteBookingMutation,
  useCheckStatusQuery,
} = listingAPI;
