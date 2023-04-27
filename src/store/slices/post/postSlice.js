import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { sub } from 'date-fns'

const POSTS_URL = "https://jsonplaceholder.typicode.com/posts"

const initialState = {
    posts: [],
    status: "idle",
    error: null
}

export const fetchPosts = createAsyncThunk('posts/fetchposts', async () => {
    try {
        const response = await axios.get(POSTS_URL)
        return [...response.data]
    }
    catch (err) {
        return err.message;
    }
})


export const addNewPost = createAsyncThunk('posts/fetchnewposts', async (initialPost) => {
    try {
        const response = await axios.post(POSTS_URL, initialPost)
        return response.data
    }
    catch (err) {
        return err.message;
    }
})

export const updatePost = createAsyncThunk('posts/updatePost', async (initialPost) => {
    const { id } = initialPost;
    try {
        const response = await axios.put(`${POSTS_URL}/${id}`, initialPost)
        return response.data
    }
    catch (err) {
        // return err.message;
        return initialPost      
    }
})
export const deletePost = createAsyncThunk('posts/deletePost', async (initialPost) => {
    const { id } = initialPost;
    try {
        const response = await axios.delete(`${POSTS_URL}/${id}`)
        if(response?.status === 200) return initialPost
        return `${response?.status}:${response?.statusText} ` 
    }
    catch (err) {
        return err.message;
    }
})

const postSlice = createSlice({
    name: "posts",
    initialState,
    reducers: {
        postAdded(state, action) {
            state.posts.push(action.payload)
        },
        reactionAdded(state, action) {
            const { postId, reaction } = action.payload
            const existingPost = state.posts.find(post => post.id === postId)
            if (existingPost) {
                existingPost.reactions[reaction]++
            }
        }
    },
    extraReducers(builder) {
        builder
            .addCase(fetchPosts.pending, (state) => {
                state.status = "loading"
            })
            .addCase(fetchPosts.fulfilled, (state, action) => {
                state.status = "succeeded"
                let min = 1;
                const loadedPosts = action.payload.map(post => {
                    post.date = sub(new Date(), { minutes: min++ }).toISOString()
                    post.reactions = {
                        thumbsUp: 0,
                    wow: 0,
                    heart: 0,
                    rocket: 0,
                    eyes: 0
                    }
                    return post;
                });
                state.posts = state.posts.concat(loadedPosts)
            })
            .addCase(fetchPosts.rejected, (state, action) => {
                state.status = "failed"
                state.error = action.error.message
            })
            .addCase(addNewPost.fulfilled, (state, action) => {
                action.payload.userId = Number(action.payload.userId)
                action.payload.date = new Date().toISOString()
                action.payload.reactions = {
                    thumbsUp: 0,
                    wow: 0,
                    heart: 0,
                    rocket: 0,
                    eyes: 0
                }
                state.posts.push(action.payload)
            })
            .addCase(updatePost.fulfilled, (state, action) => {
              if(!action.payload?.id){
                console.log("Update could not complete");
                console.log(action.payload);
                return
              }
              const {id} = action.payload
              action.payload.data = new Date().toISOString()
              const posts = state.posts.filter(post => post.id !== id)
              state.posts = [...posts, action.payload]
            })
            .addCase(deletePost.fulfilled, (state, action) => {
                if(!action.payload?.id){
                  console.log("Delete could not complete");
                  console.log(action.payload);
                  return
                }
                const { id } = action.payload
                const posts = state.posts.filter(post => post.id !== id)
                state.posts = posts;
              })
    }
})

export const { postAdded, reactionAdded } = postSlice.actions
export const selectAllPosts = (state) => state.posts.posts
export const selecetPostById = (state, postId) => state.posts.posts.find(post => post.id === postId)
export const getPostsStatus = (state) => state.posts.status
export const getPostsError = (state) => state.posts.error
export default postSlice.reducer
