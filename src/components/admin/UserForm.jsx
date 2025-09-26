import axios from "axios";
import React, { useState } from "react";

function UserForm({ refreshUsers }) {
  const [user, setUser] = useState({
    username: "",
    first_name: "",
    last_name: "",
    password: "",
    email: "",
    role: "author",
  });
  const API_BASE = process.env.REACT_APP_API_BASE;
  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleUserCreate = async (userData) => {
    try {
      await axios.post(`${API_BASE}/auth/signup`, userData);
      await refreshUsers();
      setUser({
        username: "",
        first_name: "",
        last_name: "",
        password: "",
        email: "",
        role: "author",
      });
    } catch (error) {
      console.error(
        "Error creating user:",
        error.response?.data?.msg || error.message
      );
    }
  };

  const handleUserForm = (e) => {
    e.preventDefault();
    handleUserCreate(user);
  };

  return (
    <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-md mt-6">
      <h1 className="text-2xl font-bold mb-6 text-gray-700">Create New User</h1>
      <form onSubmit={handleUserForm} className="space-y-4">
        {[
          ["username", "Username", "text"],
          ["password", "Password", "password"],
          ["first_name", "First Name", "text"],
          ["last_name", "Last Name", "text"],
          ["email", "Email", "email"],
        ].map(([name, label, type]) => (
          <div key={name}>
            <label htmlFor={name} className="block mb-1 text-sm font-medium">
              {label}
            </label>
            <input
              type={type}
              id={name}
              name={name}
              value={user[name]}
              onChange={handleChange}
              className="w-full border border-gray-300 p-2 rounded-md focus:ring focus:ring-blue-300"
              required
            />
          </div>
        ))}

        <button
          type="submit"
          className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default UserForm;
