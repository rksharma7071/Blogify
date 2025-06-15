import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { IoHomeSharp } from "react-icons/io5";
import { FaBlog } from "react-icons/fa6";
import { BiSolidCategoryAlt } from "react-icons/bi";
import { MdLogin, MdLogout } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import { AuthContext } from "../../context/AuthContext";

function Header() {
  const { isLoggedIn, logout } = useContext(AuthContext);

  return (
    <header className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-6">
        {/* Logo */}
        <div className="flex items-center space-x-4">
          <Link to="/">
            <img
              src="https://logonoid.com/images/blogger-logo.png"
              alt="Blogger Logo"
              className="w-24"
            />
          </Link>
        </div>

        {/* Search */}
        <div className="flex-1 max-w-md hidden md:block">
          <input
            type="text"
            placeholder="Search..."
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Navigation */}
        <nav className="flex items-center space-x-6 text-gray-600">
          <Link
            to="/"
            className="flex flex-col items-center hover:text-blue-600"
          >
            <IoHomeSharp className="text-lg" />
            <span className="text-xs">Home</span>
          </Link>

          <Link
            to="/blogs"
            className="flex flex-col items-center hover:text-blue-600"
          >
            <FaBlog className="text-lg" />
            <span className="text-xs">Blogs</span>
          </Link>

          <Link
            to="/category"
            className="flex flex-col items-center hover:text-blue-600"
          >
            <BiSolidCategoryAlt className="text-lg" />
            <span className="text-xs">Category</span>
          </Link>

          {!isLoggedIn ? (
            <Link
              to="/signin"
              className="flex flex-col items-center hover:text-blue-600"
            >
              <MdLogin className="text-lg" />
              <span className="text-xs">Sign In</span>
            </Link>
          ) : (
            <>
              <Link
                to="/profile"
                className="flex flex-col items-center hover:text-blue-600"
              >
                <FaUser className="text-lg" />
                <span className="text-xs">Profile</span>
              </Link>
              <button
                onClick={logout}
                className="flex flex-col items-center hover:text-red-600"
              >
                <MdLogout className="text-lg" />
                <span className="text-xs">Sign Out</span>
              </button>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}

export default Header;
