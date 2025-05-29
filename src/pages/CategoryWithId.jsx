import React from "react";
import { useLoaderData } from "react-router-dom";

function CategoryWithId() {
  const category = useLoaderData();
  const { _id, name, description } = category.data;

  return (
    <div>
      <h1>Category: {_id}</h1>
      <p>
        Category Name: <strong>{name}</strong>
      </p>
      <p>
        Category Description: <strong>{description}</strong>
      </p>
    </div>
  );
}

export default CategoryWithId;
