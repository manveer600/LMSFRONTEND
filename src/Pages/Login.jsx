import { useState } from "react";
import { BsPersonAdd } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import HomeLayout from "../Layouts/HomeLayout";
import { login } from "../Redux/Slices/AuthSlice";
import { FaRegEye } from "react-icons/fa";
import { IoEyeOff } from "react-icons/io5";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

function Login() {
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  console.log("errors", errors);
  function togglePasswordVisibility() {
    setShowPassword(!showPassword);
  }

  async function onLogin(data) {
    console.log("data is this", data);
    setIsLoading(true);
    const response = await dispatch(login(data));
    if (response?.payload?.success) {
      toast.success('User LoggedIn successfully',{id:'loggIn'});
      navigate("/");
    }
    setIsLoading(false);
  }

  return (
    <HomeLayout>
      <div className=" flex items-center justify-center h-[100vh] sm:h-[90vh]">
        <form
          noValidate
          onSubmit={handleSubmit(onLogin)}
          className=" flex flex-col justify-center gap-3 space-y-2 rounded-lg p-4  text-white mt-10 sm:w-96 w-[300px] m-2 sm:shadow-[0_0_10px_black]"
        >
          <h1 className="text-center font-serif underline text-2xl font-bold ">
            Login Page
          </h1>

          {/* Email */}
          <div className="flex flex-col gap-1 ">
            <label htmlFor="email" className="font-semibold w-full font-serif">
              Email
            </label>
            <input
              type="email"
              required
              name="email"
              id="email"
              {...register("email", {
                required: "Email is required",
              })}
              placeholder="abc@gmail.com"
              className="px-2 py-1 bg-transparent border"
            />
            {errors && errors.email && (
              <p className="text-red-500">*{errors.email.message}*</p>
            )}
          </div>

          {/* Password */}
          <div className="flex flex-col gap-1 relative  ">
            <label htmlFor="password" className="font-semibold font-serif">
              Password
            </label>
            <input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              {...register("password", {
                required: "Password is required",
              })}
              placeholder="Enter your password"
              className=" px-2 py-1 bg-transparent border"
            />
            {watch("password") && (
              <button
                type="button"
                className="absolute bottom-[10px] right-5 text-red-500 font-serif hover:text-black  cursor-pointer"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? <IoEyeOff /> : <FaRegEye />}
              </button>
            )}
            {errors && errors.password && (
              <p className="text-red-500">*{errors.password.message}*</p>
            )}
          </div>

          <div className="space-y-1 font-serif">
            <button
              type="submit"
              className="bg-yellow-600 hover:bg-yellow-500 transition-all ease-in-out duration-300 w-full text-lg cursor-pointer rounded-lg py-2 font-semibold mt-2"
            >
              {isLoading ? <div className="spinner"></div> : "Login"}
            </button>
            <p className="text-center  mt-0">
              Don't have an account?{" "}
              <Link className="link text-accent cursor-pointer" to="/signup">
                Signup
              </Link>
            </p>
            <h1
              onClick={() => navigate("/user/forgotpassword")}
              className="text-center link text-accent mb-0"
            >
              Forgot Password?
            </h1>
          </div>
        </form>
      </div>
    </HomeLayout>
  );
}

export default Login;
