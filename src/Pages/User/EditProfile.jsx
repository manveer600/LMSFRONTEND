import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserData, updateProfile } from "../../Redux/Slices/AuthSlice";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import HomeLayout from "../../Layouts/HomeLayout";
import { BsPersonCircle } from "react-icons/bs";
import { AiOutlineArrowLeft } from "react-icons/ai";
export function EditProfile() {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [data, setData] = useState({
    fullName: "",
    previewImage: "",
    avatar: undefined,
  });

  function handleImageUpload(e) {
    e.preventDefault();
    const uploadedImage = e.target.files[0];

    if (uploadedImage) {
      const imageUrl = URL.createObjectURL(uploadedImage);
      setData({
        ...data,
        previewImage: imageUrl,
        avatar: uploadedImage,
      });
    }
  }

  function handleInputChange(e) {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  }

  async function onFormSubmit(e) {
    setIsLoading(true);
    e.preventDefault();
    if (!data.fullName && !data.avatar) {
      return toast.error(
        "Please provide atleast a profile picture or a Full Name to update.",
        {
          id: "updateProfile",
          icon: "😞",
        }
      );
    }
    if (data.fullName && data.fullName.length < 5) {
      return toast.error("Name must be atleast 5 characters long.", {
        id: "longName",
        icon: "😕",
      });
    }

    const formData = new FormData();
    if (data.fullName) formData.append("fullName", data.fullName);
    if (data.avatar) formData.append("avatar", data.avatar);
    console.log("data is this", data);

    const response = await dispatch(updateProfile(formData));
    if (response?.payload?.success) {
      const res = await dispatch(getUserData());
      if (res?.payload?.success) {
        navigate("/user/profile");
        return toast.success("Profile Updated Successfully", {
          id: "profileUpdated",
        });
      }
    }
    setIsLoading(false);
  }

  return (
    <HomeLayout>
      <div className="flex items-center justify-center min-h-[90vh]">
        <form
          noValidate
          onSubmit={onFormSubmit}
          className="flex mt-14 flex-col justify-center gap-5 rounded-lg p-4 text-white sm:w-80 min-h-[26rem] shadow-[0_0_10px_black]"
        >
          <h1 className="text-center text-2xl font-semibold font-serif">
            Edit profile
          </h1>

          {/* IMAGE UPLOADING */}
          <label htmlFor="image_uploads" className="cursor-pointer">
            {data.previewImage ? (
              <img
                className="w-28 h-28 rounded-full m-auto"
                src={data.previewImage}
                alt=""
              />
            ) : (
              <BsPersonCircle className="w-28 h-28 rounded-full m-auto" />
            )}
          </label>
          <input
            type="file"
            className="hidden"
            onChange={handleImageUpload}
            id="image_uploads"
            name="image_uploads"
            accept=".jpg, .png, .svg, .jpeg"
          />

          {/* UPDATING THE FULL NAME */}
          <div className="flex flex-col gap-1">
            <label htmlFor="fullName" className="text-lg font-semibold">
              Full Name
            </label>

            <input
              onChange={handleInputChange}
              required
              type="text"
              name="fullName"
              value={data.fullName}
              id="fullName"
              placeholder="Enter your name"
              className="bg-transparent border px-2 py-1"
            />
          </div>

          {/* button to submit the form */}
          <button
            type="submit"
            disabled={isLoading}
            className="bg-yellow-600 hover:bg-yellow-500 transition-all ease-in-out duration-300 rounded-sm font-bold cursor-pointer py-2"
          >
            {isLoading ? "Updating Profile...." : "Update Profile"}
          </button>
          <Link to="/user/profile">
            <p className="flex items-center justify-center gap-2 link text-accent cursor-pointer ">
              <AiOutlineArrowLeft />
              Go back to home
            </p>
          </Link>
        </form>
      </div>
    </HomeLayout>
  );
}
