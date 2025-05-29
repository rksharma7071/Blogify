import React from "react";
import { useLoaderData } from "react-router-dom";

function TagWithId() {
  const tag = useLoaderData();
  const { _id, name } = tag.data;
  console.log(_id, name);
  return <div>
    <h1>Tag Id: {_id}</h1>
    <p>Tag: <strong>{name}</strong></p>
  </div>;
}

export default TagWithId;
