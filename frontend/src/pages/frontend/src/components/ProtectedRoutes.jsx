
import PropTypes from "prop-types";
import { Navigate } from "react-router-dom";
import { getCookie } from "../../../../utils/Cookies";

const ProtectedComponent = ({ children }) => {


  if (!getCookie('jwt')) {
    return <Navigate to="/login" replace />; // Redirect to login page on unauthorized access
  }

  return children;
};

ProtectedComponent.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ProtectedComponent;
