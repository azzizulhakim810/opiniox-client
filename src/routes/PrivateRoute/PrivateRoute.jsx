import { useContext } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import { Navigate, useLocation } from "react-router-dom";
import PropTypes from 'prop-types'


const PrivateRoute = ({children}) => {
  const {user, loading} = useContext(AuthContext);
  const location = useLocation();
  // console.log(location);

  if(loading) {
    return <div className="text-cyan-500 translate-x-[50%] translate-y-[50%]">
    <span className="loading loading-infinity loading-lg"></span>
  </div>
  }
  if(user) {
    return children;
    
  }
  return <Navigate state={location.pathname} to='/signin'></Navigate>;
};
PrivateRoute.propTypes = {
  children: PropTypes.node,
};

export default PrivateRoute;