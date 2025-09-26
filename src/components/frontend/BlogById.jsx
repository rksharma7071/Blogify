import React, { useContext } from "react";
import { useLoaderData } from "react-router-dom";
import Comment from "./Comment";
import { AuthContext } from "../../context/AuthContext";
import { Meta, Title } from "react-head";

function BlogById() {
  const post = useLoaderData();
  const { isLoggedIn } = useContext(AuthContext);
  if (!post) return <h1 className="text-center text-2xl mt-10">Loading...</h1>;
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
      <Title>{title}</Title>
      <Meta
        name="description"
        content={content.length > 150 ? content.slice(0, 150) + "…" : content}
      />
      <Meta
        name="keywords"
        content={`${title.split(" ")
          .map(word => word.toLowerCase())
          .join(", ")
          }, ${category_id.name
            .split(" ")
            .map(word => word.toLowerCase())
            .join(", ")}`}
      />
      <Meta
        name="title"
        content={title}
      />
      <Meta
        name="image"
        content={featured_image}
      />
      <img
        src={featured_image}
        alt={title}
        title={title}
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
      {isLoggedIn &&
        <Comment post_id={_id} />
      }
    </div>
  );
}

export default BlogById;
