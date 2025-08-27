import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useLoaderData } from "react-router-dom";

function CategoryBySlug() {
  const data = useLoaderData();
  const [category] = useState(data);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const getAllPost = async () => {
      try {
        const response = await axios.get("/api/posts");
        // filter posts for this category
        const categoryPosts = response.data.filter(
          (post) => post.category_id?._id === category._id
        );
        setPosts(categoryPosts);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    getAllPost();
  }, [category._id]); // ✅ run only when category changes

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Header */}
      <div className="bg-white shadow-md rounded-2xl p-6 mb-6">
        <h1 className="text-3xl font-bold text-gray-800">
          {category.name}
        </h1>
        <p className="mt-2 text-gray-600">{category.description}</p>

        <div className="mt-4 flex items-center gap-4 text-sm text-gray-500">
          <span className="bg-gray-100 px-3 py-1 rounded-full">
            Slug: {category.slug}
          </span>
          <span>
            Created: {new Date(category.createdAt).toLocaleDateString()}
          </span>
          <span>
            Updated: {new Date(category.updatedAt).toLocaleDateString()}
          </span>
        </div>
      </div>

      {/* Posts Section */}
      <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">
          Posts in {category.name}
        </h2>

        {posts.length > 0 ? (
          <ul className="space-y-4">
            {posts.map((post) => (
              <li
                key={post._id}
                className="p-4 bg-white rounded-xl shadow hover:shadow-md transition"
              >
                <h3 className="text-lg font-semibold">
                    <Link to={`/blogs/${post.slug}`} className="text-blue-600 hover:underline">
                      {post.title}
                    </Link>
                </h3>
                <p className="text-gray-600">{post.content.slice(0, 320)}...</p>
                <p className="text-sm text-gray-400 mt-2">
                  By {post.author_id?.name || "Unknown"} •{" "}
                  {new Date(post.createdAt).toLocaleDateString()}
                </p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500 italic">No posts in this category yet.</p>
        )}
      </div>
    </div>
  );
}

export default CategoryBySlug;
