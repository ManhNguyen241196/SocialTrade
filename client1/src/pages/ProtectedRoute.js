import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { Navigate } from "react-router-dom";

const ProtectedRoute = (props) => {
  const { currentUser } = useContext(UserContext);

  if (!currentUser) {
    return <Navigate to="/register" />;
  }
  return props.children;
};

export default ProtectedRoute;
