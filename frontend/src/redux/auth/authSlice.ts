import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { stat } from "fs";
import { Student } from "../../model/Student";
import { User } from '../../model/User'
import apiClient from "../../utils/apiClient";

export interface AuthState {
    data: {
        user: User;
        student: Student;
        token: string;
    };
}

const initialState: AuthState = {
    data: {
        user: {
            id: '',
            email: '',
            password: '',
        },
        student: {

            id: '',
            user_id: '',
            name: '',
            address: '',
            telp: '',
            age: '',
            school_name: ''
        },
        token: ''
    }
};

interface ValidationErrors {
    errorMessage: string
    field_errors: Record<string, string>
}
export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<AuthState>) => {
            state.data = action.payload.data
        },
        removeUser: (state, action: PayloadAction<AuthState>) => {
            state.data = initialState.data
        },
    },
});


// Action creators are generated for each case reducer function
export const { setUser, removeUser } = authSlice.actions

export default authSlice.reducer