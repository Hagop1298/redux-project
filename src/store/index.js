import { configureStore } from "@reduxjs/toolkit";
import counterReducer from './slices/counter/counterSlice'
import postsReducer from '../store/slices/post/postSlice'
import usersReducer from '../store/slices/users/usersSlice'
export const store = configureStore({
    reducer: {
        counter: counterReducer,
        posts: postsReducer,
        users: usersReducer,
    }
})