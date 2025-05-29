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
    const full_name = user?.first_name;
    return user ? full_name : "Unknown User";
  };

  return (
    <div>
      <h1>Comment: {_id}</h1>
      <p>
        Post Id: <strong>{getPostTitle(post_id)}</strong>
      </p>
      <p>
        User Id: <strong>{getUserName(user_id)}</strong>
      </p>
      <p>
        Content: <strong>{content}</strong>
      </p>
    </div>
  );
}

export default CommentWithId;
