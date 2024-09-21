import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../Helpers/axiosInstance";
import { toast } from "react-hot-toast";

const initialState = {
    courseData: []
}

export const getAllCourses = createAsyncThunk('/course/get', async (data) => {
    try {
        const response = await axiosInstance.get(`/courses?title=${data.title}`);
        return await response.data.data;
    } catch (err) {
        toast.error(err?.response?.data?.message);
    }
})

export const getCourses = createAsyncThunk('/course/get', async () => {
    try {
        const response = await axiosInstance.get(`/courses`);
        return await response.data.data;
    } catch (err) {
        toast.error(err?.response?.data?.message);
    }
})


export const updateCourse = createAsyncThunk('/course/addToFav', async (id) => {
    try {
        const response = await axiosInstance.put(`/courses/fav/${id}`);
        return await response.data;
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
                state.courseData = [...action.payload];
            })
            .addCase(deleteAllCourses.fulfilled, (state, action) => {
                state.courseData = [];
            }).
            addCase(updateCourse.fulfilled, (state, action) => {
                let courseIndex = state.courseData.findIndex((course) => course._id == action.payload.data._id);
                if (courseIndex != -1) {
                    console.log(courseIndex);
                    state.courseData[courseIndex] = action?.payload?.data;
                }else 
                console.log('course not found with the given id');
            })
    }
})


export default courseSlice.reducer;