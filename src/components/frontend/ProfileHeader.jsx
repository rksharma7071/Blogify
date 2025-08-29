import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import { RiDashboardFill } from "react-icons/ri";
import { MdAccountCircle, MdLogout } from "react-icons/md";
import { MdVpnKey } from "react-icons/md";
import { FaFilePen } from "react-icons/fa6";
import { IoIosNotifications } from "react-icons/io";
import { IoSettings } from "react-icons/io5";
import { FaUser } from "react-icons/fa";
import { MdLocalPostOffice } from "react-icons/md";


import { DiGoogleAnalytics } from "react-icons/di";


function ProfileHeader({ handleLogout }) {
  return (
    <div className="bg-white text-gray-800 w-40 md:w-60 flex-shrink-0 hidden md:flex flex-col">
      {/* <Link to={''} className={({ isActive }) => `flex items-center gap-2 p-4 ${isActive ? "bg-blue-500 text-white" : "hover:bg-blue-500 hover:text-white"}`}>
        <FaUser />
        Profile
      </Link> */}
      <NavLink to={'newPost'} className={({ isActive }) => `flex items-center gap-2 p-4 ${isActive ? "bg-blue-500 text-white" : "hover:bg-blue-500 hover:text-white"}`}>
        <FaFilePen />
        New Post
      </NavLink>
      <NavLink to={'posts'} className={({ isActive }) => `flex items-center gap-2 p-4 ${isActive ? "bg-blue-500 text-white" : "hover:bg-blue-500 hover:text-white"}`}>
        <MdLocalPostOffice />
        Posts
      </NavLink>
      {/* <NavLink to={'notification'} className={({ isActive }) => `flex items-center gap-2 p-4 ${isActive ? "bg-blue-500 text-white" : "hover:bg-blue-500 hover:text-white"}`}>
        <IoIosNotifications />
        Notifications
      </NavLink> */}
      {/* <NavLink to={'analytics'} className={({ isActive }) => `flex items-center gap-2 p-4 ${isActive ? "bg-blue-500 text-white" : "hover:bg-blue-500 hover:text-white"}`}>
        <DiGoogleAnalytics /> Analytics
      </NavLink> */}
      <NavLink to={'settings'} className={({ isActive }) => `flex items-center gap-2 p-4 ${isActive ? "bg-blue-500 text-white" : "hover:bg-blue-500 hover:text-white"}`}>
        <IoSettings />Settings
      </NavLink>
      <div className='flex items-center gap-2 cursor-pointer p-4 hover:bg-blue-500 hover:text-white' onClick={handleLogout}>
        <MdLogout className="text-lg" /> Logout
      </div>
    </div >
  )
}

export default ProfileHeader



