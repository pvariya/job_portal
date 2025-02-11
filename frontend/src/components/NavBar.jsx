import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { getUserDetails } from "../pages/UserDetails";
const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const user = getUserDetails();

  const handleLogout = () => {
    Cookies.remove("token");
    navigate("/login");
  };
  return (
    <nav className="bg-blue-600 p-4 overflow-hidden">
      <div className="container mx-auto flex justify-between items-center">
        <a href="#" className="text-white text-2xl font-bold">
          MyLogo
        </a>

        <div className="hidden md:flex space-x-6">
          <Link to="/home" className="text-white hover:text-gray-300">
            Home
          </Link>
          <Link to="signup" className="text-white hover:text-gray-300">
            SignUp
          </Link>

          {user ? (
            <p
              to="/login"
              onClick={handleLogout}
              className="text-white hover:text-gray-300"
            >
              logout
            </p>
          ) : (
            <Link to="/login" className="text-white hover:text-gray-300">
              LogIn
            </Link>
          )}
        </div>

        <button
          className="md:hidden text-white"
          onClick={() => setIsOpen(!isOpen)}
        >
          ☰
        </button>
      </div>
      {isOpen && (
        <div className="md:hidden bg-blue-500 text-white p-4 space-y-2">
          <Link to="/home" className="block hover:text-gray-300">
            Home
          </Link>
          <Link to="/signup" className="block hover:text-gray-300">
            SignUp
          </Link>
          <Link to="/login" className="block hover:text-gray-300">
            LogIn
          </Link>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
