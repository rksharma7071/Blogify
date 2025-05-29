import React from "react";
import { Link } from "react-router-dom";
import { IoHomeSharp } from "react-icons/io5";
import { FaUsers, FaTags, FaComments } from "react-icons/fa";
import { MdPostAdd, MdCategory } from "react-icons/md";

function Header() {
  return (
    <header>
      <div className="fr-header">
        <div className="fr-header-logo">
          <Link to={"/"}>
            <img
              src="https://logonoid.com/images/blogger-logo.png"
              alt="Blogger Logo"
              width={"100px"}
            />
          </Link>
        </div>
        <div className="fr-header-search">
          <input
            type="text"
            placeholder="Search..."
            className="fr-header-input"
          />
        </div>
        <div className="fr-header-menu">
          <div className="fr-header-menu-item">
            <Link to={"/admin"}>
              <IoHomeSharp className="fr-header-icon" />
              <span className="fr-header-label">Home</span>
            </Link>
          </div>
          <div className="fr-header-menu-item">
            <Link to={"/admin/user"}>
              <FaUsers className="fr-header-icon" />
              <span className="fr-header-label">User</span>
            </Link>
          </div>
          <div className="fr-header-menu-item">
            <Link to={"/admin/post"}>
              <MdPostAdd className="fr-header-icon" />
              <span className="fr-header-label">Post</span>
            </Link>
          </div>
          <div className="fr-header-menu-item">
            <Link to={"/admin/tag"}>
              <FaTags className="fr-header-icon" />
              <span className="fr-header-label">Tag</span>
            </Link>
          </div>
          <div className="fr-header-menu-item">
            <Link to={"/admin/category"}>
              <MdCategory className="fr-header-icon" />
              <span className="fr-header-label">Category</span>
            </Link>
          </div>
          <div className="fr-header-menu-item">
            <Link to={"/admin/comment"}>
              <FaComments className="fr-header-icon" />
              <span className="fr-header-label">Comment</span>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
