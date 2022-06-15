import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RegisterUserWithStudent, User } from "../../model/User";
import { BackendDataShape } from "../../types/BackendDataShape";
import { getCookie } from "../../utils/customCookie";
import { AuthState } from "../auth/authSlice";

export const authApi = createApi({
    reducerPath: "authApi",
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.REACT_APP_BASE_URL + "/api", prepareHeaders: (headers, { getState }) => {
            const token = getCookie('token')
            if (token) {
                headers.set('Authorization', `Bearer ${token}`)
            }

            return headers
        },
    }),
    tagTypes: ["User"],
    endpoints: (builder) => ({
        signinUser: builder.mutation({
            query: (body: Pick<User, 'email' | 'password'>) => {
                return {
                    url: "/login",
                    method: "post",
                    body,
                };
            },
            // transformResponse: (
            //     res: BackendDataShape<AuthState>,
            // ) => res.data.data
        }),
        signupUser: builder.mutation({
            query: (body: RegisterUserWithStudent) => {
                return {
                    url: "/register",
                    method: "post",
                    body,
                };
            },
            // transformResponse: (
            //     res: BackendDataShape<AuthState>,
            // ) => res.data.data
        }),
        getUser: builder.query<AuthState, object>({
            query: (obj) => {
                return {
                    url: `/user`,
                    method: "GET",
                };
            },
            providesTags: ["User"],
            // transformResponse: (response: BackendDataShape<AuthState>) => {
            //     return response.data;
            // },
        }),
    }),
});

export const {
    useSigninUserMutation,
    useSignupUserMutation,
    useGetUserQuery
} = authApi;