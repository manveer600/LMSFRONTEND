import { useDispatch, useSelector } from "react-redux";
import HomeLayout from "../Layouts/HomeLayout";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { getUserData } from "../Redux/Slices/AuthSlice";
function HomePage() {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state?.auth?.isLoggedIn);
  console.log('isLogged IN',isLoggedIn);
  console.log(typeof(isLoggedIn));

  useEffect(() => {
    (async function () {
      await dispatch(getUserData());
    })();
  }, [dispatch, isLoggedIn]);
  return (
    <HomeLayout>
      {/* main div */}
      <div className="pt-10 ">
        <div className=" flex  flex-col md:flex-row justify-center items-center">
          {/* img div */}
          <div className=" md:w-1/2 flex w-full flex-col items-center">
            <img
              className="sm:h-[600px] pl-3 sm:w-[390px] "
              src="https://res.cloudinary.com/dkyhu1iqb/image/upload/v1703235924/IMG-20230922-WA0003-removebg_1_urujqo.png"
              alt=""
            />
            <h1 className=" mt-3 font-serif text-3xl bg-black px-3 text-green-600 hover:text-red-500 cursor-pointer">
              <i>Founder</i>
            </h1>
          </div>
          {/* 2nd div */}
          <div className="p-4 font-serif md:w-1/2  text-white md:p-3 md:mr-5">
            <div className="flex gap-2 underline"></div>
            <h1 className="text-3xl md:text-5xl w-full mb-2 text-start font-serif underline text-yellow-400">
              About ME
            </h1>
            {/* heading div */}
            <h1 className="text-xl md:text-2xl text-start md:font-semibold">
              An undergrad
              <span className="text-red-500 md:font-bold font-serif">
                {" "}
                at Guru Tegh Bahadur Institute of Technology,
              </span>{" "}
              made this wonderful video streaming app where people can come and
              teach.
            </h1>

            {/* paragraph div */}
            <p className="md:text-xl text-start font-serif mt-2 text-gray-200">
              We have a large library of courses taught by highly skilled and
              qualified faculties at very affordable cost.
            </p>

            {/* div for buttons */}
            {/* if logged in */}
            {isLoggedIn == true ? (
              <div className="text-start mt-2 flex flex-row flex-wrap gap-x-2 gap-y-1 pt-4 text-white">
                <Link to="/courses">
                  <button className="bg-cyan-600 mb-3 px-5 py-3 rounded-md font-semibold text-lg cursor-pointer hover:bg-red-600 transition-all ease-in-out duration-300">
                    Explore Courses
                  </button>
                </Link>
                <Link to="/contact">
                  <button className="mb-3 px-5 py-3 rounded-md font-semibold text-lg cursor- border border-cyan-500 hover:bg-red-500 transition-all ease-in-out duration-300">
                    Contact Us
                  </button>
                </Link>
              </div>
            ) : (
              <div>
                <div className="text-start mt-2 flex flex-row flex-wrap gap-x-2 gap-y-1 text-white ">
                  <Link to="/login">
                    <button className="bg-yellow-500 px-5 py-3 rounded-md md:font-semibold md:text-lg cursor-pointer hover:bg-yellow-600 transition-all ease-in-out duration-300 mb-2">
                      Login
                    </button>
                  </Link>
                  <Link to="/signup">
                    <button className="border border-yellow-500 md:ml-4 px-5 py-3 rounded-md md:font-semibold md:text-lg cursor-pointer hover:bg-yellow-600 transition-all ease-in-out duration-300">
                      Sign Up
                    </button>
                  </Link>
                </div>
                <p className=" text-start font-serif mt-2 text-yellow-500">
                  Login/Signup{" "}
                  <span className="text-white">to view all courses</span>
                </p>
              </div>
            )}
            {/* div for buttons */}
            {/* if not logged in */}
            {/* {isLoggedIn == false && (
              <div>
                <div className="text-start mt-2 flex flex-row flex-wrap gap-x-2 gap-y-1 text-white ">
                  <Link to="/login">
                    <button className="bg-yellow-500 px-5 py-3 rounded-md md:font-semibold md:text-lg cursor-pointer hover:bg-yellow-600 transition-all ease-in-out duration-300 mb-2">
                      Login
                    </button>
                  </Link>
                  <Link to="/signup">
                    <button className="border border-yellow-500 md:ml-4 px-5 py-3 rounded-md md:font-semibold md:text-lg cursor-pointer hover:bg-yellow-600 transition-all ease-in-out duration-300">
                      Sign Up
                    </button>
                  </Link>
                </div>
                <p className=" text-start font-serif mt-2 text-yellow-500">
                  Login/Signup{" "}
                  <span className="text-white">to view all courses</span>
                </p>
              </div>
            )} */}

            <Link to="/about">
              <p className="text-start text-lg md:ml-1 mt-1  text-green-400 hover:text-red-400 link">
                About Us
              </p>
            </Link>
          </div>
        </div>
      </div>
    </HomeLayout>
  );
}

export default HomePage;
