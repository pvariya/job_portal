import React, { useEffect } from "react";
import { getUserDetails } from "../pages/UserDetails";
import { Navigate } from "react-router-dom";

const Privet = ({ children }) => {
  const user = getUserDetails();
  if (user) {
    return children;
  } else {
    return <Navigate to="/login" />;
  }
};

export default Privet;
