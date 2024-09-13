import { useEffect, useState } from "react";
import { BsPersonAdd } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import HomeLayout from "../Layouts/HomeLayout";
import { createAccount } from "../Redux/Slices/AuthSlice";
import { FaRegEye } from "react-icons/fa";
import { IoEyeOff } from "react-icons/io5";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";

function Signup() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm();

  const [previewImage, setPreviewImage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  function togglePasswordVisibility() {
    setShowPassword(!showPassword);
  }

  function getImage(event) {
    const uploadedImage = event.target.files[0];
    if (uploadedImage) {
      setValue("avatar", uploadedImage);
      setPreviewImage(URL.createObjectURL(uploadedImage));
    }
  }

  async function createNewAccount(data) {
    console.log('data is this', data);
    if (!data.avatar) {
      return toast.error("Profile Image is required💀", {
        id: "profile",
        duration:2000
      });
    }
    setIsLoading(true);

    const formData = new FormData();
    formData.append("fullName", data.fullName);
    formData.append("email", data.email);
    formData.append("password", data.password);
    formData.append("avatar", data.avatar);

    const response = await dispatch(createAccount(formData));
    if (response?.payload?.success) navigate("/user/profile");
    setIsLoading(false);
  }

  return (
    <HomeLayout>
      <div className="flex items-center justify-center sm:h-[90vh]">
        <form
          noValidate
          onSubmit={handleSubmit(createNewAccount)}
          className=" mt-14 flex flex-col  justify-center gap-3 space-y-2 rounded-lg p-4 text-white  sm:w-96 sm:shadow-[0_0_10px_black]"
        >
          <h1 className="text-center text-2xl font-bold font-serif underline ">Registration Page</h1>

          {/* Image Uploading */}
          <div>
            <label htmlFor="avatar" className="cursor-pointer">
              {previewImage ? (
                <img
                  className="w-24 h-24 rounded-full m-auto"
                  src={previewImage}
                  alt="profileImage"
                />
              ) : (
                <BsPersonAdd className="w-24 h-24 border-8 rounded-full m-auto" />
              )}
            </label>
            <input
              type="file"
              onChange={getImage}
              className="hidden"
              id="avatar"
            />
          </div>

          {/* Name */}
          <div className="flex flex-col gap-1">
            <label htmlFor="fullName" className="font-semibold font-serif">
              Full Name
            </label>
            <input
              type="text"
              name="fullName"
              id="fullName"
              {...register("fullName", {
                required: "Full Name is required",
                minLength: {
                  value: 4,
                  message: "Full name should be at least 4 characters long.",
                },
              })}
              placeholder="Enter your Full Name"
              className="px-2 py-1 bg-transparent border"
            />
            {errors?.fullName && (
              <p className="text-red-500">*{errors?.fullName?.message}*</p>
            )}
          </div>

          {/* Email */}
          <div className="flex flex-col gap-1 ">
            <label htmlFor="email" className="font-semibold font-serif">
              Email
            </label>
            <input
              type="text"
              name="email"
              id="email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: "Email not valid",
                },
              })}
              placeholder="abc@gmail.com"
              className="px-2 py-1 bg-transparent border"
            />
            {errors?.email && (
              <p className="text-red-500">*{errors?.email?.message}*</p>
            )}
          </div>

          {/* Password */}
          <div className="flex flex-col relative gap-1">
            <label htmlFor="password" className="font-semibold font-serif">
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              id="password"
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
                className="absolute right-2 top-9 text-center text-red-500 hover:text-black cursor-pointer"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? <IoEyeOff /> : <FaRegEye />}
              </button>
            )}

            {errors?.password && (
              <p className="text-red-500">*{errors?.password?.message}*</p>
            )}
          </div>

          {/* Button To Create an Account */}
          <button
            type="submit"
            disabled={isLoading}
            className="bg-yellow-600 hover:bg-yellow-500 transition-all ease-in-out duration-300  text-lg cursor-pointer rounded-lg py-2 font-semibold mt-2 font-serif "
          >
            {isLoading ? <div className="spinner"></div> : "Create Account"}
          </button>
          <p className="text-center font-serif">
            Account already exists ?{" "}
            <Link className="link text-accent cursor-pointer" to="/login">
              Login
            </Link>
          </p>
        </form>
      </div>
    </HomeLayout>
  );
}

export default Signup;
