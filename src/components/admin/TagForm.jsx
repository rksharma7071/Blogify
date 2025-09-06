import axios from "axios";
import React, { useState, useEffect } from "react";

function TagForm({ refreshTags, showToast, initialData }) {
  const [tag, setTag] = useState({ name: "" });
  const API_BASE = process.env.REACT_APP_API_BASE;
  // Pre-fill form in edit mode
  useEffect(() => {
    if (initialData) {
      setTag({ name: initialData.name });
    }
  }, [initialData]);

  const handleChange = (e) => {
    setTag({ ...tag, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (initialData?._id) {
        // Edit Mode
        await axios.patch(`${API_BASE}/tags/${initialData._id}`, tag);
        showToast("Tag updated successfully!", "success");
        
      } else {
        // Add Mode
        await axios.post(`${API_BASE}/tags`, tag);
        showToast("Tag created successfully!", "success");
      }
      await refreshTags();
      setTag({ name: "" });
    } catch (error) {
      console.error("Error saving tag:", error);
      showToast(
        error.response?.data?.msg || error.message || "Error saving tag",
        "error"
      );
    }
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">
        {initialData ? "Edit Tag" : "Create New Tag"}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            Name
          </label>
          <input
            type="text"
            name="name"
            id="name"
            onChange={handleChange}
            value={tag.name}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            {initialData ? "Update" : "Submit"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default TagForm;
