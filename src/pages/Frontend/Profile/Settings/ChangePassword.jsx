import axios from 'axios';
import React, { useEffect, useState } from 'react'

function ChangePassword() {
  const [userData, setUserData] = useState({
    email: "",
    oldPassword: "",
    newPassword: "",
  });
  const formValidation = () => {
    if (!userData.oldPassword || !userData.newPassword) {
      setMessage({ msg: "All fields are required", type: "error" });
      return false;
    }
    if (userData.oldPassword === userData.newPassword) {
      setMessage({ msg: "New password must be different from old password", type: "error" });
      return false;
    }
    return true;
  }

  const [message, setMessage] = useState({
    msg: "",
    type: ""
  });
  const API_BASE = import.meta.env.VITE_API;
  const changePassword = async () => {
    try {
      const response = await axios.post(`${API_BASE}/auth/change-password`, userData);
      setMessage({ msg: response.data.msg, type: "success" });
    } catch (error) {
      console.error("Error changing password:", error);
      setMessage({ msg: error.response.data.msg || "Error changing password", type: "error" });
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formValidation()) {
      changePassword();
      console.log("Form submitted with data:", userData);
    }
  }
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({ ...prev, [name]: value }));
  };
  useEffect(() => {
    const userString = localStorage.getItem("user");
    if (userString) {
      const user = JSON.parse(userString);
      setUserData((prev) => ({ ...prev, email: user.email }));

    }
  }, []);


  return (
    <div className="w-full mx-auto p-6 bg-white">
      <h1 className='text-2xl'>Change Password</h1>

      <form onSubmit={handleSubmit} className="max-w-xl mx-auto bg-white p-6">
        {message.type && (
          <p className={`mb-4 ${message.type === "success" ? "text-green-600" : "text-red-600"}`}>{message.msg}</p>
        )}


        <div className="pb-4">
          <label className="block text-gray-700 font-medium mb-1">Old Password</label>
          <input
            type="text"
            name="oldPassword"
            value={userData.oldPassword}
            onChange={handleChange}
            className="block border border-gray-300 w-full p-2 focus:outline-none focus:border-blue-400"
          />
        </div>
        <div className="pb-4">
          <label className="block text-gray-700 font-medium mb-1">New Password</label>
          <input
            type="text"
            name="newPassword"
            value={userData.newPassword}
            onChange={handleChange}
            className="block border border-gray-300 w-full p-2 focus:outline-none focus:border-blue-400"
          />
        </div>
        <div className="pt-4">
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  )
}

export default ChangePassword