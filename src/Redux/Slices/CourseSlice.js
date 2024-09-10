import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../Helpers/axiosInstance";
import { toast } from "react-hot-toast";

const initialState = {
    courseData: []
}

export const getAllCourses = createAsyncThunk('/course/get', async () => {
    console.log('fetching courses');
    try {
        const response = await axiosInstance.get('/courses');
        return await response.data.courses;
    } catch (err) {
        toast.error(err?.response?.data?.message);
    }
})


export const deleteCourse = createAsyncThunk('/course/delete', async (id) => {
    try {
        const response = await axiosInstance.delete(`/courses/${id}`);
        const res = await response.data;
        return res;
    } catch (err) {
        console.log(err);
        return toast.error(err?.response?.data?.message);
    }
})

export const createNewCourse = createAsyncThunk('/course/create', async (data) => {
    try {
        const formData = new FormData();
        formData.append('title', data?.title);
        formData.append('description', data?.description);
        formData.append('category', data?.category);
        formData.append('createdBy', data?.createdBy);
        formData.append('thumbnail', data?.thumbnail);

        const response = await axiosInstance.post('/courses', formData);
        return (await response).data
    } catch (e) {
        console.log(e);
        return toast.error(e?.response?.data?.message);
    }
})

export const deleteAllCourses = createAsyncThunk('/courses/delete-all', async () => {
    const res = axiosInstance.delete('/courses/deleteallcourses');
    try {
        console.log('Deleting all courses')
        toast.promise(res, {
            loading: "Deleting all courses...",
            success: 'All courses have been deleted',
            error: 'Failed to delete all courses'
        })
        const response = await res;
        console.log(response);
        return (await res).data;
    } catch (err) {
        console.log(err);
        toast.error(err);
    }
})

const courseSlice = createSlice({
    name: "courses",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getAllCourses.fulfilled, (state, action) => {
                if (action?.payload) {
                    console.log('action is', action);
                    console.log(action.payload);
                    state.courseData = [...action.payload];
                }
            })
            .addCase(deleteAllCourses.fulfilled, (state, action) => {
                if (action?.payload) {
                    console.log('action is', action);
                    console.log(action.payload);
                    state.courseData = [];
                }
            })
    }
})


export default courseSlice.reducer;