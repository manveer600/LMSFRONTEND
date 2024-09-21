import { Routes, Route } from "react-router-dom";

import AboutUs from "./Pages/AboutUs.jsx";
import HomePage from "./Pages/HomePage.jsx";
import NotFound from "./Pages/NotFound.jsx";
import Signup from "./Pages/Signup.jsx";
import Login from "./Pages/Login.jsx";
import CourseList from "./Pages/Course/CourseList.jsx";
import Contact from "./Pages/Contact.jsx";
import Denied from "./Pages/Denied.jsx";
import CourseDescription from "./Pages/Course/CourseDescription.jsx";
import RequireAuth from "./Components/Auth/RequireAuth.jsx";
import { CreateCourse } from "./Pages/Course/CreateCourse.jsx";
import { Profile } from "./Pages/User/Profile.jsx";
import { EditProfile } from "./Pages/User/EditProfile.jsx";
import Checkout from "./Pages/Payment/Checkout.jsx";
import CheckoutSuccess from "./Pages/Payment/CheckoutSuccess.jsx";
import CheckoutFailure from "./Pages/Payment/CheckoutFailure.jsx";
import AddLecture from "./Pages/Dashboard/AddLecture.jsx";
import AdminDashboard from "./Pages/Dashboard/AdminDashboard.jsx";
import DisplayLectures from "./Pages/Dashboard/DisplayLectures.jsx";
import ForgotPassword from "./Pages/User/ForgotPassword.jsx";
import ResetPasswordPage from "./Pages/User/ResetPassword.jsx";
import FavouriteCourseList from "./Pages/Course/FavouriteCourseList.jsx";
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/denied" element={<Denied />} />
        <Route path="/course/description" element={<CourseDescription />} />
        <Route path="/courses" element={<CourseList />} />
        <Route path="/resetPassword/:resetToken" element={<ResetPasswordPage />}/>
        <Route element={<RequireAuth allowedRoles={["ADMIN"]} />}>
          <Route path="/course/create" element={<CreateCourse />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
        </Route>

        <Route path="/user/profile" element={<Profile />} />
        <Route path="/user/editProfile" element={<EditProfile />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/checkout/success" element={<CheckoutSuccess />} />
        <Route path="/checkout/fail" element={<CheckoutFailure />} />
        <Route path="/course/displayLectures" element={<DisplayLectures />} />
        <Route path="/course/addLecture" element={<AddLecture />} />
        <Route path="/user/forgotpassword" element={<ForgotPassword />} />
        <Route path="/favCourses" element={<FavouriteCourseList />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
