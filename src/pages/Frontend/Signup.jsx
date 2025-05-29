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

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/auth/signup", formData);

      localStorage.setItem("token", res.data.token);
      setMessage("Signup successful!");
      setFormData({
        username: "",
        email: "",
        password: "",
        first_name: "",
        last_name: "",
      })

    } catch (err) {
      console.error(err);
      setMessage(err.response?.data?.msg || "Signup failed.");
    }
  };

  return (
    <div>
      <h1>Sign Up</h1>
      <form onSubmit={handleSignup}>
        <div>
          <label>Username:</label>
          <input
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>First Name:</label>
          <input
            name="first_name"
            value={formData.first_name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Last Name:</label>
          <input
            name="last_name"
            value={formData.last_name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <button type="submit">Submit</button>
        </div>
        {message && <p>{message}</p>}
        <div>
          <p>
            Already have an account? <a href="/signin">Sign In</a>
          </p>
        </div>
      </form>
    </div>
  );
}

export default Signup;
