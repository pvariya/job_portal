import React from "react";
import { getUserDetails } from "../pages/UserDetails";

const Ability = (role = []) => {
  const userRole = getUserDetails()?.role;
  if (userRole.includes(role)) {
    return true;
  } else {
    return false;
  }
};

export default Ability;
