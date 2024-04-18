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


export const getRazorPayId = createAsyncThunk("/razorpay/getId", async() => {
    try{
        const response = await axiosInstance.get('/payments/razorpay-key');
        return response.data;
    }catch(error){
        toast.error('Failed to load data');
    }
});


export const purchaseCourseBundle = createAsyncThunk('/purchaseCourse', async()=>{
    try{
        const response = await axiosInstance.post('/payments/subscribe');
        return response.data;
    }catch(err){
        toast.error(err?.response?.data?.message);
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
        toast.error(err?.response?.data?.message);
    }
})


export const getPaymentRecord = createAsyncThunk('/payments/record', async()=>{
    try{
        const response =  axiosInstance.get('/payments/?count=100');
        toast.promise(response,{
            loading:"Getting the payment records",
            success:(data)=>{
                return data?.data?.message
            },
            error:"Failed to get payment records"
        })
        return response.data;
    }catch(err){
        toast.error("Operation failed");
    }
})


export const cancelCourseBundle = createAsyncThunk('/payments/cancel', async()=>{
    console.log("cancelling course bundle");
    try{
        const response = axiosInstance.post('/payments/unsubscribe');
        console.log('hello g');
        toast.promise(response,{
            loading:"Cancelling your subscription...",
            success:(data)=>{
                console.log("data is: ", data);
                return data?.data?.message
            },
            error:"Failed to cancel subscription"
        })
    }catch(err){
        console.log("error aagya paaji", err);
        return toast.error(err?.response?.data?.message);
    }
})


const razorpaySlice = createSlice({
    name:'razorpay',
    initialState,
    reducers:{},
    extraReducers:(builder) =>{
        builder.
        addCase(getRazorPayId.fulfilled, (state, action)=>{
            state.key = action?.payload?.key;
        })
        .addCase(purchaseCourseBundle.fulfilled,(state,action)=>{
            state.subscription_id = action?.payload?.subscription_id;
        })
        .addCase(verifyUserPayment.fulfilled, (state,action)=>{
            toast.success(action?.payload?.message);
            state.isPaymentVerified = action?.payload?.success
        })
        .addCase(verifyUserPayment.rejected, (state,action)=>{
            toast.success(action?.payload?.message);
            state.isPaymentVerified = action?.payload?.success
        })
        .addCase(getPaymentRecord.fulfilled, (state,action)=>{
            state.allPayments = action?.payload?.allPayments;
            state.finalMonth = action?.payload?.finalMonth;
            state.monthlySalesRecord = action?.payload?.monthlySalesRecord;
        }).addCase(cancelCourseBundle.fulfilled, (state,action)=> {
            
        })
    }
})

export default razorpaySlice.reducer;