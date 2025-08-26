import React from "react";
import { Link } from "react-router-dom";
import { deleteUserWithId } from "../../api_fetch/user";

function UserTable({ refreshUsers, users }) {
  const handleDeleteUser = async (id) => {
    if (confirm("Do you want to delete user?")) {
      try {
        const response = await deleteUserWithId(id);
        alert(response.data.message);
        await refreshUsers();
      } catch (error) {
        console.error("Error deleting user:", error);
      }
    }
  };

  return (
    <div className="bg-white shadow rounded-xl p-6">
      <h2 className="text-2xl font-bold mb-4">All Users</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm border">
          <thead>
            <tr className="bg-gray-100 text-left text-gray-600 uppercase text-xs">
              {["S.No.", "Username", "First Name", "Last Name", "Email", "Role", "Action"].map((heading, i) => (
                <th key={i} className="py-2 px-4 border-b">
                  {heading}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {users.length > 0 ? (
              users.map((user, index) => (
                <tr key={user._id} className="hover:bg-gray-50">
                  <td className="py-2 px-4 border-b">{index + 1}</td>
                  <td className="py-2 px-4 border-b font-semibold text-blue-600">
                    <Link to={user._id}>{user.username.toLowerCase()}</Link>
                  </td>
                  <td className="py-2 px-4 border-b">{user.first_name}</td>
                  <td className="py-2 px-4 border-b">{user.last_name}</td>
                  <td className="py-2 px-4 border-b">{user.email}</td>
                  <td className="py-2 px-4 border-b capitalize">{user.role}</td>
                  <td className="py-2 px-4 border-b">
                    <button
                      onClick={() => handleDeleteUser(user._id)}
                      className="text-red-600 hover:text-red-800 font-medium"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center py-4 text-gray-500">
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default UserTable;
