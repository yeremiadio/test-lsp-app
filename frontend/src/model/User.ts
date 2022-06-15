import { Student } from "./Student";

export interface User {
    id: string;
    email: string;
    password: string;
}

export interface RegisterUserWithStudent extends Student {
    email: string;
    password: string;
    password_confirmation: string;
}

export interface UserLoginFormValues {
    email: string;
    password: string;
}