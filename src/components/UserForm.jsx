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

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleUserCreate = async (userData) => {
    try {
      await axios.post("/api/auth/signup", userData);
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
    <div>
      <h1>Create New User</h1>
      <form onSubmit={handleUserForm}>
        <div>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            value={user.username}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={user.password}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="first_name">First Name</label>
          <input
            type="text"
            id="first_name"
            name="first_name"
            value={user.first_name}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="last_name">Last Name</label>
          <input
            type="text"
            id="last_name"
            name="last_name"
            value={user.last_name}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={user.email}
            onChange={handleChange}
          />
        </div>
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
}

export default UserForm;
