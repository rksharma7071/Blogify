import React from "react";
import { Link } from "react-router-dom";
import { IoHomeSharp } from "react-icons/io5";
import { FaUsers, FaTags, FaComments } from "react-icons/fa";
import { MdPostAdd, MdCategory } from "react-icons/md";

function Header() {
  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-6">
        {/* Logo */}
        <div className="flex items-center space-x-4">
          <Link to="/admin">
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
            className="w-full px-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Menu */}
        <nav className="flex items-center space-x-6 text-gray-600">
          <Link
            to="/admin"
            className="flex flex-col items-center hover:text-blue-600"
          >
            <IoHomeSharp size={20} />
            <span className="text-xs">Home</span>
          </Link>
          <Link
            to="/admin/user"
            className="flex flex-col items-center hover:text-blue-600"
          >
            <FaUsers size={20} />
            <span className="text-xs">User</span>
          </Link>
          <Link
            to="/admin/post"
            className="flex flex-col items-center hover:text-blue-600"
          >
            <MdPostAdd size={20} />
            <span className="text-xs">Post</span>
          </Link>
          <Link
            to="/admin/tag"
            className="flex flex-col items-center hover:text-blue-600"
          >
            <FaTags size={20} />
            <span className="text-xs">Tag</span>
          </Link>
          <Link
            to="/admin/category"
            className="flex flex-col items-center hover:text-blue-600"
          >
            <MdCategory size={20} />
            <span className="text-xs">Category</span>
          </Link>
          <Link
            to="/admin/comment"
            className="flex flex-col items-center hover:text-blue-600"
          >
            <FaComments size={20} />
            <span className="text-xs">Comment</span>
          </Link>
        </nav>
      </div>
    </header>
  );
}

export default Header;
