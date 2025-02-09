import React, { useState } from "react";
import { Link } from "react-router-dom";

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <nav className="bg-blue-600 p-4">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <a href="#" className="text-white text-2xl font-bold">
          MyLogo
        </a>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-6">
          <Link to="/home" className="text-white hover:text-gray-300">
            Home
          </Link>
          <Link to="signup" className="text-white hover:text-gray-300">
            SignUp
          </Link>
          <Link to="/login" className="text-white hover:text-gray-300">
            LogIn
          </Link>
          {/* <Link to="" className="text-white hover:text-gray-300">Contact</Link> */}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white"
          onClick={() => setIsOpen(!isOpen)}
        >
          ☰
        </button>
      </div>

      {/* Mobile Menu (Dropdown) */}
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
