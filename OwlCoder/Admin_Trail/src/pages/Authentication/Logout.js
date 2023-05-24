import PropTypes from 'prop-types';
import React, { useEffect } from "react";
import withRouter from 'components/Common/withRouter';

import { logoutUser } from "../../store/actions";
//redux
import { useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';

const Logout = props => {
  // const dispatch = useDispatch();
  const navigate = useNavigate();
  
  useEffect(() => {
    localStorage.removeItem("authUser");
    if(!localStorage.getItem("authUser")){
      navigate("/login");
    }
    // dispatch(logoutUser(navigate));
  }, [navigate]);

  return <></>;
};

Logout.propTypes = {
  history: PropTypes.object
};


export default withRouter(Logout);
