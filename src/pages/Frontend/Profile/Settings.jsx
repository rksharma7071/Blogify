import React from 'react'
import { Link, NavLink, Outlet } from 'react-router-dom'

function Settings() {
    return (
        <div className='bg-white p-6'>
            <h1 className="text-2xl mb-6 text-gray-800">Settings</h1>
            <div className="flex gap-2">
                <NavLink to="/profile/settings" className={({ isActive }) => `px-4 py-2 ${isActive ? "bg-blue-500 text-white" : "text-gray-700 hover:bg-gray-100"}`}>Account</NavLink>
                <NavLink to="/profile/settings/social-links" className={({ isActive }) => `px-4 py-2 ${isActive ? "bg-blue-500 text-white" : "text-gray-700 hover:bg-gray-100"}`}>Social Links</NavLink>
                {/* <NavLink to="/profile/settings/site-settings" className={({ isActive }) => `px-4 py-2 ${isActive ? "bg-blue-500 text-white" : "text-gray-700 hover:bg-gray-100"}`}>Site Settings</NavLink> */}
                <NavLink to="/profile/settings/change-password" className={({ isActive }) => `px-4 py-2 ${isActive ? "bg-blue-500 text-white" : "text-gray-700 hover:bg-gray-100"}`}>Change Password</NavLink>
            </div>
            <Outlet />
        </div>
    )
}

export default Settings