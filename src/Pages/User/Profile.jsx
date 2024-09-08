import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import HomeLayout from "../../Layouts/HomeLayout";
import {
  cancelCourseBundle,
  purchaseCourseBundle,
} from "../../Redux/Slices/Razorpay";
import { getUserData } from "../../Redux/Slices/AuthSlice";
import toast from "react-hot-toast";

export function Profile() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = useSelector((state) => state?.auth?.data);
  const role = useSelector((state) => state?.auth.role);
  async function handleCancellation() {
    console.log("handling cancellation");
    await dispatch(cancelCourseBundle());
    await dispatch(getUserData());
    toast.success("Cancellation completed!!");
    navigate("/");
  }
  async function buySubscription() {
    navigate("/checkout");
  }
  return (
    <HomeLayout>
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
                </span>
              </h4>
            </div>
          </div>
          <div className="text-start ml-7 mt-5">
          <button onClick={() => navigate('/')} className="border border-yellow-500 hover:bg-yellow-500 hover:text-black rounded-lg px-3 py-1">Home</button>
          </div>
          
        </div>

        {/* {userData.subscription.status === "active" && (
          <button 
            onClick={handleCancellation}
            className="border text-white lg:hidden bg-red-600 hover:bg-green-600 hover:text-black transition-all ease-in-out duration-300 rounded-md font-semibold p-2 cursor-pointer text-center"
          >
            Cancel Subscription
          </button>
        )} */}
      </div>
    </HomeLayout>
  );
}
