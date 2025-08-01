import React from 'react'
import { Link } from 'react-router-dom'
import { RiDashboardFill } from "react-icons/ri";
import { MdAccountCircle, MdLogout } from "react-icons/md";
import { MdVpnKey } from "react-icons/md";
function ProfileHeader({ handleLogout }) {
  return (
    <div className="bg-white text-gray-800 w-60">
      <Link to={'dashboard'} className='flex items-center gap-2 p-4 hover:bg-blue-500 hover:text-white'>
        <RiDashboardFill />
        Dashboard
      </Link>
      <Link to={'account'} className='flex items-center gap-2 p-4 hover:bg-blue-500 hover:text-white'>
        <MdAccountCircle /> Account Details
      </Link>
      <Link to={'change-password'} className='flex items-center gap-2 p-4 hover:bg-blue-500 hover:text-white'>
        <MdVpnKey />Change Password
      </Link>
      <div className='flex items-center gap-2 cursor-pointer p-4 hover:bg-blue-500 hover:text-white' onClick={handleLogout}>
        <MdLogout className="text-lg" /> Logout
      </div>
    </div >
  )
}

export default ProfileHeader