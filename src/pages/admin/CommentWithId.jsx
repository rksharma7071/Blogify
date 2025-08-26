import React from "react";
import { useLoaderData } from "react-router-dom";

function CommentWithId() {
  const { commentsData, usersData, postsData } = useLoaderData();
  const { _id, post_id, user_id, content } = commentsData;

  const getPostTitle = (postId) => {
    const post = postsData.find((post) => post._id === postId);
    return post ? post.title : "Unknown Post";
  };

  const getUserName = (userId) => {
    const user = usersData.find((user) => user._id === userId);
    return user ? `${user.first_name} ${user.last_name}` : "Unknown User";
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md border border-gray-200">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">
        Comment Details
      </h1>

      <div className="space-y-3 text-gray-700">
        <p>
          <span className="font-medium text-gray-600">Comment ID:</span>{" "}
          <span className="text-gray-900">{_id}</span>
        </p>
        <p>
          <span className="font-medium text-gray-600">Post:</span>{" "}
          <span className="text-gray-900">{getPostTitle(post_id)}</span>
        </p>
        <p>
          <span className="font-medium text-gray-600">User:</span>{" "}
          <span className="text-gray-900">{getUserName(user_id)}</span>
        </p>
        <p>
          <span className="font-medium text-gray-600">Content:</span>{" "}
          <span className="text-gray-900">{content}</span>
        </p>
      </div>
    </div>
  );
}

export default CommentWithId;
