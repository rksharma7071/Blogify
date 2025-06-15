import React from "react";
import { useLoaderData } from "react-router-dom";

function CategoryWithId() {
  const category = useLoaderData();
  const { _id, name, description } = category.data;

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md border border-gray-200">
      <h1 className="text-2xl font-semibold text-gray-800 mb-4">
        Category Details
      </h1>

      <div className="space-y-3 text-gray-700">
        <p>
          <span className="font-medium text-gray-600">Category ID:</span>{" "}
          <span className="text-gray-900">{_id}</span>
        </p>
        <p>
          <span className="font-medium text-gray-600">Name:</span>{" "}
          <span className="text-gray-900">{name}</span>
        </p>
        <p>
          <span className="font-medium text-gray-600">Description:</span>{" "}
          <span className="text-gray-900">{description}</span>
        </p>
      </div>
    </div>
  );
}

export default CategoryWithId;
