import axios from "axios";
import React, { useState, useContext } from "react";
function CategoryForm({ refreshCategories }) {
  const [category, setCategory] = useState({
    name: "",
    description: "",
  });
  const API_BASE = import.meta.env.VITE_API;

  const handleChange = (e) => {
    setCategory({ ...category, [e.target.name]: e.target.value });
  };

  const handleCategoryCreate = async (category) => {
    try {
      await axios.post(`${API_BASE}/categories`, category);
      await refreshCategories();
      setCategory({
        name: "",
        description: "",
      });
    } catch (error) {
      console.error(
        "Error creating category:",
        error.response?.data?.msg || error.message
      );
    }
  };
  const handleCategoryFormSubmit = (e) => {
    e.preventDefault();
    handleCategoryCreate(category);
  };
  return (
    <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-md mt-6">
      <h1 className="text-2xl font-bold mb-6 text-gray-700">
        Create New Category
      </h1>
      <form onSubmit={handleCategoryFormSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 text-sm font-medium">Name</label>
          <input
            type="text"
            name="name"
            onChange={handleChange}
            value={category.name}
            required
            className="w-full border border-gray-300 p-2 rounded-md focus:ring focus:ring-blue-300"
          />
        </div>
        <div>
          <label className="block mb-1 text-sm font-medium">
            Description
          </label>
          <input
            type="text"
            name="description"
            onChange={handleChange}
            value={category.description}
            className="w-full border border-gray-300 p-2 rounded-md focus:ring focus:ring-blue-300"
          />
        </div>
        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default CategoryForm;
