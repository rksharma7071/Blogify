import axios from "axios";
import React, { useState, useEffect } from "react";

function TagForm({ refreshTags, showToast, initialData }) {
  const [tag, setTag] = useState({ name: "" });

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
        await axios.patch(`/api/tags/${initialData._id}`, tag);
        showToast("Tag updated successfully!", "success");
      } else {
        // Add Mode
        await axios.post("/api/tags", tag);
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
      <h1>{initialData ? "Edit Tag" : "Create New Tag"}</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            id="name"
            onChange={handleChange}
            value={tag.name}
            required
          />
        </div>
        <div>
          <button type="submit">{initialData ? "Update" : "Submit"}</button>
        </div>
      </form>
    </div>
  );
}

export default TagForm;
