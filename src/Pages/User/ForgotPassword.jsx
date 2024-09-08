import { useState } from "react";
import HomeLayout from "../../Layouts/HomeLayout";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { forgetPassword } from "../../Redux/Slices/AuthSlice";
import toast from "react-hot-toast";
function ForgotPassword() {
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  async function forgotPassword(data) {
    console.log("data is this", data);
    setIsLoading(true);
    const sendResetPasswordWindow = await dispatch(forgetPassword(data));
    setIsLoading(false);
    if (sendResetPasswordWindow?.payload?.success) {
      toast.success('Kindly Check Your Inbox.😁', {
        id:'emailSent',
        duration:3000
      })
    }
  }
  console.log("errors", errors);
  return (
    <HomeLayout>
      <div className=" flex items-center justify-center h-[90vh]">
        <form
          onSubmit={handleSubmit(forgotPassword)}
          noValidate
          className="m-4 h-[70vh] flex flex-col  justify-center gap-3 space-y-2 rounded-lg p-4 text-white w-96 sm:shadow-[0_0_10px_black]"
        >
          <h1 className="text-center font-serif underline text-xl sm:text-2xl font-bold ">
            Forgot Password Page
          </h1>

          {/* Email */}
          <div className="flex flex-col gap-1">
            <label htmlFor="email" className="font-semibold w-full font-serif">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: "Email is not valid",
                },
              })}
              placeholder="abc@gmail.com"
              className="px-2 py-1 bg-transparent border"
            />
            {errors && errors?.email && (
              <p className="text-red-500">*{errors.email.message}*</p>
            )}
          </div>

          <div className="space-y-1 font-serif">
            <button
              disabled={isLoading}
              type="submit"
              className="bg-yellow-600 hover:bg-yellow-500 transition-all ease-in-out duration-300 w-full text-lg cursor-pointer rounded-lg py-2 font-semibold mt-2"
            >
              {isLoading ? "Sending Code...." : "Send Code"}
            </button>
          </div>
        </form>
      </div>
    </HomeLayout>
  );
}

export default ForgotPassword;
