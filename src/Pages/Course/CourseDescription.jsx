import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import HomeLayout from "../../Layouts/HomeLayout";

function CourseDescription() {
  const navigate = useNavigate();
  const { state } = useLocation();

  const { role, data } = useSelector((state) => state.auth);
  const isLoggedIn = useSelector((state) => state?.auth.isLoggedIn);
  // function moveToCheckOut(){
  //   if(isLoggedIn == true){
  //     navigate("/checkout");
  //   }
  //   else{
  //     return toast.error('Kindly Log in before you purchase a course', {
  //       id:'login',
  //     })
  //   }
  // }

  return (
    <HomeLayout>
      <div className="min-h-[90vh] w-[100vw] pt-12 px-20 flex flex-col items-center justify-center text-white">
        <div className="flex  w-[100vw] flex-col sm:space-x-2 sm:flex-row">
          <div className="pt-4 mb-5 sm:ml-6 sm:w-1/2 flex flex-col justify-center items-center space-y-2 sm:items-end">
            <img
              className="p-4  sm:w-[390px] mb-4 sm:w-42 md:h-64"
              alt="thumbnail"
              src={state?.thumbnail?.secure_url}
            />

            <div className="font-serif  sm:w-full md:w-[390px] flex flex-col items-center justify-between text-xl">
              <p className="font-semibold">
                <span className="text-yellow-500 underline font-bold">
                  Total lectures
                </span>
                : {state?.numberOfLectures}
              </p>

              <p className="sm:font-semibold p-2">
                <span className="text-yellow-500 font-bold underline ">
                  Instructor
                </span>
                : {state?.createdBy}
              </p>
              <p className="sm:font-semibold p-2">
                <span className="text-yellow-500 font-bold underline">
                  Category
                </span>
                : {state?.category}
              </p>

              {role === "ADMIN" || data?.subscription?.status === "active" ? (
                <button
                  onClick={() =>
                    navigate("/course/displayLectures", {
                      state: { ...state },
                    })
                  }
                  className="bg-yellow-600 text-xl sm:text-2xl rounded-md font-bold px-5 py-3 hover:bg-yellow-500 transition-all ease-in-out duration-300"
                >
                  Watch lectures
                </button>
              ) : (
                <button
                  onClick={() => navigate("/checkout")}
                  className="bg-yellow-600 sm:w-[300px] text-xl rounded-md font-bold px-5 font-serif py-3 hover:bg-yellow-500 transition-all ease-in-out duration-300"
                >
                  Subscribe
                </button>
              )}
            </div>
          </div>

          <div className="sm:w-1/2 flex flex-col space-y-5 pt-10 pr-4">
            <div className="flex flex-col">
              <i className="text-xl sm:text-2xl font-serif font-bold text-center sm:text-start text-yellow-500 underline ">
                Course Name:
              </i>
              <i className="text-center text-xl sm:text-[35px] font-serif sm:text-start">
                {state?.title}
              </i>
            </div>
            <div className="flex flex-col">
              <i className="text-xl sm:text-2xl font-serif font-bold text-center sm:text-start text-yellow-500  underline">
                Course description:
              </i>
              <i className="text-center text-xl sm:text-xl sm:text-start">
                {state?.description}
              </i>
            </div>
            <div className="flex flex-col items-center sm:items-start">
              <i className="underline text-yellow-500 text-xl sm:text-2xl">
                Perks and Benefits at Code karo:
              </i>
              <ul style={{ listStyleType: "circle" }}>
                <li className="ml-5">Affordable courses with the best quality.</li>
                <li className="ml-5">50+ top notch courses.</li>
                <li className="ml-5">AIR 10 from Code karo in Gate.</li>
                <li className="ml-5">More than 10+ experienced teachers.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </HomeLayout>
  );
}

export default CourseDescription;
