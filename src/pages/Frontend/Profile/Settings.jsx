import React from 'react'
import { Link } from 'react-router-dom'

function Settings() {
    return (
        <div className='bg-white p-6'>
            <h1 className="text-2xl mb-6 text-gray-800">Settings</h1>
            <div className="flex gap-2">
                <Link to="/profile/account" className="px-4 py-2 rounded-md text-gray-700 hover:bg-gray-100">Account</Link>
                <Link to="/profile/social-links" className="px-4 py-2 rounded-md text-gray-700 hover:bg-gray-100">Social Links</Link>
                <Link to="/profile/site-settings" className="px-4 py-2 rounded-md text-gray-700 hover:bg-gray-100">Site Settings</Link>
            </div>
        </div>
    )
}

export default Settings