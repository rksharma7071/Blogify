import React, { useState } from "react";
import { useLoaderData } from "react-router-dom";
import { getAllUser } from "../api_fetch/user";
import UserForm from "../components/UserForm";
import UserTable from "../components/UserTable";

function User() {
  const loaderData = useLoaderData();
  const [users, setUsers] = useState(loaderData.data || []);

  const refreshUsers = async () => {
    const updatedUserData = await getAllUser();
    setUsers(updatedUserData.data || []);
  };

  if (!users) return <h1 className="text-center text-gray-500 mt-10">Loading...</h1>;

  return (
    <div className="max-w-5xl mx-auto p-6">
      <UserForm refreshUsers={refreshUsers} />
      <UserTable refreshUsers={refreshUsers} users={users} />
    </div>
  );
}

export default User;
