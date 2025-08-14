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


import { DiGoogleAnalytics } from "react-icons/di";


function ProfileHeader({ handleLogout }) {
  return (
    <div className="bg-white text-gray-800 w-40">
      {/* <Link to={''} className='flex items-center gap-2 p-4 hover:bg-blue-500 hover:text-white'>
        <FaUser />
        Profile
      </Link> */}
      <Link to={'newPost'} className='flex items-center gap-2 p-4 hover:bg-blue-500 hover:text-white'>
        <FaFilePen />
        New Post
      </Link>
      <Link to={'posts'} className='flex items-center gap-2 p-4 hover:bg-blue-500 hover:text-white'>
        <MdLocalPostOffice />
        Posts
      </Link>
      {/* <Link to={'notification'} className='flex items-center gap-2 p-4 hover:bg-blue-500 hover:text-white'>
        <IoIosNotifications />
        Notifications
      </Link> */}
      <Link to={'analytics'} className='flex items-center gap-2 p-4 hover:bg-blue-500 hover:text-white'>
        <DiGoogleAnalytics /> Analytics
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



