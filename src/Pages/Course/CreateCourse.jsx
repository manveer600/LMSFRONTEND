import { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import HomeLayout from "../../Layouts/HomeLayout";
import { createNewCourse } from "../../Redux/Slices/CourseSlice";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { Link } from "react-router-dom";
export function CreateCourse() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [userInput, setUserInput] = useState({
    title: "",
    description: "",
    category: "",
    thumbnail: "",
    createdBy: "",
    previewImage: "",
  });

  function handleImageUpload(e) {
    e.preventDefault();

    const uploadedImage = e.target.files[0];
    console.log("uploaded image is:", uploadedImage);
    const imageUrl = URL.createObjectURL(uploadedImage);
    console.log("uploaded image ko url me convert krne k baad", imageUrl);
    if (uploadedImage) {
      setUserInput({
        ...userInput,
        thumbnail: uploadedImage,
        previewImage: imageUrl,
      });
    }
  }

  function handleUserInput(e) {
    const { name, value } = e.target;
    setUserInput({ ...userInput, [name]: value });
  }

  async function onFormSubmit(e) {
    e.preventDefault();

    if (
      !userInput.title ||
      !userInput.description ||
      !userInput.category ||
      !userInput.thumbnail ||
      !userInput.createdBy
    ) {
        return toast.error("All fields are mandatory");
      
    }

    const response = await dispatch(createNewCourse(userInput));
    console.log(response);
    console.log("response ka payload ka success", response?.payload?.success );
    if (response?.payload?.success){
        setUserInput({
            title: "",
            category: "",
            createdBy: "",
            description: "",
            thumbnail: null,
            previewImage: ""
        });
        navigate("/courses");
    }
  }

  return (
    <HomeLayout>
      <div className=" flex pt-20 items-center justify-center h-full md:h-[90vh]">
        <form noValidate
          className="flex flex-col border justify-center gap-5 rounded-lg p-4 pt-0 text-white w-[250px] sm:w-[500px] md:w-[700px]  shadow-[0_0_10px_black] relative"
          onSubmit={onFormSubmit}
        >
          <Link className="absolute top-3 text-2xl link text-accent cursor-pointer">
            <AiOutlineArrowLeft />
          </Link>

          <h1 className="text-center text-2xl font-bold font-serif mt-2">Create New Course</h1>

          <main className=" sm:grid grid-cols-2 gap-x-10">
            {/* LEFT SECTION */}
            <div className="gap-y-6">
              <div>
                <label htmlFor="image_uploads" className="cursor-pointer">
                  {userInput.previewImage ? (
                    <img src={userInput.previewImage} />
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
                  name="image_uploads"
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
                  placeholder="Enter course title"
                  className="bg-transparent px-2 py-1 border"
                  value={userInput.title}
                  onChange={handleUserInput}
                />
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
                  placeholder="Enter course instructor"
                  className="bg-transparent px-2 py-1 border"
                  value={userInput.createdBy}
                  onChange={handleUserInput}
                />
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
                  placeholder="Enter course category"
                  className="bg-transparent px-2 py-1 border"
                  value={userInput.category}
                  onChange={handleUserInput}
                />
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
                  placeholder="Enter course description"
                  className="bg-transparent resize-none h-24  px-2 py-1 border"
                  value={userInput.description}
                  onChange={handleUserInput}
                />
              </div>

            </div>
          </main>


          {/* BUTTON */}
          <button type="submit" className="w-full py-2 px-1 rounded-md font-bold bg-yellow-600 hover:bg-yellow-500 transition-all ease-in-out duration-300 text-lg cursor-pointer">Create Course</button>
        </form>
      </div>
    </HomeLayout>
  );
}






