import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./AuthContext";

function AuthRedirect({ children }) {
  const { isLoggedIn } = useContext(AuthContext);

  if (isLoggedIn) {
    return <Navigate to="/profile" replace />;
  }
  return children;
}

export default AuthRedirect;
