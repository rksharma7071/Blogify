import React, { useContext, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { IoHomeSharp } from "react-icons/io5";
import { FaBlog } from "react-icons/fa6";
import { BiSolidCategoryAlt } from "react-icons/bi";
import { MdLogin, MdLogout } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";

// Custom debounce function
function debounce(func, delay) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func(...args);
    }, delay);
  };
}

function Header() {
  const { isLoggedIn, logout } = useContext(AuthContext);
  const [search, setSearch] = useState("");
  const [result, setResult] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);

  // Debounced search using custom debounce function
  const fetchSearchResults = useCallback(
    debounce(async (query) => {
      if (query.trim().length === 0) {
        setResult(null);
        setShowDropdown(false);
        return;
      }

      try {
        const { data } = await axios.get(`/api/search?q=${query}`);
        setResult(data);
        setShowDropdown(true);
      } catch (e) {
        console.log("Search Error:", e);
      }
    }, 300),
    []
  );

  const handleInputChange = (e) => {
    const val = e.target.value;
    setSearch(val);
    fetchSearchResults(val);
  };

  const handleResultClick = () => {
    setSearch("");
    setResult(null);
    setShowDropdown(false);
  };

  return (
    <header className="bg-white z-50 border-b border-gray-200 sticky top-0">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-6">
        {/* Logo */}
        <div className="flex items-center space-x-4">
          <Link to="/">
            {/* <img
              src="https://logonoid.com/images/blogger-logo.png"
              alt="Blogger Logo 1"
              className="w-24"
            /> */}
            <svg xmlns="http://www.w3.org/2000/svg" width="auto" height="30" viewBox="0 0 397 116" fill="none" className="text-gray-800">
              <path d="M0.75 2.125H47.5625C51.6875 2.125 55.4167 3.10417 58.75 5.0625C62.0833 7.02083 64.7292 9.64583 66.6875 12.9375C68.6875 16.2292 69.6875 19.9167 69.6875 24V29.8125C69.6875 35.6042 68.0208 40 64.6875 43C67.6458 44.9167 69.7917 47.2083 71.125 49.875C72.4583 52.5 73.125 55.7917 73.125 59.75V69.5625C73.125 73.4792 72.125 77.0625 70.125 80.3125C68.1667 83.5625 65.5208 86.1667 62.1875 88.125C58.8542 90.0417 55.1667 91 51.125 91H0.75V2.125ZM51.25 77.8125C53.6667 77.8125 55.7292 77 57.4375 75.375C59.1458 73.7083 60 71.7083 60 69.375V59.5625C60 57.2292 59.1458 55.2292 57.4375 53.5625C55.7292 51.8958 53.6458 51.0625 51.1875 51.0625H21.4375V37.9375H47.5625C50.0208 37.9375 52.125 37.1458 53.875 35.5625C55.6667 33.9375 56.5625 31.9792 56.5625 29.6875V24C56.5625 21.5833 55.6667 19.5208 53.875 17.8125C52.125 16.1042 50.0208 15.25 47.5625 15.25H13.9375V77.8125H51.25ZM87.5 2.125H100.688V91H87.5V2.125ZM115.125 49.625C115.125 45.3333 116.167 41.4167 118.25 37.875C120.375 34.3333 123.208 31.5208 126.75 29.4375C130.292 27.3125 134.208 26.25 138.5 26.25H152.625C156.917 26.25 160.833 27.3125 164.375 29.4375C167.917 31.5208 170.729 34.3333 172.812 37.875C174.938 41.4167 176 45.3333 176 49.625V67.625C176 71.9167 174.938 75.8333 172.812 79.375C170.729 82.9167 167.917 85.75 164.375 87.875C160.833 89.9583 156.917 91 152.625 91H138.5C134.208 91 130.292 89.9583 126.75 87.875C123.208 85.75 120.375 82.9167 118.25 79.375C116.167 75.8333 115.125 71.9167 115.125 67.625V49.625ZM128.312 67.5C128.312 70.3333 129.312 72.7708 131.312 74.8125C133.312 76.8125 135.708 77.8125 138.5 77.8125H152.625C155.458 77.8125 157.854 76.8125 159.812 74.8125C161.812 72.7708 162.812 70.3333 162.812 67.5V49.75C162.812 46.9167 161.812 44.5 159.812 42.5C157.854 40.4583 155.458 39.4375 152.625 39.4375H138.5C135.708 39.4375 133.312 40.4583 131.312 42.5C129.312 44.5 128.312 46.9167 128.312 49.75V67.5ZM189.75 49.5C189.75 45.2083 190.792 41.3125 192.875 37.8125C195 34.3125 197.833 31.5208 201.375 29.4375C204.917 27.3125 208.833 26.25 213.125 26.25H236.062C239.688 26.25 242.792 27.5417 245.375 30.125C247.958 32.7083 249.25 35.8125 249.25 39.4375V91.75C249.25 96.0417 248.188 99.9583 246.062 103.5C243.979 107.042 241.167 109.854 237.625 111.938C234.083 114.062 230.167 115.125 225.875 115.125H193.938V101.938H225.688C228.562 101.938 231 100.938 233 98.9375C235.042 96.9792 236.062 94.6042 236.062 91.8125V39.4375H213.125C210.333 39.4375 207.938 40.4375 205.938 42.4375C203.938 44.3958 202.938 46.7917 202.938 49.625V67.5625C202.938 70.3542 203.938 72.7708 205.938 74.8125C207.938 76.8125 210.333 77.8125 213.125 77.8125H228.562V91H213.125C208.833 91 204.917 89.9583 201.375 87.875C197.833 85.75 195 82.9375 192.875 79.4375C190.792 75.8958 189.75 71.9792 189.75 67.6875V49.5ZM262.75 8.625C262.75 6.375 263.542 4.45833 265.125 2.875C266.708 1.29167 268.625 0.5 270.875 0.5C273.125 0.5 275.042 1.29167 276.625 2.875C278.208 4.45833 279 6.375 279 8.625C279 10.875 278.208 12.7917 276.625 14.375C275.042 15.9583 273.125 16.75 270.875 16.75C268.625 16.75 266.708 15.9583 265.125 14.375C263.542 12.7917 262.75 10.875 262.75 8.625ZM264.25 26.25H277.5V91H264.25V26.25ZM292.5 20.6875C292.5 17.2708 293.333 14.1667 295 11.375C296.708 8.54167 298.958 6.29167 301.75 4.625C304.583 2.95833 307.708 2.125 311.125 2.125H325.562V15.25H311.125C309.625 15.25 308.333 15.7917 307.25 16.875C306.208 17.9167 305.688 19.1875 305.688 20.6875V26.25H325.812V39.375H305.688V91H292.5V20.6875ZM348 26.25L364.812 71.125L382 26.25H396.562L362.188 115.375H347.75L357.812 88.875L334 26.25H348Z" fill="currentColor" />
            </svg>
          </Link>
        </div>

        {/* Search */}
        <div className="flex-1 max-w-md relative hidden md:block">
          <input
            type="text"
            value={search}
            placeholder="Search..."
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {showDropdown && result?.posts?.length > 0 && (
            <ul className="absolute left-0 right-0 mt-1 bg-white border border-gray-200 rounded-md shadow-md z-50 max-h-60 overflow-y-auto">
              {result.posts.map((post) => (
                <li key={post._id} className="hover:bg-gray-100">
                  <Link
                    to={`/blogs/${post.slug}`}
                    onClick={handleResultClick}
                    className="block px-4 py-2 text-sm text-gray-800"
                  >
                    {post.title}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Navigation */}
        <nav className="flex items-center space-x-6 text-gray-600">
          <Link to="/" className="flex flex-col items-center hover:text-blue-600">
            <IoHomeSharp className="text-lg" />
            <span className="text-xs">Home</span>
          </Link>
          <Link to="/blogs" className="flex flex-col items-center hover:text-blue-600">
            <FaBlog className="text-lg" />
            <span className="text-xs">Blogs</span>
          </Link>
          <Link to="/category" className="flex flex-col items-center hover:text-blue-600">
            <BiSolidCategoryAlt className="text-lg" />
            <span className="text-xs">Category</span>
          </Link>
          {!isLoggedIn ? (
            <Link to="/signin" className="flex flex-col items-center hover:text-blue-600">
              <MdLogin className="text-lg" />
              <span className="text-xs">Sign In</span>
            </Link>
          ) : (
            <>
              <Link to="/profile" className="flex flex-col items-center hover:text-blue-600">
                <FaUser className="text-lg" />
                <span className="text-xs">Profile</span>
              </Link>
              {/* <button
                onClick={logout}
                className="flex flex-col items-center hover:text-red-600"
              >
                <MdLogout className="text-lg" />
                <span className="text-xs">Sign Out</span>
              </button> */}
            </>
          )}
        </nav>
      </div>
    </header>
  );
}

export default Header;
