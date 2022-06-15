import { configureStore } from '@reduxjs/toolkit'
import authReducer from './auth/authSlice'
import { setupListeners } from "@reduxjs/toolkit/query";
import { authApi } from "./api/authApi";
import { calculationActivityApi } from './api/calculationActivityApi';

export const store = configureStore({
    reducer: { auth: authReducer, [authApi.reducerPath]: authApi.reducer, [calculationActivityApi.reducerPath]: calculationActivityApi.reducer },
    devTools: true,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({ serializableCheck: false }).concat([authApi.middleware, calculationActivityApi.middleware]),
})

// const store: Store<ArticleState, ArticleAction> = createStore(reducer);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
setupListeners(store.dispatch);