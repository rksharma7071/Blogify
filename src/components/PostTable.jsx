import React from "react";
import { Link } from "react-router-dom";
import { deleteUserWithId } from "../api_fetch/user";
import { deletePostWithId } from "../api_fetch/post";

function PostTable({ refreshPosts, posts }) {
  const handleDeletePost = async (id) => {
    if (confirm("Do you want to delete post?")) {
      try {
        const response = await deletePostWithId(id);
        alert(response.data.message);
        await refreshPosts();
      } catch (error) {
        console.error("Error deleting post:", error);
      }
    }
  };

  return (
    <>
      <h1>All Posts</h1>
      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>S.No.</th>
            <th>ID</th>
            <th>Title</th>
            <th>Content</th>
            <th>Author</th>
            <th>Category</th>
            <th>Tags</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {posts.map((post, index) => (
            <tr key={post._id}>
              <td>{index + 1}</td>
              <td>{post._id}</td>
              <td>
                <strong>
                  <Link to={post._id}>{post.title}</Link>
                </strong>
              </td>
              <td>{post.content}</td>
              <td>{post.author_id?.username}</td>
              <td>{post.category_id?.name}</td>
              <td>
                {post.tags.map((tag) => (
                  <span key={tag._id}>{tag.name}, </span>
                ))}
              </td>
              <td>
                <button onClick={() => handleDeletePost(post._id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default PostTable;
