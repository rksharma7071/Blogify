import React from "react";
import { Link } from "react-router-dom";
import { deleteUserWithId } from "../api_fetch/user";

function UserTable({ refreshUsers, users }) {
  const handleDeleteUser = async (id) => {
    if (confirm("Do you want to delete user?")) {
      try {
        const response = await deleteUserWithId(id);
        console.log(response.data);
        alert(response.data.message);
        await refreshUsers();
      } catch (error) {
        console.error("Error deleting user:", error);
      }
    }
  };

  return (
    <>
      <h1>All Users</h1>
      <table border={1} cellPadding="10">
        <thead>
          <tr>
            <th>S.No.</th>
            <th>Username</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users && users.length > 0 ? (
            users.map((user, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>
                  <strong>
                    <Link to={user._id}>{user.username.toLowerCase()}</Link>
                  </strong>
                </td>
                <td>{user.first_name} </td>
                <td>{user.last_name} </td>
                <td>{user.email}</td>
                <td>
                  {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                </td>
                <td>
                  <button onClick={() => handleDeleteUser(user._id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <p>No users found</p>
          )}
          <tr></tr>
        </tbody>
      </table>
    </>
  );
}

export default UserTable;
