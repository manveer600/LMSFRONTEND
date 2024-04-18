import { useState } from "react";
import { BsPersonAdd } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from "react-hot-toast";
import HomeLayout from "../Layouts/HomeLayout";
import { createAccount } from "../Redux/Slices/AuthSlice";
import { isEmailValid, isPasswordValid } from "../Helpers/regexMatcher";
import { FaRegEye } from "react-icons/fa";
import { IoEyeOff } from "react-icons/io5";




function Signup() {
  const [previewImage, setPreviewImage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();


  const [signupData, setsignupData] = useState({
    fullName: "",
    email: "",
    password: "",
    avatar: "",
  });

  function handleUserInput(e) {
    const { name, value } = e.target;
    setsignupData({
      ...signupData,
      [name]: value,
    });
  }


  function togglePasswordVisibility(){
    setShowPassword(!showPassword);
  }
  function getImage2(event) {
    event.preventDefault();

    const uploadedImage = event.target.files[0];
    if (uploadedImage) {
      setsignupData({
        ...signupData,
        avatar: uploadedImage,
      });
      setPreviewImage(URL.createObjectURL(uploadedImage));
    }
  }

  async function createNewAccount(event) {
    event.preventDefault();

    if (
      !signupData.email ||
      !signupData.password ||
      !signupData.fullName ||
      !signupData.avatar
    ) {
      return toast.error("Please fill all the details");
    }

    if (signupData.fullName.length < 4) {
      return toast.error("Name should be atleast 4 characters long");
    }

    // checking valid email id
    if (!isEmailValid(signupData.email)) {
      return toast.error("Invalid Email Id");
    }

    // checking valid password
    if (!isPasswordValid(signupData.password)) {
      return toast.error(
        "Password must be atleast 6-16 characters long with atleast a number and special character"
      );
    }

    const formData = new FormData();
    formData.append("fullName", signupData.fullName);
    formData.append("email", signupData.email);
    formData.append("password", signupData.password);
    formData.append("avatar", signupData.avatar);

    // dispatch create account action
    const response = await dispatch(createAccount(formData));
    if (response?.payload?.success) navigate("/user/profile");

    setsignupData({
        fullName:"",
        email:"",
        password:"",
        avatar:""
    });

    setPreviewImage("");
  }

  return (
    <HomeLayout>
      <div className=" flex items-center justify-center sm:h-[90vh]">
        <form
          noValidate
          onSubmit={createNewAccount}
          className=" mt-14 flex flex-col  justify-center gap-3 space-y-2 rounded-lg p-4 text-white w-[250px] sm:w-96 shadow-[0_0_10px_black]"
        >
          <h1 className="text-center text-2xl font-bold ">Registration Page</h1>

          {/* Image Uploading */}
          <label htmlFor="image_uploads" className="cursor-pointer">
            {previewImage ? (
              <img
                className="w-24 h-24 rounded-full m-auto"
                src={previewImage}
                alt=""
              />
            ) : (
              <BsPersonAdd className="w-24 h-24 border-8 rounded-full m-auto" />
            )}
          </label>

          <input
            onChange={getImage2}
            type="file"
            className="hidden"
            id="image_uploads"
            name="image_uploads"
            accept=".jpg, .jpeg, .png, .svg"
          />

          {/* Name */}
          <div className="flex flex-col gap-1">
            <label htmlFor="fullName" className="font-semibold">
              Full Name
            </label>
            <input
              type="fullName"
              required
              name="fullName"
              id="fullName"
              placeholder="Enter your Full Name"
              className="px-2 py-1 bg-transparent border"
              onChange={handleUserInput}
              value={signupData.fullName}
            />
          </div>

          {/* Email */}
          <div className="flex flex-col gap-1">
            <label htmlFor="email" className="font-semibold w-full">
              Email
            </label>
            <input
              type="email"
              required
              name="email"
              id="email"
              placeholder="abc@gmail.com"
              className="px-2 py-1 bg-transparent border"
              onChange={handleUserInput}
              value={signupData.email}
            />
          </div>

          {/* Password */}
          <div className="flex flex-col gap-1">
            <label htmlFor="password" className="font-semibold">
              Password
            </label>
            <input
              type={showPassword ? 'text':'password'}
              required
              name="password"
              id="password"
              placeholder="Enter your password"
              className="px-2 py-1 bg-transparent border"
              onChange={handleUserInput}
              value={signupData.password}
            />
            {signupData.password && <button
            type="button"
            className="relative bottom-7 text-red-500 font-serif hover:text-black left-[320px] cursor-pointer"
            onClick={togglePasswordVisibility}
          >
            {showPassword ? <IoEyeOff/> : <FaRegEye/> }
          </button>}
          </div>

          {/* Button To Create an Account */}
          <button
            type="submit"
            className="bg-yellow-600 hover:bg-yellow-500 transition-all ease-in-out duration-300  text-lg cursor-pointer rounded-lg py-2 font-semibold mt-2"
          >
            Create Account
          </button>
          <p className="text-center">
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
