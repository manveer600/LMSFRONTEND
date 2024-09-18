import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axiosInstance from '../../Helpers/axiosInstance'
import toast from "react-hot-toast";
const initialState = {
    key:"",
    subscription_id:"",
    isPaymentVerified:false,
    allPayments:{},
    finalMonth:"",
    monthlySalesRecord:[]
}


export const getRazorPayKey = createAsyncThunk("/razorpay/getId", async() => {
    try{
        const response = await axiosInstance.get('/payments/razorpay-key');
        return response.data;
    }catch(error){
        console.log('error getting razor pay id', error);
        toast.error(error.message);
    }
});


export const subscribeBundle = createAsyncThunk('/purchaseCourse', async()=>{
    try{
        const response = await axiosInstance.post('/payments/subscribe');
        return response.data;
    }catch(err){
        console.log('error subscribing to the course', err);
        return err;
    }
})


export const verifyUserPayment = createAsyncThunk('/payments/verify', async(data)=>{
    try{
        const response = await axiosInstance.post('/payments/verify', {
            razorpay_payment_id : data.razorpay_payment_id,
            razorpay_subscription_id : data.razorpay_subscription_id,
            razorpay_signature: data.razorpay_signature
        });
        return response.data;
    }catch(err){
        console.log('error while verifying payment', err);
        return err;
    }
})


export const getPaymentRecord = createAsyncThunk('/payments/record', async()=>{
    try{
        const response =  await axiosInstance.get('/payments/?count=100');
        return await response.data;
    }catch(err){
        toast.error("Operation failed");
    }
})


export const cancelCourseBundle = createAsyncThunk('/payments/cancel', async()=>{
    try{
        const response = await axiosInstance.post('/payments/unsubscribe');
        return await response?.data;
    }catch(err){
        console.log("error while cancelling subscription", err);
        return toast.error(err?.response?.data?.message);
    }
})


const razorpaySlice = createSlice({
    name:'razorpay',
    initialState,
    reducers:{},
    extraReducers:(builder) =>{
        builder.
        addCase(getRazorPayKey.fulfilled, (state, action)=>{
            state.key = action?.payload?.data;
        })
        .addCase(subscribeBundle.fulfilled,(state,action)=>{
            state.subscription_id = action?.payload?.data;
        })
        .addCase(verifyUserPayment.fulfilled, (state,action)=>{
            state.isPaymentVerified = action?.payload?.success
        })
        .addCase(verifyUserPayment.rejected, (state,action)=>{
            state.isPaymentVerified = action?.payload?.success
        })
        .addCase(getPaymentRecord.fulfilled, (state,action)=>{
            state.allPayments = action?.payload?.allPayments;
            state.finalMonth = action?.payload?.finalMonth;
            state.monthlySalesRecord = action?.payload?.monthlySalesRecord;
        })
        .addCase(cancelCourseBundle.fulfilled, (state,action)=> {
            
        })
    }
})

export default razorpaySlice.reducer;