import React from "react";
import { Link } from "react-router-dom";
import { deleteCommentWithId } from "../../api_fetch/comment";

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
    <div className="bg-white shadow-md rounded-md p-6">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">
        All Comments
      </h2>
      <div className="overflow-auto">
        <table className="min-w-full divide-y divide-gray-200 text-sm">
          <thead className="bg-gray-100 text-left text-gray-700">
            <tr>
              <th className="px-4 py-2">S.No.</th>
              <th className="px-4 py-2">ID</th>
              <th className="px-4 py-2">Username</th>
              <th className="px-4 py-2">Post Title</th>
              <th className="px-4 py-2">Content</th>
              <th className="px-4 py-2 text-center">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {commentsData.map((comment, index) => (
              <tr key={comment._id} className="hover:bg-gray-50">
                <td className="px-4 py-2">{index + 1}</td>
                <td className="px-4 py-2 text-blue-600">
                  <Link to={comment._id}>{comment._id}</Link>
                </td>
                <td className="px-4 py-2">{getUserName(comment.user_id)}</td>
                <td className="px-4 py-2">{getPostTitle(comment.post_id)}</td>
                <td className="px-4 py-2">{comment.content}</td>
                <td className="px-4 py-2 text-center">
                  <button
                    onClick={() => handleDeleteComment(comment._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default CommentTable;
