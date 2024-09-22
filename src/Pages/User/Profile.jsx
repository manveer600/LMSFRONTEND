import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import HomeLayout from "../../Layouts/HomeLayout";
import { cancelCourseBundle } from "../../Redux/Slices/Razorpay";
import { getUserData } from "../../Redux/Slices/AuthSlice";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";

export function Profile() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state) => state?.auth?.isLoggedIn);
  const userData = useSelector((state) => state?.auth?.data);
  const role = useSelector((state) => state?.auth.role);
  const [isLoading, setIsLoading] = useState(false);

  // useEffect(() => {
  //   const fetchUserData = async () => {
  //     try {
  //       const response = await dispatch(getUserData());
  //       if (!response?.payload?.success) {
  //         console.error("Failed to fetch user data");
  //         toast.error("Failed to load profile");
  //       }
  //     } catch (error) {
  //       console.error("Error fetching user data", error);
  //       toast.error("Something went wrong");
  //     }
  //   };

  //   fetchUserData();
  // }, [dispatch]);

  async function handleCancellation() {
    if (window.confirm("Are you sure, you want to cancel the subscription?")) {
      setIsLoading(true);
      const response = await dispatch(cancelCourseBundle());
      if (response?.payload?.success) {
        toast.success(response?.payload?.message, {
          id: "cancelCourse",
          icon: "🎉",
          duration: 2000,
        });
      }
      await dispatch(getUserData());
      setIsLoading(false);
      navigate("/");
    }
  }
  return (
    <HomeLayout>
      {isLoggedIn ? (
        <div className="min-h-[90vh] border-green-600 w-full flex flex-col lg:flex-row items-center justify-center">
          {/* left div for profile picture */}
          <div className="lg:w-1/2 flex flex-col  items-center lg:items-end mt-20 mb-10 w-full p-3">
            <div>
              <img
                className="shadow-[0_0_3px_black] w-[300px] lg:w-96 rounded-xl"
                src={userData?.avatar?.secure_url}
                alt=""
              />
              <h1 className="text-white text-center mt-4 font-serif">
                <Link to={"/user/editProfile"}>
                  <button className="text-yellow-500 border p-2 hover:bg-gray-400 font-bold hover:text-black rounded-md p">
                    Edit Profile
                  </button>
                </Link>
              </h1>
            </div>
          </div>

          {/* second div */}
          <div className="lg:w-1/2  text-center  font-normal w-full text-white">
            <div className="font-bold  space-y-3 -4 border-red-600 w-full">
              <h4 className="font-serif text-2xl sm:text-4xl md:text-5xl ml-5 lg:text-start underline text-center text-yellow-500">
                Profile Information
              </h4>
              <div className=" ml-2 mr-2 text-center lg:pl-5 lg:text-start border-green-500">
                <h4 className="font-bold text-red-500 text-xl sm:text-2xl">
                  Name:{" "}
                  <span className="sm:text-xl text-green-500">
                    {userData.fullName.toUpperCase()}{" "}
                  </span>
                </h4>
                <h4 className="font-bold w-full text-xl sm:text-2xl text-red-500">
                  Email:{" "}
                  <span className=" border-yellow-500  text-lg text-green-500">
                    {" "}
                    {userData.email.toLowerCase()}
                  </span>
                </h4>
                <h4 className="font-bold text-red-500 text-xl sm:text-2xl ">
                  Role: <span className="text-green-500 ">{userData.role}</span>
                </h4>
                <h4 className=" font-bold text-red-500 text-xl sm:text-2xl ">
                  Subscription:{" "}
                  <span className=" text-green-500">
                    {role === "ADMIN" ||
                    (role === "USER" &&
                      userData?.subscription?.status === "active")
                      ? "ACTIVE"
                      : "INACTIVE"}
                    {role === "USER" ? (
                      userData?.subscription?.status === "active" ? (
                        <div
                          onClick={!isLoading ? handleCancellation : null}
                          className={`px-3 m-auto lg:mx-0 mt-2 py-2 rounded w-fit text-lg ${
                            isLoading
                              ? "bg-gray-400 cursor-not-allowed"
                              : "hover:bg-yellow-300 bg-yellow-500 cursor-pointer"
                          } text-black`}
                        >
                          {isLoading ? (
                            <div className="spinner"></div>
                          ) : (
                            "Cancel Subscription"
                          )}
                        </div>
                      ) : (
                        <div
                          onClick={() => navigate("/courses")}
                          className="px-3 m-auto lg:mx-0 mt-2 py-2 text-black rounded w-fit text-lg hover:bg-yellow-300 bg-yellow-500 cursor-pointer"
                        >
                          Buy Subscription
                        </div>
                      )
                    ) : null}
                  </span>
                </h4>
              </div>
            </div>
            <div className=" lg:text-start sm:ml-7 mt-5 text-center">
              <button
                onClick={() => navigate("/")}
                className="border border-yellow-500 hover:bg-yellow-500 hover:text-black rounded-lg px-5 py-1 font-bold"
              >
                Home
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="min-h-[90vh] border-green-600 w-full flex flex-col lg:flex-row items-center justify-center">
          <div className="text-white p-2">
            Kindly Login First to see your profile.
          </div>
        </div>
      )}
    </HomeLayout>
  );
}
