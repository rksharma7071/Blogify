import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link, useLoaderData } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

function CategoryBySlug() {
  const data = useLoaderData();
  const [category] = useState(data);
  const { posts } = useContext(AuthContext);
  const [postsData, setPostsDta] = useState([]);

  useEffect(() => {
    const getAllPost = async () => {
      try {
        // filter posts for this category
        const categoryPosts = posts.filter(
          (post) => post.category_id?._id === category._id && post.status === "published"
        );
        setPostsDta(categoryPosts);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    getAllPost();
  }, [category._id, posts]); // ✅ watch for category and posts changes

  return (
    <div className="max-w-7xl w-7xl mx-auto p-6">
      {/* Header */}
      <div className="bg-white p-6 mb-6">
        <h1 className="text-3xl font-bold text-gray-800">
          {category.name}
        </h1>
        <p className="mt-2 text-gray-600">{category.description}</p>
      </div>

      {/* Posts Section */}
      <div className="bg-gray-50 border border-gray-200 p-6">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">
          Posts in {category.name}
        </h2>

        {postsData.length > 0 ? (
          <ul className="space-y-4">
            {postsData.map((post) =>
              <li
                key={post._id}
                className="p-4 bg-white hover:shadow-md transition"
              >
                <h3 className="text-lg font-semibold">
                  <Link
                    to={`/blogs/${post.slug}`}
                    className="text-blue-600 hover:underline"
                  >
                    {post.title}
                  </Link>
                </h3>
                <p className="text-gray-600">
                  {post.content.slice(0, 320)}...
                </p>
                <p className="text-sm text-gray-400 mt-2">
                  By {`${post.author_id?.first_name} ${post.author_id?.last_name}` || "Unknown"} •{" "}
                  {new Date(post.createdAt).toLocaleDateString()}
                </p>
              </li>
            )}
          </ul>
        ) : (
          <p className="text-gray-500 italic">No posts in this category yet.</p>
        )}

      </div>
    </div>
  );
}

export default CategoryBySlug;
