import React from "react";
import { useLoaderData } from "react-router-dom";

function PostWithId() {
  const post = useLoaderData();
  const {
    _id,
    author_id,
    category_id,
    content,
    featured_image,
    status,
    title,
  } = post.data;

  return (
    <div className="max-w-3xl mx-auto p-6 mt-10 bg-white shadow-md rounded-lg border border-gray-200">
      {/* Featured Image */}
      <img
        src={featured_image}
        alt={title}
        title={title}
        className="w-full h-auto rounded-lg mb-6 object-cover"
      />

      {/* Title */}
      <h1 className="text-3xl font-bold text-gray-800 mb-4">{title}</h1>

      

      {/* Status */}
      <p className="mb-4">
        <span
          className={`inline-block px-3 py-1 rounded-full text-xs font-medium 
            ${status === "published"
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-800"}`}
        >
          {status}
        </span>
      </p>

      {/* Content */}
      <div className="prose max-w-none text-gray-700 leading-relaxed">
        {content}
      </div>

      {/* Author & Category */}
      <div className="flex flex-wrap gap-4 mb-4 text-sm text-gray-600">
        <span>
          <strong>Author:</strong> {author_id.first_name} {author_id.last_name}
        </span>
        <span>
          <strong>Category:</strong> {category_id.name}
        </span>
      </div>
    </div>
  );
}

export default PostWithId;
