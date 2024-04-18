import { useDispatch, useSelector } from "react-redux";
import { getAllCourses } from "../../Redux/Slices/CourseSlice";
import { useEffect } from "react";
import HomeLayout from "../../Layouts/HomeLayout";
import CourseCard from "../../Components/CourseCard";
import { useNavigate } from "react-router-dom";

function CourseList() {
  const role = useSelector((state) => state?.auth?.role);
  const courses = useSelector((state) => state?.course?.courseData);
  const { courseData } = useSelector((state) => state?.course);

  console.log("courses", courses);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  async function loadCourses() {
    await dispatch(getAllCourses());
  }

  useEffect(() => {
    loadCourses();
  }, []);

  return (
    <HomeLayout>
      <div className="min-h-[90vh] pt-14 flex flex-col gap-10 text-white">
        {
          courses.length !== 0 && 
          <h1 className="text-center p-2 font-serif text-3xl font-semibold mb-5">
            Explore the courses made by
            <span className="font-bold text-yellow-500"> Industry Experts</span>
          </h1>
        
        }
        {courses.length !== 0 && 
          <div className="p-4 mb-10 flex justify-center flex-wrap gap-14">
            {courseData?.map((element) => {
              return <CourseCard key={element._id} data={element} />;
            })}
          </div>
        }
        {courses.length === 0 && 
          <div>
            <h1 className="text-center mb-10 text-6xl font-serif underline text-red-400 ">
              No Courses
            </h1>
            <img
              className="rounded-full w-[250px] m-auto"
              src="https://e7.pngegg.com/pngimages/902/706/png-clipart-computer-icons-emoticon-sadness-others-face-smiley-thumbnail.png"
              alt=""
            />
           { role === 'ADMIN' && <p className="text-center mt-10"><button onClick={() => navigate('/course/create')} className="text-3xl bg-yellow-600 hover:bg-yellow-500 p-3 rounded-xl font-serif">Add Course</button></p> }
  
          </div>
        }
      </div>
    </HomeLayout>
  );
}

export default CourseList;
