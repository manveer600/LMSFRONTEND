import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { addCourseLecture } from "../../Redux/Slices/LectureSlice.js";
import HomeLayout from "../../Layouts/HomeLayout";
import { AiOutlineArrowLeft } from "react-icons/ai";
function AddLecture() {
  const courseDetails = useLocation()?.state;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);

  const [userInput, setUserInput] = useState({
    id: courseDetails._id,
    lecture: undefined,
    title: "",
    description: "",
    videoSrc: "",
  });

  function handleInputChange(e) {
    const { name, value } = e.target;
    setUserInput({
      ...userInput,
      [name]: value,
    });
  }

  function handleVideo(e) {
    const video = e.target.files[0];
    const source = window.URL.createObjectURL(video);

    setUserInput({
      ...userInput,
      videoSrc: source,
      lecture: video,
    });
  }

  async function onFormSubmit(e) {
    setIsLoading(true);
    e.preventDefault();
    if (!userInput.lecture || !userInput.title || !userInput.description) {
      setIsLoading(false);
      return toast.error("All fields are mandatory", { id: "lectures" });
    }
    // const response = await dispatch(addCourseLecture(userInput));
    // let response;
    // (async function(){
    //   try {
    //     response = await dispatch(addCourseLecture(userInput));
    //     console.log('response is this', response);
    //   } catch (error) {
    //     console.error('Error uploading lecture:', error); // Log error on frontend
    //     // Display error message to user (e.g., using toast or alert)
    //   }
    // })()
    const response = await dispatch(addCourseLecture(userInput));
    setIsLoading(false);
    if (response?.payload?.success) {
      // setUserInput({
      //   id: courseDetails._id,
      //   lecture: undefined,
      //   title: "",
      //   description: "",
      //   videoSrc: "",
      // });
      navigate(-1);
    }
  }

  useEffect(() => {
    if (!courseDetails) {
      navigate("/courses");
    }
  }, [courseDetails, navigate]);

  return (
    <div>
      <HomeLayout>
        <div className="min-h-[90vh] text-white flex flex-col items-center justify-center gap-10 mx-16">
          <div className=" mt-20 underline text-3xl font-bold font-serif text-red-500 text-center ">
            {courseDetails?.title}
          </div>
          <div className="flex flex-col gap-5 p-2 shadow-[0_0_10px_black]  sm:w-96 rounded-lg">
            <header className="flex items-center justify-center relative">
              <button
                className="absolute  left-1 sm:left-2 text-xl text-green-500"
                onClick={() => navigate(-1)}
              >
                <AiOutlineArrowLeft />
              </button>
              <h1 className="text-xl text-yellow-500 font-semibold">
                Add new lecture
              </h1>
            </header>
            <form onSubmit={onFormSubmit} className="flex flex-col gap-3">
              <input
                type="text"
                name="title"
                placeholder="enter the title of the lecture"
                onChange={handleInputChange}
                className="bg-transparent px-3 py-1 border"
                value={userInput.title}
              />
              <textarea
                type="text"
                name="description"
                placeholder="enter the description of the lecture"
                onChange={handleInputChange}
                className="bg-transparent px-3 py-1 border resize-none overflow-y-scroll h-36"
                value={userInput.description}
              />
              {userInput.videoSrc ? (
                <video
                  muted
                  src={userInput.videoSrc}
                  controls
                  controlsList="nodownload nofullscreen"
                  disablePictureInPicture
                  className="object-fill rounded-tl-lg rounded-tr-lg w-full"
                ></video>
              ) : (
                <div className="h-48 border flex items-center justify-center cursor-pointer">
                  <label
                    className="font-semibold hover:text-yellow-500 text-cl cursor-pointer"
                    htmlFor="lecture"
                  >
                    Choose your video
                  </label>
                  <input
                    type="file"
                    className="hidden"
                    id="lecture"
                    name="lecture"
                    onChange={handleVideo}
                    accept="video/mp4 video/x-mp4 video/*"
                  />
                </div>
              )}

              
              <button
                type="submit"
                disabled= {isLoading}
                className="border bg-blue-900 rounded-lg py-2 font-semibold text-lg"
              >
                {isLoading ? 'Adding Lecture....' : 'Add Lecture'}
              </button>
            </form>
          </div>
          {/* <button
            onClick={() => navigate(-1)}
            className="mb-8 hover:text-red-700 px-3 sm:px-8 py-2 sm:py-3 bg-[#1A2238] border font-medium text-[#FF6A3D]"
          >
            Go Back
          </button> */}
        </div>
      </HomeLayout>
    </div>
  );
}

export default AddLecture;
