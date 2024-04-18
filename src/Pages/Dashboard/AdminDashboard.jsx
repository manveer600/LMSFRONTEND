import { useDispatch, useSelector } from "react-redux";
import HomeLayout from "../../Layouts/HomeLayout";
import {
  ArcElement,
  BarElement,
  CategoryScale,
  Legend,
  LinearScale,
  Title,
  Tooltip,
  Chart as ChartJs,
} from "chart.js";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { getStatData } from "../../Redux/Slices/StatSlice.js";
import { getPaymentRecord } from "../../Redux/Slices/Razorpay.js";
import { Pie } from "react-chartjs-2";
import { Bar } from "react-chartjs-2";
import { FaUsers } from "react-icons/fa";
import { GiMoneyStack } from "react-icons/gi";
import { FcSalesPerformance } from "react-icons/fc";
import { BsCollectionPlayFill, BsTrash } from "react-icons/bs";
import { getAllCourses, deleteAllCourses,  deleteCourse} from "../../Redux/Slices/CourseSlice.js";
import toast from "react-hot-toast";
ChartJs.register(
  ArcElement,
  BarElement,
  CategoryScale,
  Legend,
  LinearScale,
  Title,
  Tooltip
);
function AdminDashboard() {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const courses = useSelector((state) => state.course.courseData)
  console.log('courses', courses);
  const { allUsersCount, subscribedCount } = useSelector((state) => state.stat);

  const { allPayments, monthlySalesRecord } = useSelector(
    (state) => state.razorpay
  );

  const userData = {
    labels: ["Registered User", "Enrolled User"],

    fontColor: "white",

    datasets: [
      {
        label: "User Details",

        data: [allUsersCount, subscribedCount],

        backgroundColor: ["yellow", "green"],

        borderWidth: 1,

        borderColor: ["yellow", "green"],
      },
    ],
  };

  const salesData = {
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],

    fontColor: "white",

    datasets: [
      {
        label: "Sales / Month",

        data: monthlySalesRecord,

        backgroundColor: ["red"],

        borderColor: ["white"],

        borderWidth: 2,
      },
    ],
  };

  const myCourses = useSelector((state) => state?.course?.courseData);

  async function onCourseDelete(id) {
    if (window.confirm("Are you sure you want to delete the course ? ")) {
      const res = await dispatch(deleteCourse(id));

      console.log(res);

      if (res?.payload?.success) {
        console.log('course deleted successfully')
        toast.success('course deleted successfully');
         await dispatch(getAllCourses());
      }
    }
  }

  async function delete_All_Courses(){
    if (window.confirm("Are you sure you want to delete all the courses ? ")) {
      console.log('yes')
      const res = await dispatch(deleteAllCourses());
      console.log('res', res);
      if(res?.payload?.success){
        toast.success('All Courses deleted successfully');
         await dispatch(getAllCourses());
      }
    }
  }

  useEffect(() => {
    (async () => {
      await dispatch(getAllCourses());

      await dispatch(getStatData());

      await dispatch(getPaymentRecord());
    })();
  }, []);

  return (
    <HomeLayout>
      <div className="min-h-[90vh] w-full font-serif pt-5 flex flex-col flex-wrap gap-10 text-white">
        <h1 className="text-center  mt-20 text-3xl sm:text-5xl font-semibold text-yellow-500">
          Admin Dashboard
        </h1>

        <div className="flex flex-col md:flex-row gap-5 m-auto">
          <div className="flex  shadow-lg md:w-1/2 w-[250px] sm:w-[640px] flex-col items-center justify-center gap-10 p-5 rounded-md"> 
            <div className="w-[250px]  justify-center  sm:w-full sm:h-80 sm:flex flex-row items-center ">
              <Pie data={userData} />
            </div>

            <div className=" grid grid-cols-2 gap-5">
              <div className="flex flex-col sm:flex-row items-center justify-between p-5 gap-5 rounded-md shadow-md">
                <div className="flex flex-col items-center">
                  <p className="font-semibold">Registered Users</p>

                  <h3 className="text-4xl font-bold">{allUsersCount}</h3>
                </div>

                <FaUsers className="text-yellow-500 text-5xl" />
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-between p-5 gap-5 rounded-md shadow-md">
                <div className="flex flex-col items-center">
                  <p className="font-semibold">Subscribed Users</p>

                  <h3 className="text-4xl font-bold">{subscribedCount}</h3>
                </div>

                <FaUsers className="text-green-500 text-5xl" />
              </div>
            </div>
          </div>

          <div className="flex shadow-lg md:w-1/2 w-[250px] sm:w-[640px] flex-col items-center justify-center gap-10 p-5 rounded-md">
            <div className="h-80 w-full relative">
              <Bar className="absolute bottom-0 h-80 " data={salesData} />
            </div>

            <div className="grid grid-cols-2 gap-5">
              <div className="flex flex-col sm:flex-row items-center justify-center sm:justify-between p-5 gap-5 rounded-md shadow-md">
                <div className="flex flex-col items-center">
                  <p className="font-semibold">Subscription Count</p>

                  <h3 className="text-4xl font-bold">{allPayments?.count}</h3>
                </div>

                <FcSalesPerformance className="text-yellow-500 text-5xl" />
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center sm:justify-between p-5 gap-5 rounded-md shadow-md">
                <div className="flex flex-col items-center">
                  <p className="font-semibold">Total Revenue</p>

                  <h3 className="text-4xl font-bold">
                    {allPayments?.count * 499}
                  </h3>
                </div>

                <GiMoneyStack className="text-green-500 text-5xl" />
              </div>
            </div>
          </div>
        </div>

        <div className="gap-10 overflow-x-scroll w-full mb-10">
          <div className="flex w-full items-center justify-around">
            <h1 className="text-xl sm:text-3xl ml-4 sm:ml-0 font-semibold">
              Courses overview
            </h1>

            <button
              onClick={() => {
                navigate("/course/create");
              }}
              className="w-fit bg-yellow-500 mr-4 sm:mr-0 hover:bg-yellow-600 transition-all ease-in-out duration-300 rounded py-1 px-3 sm:py-2 sm:px-4 font-semibold sn:text-lg cursor-pointer"
            >
              Create new course
            </button>
          </div>

          {courses.length ? <table className="table">
            <thead>
              <tr>
                <th>S No</th>

                <th>Course Title</th>

                <th>Course Category</th>

                <th>Instructor</th>

                <th>Total Lectures</th>

                <th>Description</th>

                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {myCourses?.map((course, idx) => {
                return (
                  <tr key={course._id}>
                    <td>{idx + 1}</td>

                    <td>
                      <textarea
                        readOnly
                        value={course?.title}
                        className="w-40 h-auto bg-transparent resize-none"
                      ></textarea>
                    </td>

                    <td>{course?.category}</td>

                    <td>{course?.createdBy}</td>

                    <td>{course?.numberOfLectures}</td>

                    <td className="max-w-28 overflow-hidden text-ellipsis whitespace-nowrap">
                      <textarea
                        value={course?.description}
                        readOnly
                        className="w-80 h-auto bg-transparent resize-none"
                      ></textarea>
                    </td>

                    <td className="flex items-center gap-4">
                      <button
                        className="bg-green-500 hover:bg-green-600 transition-all ease-in-out duration-300 text-xl py-2 px-4 rounded-md font-bold"
                        onClick={() =>
                          navigate("/course/displaylectures", {
                            state: { ...course },
                          })
                        }
                      >
                        <BsCollectionPlayFill />
                      </button>

                      <button
                        className="bg-red-500 hover:bg-red-600 transition-all ease-in-out duration-300 text-xl py-2 px-4 rounded-md font-bold"
                        onClick={() => onCourseDelete(course?._id)}
                      >
                        <BsTrash />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>: <div className="text-center font-bold font-serif text-yellow-400 text-3xl mt-3">No courses found</div> }
        </div>
        
      </div>
    </HomeLayout>
  );
}

export default AdminDashboard;

