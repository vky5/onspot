import { useContext } from "react";
import PropTypes from "prop-types";
import { Navigate } from "react-router-dom";
import { LoggedInContext } from "../../../../main";

const ProtectedComponent = ({ children }) => {
  const { isLoggedin } = useContext(LoggedInContext);

  if (!isLoggedin) {
    return <Navigate to="/login" replace />; // Redirect to login page on unauthorized access
  }

  return children;
};

ProtectedComponent.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ProtectedComponent;
