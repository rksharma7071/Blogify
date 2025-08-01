import React from 'react'
import { Link } from 'react-router-dom'
import { RiDashboardFill } from "react-icons/ri";
import { MdAccountCircle, MdLogout } from "react-icons/md";
import { MdVpnKey } from "react-icons/md";
import { FaFilePen } from "react-icons/fa6";
import { IoIosNotifications } from "react-icons/io";
import { IoSettings } from "react-icons/io5";
import { FaUser } from "react-icons/fa";
import { MdLocalPostOffice } from "react-icons/md";


function ProfileHeader({ handleLogout }) {
  return (
    <div className="bg-white text-gray-800 w-60">
      {/* <Link to={''} className='flex items-center gap-2 p-4 hover:bg-blue-500 hover:text-white'>
        <FaUser />
        Profile
      </Link> */}
      <Link to={'writeBlog'} className='flex items-center gap-2 p-4 hover:bg-blue-500 hover:text-white'>
        <FaFilePen />
        Write a Blog
      </Link>
      <Link to={'myBlog'} className='flex items-center gap-2 p-4 hover:bg-blue-500 hover:text-white'>
        <MdLocalPostOffice />
        My Blogs
      </Link>
      <Link to={'notification'} className='flex items-center gap-2 p-4 hover:bg-blue-500 hover:text-white'>
        <IoIosNotifications />
        Notifications
      </Link>
      <Link to={'account'} className='flex items-center gap-2 p-4 hover:bg-blue-500 hover:text-white'>
        <MdAccountCircle /> Account Details
      </Link>
      <Link to={'settings'} className='flex items-center gap-2 p-4 hover:bg-blue-500 hover:text-white'>
        <IoSettings />Settings
      </Link>
      <div className='flex items-center gap-2 cursor-pointer p-4 hover:bg-blue-500 hover:text-white' onClick={handleLogout}>
        <MdLogout className="text-lg" /> Logout
      </div>
    </div >
  )
}

export default ProfileHeader



