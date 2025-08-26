import axios from "axios";
import React, { useState } from "react";

function CommentForm({ commentsData, usersData, postsData, refreshComments }) {
  const [comment, setComment] = useState({
    post_id: "",
    user_id: "",
    content: "",
  });

  const handleChange = (e) => {
    setComment({ ...comment, [e.target.name]: e.target.value });
  };

  const handleCommentCreate = async (comment) => {
    try {
      await axios.post("/api/comments", comment);
      await refreshComments();
      setComment({
        post_id: "",
        user_id: "",
        content: "",
      });
    } catch (error) {
      console.error(
        "Error creating comment:",
        error.response?.data?.msg || error.message
      );
    }
  };

  const handleCommentFormSubmit = (e) => {
    e.preventDefault();
    handleCommentCreate(comment);
  };

  return (
    <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-md mt-6">
      <h1 className="text-2xl font-bold mb-6 text-gray-700">Create New Comment</h1>
      <form onSubmit={handleCommentFormSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            User
          </label>
          <select
            name="user_id"
            onChange={handleChange}
            value={comment.user_id}
            required
            className="w-full border border-gray-300 p-2 rounded-md focus:ring focus:ring-blue-300"
          >
            <option value="">Select User</option>
            {usersData.map((user, index) => (
              <option key={index} value={user._id}>
                {user.username}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Post
          </label>
          <select
            name="post_id"
            onChange={handleChange}
            value={comment.post_id}
            required
            className="w-full border border-gray-300 p-2 rounded-md focus:ring focus:ring-blue-300"
          >
            <option value="">Select Post</option>
            {postsData.map((post, index) => (
              <option key={index} value={post._id}>
                {post.title}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Content
          </label>
          <textarea
            name="content"
            rows={5}
            value={comment.content}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 p-2 rounded-md focus:ring focus:ring-blue-300 resize-none"
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

export default CommentForm;
