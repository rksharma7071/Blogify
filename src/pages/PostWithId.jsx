import React from "react";
import { useLoaderData } from "react-router-dom";

function PostWithId() {
  const post = useLoaderData();
  console.log(post.data);
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
    <div className="post-with-id-container">
      {/* <h1>Post ID: {_id}</h1> */}
      <img
        src={featured_image}
        alt={title}
        style={{ width: "600px", height: "auto" }}/>
      <h1 className="post-with-id-title">{title}</h1>
      <p className="post-with-id-content">{content}</p>
      <p>Author: {author_id.first_name} {author_id.last_name}</p>
      <p>Category: {category_id.name}</p>
      <p>
        Status:
        <span
          style={{ backgroundColor: status === "published" ? "green" : "red" }}
        >
          {status}
        </span>
      </p>

      <p></p>
    </div>
  );
}

export default PostWithId;
// import React from "react";
// import { useLoaderData } from "react-router-dom";