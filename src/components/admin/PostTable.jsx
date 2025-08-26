import React from "react";
import { Link } from "react-router-dom";
import { deleteUserWithId } from "../../api_fetch/user";
import { deletePostWithId } from "../../api_fetch/post";

function PostTable({ refreshPosts, posts }) {
  const handleDeletePost = async (id) => {
    if (confirm("Do you want to delete post?")) {
      try {
        const response = await deletePostWithId(id);
        alert(response.data.message);
        await refreshPosts();
      } catch (error) {
        console.error("Error deleting post:", error);
      }
    }
  };

  return (
    <div className="max-w-7xl mx-auto mt-8">
      <h1 className="text-2xl font-bold text-gray-700 mb-4">All Posts</h1>
      <div className="overflow-auto rounded-lg shadow">
        <table className="min-w-full bg-white text-left border border-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 border-b">S.No.</th>
              {/* <th className="px-4 py-2 border-b">ID</th> */}
              <th className="px-4 py-2 border-b">Title</th>
              <th className="px-4 py-2 border-b">Content</th>
              <th className="px-4 py-2 border-b">Author</th>
              <th className="px-4 py-2 border-b">Category</th>
              <th className="px-4 py-2 border-b">Tags</th>
              <th className="px-4 py-2 border-b">Action</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((post, index) => (
              <tr key={post._id} className="hover:bg-gray-50">
                <td className="px-4 py-2 border-b">{index + 1}</td>
                {/* <td className="px-4 py-2 border-b text-sm text-gray-500">
                  {post._id}
                </td> */}
                <td className="px-4 py-2 border-b text-blue-600 font-semibold">
                  <Link to={post.slug}>{post.title}</Link>
                </td>
                <td className="px-4 py-2 border-b">{post.content.slice(0, 50)}...</td>
                <td className="px-4 py-2 border-b">
                  {post.author_id?.username}
                </td>
                <td className="px-4 py-2 border-b">{post.category_id?.name}</td>
                <td className="px-4 py-2 border-b">
                  {post.tags.map((tag) => (
                    <span
                      key={tag._id}
                      className="inline-block text-xs bg-gray-200 px-2 py-1 rounded mr-1"
                    >
                      {tag.name}
                    </span>
                  ))}
                </td>
                <td className="px-4 py-2 border-b">
                  <button
                    onClick={() => handleDeletePost(post.slug)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
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

export default PostTable;
