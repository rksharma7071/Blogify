import React from "react";
import { useLoaderData } from "react-router-dom";

function BlogById() {
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
    <div className="max-w-3xl mx-auto px-4 py-10 my-10 bg-white shadow-md">
      <img
        src={`http://localhost:3000${featured_image}`}
        alt={title}
        className="w-full h-auto mb-6 object-cover"
      />

      <h1 className="text-3xl font-bold text-gray-800 mb-4">{title}</h1>

      <div className="my-6 text-gray-700 leading-relaxed text-base">
        {content}
      </div>

      <div className="text-sm text-gray-500 mb-2">
        <p>
          <span className="font-medium text-gray-700">Author:</span>{" "}
          {author_id.first_name} {author_id.last_name}
        </p>
        <p>
          <span className="font-medium text-gray-700">Category:</span>{" "}
          {category_id.name}
        </p>

        {/* <p>
          <span className="font-medium text-gray-700">Status:</span>{" "}
          <span
            className={`inline-block px-2 py-1 text-xs font-semibold rounded-full ${
              status === "published"
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {status}
          </span>
        </p> */}
      </div>
    </div>
  );
}

export default BlogById;
