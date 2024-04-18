import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import {toast} from "react-hot-toast";

import axiosInstance from "../../Helpers/axiosInstance.js"
const initialState = {
    isLoggedIn: localStorage.getItem('isLoggedIn') || false,
    role:localStorage.getItem('role') || "",
    data: localStorage.getItem('data') === "undefined" ? {} : JSON.parse(localStorage.getItem('data') ) 
};
export const createAccount = createAsyncThunk('/auth/signup', async (data) => {
    try {
        const res = axiosInstance.post("user/register", data);
        toast.promise(res, {
          loading: "Wait! Creating your account",
          success: (data) => {
            return data?.data?.message;
          },
          error: "Failed to create account",
        });
        return (await res).data;
    }
    catch (error) {
        toast.error(error?.response?.data?.message);
        // return;
    }
})

export const login = createAsyncThunk('/auth/login', async (data) => {
    try {
        const res = axiosInstance.post("user/login", data);
    
        toast.promise(res, {
          loading: "Wait! Authenticating.....",
          success: (data) => {
            return data?.data?.message;
          },
          error: "Failed to Login",
        });
        return (await res).data;
    }
    catch (error) {
        console.log("error is:", error);
        toast.error(error?.response?.data?.message);
        return;
    }
})

export const logout = createAsyncThunk('/auth/logout', async() => {
    try {
        const res = axiosInstance.get("user/logout");
    
        toast.promise(res, {
          loading: "Wait! Logging You out.....",
          success: (data) => {
            return data?.data?.message;
          },
          error: "Failed to logout",
        });
        return (await res).data;
    }
    catch (error) {
        toast.error(error?.response?.data?.message);
        return;
    }
})

export const updateProfile = createAsyncThunk('/user/update/profile', async(data)=>{
    try{
        const res = axiosInstance.put('user/update-user', data);
        toast.promise(res,{
            loading:"Updating User!! please wait.....",
            success:(data)=>{data?.data?.message},
            error:"Failed to update profile"
        });
        return (await res).data;
    }catch(e){
        console.log('error',e);
        return toast.error(e?.response?.data?.message);
    }
})

export const getUserData = createAsyncThunk('/user/details', async()=>{
    try{
        const res = axiosInstance.get('user/me');
        return (await res).data;
    }catch(e){
        console.log('error',e);
        return toast.error(e.message);
    }
})


const authSlice = createSlice({
    name:'auth',
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder
        .addCase(createAccount.fulfilled ,(state,action)=>{
            localStorage.setItem('isLoggedIn', true);
            localStorage.setItem('role', action?.payload?.user?.role);
            localStorage.setItem('data', JSON.stringify(action?.payload?.user));

            state.isLoggedIn = true;
            state.data = action?.payload?.user;
            state.role = action?.payload?.user?.role;    
        })
        .addCase(login.fulfilled, (state,action) =>{
            localStorage.setItem('isLoggedIn', true);
            localStorage.setItem('role', action?.payload?.user?.role);
            localStorage.setItem('data', JSON.stringify(action?.payload?.user));

            state.isLoggedIn = true;
            state.data = action?.payload?.user;
            state.role = action?.payload?.user?.role;
        })
        .addCase(logout.fulfilled, (state,action) => {
            localStorage.clear();
            state.data = {};
            state.isLoggedIn = false;
            state.role = "";
        })
        .addCase(getUserData.fulfilled, (state,action)=>{
            if(!action?.payload?.user) return;
            localStorage.setItem('isLoggedIn', true);
            localStorage.setItem('role', action?.payload?.user?.role);
            localStorage.setItem('data', JSON.stringify(action?.payload?.user));

            state.isLoggedIn = true;
            state.data = action?.payload?.user;
            state.role = action?.payload?.user?.role;
        })
    }
})


// export const {} = authSlice.actions;
export default authSlice.reducer;