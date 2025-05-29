import React, { useState } from "react";
import { useLoaderData } from "react-router-dom";
import CommentForm from "../components/CommentForm";
import CommentTable from "../components/CommentTable";
import {getAllComment} from "../api_fetch/comment";


function Comment() {
  const { commentsData, usersData, postsData } = useLoaderData();
  const [comments, setComments] = useState(commentsData);

  const refreshComments = async () => {
    const updateCommentData = await getAllComment();
    setComments(updateCommentData.commentsData || []);
  };

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
      <CommentForm
        commentsData={comments}
        usersData={usersData}
        postsData={postsData}
        refreshComments={refreshComments}
      />
      <CommentTable
        commentsData={comments}
        getPostTitle={getPostTitle}
        getUserName={getUserName}
        refreshComments={refreshComments}
      />
    </div>
  );
}

export default Comment;
