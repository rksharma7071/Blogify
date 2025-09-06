import axios from "axios";
import React, { useState } from "react";

function Signup() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    first_name: "",
    last_name: "",
  });
  const [message, setMessage] = useState("");
  const API_BASE = import.meta.env.VITE_API;
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${API_BASE}/auth/signup`, formData);
      localStorage.setItem("token", res.data.token);
      setMessage("Signup successful!");
      setFormData({
        username: "",
        email: "",
        password: "",
        first_name: "",
        last_name: "",
      });
    } catch (err) {
      console.error(err);
      setMessage(err.response?.data?.msg || "Signup failed.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg">
        <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">Sign Up</h1>

        <form onSubmit={handleSignup} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-600">Username</label>
            <input
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600">First Name</label>
            <input
              name="first_name"
              value={formData.first_name}
              onChange={handleChange}
              required
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600">Last Name</label>
            <input
              name="last_name"
              value={formData.last_name}
              onChange={handleChange}
              required
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md transition"
          >
            Submit
          </button>

          {message && (
            <p
              className={`text-center text-sm ${message.includes("successful") ? "text-green-600" : "text-red-600"
                }`}
            >
              {message}
            </p>
          )}

          <div className="text-center text-sm text-gray-600">
            Already have an account?{" "}
            <a href="/signin" className="text-blue-600 hover:underline">
              Sign In
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;
