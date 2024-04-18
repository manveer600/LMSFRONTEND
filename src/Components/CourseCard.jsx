import { useNavigate } from "react-router-dom";
import { deleteCourse, getAllCourses } from "../Redux/Slices/CourseSlice";
import { useDispatch, useSelector } from "react-redux";
import { IoIosHeart } from "react-icons/io";
import {
  addToFavourites,
  getAllFavCourses,
  removeFromFavourites,
} from "../Redux/Slices/FavouriteCourseReducer";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";

function CourseCard({ data }) {
  function getFavCoursesFromLocal() {
    const favCourses = localStorage.getItem("favouriteCourses");
    return favCourses ? JSON.parse("favCourses") : [];
    // console.log("favCourses", favCourses);
  }

  const [favCourses, setFavCourses] = useState(getFavCoursesFromLocal());
  console.log("data is", data);
  const dispatch = useDispatch();
  const userData = useSelector((state) => state?.auth?.data);
  const courses = useSelector((state) => state?.course?.courseData);
  const navigate = useNavigate();
  console.log("courses", courses);
  async function handleDeleteCourse() {
    if (window.confirm(`Are you sure you want to delete ${data.title} course?`)) {
      console.log(data);
      await dispatch(deleteCourse(data._id));
      await dispatch(getAllCourses());
    }
  }

  async function addCoursesToFavourites() {
    // let favourite = localStorage.getItem('favourite');
    // console.log(typeof(favourite));
    // const favBool = JSON.parse(favourite);
    // console.log(typeof(favBool));
    // console.log(favBool);
    // if(favBool === false){
    //   console.log('bhai chal jaa');
    //   // favourite me add krdoh
    //   const res = await dispatch(addToFavourites(data._id));
    //   if(res?.payload?.success){
    //     toast.success(`${data.title} added to favourites`);
    //   }
    // }
    // else if(favBool === true){
    //   // remove from favourites
    //   try{
    //     const response = await dispatch(removeFromFavourites(data._id));
    //     await dispatch(getAllFavCourses());
    //     console.log('kuch toh chahta hoon', response);
    //     if(response?.payload?.success){
    //       toast.success(`Removed ${data.title} from favourites`);
    //     }
    //   }catch(e){
    //     console.log(e);
    //   }

    // }
    // const favBoolReverse = !favBool;
    // const favBoolString = JSON.stringify(favBoolReverse);
    // localStorage.setItem("favourite", favBoolString);

    const updatedFavorites = [...favCourses, data];
    setFavCourses(updatedFavorites);
    localStorage.setItem("favoriteCourses", JSON.stringify(updatedFavorites));
  }
  // manveer make function to get favorites from local storage like this
  // const getFavoritesFromLocal = () => {
  //   const favorites = localStorage.getItem('favoriteCourses');
  //   return favorites ? JSON.parse(favorites) : [];
  // };

  // function CourseCard({ data }) {
  //  //create a state .. .
  //   const [favoriteCourses, setFavoriteCourses] = useState(getFavoritesFromLocal());

  //   const addCourseToFavorites = () => {
  //     const updatedFavorites = [...favoriteCourses, data];
  //     setFavoriteCourses(updatedFavorites);
  //     localStorage.setItem('favoriteCourses', JSON.stringify(updatedFavorites));
  //   };

  return (
    <div className="relative">
      <div
        onClick={() => navigate("/course/description", { state: { ...data } })}
        className="text-white w-[250px] p-4 sm:w-[20rem] md:w-[22rem] h-[440px]  rounded-lg cursor-pointer  overflow-hidden bg-zinc-700 relative "
      >
        <div className="overflow-hidden">
          <img
            className="rounded-tl-lg rounded-tr-lg group-hover:scale=[1,2] transition-all ease-in-out diration-300"
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
            className="p-2 bg-red-600 absolute m-auto bottom-4 left-6 font-serif hover:bg-red-500 rounded-lg"
            onClick={handleDeleteCourse}
          >
            Delete Course
          </button>
        </p>
      )}
      
    </div>
  );
}

export default CourseCard;
