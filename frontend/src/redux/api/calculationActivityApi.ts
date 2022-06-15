import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { CalculationTypes } from "../../model/CalculationActivity";
import { RegisterUserWithStudent, User } from "../../model/User";
import { BackendDataShape } from "../../types/BackendDataShape";
import { getCookie } from "../../utils/customCookie";
import { AuthState } from "../auth/authSlice";

export const calculationActivityApi = createApi({
    reducerPath: "calculationActivityApi",
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.REACT_APP_BASE_URL + "/api", prepareHeaders: (headers, { getState }) => {
            const token = getCookie('token')
            if (token) {
                headers.set('Authorization', `Bearer ${token}`)
            }

            return headers
        },
    }),
    tagTypes: ["CalculationActivity"],
    endpoints: (builder) => ({
        getCalculationActivities: builder.query<CalculationTypes[], object>({
            query: (obj) => {
                return {
                    url: `/calculationactivity`,
                    method: "GET",
                };
            },
            providesTags: ["CalculationActivity"],
            // transformResponse: (response: BackendDataShape<CalculationTypes[]>) => {
            //     return response.data;
            // },
        }),
        createCalculationActivity: builder.mutation({
            query: (body: CalculationTypes) => {
                return {
                    url: "/calculationactivity",
                    method: "post",
                    body,
                };
            },
            invalidatesTags: ['CalculationActivity']
        }),
    }),
});

export const {
    useGetCalculationActivitiesQuery,
    useCreateCalculationActivityMutation,
} = calculationActivityApi;