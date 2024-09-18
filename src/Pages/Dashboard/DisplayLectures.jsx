import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import HomeLayout from "../../Layouts/HomeLayout.jsx";
import {
  deleteCourseLecture,
  getCourseLectures,
} from "../../Redux/Slices/LectureSlice.js";
function DisplayLectures() {
  const [currentVideo, setCurrentVideo] = useState(0);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { state } = useLocation();
  const lectures = useSelector((state) => state.lecture.lectures);
  const role = useSelector((state) => state.auth.role);
  console.log(role);
  async function onLectureDelete(id, lectureId, courseName, lectureName) {
    if (
      window.confirm(
        `Are you sure you want to delete the ${courseName}'s ${lectureName}`
      )
    ) {
      console.log(id, lectureId);
      await dispatch(deleteCourseLecture({ cid: id, lid: lectureId }));
      await dispatch(getCourseLectures(id));
    }
  }

  useEffect(() => {
    console.log("state is this", state);
    if (!state) navigate("/courses");
    dispatch(getCourseLectures(state._id));
  }, []);

  console.log("lectures", lectures);

  return (
    <HomeLayout>
      <div className="flex font-serif flex-col gap-10 items-center justify-center min-h-[90vh] py-10 text-wihte mx-[5%]">
        <div className="text-center mt-4  text-4xl font-serif font-semibold text-yellow-500">
          Course Name:{" "}
          <span className="text-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 ">
            {state?.title}
          </span>
        </div>

        {!lectures || lectures.length == 0 ? (
          role === "ADMIN" ? (
            <div className="text-center ">
              {" "}
              <h1 className="text-3xl text-white font-bold font-serif">
                {" "}
                No Lectures
              </h1>
              <br />
              <button
                onClick={() => {
                  navigate("/course/addLecture", { state: { ...state } });
                }}
                className="btn-primary mt-3 px-2 py-1 rounded-md font-serif font-semibold text-xl"
              >
                Add a lecture
              </button>
            </div>
          ) : (
            <div className="text-center sm:text-2xl text-white">
              <p>There are no lectures for this course.</p>
              <button onClick={() =>  navigate('/contact')} className=" mt-2 px-3 rounded-md text-black py-2 bg-yellow-400 hover:bg-yellow-600">Request a Lecture ?</button>
            </div>
          )
        ) : (
          <div className="flex flex-col lg:flex-row justify-center gap-10  w-full">
            {/* left section for playing videos and displaying course details to admin */}
            <div className="space-y-5 w-full lg:w-4/6 text-white p-2 rounded-lg shadow-[0_0_10px_black]">
              <video
                src={lectures && lectures[currentVideo]?.lecture?.secure_url}
                className="object-fill rounded-tl-lg rounded-tr-lg w-full"
                controls
                disablePictureInPicture
                muted
                controlsList="nodownload"
              ></video>
              <div>
                <h1>
                  <span className="text-yellow-500"> Title: </span>
                  {lectures && lectures[currentVideo]?.title}
                </h1>
                <p>
                  <span className="text-yellow-500 line-clamp-4">
                    Description:{" "}
                  </span>
                  {lectures && lectures[currentVideo]?.description}
                </p>
              </div>
            </div>

            {/* right section for displaying list of lectures */}
            <ul className=" lg:w-2/6 text-white p-4 rounded-lg shadow-[0_0_10px_black] space-y-4">
              <li className="font-semibold text-xl text-yellow-500 flex items-center justify-between">
                <p className="font-serif underline text-lg sm:text-xl">
                  Lectures list
                </p>
                {role === "ADMIN" && (
                  <button
                    onClick={() => {
                      console.log(state),
                        navigate("/course/addLecture", { state: { ...state } });
                    }}
                    className="btn-primary px-2 py-1 rounded-md font-serif sm:font-semibold text-xs sm:text-sm"
                  >
                    Add new lecture
                  </button>
                )}
              </li>
              {lectures &&
                lectures.map((lecture, idx) => {
                  return (
                    <li className="space-y-2" key={lecture._id}>
                      <p
                        className="cursor-pointer hover:text-yellow-400"
                        onClick={() => setCurrentVideo(idx)}
                      >
                        <span className="font-serif  text-lg sm:text-xl">
                          {" "}
                          Lecture {idx + 1} :{" "}
                        </span>
                        {lecture?.title}
                      </p>
                      {role === "ADMIN" && (
                        <button
                          onClick={() =>
                            onLectureDelete(
                              state?._id,
                              lecture?._id,
                              state?.title,
                              lecture?.title
                            )
                          }
                          className="btn-accent px-2 py-1 rounded font-semibold text-sm"
                        >
                          Delete lecture
                        </button>
                      )}
                    </li>
                  );
                })}
            </ul>
          </div>
        )}
      </div>
    </HomeLayout>
  );
}
export default DisplayLectures;
