import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";

import axiosInstance from "../../Helpers/axiosInstance.js"
const initialState = {
    isLoggedIn: Boolean(localStorage.getItem('isLoggedIn')) || false,
    role: localStorage.getItem('role') || "",
    data: localStorage.getItem('data') == "undefined" ? {} : JSON.parse(localStorage.getItem('data'))
    // isLoggedIn:false,
    // role:"",
    // data:{}
};

export const createAccount = createAsyncThunk('/auth/signup', async (data) => {
    try {
        const res = await axiosInstance.post("user/register", data);
        return await res.data;
    }
    catch (error) {
        return toast.error(error?.response?.data?.message, {
            id: "signupError"
        });
    }
})

export const generateOTP = createAsyncThunk('/user/generateOTP', async (data) => {
    try {
        const res = await axiosInstance.post("user/generateOtp", data);
        return await res.data;
    } catch (error) {
        return toast.error(error?.message, { id: 'otpError' });
    }
})

export const login = createAsyncThunk('/auth/login', async (data) => {
    try {
        console.log('axios Instance', axiosInstance);
        const res = await axiosInstance.post("user/login", data);
        return await res.data;
    }
    catch (error) {
        console.log("error bb", error);
        return toast.error(error?.response?.data?.message, {
            id: 'loginError'
        });
    }
})

export const logout = createAsyncThunk('/auth/logout', async () => {
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

export const updateProfile = createAsyncThunk('/user/update/profile', async (data) => {
    try {
        const res = await axiosInstance.put('user/update-user', data);
        return await res.data;
    } catch (e) {
        console.log('error', e);
        return toast.error(e?.response?.data?.message);
    }
})

export const getUserData = createAsyncThunk('/user/details', async () => {
    console.log('getting')
    try {
        const res = await axiosInstance.get('user/me');
        return await res.data;
    } catch (e) {
        console.log('error', e);
        throw e;
    }
})

export const forgetPassword = createAsyncThunk('/user/forgetPassword', async (data) => {
    try {
        const res = await axiosInstance.post('/user/forgot-password', data);
        return await res.data;
    }
    catch (e) {
        console.log('error', e);
        return toast.error(e?.response?.data?.message, { id: 'forgetPassword' });
    }
})

export const resetPassword = createAsyncThunk('/user/resetPassword', async (data) => {
    try {
        console.log('data here is', data);
        const response = await axiosInstance.post(`/user/reset-password`, data);
        return await response.data;
    } catch (error) {
        console.log('error is this', error);
        return toast.error(error?.response?.data?.message, { id: 'resetPassword' });
    }
})


const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(createAccount.fulfilled, (state, action) => {
                localStorage.setItem('isLoggedIn', 'true');
                localStorage.setItem('role', action?.payload?.data?.role);
                localStorage.setItem('data', JSON.stringify(action?.payload?.data));

                state.isLoggedIn = true;
                state.role = action?.payload?.data?.role;
                state.data = action?.payload?.data;
            })
            .addCase(createAccount.rejected, (state, action) => {
                localStorage.setItem('isLoggedIn', 'false');
                localStorage.setItem('role', "");
                localStorage.setItem('data', JSON.stringify({}));

                state.isLoggedIn = false;
                state.role = "";
                state.data = {};
            })
            .addCase(login.fulfilled, (state, action) => {
                localStorage.setItem('isLoggedIn', 'true');
                localStorage.setItem('role', action?.payload?.data?.role);
                localStorage.setItem('data', JSON.stringify(action?.payload?.data));

                state.isLoggedIn = true;
                state.role = action?.payload?.data?.role;
                state.data = action?.payload?.data;
            })
            .addCase(login.rejected, (state, action) => {
                localStorage.setItem('isLoggedIn', 'false');
                localStorage.setItem('role', "");
                localStorage.setItem('data', JSON.stringify({}));

                state.isLoggedIn = false;
                state.role = "";
                state.data = {};
            })
            .addCase(logout.fulfilled, (state, action) => {
                localStorage.clear();
                state.data = {};
                state.role = "";
                state.isLoggedIn = false;
            })
            .addCase(getUserData.fulfilled, (state, action) => {
                localStorage.setItem('isLoggedIn', 'true');
                localStorage.setItem('role', action?.payload?.data?.role);
                localStorage.setItem('data', JSON.stringify(action?.payload?.data));

                state.isLoggedIn = true;
                state.data = action?.payload?.data;
                state.role = action?.payload?.data?.role;
            })
            .addCase(getUserData.rejected, (state, action) => {
                localStorage.setItem('isLoggedIn', 'false');
                localStorage.setItem('role', '');
                localStorage.setItem('data', JSON.stringify({}));

                state.isLoggedIn = false;
                state.role = '';
                state.data = {};
            })
    }
})

export default authSlice.reducer;