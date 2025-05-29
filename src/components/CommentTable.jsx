import React from "react";
import { Link } from "react-router-dom";
import { deleteCommentWithId } from "../api_fetch/comment";

function CommentTable({
  refreshComments,
  commentsData,
  getPostTitle,
  getUserName,
}) {
  const handleDeleteComment = async (id) => {
    if (confirm("Do you want to delete comment?")) {
      try {
        const response = await deleteCommentWithId(id);
        console.log(response);
        alert(response.data.message);
        await refreshComments();
      } catch (error) {
        console.error("Error deleting comment:", error);
      }
    }
  };
  return (
    <div>
      <h1>All Comments</h1>
      <table border={1} cellPadding={10}>
        <thead>
          <tr>
            <th>S.No.</th>
            <th>ID</th>
            <th>Username</th>
            <th>Post Name</th>
            <th>Content</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {commentsData.map((comment, index) => (
            <tr key={comment._id}>
              <td>{index + 1}</td>
              <td>
                <Link to={comment._id}>{comment._id}</Link>
              </td>
              <td>{getUserName(comment.user_id)}</td>
              <td>{getPostTitle(comment.post_id)}</td>
              <td>{comment.content}</td>
              <td>
                <button onClick={() => handleDeleteComment(comment._id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default CommentTable;
