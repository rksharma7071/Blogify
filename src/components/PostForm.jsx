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

  const handlePostCreate = async (post) => {
    try {
      console.log(post);
      const response = await axios.post("/api/posts", {
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
    <div>
      <h1>Create New Post</h1>
      <form onSubmit={handlePostFormSubmit}>
        <div>
          <label>Title:</label>
          <input
            type="text"
            name="title"
            value={post.title}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Content:</label>
          <textarea
            name="content"
            rows={5}
            cols={5}
            value={post.content}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Author:</label>
          <select
            name="author_id"
            value={post.author_id}
            onChange={handleChange}
            required
          >
            <option>Select Author</option>
            {usersData.map((user, index) => (
              <option key={index} value={user._id}>{user.username}</option>
            ))}
          </select>
          {/* <input
            type="text"
            name="author_id"
            value={post.author_id}
            onChange={handleChange}
            required
          /> */}
        </div>
        <div>
          <label>Category: </label>
          <select
            name="category_id"
            value={post.category_id}
            onChange={handleChange}
            required
          >
            <option>Select Category</option>
            {categoriesData.map((category, index) => (
              <option key={index} value={category._id}>{category.name}</option>
            ))}
          </select>
          {/* <input
            type="text"
            name="category_id"
            value={post.category_id}
            onChange={handleChange}
            required
          /> */}
        </div>
        <div>
          <label>Tags (comma separated IDs):</label>
          <input
            type="text"
            name="tags"
            value={post.tags}
            onChange={handleTagsChange}
            required
          />
        </div>
        <div>
          <label>Status:</label>
          <select
            name="status"
            value={post.status}
            onChange={handleChange}
            required
          >
            <option>Select Status</option>
            <option value="draft">Draft</option>
            <option value="published">Published</option>
          </select>
        </div>
        <div>
          <label>Featured Image URL:</label>
          <input
            type="text"
            name="featured_image"
            value={post.featured_image}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Create Post</button>
      </form>
    </div>
  );
}

export default PostForm;
