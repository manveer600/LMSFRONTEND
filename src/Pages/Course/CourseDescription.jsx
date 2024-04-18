import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import HomeLayout from "../../Layouts/HomeLayout";

function CourseDescription() {
  const navigate = useNavigate();
  const { state } = useLocation();

  const { role, data } = useSelector((state) => state.auth);

  return (
    <HomeLayout>
      <div className="min-h-[90vh] w-[100vw] pt-12 px-20 flex flex-col items-center justify-center text-white">
       
        <div className="flex  w-[100vw] flex-col sm:space-x-2 sm:flex-row">

          <div className="pt-4 sm:ml-6 sm:w-1/2 flex flex-col justify-center items-center space-y-2 sm:items-end">
            <div>
              <img
                className="p-4 sm:w-[390px] mb-4 sm:w-42 md:h-64"
                alt="thumbnail"
                src={state?.thumbnail?.secure_url}
              />
            </div>

              <div className="font-serif sm:w-full md:w-[390px] flex flex-col items-center justify-between text-xl">
                <p className="font-semibold">
                  <span className="text-yellow-500 font-bold">
                    Total lectures:{" "}
                  </span>
                  {state?.numberOfLectures}
                </p>

                <p className="sm:font-semibold p-2">
                  <span className="text-yellow-500 font-bold">
                    Instructor:{" "}
                  </span>
                  {state?.createdBy}
                </p>
                {/* </div> */}

                {role === "ADMIN" || data?.subscription?.status === "active" ? (
                  <button
                    onClick={() =>
                      navigate("/course/displayLectures", {
                        state: { ...state },
                      })
                    }
                    className="bg-yellow-600 sm:text-xl rounded-md sm:font-bold px-2 sm:px-5 py-1 sm:py-3 hover:bg-yellow-500 transition-all ease-in-out duration-300"
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

                <button
                  onClick={() => navigate(-1)}
                  className="font-serif ml-1 hover:text-green-400 transition-all ease-in-out duration-300"
                >
                  Go back
                </button>
              </div>
            {/* </div> */}
          </div>

          <div className="sm:w-1/2 flex flex-col  sm:items-start justify-center p-4 md:pr-28 sm:text-start">
            <h1 className="text-2xl sm:text-3xl font-serif font-bold text-center sm:text-start text-yellow-500 mb-5 underline ">
              {state?.title}
            </h1>

            <p className="text-yellow-500 underline font-serif text-center sm:text-start text-xl font-bold">
              <i>Course description: </i>
            </p>
            <p className="text-center sm:text-start">{state?.description}</p>
          </div>
        </div>
      </div>
    </HomeLayout>
  );
}

export default CourseDescription;
