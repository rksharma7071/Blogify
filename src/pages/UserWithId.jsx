import React from "react";
import { useLoaderData } from "react-router-dom";

function UserWithId() {
  const user = useLoaderData();
  const { _id, username, first_name, last_name, email, role } = user.data;

  return (
    <div>
      <h1>Hi {first_name + " " + last_name},</h1>
      <p>
        User ID: <strong>{_id}</strong>
      </p>
      <p>
        Username: <strong>{username}</strong>
      </p>
      <p>
        First Name: <strong>{first_name}</strong>
      </p>
      <p>
        Last Name: <strong>{last_name}</strong>
      </p>
      <p>
        Email: <strong>{email}</strong>
      </p>
      <p>
        Role <strong>{role}</strong>
      </p>
    </div>
  );
}

export default UserWithId;
