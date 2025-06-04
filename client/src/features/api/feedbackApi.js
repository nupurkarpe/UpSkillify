import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const FEEDBACK_API = "http://localhost:8080/api/v1/feedback";
export const feedbackApi = createApi({
  reducerPath: "feedbackApi",
  baseQuery: fetchBaseQuery({
    baseUrl: FEEDBACK_API,
    credentials: "include",
  }),
  endpoints: (builder) => ({
    submitFeedback: builder.mutation({
      query: ({ feedbackText, userId, rating }) => ({
        url: "/submitfeedback",
        method: "POST",
        body: { feedbackText, userId, rating },
      }),
    }),

    getFeedbacks: builder.query({
      query: () => ({
        url: "getfeedback",
        method: "GET",
      }),
    }),
    deleteFeedback: builder.mutation({
      query: (feedbackId) => ({
        url: `/deletefeedback/${feedbackId}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useSubmitFeedbackMutation,
  useGetFeedbacksQuery,
  useDeleteFeedbackMutation,
} = feedbackApi;
