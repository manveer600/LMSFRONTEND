import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import toast from "react-hot-toast"
import axiosInstance from "../../Helpers/axiosInstance"

const initialState = {
    lectures: []
}

export const getCourseLectures = createAsyncThunk('/course/lecture/get', async (cid) => {
    try {
        const response = await axiosInstance.get(`/courses/${cid}`);
        return await response.data;
    } catch (err) {
        console.log(err);
        return toast.error(err.response.data.message);
    }
})


export const addCourseLecture = createAsyncThunk('/course/lecture/add', async (data) => {
    try {
        const formData = new FormData();
        console.log('lecture data is this', data);
        formData.append('lecture', data.lecture);
        formData.append('title', data.title);
        formData.append('description', data.description)
        const response = await axiosInstance.post(`/courses/${data.id}`, formData);
        console.log('response is this', response);
        return await response.data;
    } catch (err) {
        console.log('error while uploading a lecture to the course', err);
        return toast.error(err?.response?.data?.message, { id: 'addingLectureError' });
    }
})

export const deleteCourseLecture = createAsyncThunk('/course/lecture/delete', async ({ cid, lid }) => {
    console.log("cid", cid);
    console.log("lid", lid);
    try {
        const response = await axiosInstance.delete(`/courses/${cid.toString()}/${lid.toString()}`);
        // toast.promise(response,{
        //     loading:"Deleting lecture",
        //     success:"Lecture deleted successfully",
        //     error:"Failed to delete lectures"
        // })
        return await response.data;
    } catch (err) {
        console.log("error is", err);
        return toast.error(err?.response?.data?.message);
    }
})


const lectureSlice = createSlice({
    name: "lecture",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getCourseLectures.fulfilled, (state, action) => {
            console.log('action is:', action);
            state.lectures = action?.payload?.data;
        })
        builder.addCase(addCourseLecture.fulfilled, (state, action) => {
            state.lectures = action?.payload?.data?.lectures;
        })
    }
})

export default lectureSlice.reducer;