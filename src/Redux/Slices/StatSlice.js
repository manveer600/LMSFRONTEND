import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axiosInstance from "../../Helpers/axiosInstance"
import toast from "react-hot-toast"

const initialState = {
    allUsersCount:0,
    subscribedCount:0
}


export const getStatData = createAsyncThunk('stat/get',async()=>{
    try{
        const response = axiosInstance('/admin/stats/users');
        toast.promise(response,{
            loading:"Getting the stats",
            success:(data)=>{
                return data?.data?.message
            },
            error:"Failed to load data stats"
        });

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
            console.log(action.payload.allUserCounts);
            console.log(action.payload.subscribedUsersCount);
            state.allUsersCount= action.payload.allUserCounts;
            state.subscribedCount = action.payload.subscribedUsersCount;
        })
    }
})


export default statSlice.reducer;