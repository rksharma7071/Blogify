import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Account() {
  const [user, setUser] = useState(null);
  const [userId, setUserId] = useState(null);
  const [userData, setUserData] = useState({
    first_name: "",
    last_name: "",
    username: "",
    email: "",
    role: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({ ...prev, [name]: value }));
  };

  const getUserWithId = async (userId) => {
    try {
      const response = await axios.get(`/api/users/${userId}`);
      return response.data;
    } catch (error) {
      console.error("Failed to fetch user", error.response?.data || error.message);
      return null;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!userId) return;

    try {
      const response = await axios.patch(`/api/users/${userId}`, userData);
      setUser(response.data);
      alert("User updated successfully!");
    } catch (error) {
      console.error("Update failed:", error.response?.data || error.message);
    }
  };

  useEffect(() => {
    const fetchUser = async () => {
      const userString = localStorage.getItem("user");
      if (!userString) return navigate("/signIn");

      try {
        const parsedUser = JSON.parse(userString);
        setUserId(parsedUser.id);

        const userDetails = await getUserWithId(parsedUser.id);
        if (userDetails) {
          setUser(userDetails);
          setUserData({
            first_name: userDetails.first_name || "",
            last_name: userDetails.last_name || "",
            username: userDetails.username || "",
            email: userDetails.email || "",
            role: userDetails.role || ""
          });
        }
      } catch (e) {
        console.error("Failed to load user", e);
      }
    };

    fetchUser();
  }, []);


  return (
    <div className="w-full mx-auto p-6 bg-white">
      <h1 className="text-2xl mb-4">Account Details</h1>
      {user ? (
        <form onSubmit={handleSubmit} className="max-w-xl mx-auto bg-white p-6">
          <div className="pb-4">
            <label className="block text-gray-700 font-medium mb-1">Username</label>
            <input
              type="text"
              name="username"
              value={userData.username}
              onChange={handleChange}
              className="block border border-gray-300 w-full p-2 focus:outline-none focus:border-blue-400"
            />
          </div>
          <div className='pb-4'>
            <label className="block text-gray-700 font-medium mb-1">First Name</label>
            <input
              type="text"
              name="first_name"
              value={userData.first_name}
              onChange={handleChange}
              className="block border border-gray-300 w-full p-2 focus:outline-none focus:border-blue-400"
            />
          </div>

          <div className="pb-4">
            <label className="block text-gray-700 font-medium mb-1">Last Name</label>
            <input
              type="text"
              name="last_name"
              value={userData.last_name}
              onChange={handleChange}
              className="block border border-gray-300 w-full p-2 focus:outline-none focus:border-blue-400"
            />
          </div>



          <div className="pb-4">
            <label className="block text-gray-700 font-medium mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={userData.email}
              onChange={handleChange}
              className="block border border-gray-300 w-full p-2 focus:outline-none focus:border-blue-400"
            />
          </div>

          <div className="pb-4">
            <label className="block text-gray-700 font-medium mb-1">Role</label>
            <input
              type="text"
              name="role"
              value={userData.role}
              onChange={handleChange}
              className="block border border-gray-300 w-full p-2 focus:outline-none focus:border-blue-400"
              disabled // Optional: lock role editing for non-admins
            />
          </div>

          <div className="pt-4">
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4"
            >
              Update
            </button>
          </div>
        </form>
      ) : (
        <p>Loading user info...</p>
      )}
    </div>
  );
}

export default Account;
