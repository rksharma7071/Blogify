import React from "react";
import { useLoaderData } from "react-router-dom";

function UserWithId() {
  const user = useLoaderData();
  const { _id, username, first_name, last_name, email, role } = user.data;

  return (
    <div className="max-w-xl mx-auto mt-10 bg-white shadow-md rounded-lg p-6 border border-gray-200">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">
        Hi, {first_name + " " + last_name}
      </h1>

      <ul className="space-y-2 text-gray-700">
        <li>
          <span className="font-semibold">User ID:</span> {_id}
        </li>
        <li>
          <span className="font-semibold">Username:</span> {username}
        </li>
        <li>
          <span className="font-semibold">First Name:</span> {first_name}
        </li>
        <li>
          <span className="font-semibold">Last Name:</span> {last_name}
        </li>
        <li>
          <span className="font-semibold">Email:</span> {email}
        </li>
        <li>
          <span className="font-semibold">Role:</span>{" "}
          <span
            className={`inline-block px-2 py-1 rounded text-xs font-medium 
              ${role === "admin"
                ? "bg-red-100 text-red-800"
                : "bg-blue-100 text-blue-800"}`}
          >
            {role}
          </span>
        </li>
      </ul>
    </div>
  );
}

export default UserWithId;
