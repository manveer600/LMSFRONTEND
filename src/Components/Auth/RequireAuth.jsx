import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { CreateCourse } from "../../Pages/Course/CreateCourse";

function requireAuth({allowedRoles}){
    const {isLoggedIn, role} = useSelector((state)=> state.auth);

    // return isLoggedIn && allowedRoles.find((myRole) => myRole === role) ? (
    //     <CreateCourse/>
    // ): isLoggedIn ? ( <Navigate to="/denied"/>) : (<Navigate to="login"/>)

                                    // or
    
    return isLoggedIn && allowedRoles.find((myRole) => myRole === role) ? (
        <Outlet/>
    ): isLoggedIn ? ( <Navigate to="/denied"/>) : (<Navigate to="login"/>)
}


export default requireAuth;