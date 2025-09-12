import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";

export const ProtectedRoute = ({ children, role }) => {
    const { user, loading } = useSelector((state) => state.auth)
    const { isLoaded } = useUser();
    console.log("protected user: ", user)

    if (loading || !isLoaded ) {
      return <div> Loading... </div>
    }

    if(!user || (role && user.role !== role)){
        return <Navigate to="/login" replace/>
    }
  return children;
};

export default ProtectedRoute;
