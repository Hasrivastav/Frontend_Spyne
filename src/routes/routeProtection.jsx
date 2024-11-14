import { Navigate } from "react-router-dom";
import NotFound from "./NotFound";

const PrivateRoute = ({ children }) => {
  const accessToken = sessionStorage.getItem("accessToken");

  if (!accessToken) {
    return <NotFound />;
  }

  return children;
};

export default PrivateRoute;
