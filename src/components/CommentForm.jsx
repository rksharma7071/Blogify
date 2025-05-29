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
    <div>
      <h1>Create New Comment</h1>
      <form onSubmit={handleCommentFormSubmit}>
        <div>
          <label id="user_id">User</label>
          <select
            name="user_id"
            id="user_id"
            onChange={handleChange}
            value={comment.user_id}
          >
            <option>Select User</option>
            {usersData.map((user, index) => (
              <option key={index} value={user._id}>
                {user.username}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label id="post_id">Post</label>
          <select
            name="post_id"
            id="post_id"
            onChange={handleChange}
            value={comment.post_id}
          >
            <option>Select Post</option>
            {postsData.map((post, index) => (
              <option key={index} value={post._id}>
                {post.title}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label id="content">Content</label>
          <textarea
            name="content"
            rows={5}
            cols={5}
            value={comment.content}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
}

export default CommentForm;
