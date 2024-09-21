import { useDispatch, useSelector } from "react-redux";
import { getAllCourses } from "../../Redux/Slices/CourseSlice";
import { useEffect, useState } from "react";
import HomeLayout from "../../Layouts/HomeLayout";
import CourseCard from "../../Components/CourseCard";
import { useNavigate } from "react-router-dom";
import notFound from "../../assets/notFound.png";
export default function FavouriteCourseList() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = useSelector((state) => state?.auth?.data);
  const role = useSelector((state) => state?.auth?.data?.role);
  const [searchTerm, updateSearchTerm] = useState("");
  const courses = useSelector((state) => state?.course?.courseData);
  const coursesNeeded = courses.filter((cou) => {
    return cou.favCourse.some((favCou) => {
      return favCou.userId === userData._id && favCou.value == true;
    });
  });

  console.log("MUCH NEEDED COURSES", coursesNeeded);
  async function getCourse(e) {
    updateSearchTerm(e.target.value);
  }

  useEffect(() => {
    dispatch(getAllCourses({ title: searchTerm }));
  }, [searchTerm]);

  return (
    <HomeLayout>
      <div className="min-h-[90vh] pt-14 flex flex-col text-white">
        {coursesNeeded.length !== 0 && (
          <div>
            <div className="flex text-center flex-col justify-center items-center">
              <h1 className=" p-2  font-serif text-3xl text-yellow-500 underline font-semibold ">
                Your Favourite Courses.
              </h1>
            </div>
          </div>
        )}

        <div className="text-center  p-4">
          <label className="text-xl" htmlFor="search">
            Seach Your Fav Course:{" "}
          </label>
          <input
            className="px-2 bg-transparent border rounded-sm"
            placeholder="Search your fav Course"
            onChange={getCourse}
          />
        </div>

        {coursesNeeded.length != 0 && (
          <div className="p-4 mb-10 flex justify-center flex-wrap gap-14">
            {coursesNeeded?.map((element) => {
              return element ? (
                <CourseCard key={element._id} data={element} />
              ) : null;
            })}
          </div>
        )}

        {coursesNeeded.length == 0 && (
          <div>
            <h1 className="text-center mb-10 text-6xl font-serif underline text-red-400 ">
              No Courses
            </h1>
            <img
              className="rounded-full w-[250px] m-auto"
              src={notFound}
              alt=""
            />
            <p className="text-center mt-10">
              <button
                onClick={() => navigate("/courses")}
                className="text-3xl bg-yellow-600 hover:bg-yellow-500 p-2 rounded font-serif"
              >
                All Courses.
              </button>
            </p>
          </div>
        )}
      </div>
    </HomeLayout>
  );
}
