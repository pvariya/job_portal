import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { getUserDetails } from "../pages/UserDetails";
import { toast, ToastContainer } from "react-toastify";
import Ability from "../role/Ability";

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  let user = getUserDetails();
  console.log(user);
  const handleLogout = () => {
    Cookies.remove("token");
    toast.success("Logged Out Successfully  👋", {
      position: "top-right",
      autoClose: 3000,
    });
    setTimeout(() => {
      navigate("/login");
    }, 3000);
  };

  return (
    <nav className="bg-blue-600 p-4 overflow-hidden">
      <ToastContainer />
      <div className="container mx-auto flex justify-between items-center">
        <a href="#" className="text-white text-2xl font-bold">
          MyLogo
        </a>

        <div className="hidden md:flex space-x-6">
          <Link to="/" className="text-white hover:text-gray-300">
            Home
          </Link>
          {Ability(["admin"]) ? (
            <Link to="/assign" className="text-white hover:text-gray-300">
              Assing
            </Link>
          ) : null}
          
          {user ? (
            <p className="text-white hover:text-gray-300">{user.name}</p>
          ) : (
            <Link to="/signup" className="text-white hover:text-gray-300">
              SignUp
            </Link>
          )}

          {user ? (
            <p
              onClick={handleLogout}
              className="cursor-pointer text-white hover:text-gray-300"
            >
              Logout
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
          <Link to="/" className="block hover:text-gray-300">
            Home
          </Link>
          {Ability(["admin"]) ? (
            <Link to="/assign" className="block hover:text-gray-300">
              Assing
            </Link>
          ) : null}

          {user ? (
            <p className="block hover:text-gray-300">{user.name}</p>
          ) : (
            <Link to="/signup" className="block hover:text-gray-300">
              SignUp
            </Link>
          )}

          {user ? (
            <p
              onClick={handleLogout}
              className="cursor-pointer not-even:block hover:text-gray-300"
            >
              Logout
            </p>
          ) : (
            <Link to="/login" className="block hover:text-gray-300">
              LogIn
            </Link>
          )}
        </div>
      )}
    </nav>
  );
};

export default NavBar;
