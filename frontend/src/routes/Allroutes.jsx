import React from "react";
import { Route, Routes } from "react-router-dom";
import Signup from "../pages/Signup";
import Login from "../pages/Login";
import Home from "../pages/Home";
import Privet from "./Privet";
import AdminSignUp from "../pages/AdminSignUp";
import Assign from "../pages/Assign";
import Ability from "../role/Ability";

const Allroutes = () => {
  return (
    <div>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/Admin-signup" element={<AdminSignUp />} />
        {Ability(["admin"]) ? (
          <Route path="/assign" element={<Assign />} />
        ) : null}
        <Route
          path="/"
          element={
            <Privet>
              <Home />
            </Privet>
          }
        />
      </Routes>
    </div>
  );
};

export default Allroutes;
