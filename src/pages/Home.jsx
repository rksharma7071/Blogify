import React, { useState } from "react";
import { useLoaderData } from "react-router-dom";
import UserForm from "../components/UserForm";
import UserTable from "../components/UserTable";
import getAllUser from "../api_fetch/user";

function Home() {
  const loaderData = useLoaderData();
  const [users, setUsers] = useState(loaderData.data || []);

  const refreshUsers = async () => {
    const updatedUserData = await getAllUser();
    setUsers(updatedUserData.data || []);
  };

  if (!users) return <h1>Loading...</h1>;

  return (
    <div>
      <h1>Home</h1>
      <UserForm refreshUsers={refreshUsers} />
      <UserTable users={users} />
    </div>
  );
}

export default Home;
