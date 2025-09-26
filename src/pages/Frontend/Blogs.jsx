import React, { useState } from "react";
import { Link, useLoaderData } from "react-router-dom";

function Blogs() {
  const { categoriesData, usersData, postsData } = useLoaderData();
  const [posts, setPosts] = useState(postsData);

  const getUserName = (userId) => {
    const user = usersData.find((user) => user._id === userId);
    return user ? `${user.first_name} ${user.last_name}` : "Unknown User";
  };

  const getCategoryTitle = (categoryId) => {
    const category = categoriesData.find((category) => category._id === categoryId);
    return category ? category.name : "Unknown Category";
  };

  const refreshPosts = async () => {
    const updatedPostData = await getAllPost();
    setPosts(updatedPostData.postsData || []);
  };

  // console.log(posts);
  if (!posts) return <h1 className="text-center text-2xl mt-10">Loading...</h1>;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {posts.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts
          .filter((post) => post.status === "published")
          .map((post) => (
            <div
              key={post._id}
              className="bg-white shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-300"
            >
              {/* Featured Image */}
              <div className="h-48 bg-gray-200 flex justify-center items-center overflow-hidden">
                {post.featured_image ? (
                  <img
                    src={post.featured_image}
                    alt={post.title}
                    title={post.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-gray-500 text-sm">No Image Available</span>
                )}
              </div>

              {/* Content */}
              <div className="p-5 space-y-2">
                {/* Category */}
                <span className="text-sm text-blue-600 font-medium">
                  {getCategoryTitle(post.category_id?._id)}
                </span>

                {/* Title */}
                <h3 className="text-xl font-semibold text-gray-800">
                  <Link to={`${post.slug}`} className="hover:underline">
                    {post.title}
                  </Link>
                </h3>

                {/* Preview Content */}
                <p className="text-gray-600 text-sm line-clamp-3">{post.content}</p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 text-xs mt-2">
                  {post.tags?.map((tag) => (
                    <span
                      key={tag._id}
                      className="bg-gray-100 text-gray-800 px-2 py-1 rounded-full"
                    >
                      #{tag.name}
                    </span>
                  ))}
                </div>

                {/* Author Info */}
                <div className="mt-4 text-xs text-gray-500 flex justify-between items-center">
                  <span>By {getUserName(post.author_id?._id)}</span>
                  <span
                    className={`px-2 py-1 rounded text-xs font-medium ${
                      post.status === "published"
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {post.status.charAt(0).toUpperCase() + post.status.slice(1)}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500 mt-10">No posts available.</p>
      )}
    </div>
  );
}

export default Blogs;
