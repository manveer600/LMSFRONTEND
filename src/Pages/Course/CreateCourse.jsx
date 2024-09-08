import { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import HomeLayout from "../../Layouts/HomeLayout";
import { createNewCourse } from "../../Redux/Slices/CourseSlice";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
export function CreateCourse() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [previewImage, setPreviewImage] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm();

  function handleImageUpload(e) {
    const uploadedImage = e.target.files[0];
    const imageUrl = URL.createObjectURL(uploadedImage);
    setPreviewImage(imageUrl);
    setValue("thumbnail", uploadedImage);
  }

  async function onFormSubmit(data) {
    console.log(data);
    if (!data.thumbnail) {
      return toast.error("Thumbnail is required.", {
        id: "thumbnailRequired",
        icon: "😶",
      });
    }
    setIsLoading(true);
    console.log("creating course", data);
    const response = await dispatch(createNewCourse(data));
    if (response?.payload?.success) {
      navigate("/courses");
      toast.success("Course made successfully.🎉", {
        icon: "🎉",
      });
    }
    setIsLoading(false);
    return;
  }

  return (
    <HomeLayout>
      <div className=" flex pt-20 items-center justify-center h-full md:h-[90vh]">
        <form
          noValidate
          className="flex flex-col  justify-center gap-5 rounded-lg p-4 pt-0 text-white w-[250px] sm:w-[500px] md:w-[700px]  shadow-[0_0_10px_black] relative"
          onSubmit={handleSubmit(onFormSubmit)}
        >
          <Link
            onClick={() => navigate(-1)}
            className="absolute top-3 text-2xl link text-accent cursor-pointer"
          >
            <AiOutlineArrowLeft />
          </Link>

          <h1 className="text-center text-2xl font-bold font-serif mt-2">
            Create New Course
          </h1>

          <main className=" sm:grid grid-cols-2 gap-x-10">
            {/* LEFT SECTION */}
            <div className="gap-y-6">
              <div>
                <label htmlFor="image_uploads" className="cursor-pointer">
                  {previewImage ? (
                    <img src={previewImage} />
                  ) : (
                    <div className="w-full h-44 m-auto flex items-center justify-center border">
                      <h1 className="font-bold text-lg pl-2 pr-2 font-serif">
                        Upload your course thumbnail
                      </h1>
                    </div>
                  )}
                </label>

                <input
                  className="hidden"
                  id="image_uploads"
                  accept=".jpg, .jpeg, .png"
                  type="file"
                  name="thumbnail"
                  onChange={handleImageUpload}
                />
              </div>

              <div className="flex mt-2 flex-col gap-1">
                <label className="text-lg font-semibold" htmlFor="title">
                  Course Title
                </label>
                <input
                  required
                  type="text"
                  name="title"
                  id="title"
                  {...register("title", {
                    required: "Title required",
                    minLength:{
                      value:4,
                      message:'Title must be 4 characters long'
                    }
                  })}
                  placeholder="Enter course title"
                  className="bg-transparent px-2 py-1 border"
                />
                {errors && errors.title && (
                  <p className="text-red-500">*{errors.title.message}*</p>
                )}
              </div>
            </div>

            {/* RIGHT SECTION */}
            <div className="">
              {/* FIRST SECTION */}
              <div className="flex flex-col gap-1">
                <label className="text-lg font-semibold" htmlFor="createdBy">
                  Course Instructor
                </label>
                <input
                  required
                  type="text"
                  name="createdBy"
                  id="createdBy"
                  {...register("createdBy", {
                    required: "Instructor Name is required",
                  })}
                  placeholder="Enter course instructor"
                  className="bg-transparent px-2 py-1 border"
                />
                {errors && errors.createdBy && (
                  <p className="text-red-500">*{errors.createdBy.message}*</p>
                )}
              </div>

              {/* SECOND SECTION */}
              <div className="flex flex-col gap-1">
                <label className="text-lg font-semibold" htmlFor="category">
                  Course Category
                </label>
                <input
                  required
                  type="text"
                  name="category"
                  id="category"
                  {...register("category", {
                    required: "Course Category is required",
                  })}
                  placeholder="Enter course category"
                  className="bg-transparent px-2 py-1 border"
                />
                {errors && errors.category && (
                  <p className="text-red-500">*{errors.category.message}*</p>
                )}
              </div>

              {/* THIRD SECTION */}
              <div className="flex flex-col gap-1">
                <label className="text-lg font-semibold" htmlFor="description">
                  Course Description
                </label>
                <textarea
                  required
                  type="text"
                  name="description"
                  id="description"
                  {...register("description", {
                    required: "Course Description is required",
                    minLength: {
                      value:20,
                      message:'Description must be atleast 20 characters long.'
                    }
                  })}
                  placeholder="Enter course description"
                  className="bg-transparent resize-none h-24  px-2 py-1 border"
                />
                {errors && errors.description && (
                  <p className="text-red-500">*{errors.description.message}*</p>
                )}
              </div>
            </div>
          </main>

          {/* BUTTON */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-2 px-1 rounded-md font-bold bg-yellow-600 hover:bg-yellow-500 transition-all ease-in-out duration-300 text-lg cursor-pointer"
          >
            {isLoading ? "Creating Course...." : "Create Course"}
          </button>
        </form>
      </div>
    </HomeLayout>
  );
}
