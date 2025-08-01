import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaEdit, FaTrash } from "react-icons/fa";

function UserPosts({ posts: initialPosts }) {
  const [posts, setPosts] = useState(initialPosts || []);

  useEffect(() => {
    // Sync local posts state when prop changes
    setPosts(initialPosts);
  }, [initialPosts]);

  const handleEdit = (postSlug) => {
    console.log("Edit Post Slug:", postSlug);
    // e.g., navigate(`/edit-post/${postSlug}`);
  };

  const handleDelete = async (postSlug) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this post?"
    );
    if (!confirmDelete) return;

    try {
      await axios.delete(`/api/posts/${postSlug}`);
      console.log("Post deleted:", postSlug);

      // Remove the deleted post from state to update UI immediately
      setPosts((prevPosts) =>
        prevPosts.filter((post) => post.slug !== postSlug)
      );
    } catch (error) {
      console.error("Delete failed:", error);
    }
  };
  
  console.log("User Posts: ", posts)

  return (
    <div className="bg-white border border-gray-200 p-4">
      {posts.length === 0 ? (
        <div className="text-gray-500 text-center py-4">No posts found.</div>
      ) : (
        posts.map((post, index) => (
          <div
            key={post._id}
            className="p-2 flex items-center justify-between border-b border-gray-100 text-gray-700"
          >
            <div className="flex items-center gap-4">
              <div className="text-sm font-medium text-gray-500">{index + 1}</div>
              <div className="text-md font-semibold">{post.title}</div>
              <div className="text-sm text-gray-400">
                {new Date(post.createdAt).toLocaleDateString()}
              </div>
            </div>
            <div className="flex items-center gap-3 text-gray-500">
              <button
                onClick={() => handleEdit(post.slug)}
                className="hover:text-blue-600"
                aria-label={`Edit post ${post.title}`}
              >
                <FaEdit />
              </button>
              <button
                onClick={() => handleDelete(post.slug)}
                className="hover:text-red-600"
                aria-label={`Delete post ${post.title}`}
              >
                <FaTrash />
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default UserPosts;
