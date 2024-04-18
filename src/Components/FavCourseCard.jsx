import { useNavigate } from "react-router-dom";
import { deleteCourse, getAllCourses } from "../Redux/Slices/CourseSlice";
import { useDispatch, useSelector } from "react-redux";
import { IoIosHeart } from "react-icons/io";
import { addToFavourites } from "../Redux/Slices/FavouriteCourseReducer";
import toast from "react-hot-toast";

function CourseCard({ data }) {
  console.log("data is", data);
  const dispatch = useDispatch();
  const userData = useSelector((state) => state?.auth?.data);
  const courses = useSelector((state) => state?.course?.courseData);
  const navigate = useNavigate();
  console.log("courses", courses);
  async function handleDeleteCourse() {
    if (window.confirm(`Are you sure you want to delete ${data.title}?`)) {
      console.log(data);
      await dispatch(deleteCourse(data._id));
      await dispatch(getAllCourses());
    }
  }

  async function addCoursesToFavourites() {
    const res = await dispatch(addToFavourites(data._id));
    console.log('ab yahan pe bhi 1 response aa rha h', res);
    if(res?.payload?.success){
      toast.success(`${data.title} added to favourites`);
    }
  }

  return (
    <div className="relative">
      <div
        onClick={() => navigate("/course/description", { state: { ...data } })}
        className="text-white w-[18rem] sm:w-[20rem] md:w-[22rem] h-[440px]  rounded-lg cursor-pointer  overflow-hidden bg-zinc-700 relative border"
      >
        <div className="overflow-hidden">
          <img
            className="h-48 w-full rounded-tl-lg rounded-tr-lg group-hover:scale=[1,2] transition-all ease-in-out diration-300"
            src={data?.thumbnail?.secure_url}
            alt="course thumbnail"
          />
          <div className="p-3 space-y-1 text-white">
            <h2 className="text-xl font-bold text-yellow-500 line-clamp-2">
              {data?.title}
            </h2>
            <p className="line-clamp-2">{data?.description}</p>
            <p className="font-semibold">
              <span className="text-yellow-500 font-bold">Category : </span>
              {data?.category}
            </p>
            <p className="font-semibold">
              <span className="text-yellow-500 font-bold">
                Total lectures :{" "}
              </span>
              {data?.numberOfLectures}
            </p>
            <p className="font-semibold">
              <span className="text-yellow-500 font-bold">Instructor : </span>
              {data?.createdBy}
            </p>
          </div>

        </div>
      </div>

      {userData?.role === "ADMIN" && (
        <p className="mt-2 text-center space-x-2">
          <button
            className="p-2 bg-red-600 font-serif hover:bg-red-500 rounded-lg"
            onClick={handleDeleteCourse}
          >
            Delete Course
          </button>
        </p>
      )}
      {userData?.role === "USER" && (
        <IoIosHeart
          onClick={addCoursesToFavourites}
          className="absolute bottom-2 hover:text-red-600 left-2 w-10 h-10"
        />
      )}
    </div>
  );
}

export default CourseCard;
