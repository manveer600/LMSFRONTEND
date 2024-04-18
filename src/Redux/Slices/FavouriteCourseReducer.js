import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axiosInstance from "../../Helpers/axiosInstance"
import toast from "react-hot-toast";

const initialState = {
    favouriteCourses: localStorage.getItem('favouriteCourses') ? localStorage.getItem('favouriteCourses') : [],
    // favouriteCourses:[],
}

export const addToFavourites = createAsyncThunk('course/addToFavourites', async(id)=>{
    try{
        const response = await axiosInstance.post(`/favouriteCourses/${id}`);
        console.log('response aagya',response);

        return response.data;
    }catch(e){
        console.log(e);
        toast.error(e);
    }
})

export const removeFromFavourites = createAsyncThunk('/course/removeFromFavourites' , async(id) => {
    try{
        const request = await axiosInstance.delete(`/favouriteCourses/${id}`);
        console.log('kya chahta hai jindagi se', request);
        return request.data;
    }catch(e){
        console.log(e);
        toast.error(e);
    }
})

export const getAllFavCourses = createAsyncThunk('/courses/allFavCourses', async()=>{
    const response = await axiosInstance.get('/getAllFavCourses');
    return response.data;
})

const FavouriteCourseSlice = createSlice({
    name:"favouriteCourse",
    initialState,
    reducers:{},
    // extraReducers:(builder)=>{
    //     // builder.addCase(addToFavourites.fulfilled, (state,action)=>{
    //     //     console.log('action is:',action);
    //     //     state.favouriteCourses = [...state.favouriteCourses,action?.payload?.course]
    //     // })
       
    //     // builder.addCase(getAllFavCourses.fulfilled,(state,action) => {
    //     //     console.log(action);
    //     //     state.favouriteCourses= action?.payload?.courses;
    //     // })
    // }
})


export default FavouriteCourseSlice.reducer ;