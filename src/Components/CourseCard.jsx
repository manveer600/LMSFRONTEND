import { useNavigate } from "react-router-dom";
import {
  deleteCourse,
  getCourses,
  updateCourse,
} from "../Redux/Slices/CourseSlice";
import { useDispatch, useSelector } from "react-redux";
import { IoIosHeart } from "react-icons/io";
import { CiHeart } from "react-icons/ci";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { getUserData } from "../Redux/Slices/AuthSlice";
function CourseCard({ data }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // console.log("course card", data);

  const isLoggedIn = useSelector((state) => state?.auth?.isLoggedIn);
  const userData = useSelector((state) => state?.auth?.data);
  const courses = useSelector((state) => state?.course?.courseData);

  const [favCourse, setIsFavCourse] = useState({
    courseId: data._id,
    userId: userData._id,
    fav: currentFavCourseVal() || false,
  });

  console.log('FAV COURSE INITIALLY', favCourse);

  function currentFavCourseVal() {
    try {
      const courseIndex = courses.findIndex((cou) => cou._id == data._id);
      console.log("courseIndex is this", courseIndex);
      const favCourseArray = courses[courseIndex].favCourse;
      const favCourseIndex = favCourseArray.findIndex(
        (favCou) => favCou.userId.toString() == userData._id.toString()
      );
      console.log('favcourseindex', favCourseIndex, " ", courseIndex);
      console.log('jo mujhe chahiye',favCourseArray[favCourseIndex].value);
      return favCourseArray[favCourseIndex].value;
    } catch (error) {
      console.log("error while updating fav course", error);
      return false;
    }
  }

  async function handleDeleteCourse() {
    if (
      window.confirm(`Are you sure you want to delete ${data.title} course?`)
    ) {
      await dispatch(deleteCourse(data._id));
      await dispatch(getCourses());
    }
  }

  async function updateFavCourse(e, data) {
    e.stopPropagation();
    if (!isLoggedIn) {
      return toast.error("Kindly login to mark a course as favorite.", {
        id: "favCourse",
      });
    }
    const response = await dispatch(updateCourse(data._id));
    // console.log(response);
    if (response?.payload?.success) {
      setIsFavCourse({
        courseId: response?.payload?.data?._id,
        userId: response?.payload?.favCourseData?.userId,
        fav: response?.payload?.favCourseData?.value,
      });
    }
  }

  useEffect(() => {
    (async function instant() {
      await dispatch(getUserData());
    })();
  }, [dispatch]);

  // console.log("favCourse", favCourse);
  return (
    // <div className="relative">
    <div className="text-white relative  p-2 w-[22rem] rounded-lg cursor-pointer  overflow-hidden bg-zinc-700">
      <div
        className="overflow-hidden "
        onClick={() => navigate("/course/description", { state: { ...data } })}
      >
        <img
          className="rounded-tl-lg h-[12rem] w-full rounded-tr-lg group-hover:scale=[1,2] transition-all ease-in-out diration-300"
          src={data?.thumbnail?.secure_url}
          alt="course thumbnail"
        />
        <div className="p-3 space-y-1 text-white">
          <h2 className="text-xl font-bold text-yellow-500 line-clamp-2">
            {data?.title}
            {isLoggedIn &&
              data._id == favCourse.courseId &&
              userData._id == favCourse.userId &&
              (favCourse.fav == false ? (
                <CiHeart
                  className="inline h-7 w-7"
                  onClick={(e) => updateFavCourse(e, data)}
                />
              ) : (
                <IoIosHeart
                  className="inline h-7 w-7"
                  onClick={(e) => updateFavCourse(e, data)}
                />
              ))}
          </h2>
          <p className=" truncate">{data?.description}</p>
          <p className="font-semibold">
            <span className="text-yellow-500 font-bold">Category : </span>
            {data?.category}
          </p>
          <p className="font-semibold">
            <span className="text-yellow-500 font-bold">Total lectures : </span>
            {data?.numberOfLectures}
          </p>
          <p className="font-semibold">
            <span className="text-yellow-500 font-bold">Instructor : </span>
            {data?.createdBy}
          </p>
        </div>
      </div>
      {userData?.role === "ADMIN" && (
        <button
          className="p-2 ml-3 bg-red-600 m-auto px-4 font-serif hover:bg-red-500 rounded-lg"
          onClick={handleDeleteCourse}
        >
          Delete Course
        </button>
      )}
    </div>
  );
}

export default CourseCard;
