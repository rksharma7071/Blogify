import axios from "axios";
import React, { useState } from "react";

function CategoryForm({ refreshCategories }) {
  const [category, setCategory] = useState({
    name: "",
    description: "",
  });

  const handleChange = (e) => {
    setCategory({ ...category, [e.target.name]: e.target.value });
  };

  const handleCategoryCreate = async (category) => {
    try {
      await axios.post("/api/categories", category);
      await refreshCategories();
      setCategory({
        name: "",
        description: "",
      })
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
    <div>
      <h1>Create New Category</h1>
      <form onSubmit={handleCategoryFormSubmit}>
        <div>
          <label>Name</label>
          <input
            type="text"
            name="name"
            onChange={handleChange}
            value={category.name}
          />
        </div>
        <div>
          <label>Description</label>
          <input
            type="text"
            name="description"
            onChange={handleChange}
            value={category.description}
          />
        </div>
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
}

export default CategoryForm;
