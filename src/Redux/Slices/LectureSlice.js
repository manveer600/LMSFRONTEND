import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import toast from "react-hot-toast"
import axiosInstance from "../../Helpers/axiosInstance"

const initialState = {
    lectures:[]
}

export const getCourseLectures = createAsyncThunk('/course/lecture/get', async(cid)=>{
    try{
        const response = axiosInstance.get(`/courses/${cid}`);
        toast.promise(response,{
            loading:"Wait! we are fetching lectures",
            success:"Lectures fetched successfully",
            error:"Error in fetching lectures"
        })
        const res = (await response).data;
        console.log("response is",res);
        return (await response).data;
    }catch(err){
        console.log(err);
        toast.error(err.message);
    }
})


export const addCourseLecture = createAsyncThunk('/course/lecture/add', async(data)=>{
    try{
        const formData = new FormData();
        formData.append('lecture', data.lecture);
        formData.append('title', data.title);
        formData.append('description', data.description)
        const response = axiosInstance.post(`/courses/${data.id}`, formData);
        toast.promise(response,{
            loading:"Adding course lectures",
            success:"Lectures added successfully",
            error:"Failed to add lectures"
        })
        return (await response).data;
    }catch(err){
        toast.error(err?.response?.data?.message);
    }
})

export const deleteCourseLecture = createAsyncThunk('/course/lecture/delete', async({cid,lid})=>{
    console.log("cid",cid);
    console.log("lid",lid);
    try{
        const response = axiosInstance.delete(`/courses/${cid.toString()}/${lid.toString()}`);
        toast.promise(response,{
            loading:"Deleting lecture",
            success:"Lecture deleted successfully",
            error:"Failed to delete lectures"
        })
        const res  = await response;
        console.log("res is", res);
        return (await response).data;
    }catch(err){
        console.log("error is", err);
        return toast.error(err?.response?.data?.message);
    }
})


const lectureSlice = createSlice({
    name:"lecture",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(getCourseLectures.fulfilled, (state,action)=>{
            console.log('action is:',action);
            state.lectures = action?.payload?.lectures;
        })
        builder.addCase(addCourseLecture.fulfilled, (state,action)=>{
            state.lectures = action?.payload?.course?.lectures;
        })
    }
})

export default lectureSlice.reducer;