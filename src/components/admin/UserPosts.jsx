import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { FaEdit, FaTrash } from "react-icons/fa";
import { AuthContext } from "../../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";

function UserPosts({ posts: initialPosts, query }) {
  const { capitalize } = useContext(AuthContext)
  const navigate = useNavigate();
  const [posts, setPosts] = useState(initialPosts || []);

  useEffect(() => {
    initialPosts = initialPosts.filter((post) =>
      post.title.toLowerCase().includes(query.toLowerCase()) ||
      post.content.toLowerCase().includes(query.toLowerCase())
    )
    setPosts(initialPosts);
  }, [initialPosts, query]);



  const handleEdit = (postSlug) => {
    console.log("Edit Post Slug:", postSlug);
    navigate(`/profile/editPost/${postSlug}`);
  };

  const handleDelete = async (postSlug) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this post?"
    );
    if (!confirmDelete) return;

    try {
      await axios.delete(`/api/posts/${postSlug}`);
      console.log("Post deleted:", postSlug);

      setPosts((prevPosts) =>
        prevPosts.filter((post) => post.slug !== postSlug)
      );
    } catch (error) {
      console.error("Delete failed:", error);
    }
  };

  // console.log("User Posts: ", posts)

  return (
    <>
      <div className="min-w-full border border-gray-200">
        <table className="min-w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700"></th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700"></th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Title</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">URL Key</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Category</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Published</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Modified</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Status</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Action</th>
            </tr>
          </thead>
          <tbody>
            {posts.length === 0 ? (
              <tr>
                <td colSpan="4" className="text-gray-500 text-center py-6">
                  No posts found.
                </td>
              </tr>
            ) : (
              posts.map((post, index) => (
                <tr
                  key={post._id}
                  className={`hover:bg-gray-50 transition-colors duration-200 hover:cursor-pointer ${posts.length != index + 1 ? 'border-b border-gray-200' : ''} `}
                >
                  <td className="p-2 text-sm text-gray-600 text-center">
                    <input type="checkbox" name={post.slug} id={post.slug} className="w-3 h-3 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-0 cursor-pointer" />
                  </td>
                  <td className="p-2 text-sm text-gray-600">
                    <img src={post.featured_image} alt={post.title} className="w-20 object-cover border border-dashed rounded-lg border-gray-300" />
                  </td>
                  <td className="p-2 text-sm font-medium text-gray-800">
                    <Link to={`/blogs/${post.slug}`}>{post.title}</Link>
                  </td>
                  <td className="p-2 text-sm font-medium text-gray-800">{post.slug}</td>
                  <td className="p-2 text-sm font-medium text-gray-800">{post.category_id.name}</td>
                  <td className="p-2 text-sm font-medium text-gray-800">{new Date(post.createdAt).toLocaleString('en-US', {
                    month: 'short',
                    day: '2-digit',
                    year: 'numeric',
                    hour: 'numeric',
                    minute: '2-digit',
                    second: '2-digit',
                    hour12: true
                  })}</td>
                  <td className="p-2 text-sm font-medium text-gray-800">{new Date(post.updatedAt).toLocaleString('en-US', {
                    month: 'short',
                    day: '2-digit',
                    year: 'numeric',
                    hour: 'numeric',
                    minute: '2-digit',
                    second: '2-digit',
                    hour12: true
                  })}</td>
                  <td className="p-2">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${post.status === "published"
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                        }`}
                    >
                      {capitalize(post.status)}
                    </span>
                  </td>
                  <td className="p-2">
                    <div className="flex items-center gap-3 text-gray-500">
                      <button
                        onClick={() => handleEdit(post.slug)}
                        className="hover:text-blue-600 transition-colors"
                        aria-label={`Edit post ${post.title}`}
                      >
                        <FaEdit />
                      </button>
                      <button
                        onClick={() => handleDelete(post.slug)}
                        className="hover:text-red-600 transition-colors"
                        aria-label={`Delete post ${post.title}`}
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </>

  );
}

export default UserPosts;
