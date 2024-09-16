import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axiosInstance from "../../Helpers/axiosInstance"
import toast from "react-hot-toast"

const initialState = {
    allUsersCount:0,
    subscribedCount:0
}


export const getStatData = createAsyncThunk('stat/get',async()=>{
    try{
        const response = await axiosInstance('/admin/stats/users');
        return (await response).data;
    }catch(err){
        console.log(err);
        return toast.error(err?.response?.data?.message);
    }
})


const statSlice = createSlice({
    name:"stat",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(getStatData.fulfilled, (state,action)=>{
            state.allUsersCount= action.payload.allUserCounts;
            state.subscribedCount = action.payload.subscribedUsersCount;
        })
    }
})


export default statSlice.reducer;