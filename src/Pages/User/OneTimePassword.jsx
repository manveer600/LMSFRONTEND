import { useState } from "react";
import HomeLayout from "../../Layouts/HomeLayout";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { createAccount, forgetPassword } from "../../Redux/Slices/AuthSlice";
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";
export function VerifyOTP() {
  const { state } = useLocation();
  console.log("state is this", state);
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  async function verifyOtp(data) {
    setIsLoading(true);
    if (data.otp == state.otp) {
      const formData = new FormData();
      formData.append("fullName", state.fullName);
      formData.append("email", state.email);
      formData.append("password", state.password);
      formData.append("avatar", state.avatar);
      const response = await dispatch(createAccount(formData));
      setIsLoading(false);
      if (response?.payload?.success) {
        toast.success("Account made successfully");
        navigate("/user/profile");
      }
    } else {
      setIsLoading(false);
      return toast.error("Invalid Otp", {
        id: "invalidOtp",
      });
    }
  }

  return (
    <HomeLayout>
      <div className=" flex items-center justify-center h-[90vh]">
        <form
          onSubmit={handleSubmit(verifyOtp)}
          noValidate
          className="m-4 h-[70vh] flex flex-col  justify-center gap-3 space-y-2 rounded-lg p-4 text-white w-96 "
        >
          <h1 className="text-center font-serif underline text-xl sm:text-2xl font-bold ">
            ONE TIME PASSWORD
          </h1>

          {/* Email */}
          <div className="flex flex-col gap-1">
            <label htmlFor="otp" className="font-semibold w-full font-serif">
              OTP:
            </label>
            <input
              type="text"
              id="otp"
              name="otp"
              {...register("otp", {
                required: "OTP is required",
              })}
              placeholder="Enter 6 digit OTP."
              className="px-2 py-1 bg-transparent border"
            />
            {errors && errors?.otp && (
              <p className="text-red-500">*{errors.otp.message}*</p>
            )}
          </div>

          <div className="space-y-1 font-serif">
            <button
              disabled={isLoading}
              type="submit"
              className="bg-yellow-600 hover:bg-yellow-500 transition-all ease-in-out duration-300 w-full text-lg cursor-pointer rounded-lg py-2 font-semibold mt-2"
            >
              {isLoading ? <div className="spinner"></div> : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </HomeLayout>
  );
}
