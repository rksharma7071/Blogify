import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from "../../context/AuthContext";

function Profile() {
  const [user, setUser] = useState(null);
  const { isLoggedIn, logout } = useContext(AuthContext);
  
  useEffect(() => {
    const userString = localStorage.getItem('user');
    if (userString) {
      try {
        setUser(JSON.parse(userString));
      } catch (e) {
        console.error('Failed to parse user from localStorage', e);
      }
    }
  }, []);

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-2xl shadow-md">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-900">Profile</h1>

      {user ? (
        <div className="space-y-4 text-gray-700">
          <p>
            <span className="font-semibold">Username:</span> {user.username}
          </p>
          <p>
            <span className="font-semibold">Name:</span> {user.first_name} {user.last_name}
          </p>
          <p>
            <span className="font-semibold">Email:</span> {user.email}
          </p>
          <p>
            <span className="font-semibold">Role:</span> {user.role || 'N/A'}
          </p>
          <p onClick={logout}>Logout</p>
        </div>
      ) : (
        <p className="text-center text-gray-500">Loading user data...</p>
      )}
    </div>
  );
}

export default Profile;
