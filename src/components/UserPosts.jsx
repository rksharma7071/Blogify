import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { FaEdit, FaTrash } from "react-icons/fa";
import { AuthContext } from "../context/AuthContext";

function UserPosts({ posts: initialPosts }) {
  const { capitalize } = useContext(AuthContext)

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

  // console.log("User Posts: ", posts)

  return (
    <div className="bg-white border border-gray-200">
      {posts.length === 0 ? (
        <div className="text-gray-500 text-center py-4">No posts found.</div>
      ) : (
        posts.map((post, index) => (
          <div
            key={post._id}
            className="p-3 flex items-center justify-between border-b rounded border-gray-50 text-gray-700 bg-gray-50"
          >
            <div className="flex items-center gap-4">
              <div className="text-sm font-medium text-gray-500">{index + 1}</div>
              {post.featured_image &&
                <div className="text-sm font-medium text-gray-500">
                  <img src={`http://localhost:3000${post.featured_image}`} alt={post.title} className="w-10 aspect-square object-contain" />
                </div>
              }
              <div className="text-md font-semibold">{post.title}</div>
              <div
                className={`px-2 py-1 rounded-full text-xs font-medium ${post.status === "published"
                  ? "bg-green-100 text-green-700"
                  : "bg-yellow-100 text-yellow-700"
                  }`}
              >{capitalize(post.status)}</div>

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
