import { FaRegEye } from "react-icons/fa";
import { IoEyeOff } from "react-icons/io5";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import HomeLayout from "../../Layouts/HomeLayout";
import { useState } from "react";
import { resetPassword } from "../../Redux/Slices/AuthSlice";
import toast from "react-hot-toast";

export default function ResetPasswordPage() {
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const resetToken = useParams().resetToken;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  function togglePasswordVisibility() {
    setShowPassword(!showPassword);
  }
  function toggleConfirmPasswordVisibility() {
    setShowConfirmPassword(!showConfirmPassword);
  }

  async function resetPasswordFunction(data) {
    setIsLoading(true);
    const response = await dispatch(resetPassword({ ...data, resetToken }));
    setIsLoading(false);
    if (response?.payload?.success) {
      toast.success("Password Changed Successfully", {
        icon: "😁",
        id: "passwordChanged",
      });
      navigate("/login");
    }
  }

  return (
    <HomeLayout>
      <div className=" flex items-center justify-center h-[100vh] sm:h-[90vh]">
        <form
          noValidate
          onSubmit={handleSubmit(resetPasswordFunction)}
          className=" flex flex-col justify-center gap-3 space-y-2 rounded-lg p-4  text-white mt-10 sm:w-96 w-[300px] m-2 sm:shadow-[0_0_10px_black]"
        >
          <h1 className="text-center font-serif underline text-2xl font-bold ">
            Reset Password Page
          </h1>

          {/* Password */}
          <div className="flex flex-col gap-1 relative ">
            <label htmlFor="password" className="font-semibold font-serif">
              Password
            </label>
            <input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              {...register("password", {
                required: "Password is required",
                pattern: {
                  value:
                    /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/,
                  message:
                    "Password must be 6-16 characters long with at least a number and special character.",
                },
              })}
              placeholder="Enter your password"
              className="px-2 py-1 bg-transparent border"
            />
            {watch("password") && (
              <button
                type="button"
                className="absolute top-9 text-red-500 font-serif hover:text-black left-[320px] cursor-pointer"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? <IoEyeOff /> : <FaRegEye />}
              </button>
            )}
            {errors && errors.password && (
              <p className="text-red-500">*{errors.password.message}*</p>
            )}
          </div>

          {/* CONFIRM PASSWORD */}
          <div className="flex flex-col gap-1 relative ">
            <label htmlFor="password" className="font-semibold font-serif">
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              {...register("confirmPassword", {
                required: "Confirm Password is required",
                validate: (value) => {
                  if (value != getValues("password")) {
                    return "Password and Confirm Password should be same.";
                  }
                },
              })}
              placeholder="Enter your Confirm password"
              className="px-2 py-1 bg-transparent border"
            />
            {watch("confirmPassword") && (
              <button
                type="button"
                className="absolute top-9 text-red-500 font-serif hover:text-black left-[320px] cursor-pointer"
                onClick={toggleConfirmPasswordVisibility}
              >
                {showConfirmPassword ? <IoEyeOff /> : <FaRegEye />}
              </button>
            )}
            {errors && errors.confirmPassword && (
              <p className="text-red-500">*{errors.confirmPassword.message}*</p>
            )}
          </div>

          <div className="space-y-1 font-serif">
            <button
              type="submit"
              disabled={isLoading}
              className="bg-yellow-600 hover:bg-yellow-500 transition-all ease-in-out duration-300 w-full text-lg cursor-pointer rounded-lg py-2 font-semibold mt-2"
            >
              {isLoading ? "Resetting password...." : "Reset Password"}
            </button>
          </div>
        </form>
      </div>
    </HomeLayout>
  );
}
