import axios from "axios";
import React, { useState } from "react";

function PostForm({ refreshPosts, usersData, categoriesData }) {
  const [post, setPost] = useState({
    title: "",
    content: "",
    author_id: "",
    category_id: "",
    tags: "",
    status: "",
    featured_image: "",
  });

  const handleChange = (e) => {
    setPost({ ...post, [e.target.name]: e.target.value });
  };

  const handleTagsChange = (e) => {
    const value = e.target.value;
    setPost({ ...post, tags: value.split(",").map((tag) => tag.trim()) });
  };
  const API_BASE = import.meta.env.VITE_API;
  

  const handlePostCreate = async (post) => {
    try {
      console.log(post);
      const response = await axios.post(`${API_BASE}/posts`, {
        title: post.title,
        content: post.content,
        author_id: post.author_id,
        category_id: post.category_id,
        tags: post.tags,
        status: post.status,
        featured_image: post.featured_image,
      });
      console.log("Post created successfully:", response.data);
      await refreshPosts();
      setPost({
        title: "",
        content: "",
        author_id: "",
        category_id: "",
        tags: "",
        status: "",
        featured_image: "",
      });
    } catch (error) {
      console.error("Error creating post:", error);
      if (error.response) {
        console.error("Response error data:", error.response.data);
      }
      alert("An error occurred while creating the post. Please try again.");
    }
  };

  const handlePostFormSubmit = (e) => {
    e.preventDefault();
    handlePostCreate(post);
    console.log("Form Submitted Successfully!");
  };

  return (
    <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-md mt-6">
      <h1 className="text-2xl font-bold mb-6 text-gray-700">Create New Post</h1>
      <form onSubmit={handlePostFormSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 text-sm font-medium">Title</label>
          <input
            type="text"
            name="title"
            value={post.title}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 p-2 rounded-md focus:ring focus:ring-blue-300"
          />
        </div>
        <div>
          <label className="block mb-1 text-sm font-medium">Content</label>
          <textarea
            name="content"
            rows={5}
            value={post.content}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 p-2 rounded-md focus:ring focus:ring-blue-300"
          />
        </div>
        <div>
          <label className="block mb-1 text-sm font-medium">Author</label>
          <select
            name="author_id"
            value={post.author_id}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 p-2 rounded-md focus:ring focus:ring-blue-300"
          >
            <option value="">Select Author</option>
            {usersData.map((user, index) => (
              <option key={index} value={user._id}>
                {user.username}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block mb-1 text-sm font-medium">Category</label>
          <select
            name="category_id"
            value={post.category_id}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 p-2 rounded-md focus:ring focus:ring-blue-300"
          >
            <option value="">Select Category</option>
            {categoriesData.map((category, index) => (
              <option key={index} value={category._id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block mb-1 text-sm font-medium">
            Tags (comma separated)
          </label>
          <input
            type="text"
            name="tags"
            value={post.tags}
            onChange={handleTagsChange}
            className="w-full border border-gray-300 p-2 rounded-md focus:ring focus:ring-blue-300"
          />
        </div>
        <div>
          <label className="block mb-1 text-sm font-medium">Status</label>
          <select
            name="status"
            value={post.status}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 p-2 rounded-md focus:ring focus:ring-blue-300"
          >
            <option value="">Select Status</option>
            <option value="draft">Draft</option>
            <option value="published">Published</option>
          </select>
        </div>
        <div>
          <label className="block mb-1 text-sm font-medium">
            Featured Image URL
          </label>
          <input
            type="text"
            name="featured_image"
            value={post.featured_image}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 rounded-md focus:ring focus:ring-blue-300"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition"
        >
          Create Post
        </button>
      </form>
    </div>
  );
}

export default PostForm;
