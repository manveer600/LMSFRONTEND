import { useSelector } from "react-redux";
import HomeLayout from "../../Layouts/HomeLayout";
import CourseCard from "../../Components/CourseCard";
// import FavCourseCard from '../../Components/FavCourseCard'
function FavouriteCourses() {
  const favCourses = useSelector((state) => state.favourite.favouriteCourses);
  console.log(favCourses);
  return (
    <HomeLayout>
      <div className="min-h-[90vh] pt-14 flex flex-col gap-10 text-white">
        {favCourses.length !== 0 && (
          <h1 className="text-center p-2 font-serif text-3xl font-semibold mb-5">
            My Fav {" "}
            <span className="font-bold text-yellow-500">Courses</span>
          </h1>
        )}
        {favCourses.length !== 0 && (
          <div className="mb-10 flex justify-center flex-wrap gap-14">
            {favCourses &&
              favCourses?.map((element) => {
                return <CourseCard key={element._id} data={element} />;
              })}
          </div>
        )}
        {favCourses.length === 0 && (
          <div>
            <h1 className="text-center mb-10 text-6xl font-serif text-red-400 ">
              No Fav Courses
            </h1>
            <img
              className="rounded-full m-auto mt-2"
              src="https://e7.pngegg.com/pngimages/902/706/png-clipart-computer-icons-emoticon-sadness-others-face-smiley-thumbnail.png"
              alt=""
            />
            <p className="text-center mt-10">
              <button
                onClick={() => navigate("/course/create")}
                className="text-3xl bg-yellow-600 hover:bg-yellow-500 p-3 rounded-xl font-serif"
              >
                Add Course to favourites
              </button>
            </p>
          </div>
        )}
      </div>
    </HomeLayout>
  );
}

export default FavouriteCourses;
