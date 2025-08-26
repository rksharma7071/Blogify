import React from "react";
import { Link } from "react-router-dom";
import { deleteTagWithId } from "../../api_fetch/tag";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";

function TagTable({ refreshTags, tags, showToast, onEditTag }) {
  const handleDeleteTag = async (id) => {
    if (confirm("Do you want to delete tag?")) {
      try {
        await deleteTagWithId(id);
        await refreshTags();
        showToast("Tag deleted successfully!", "success");
      } catch (error) {
        console.error("Error deleting tag:", error);
        showToast("Error deleting tag", "error");
      }
    }
  };

  return (
    <div className="mt-6">
      <h2 className="text-2xl font-semibold mb-4 text-gray-700">All Tags</h2>
      <div className="overflow-auto rounded shadow">
        <table className="min-w-full divide-y divide-gray-200 bg-white">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">S.No.</th>
              {/* <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">ID</th> */}
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Name</th>
              <th className="px-4 py-2 text-center text-sm font-medium text-gray-700">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {tags.map((tag, index) => (
              <tr key={tag._id} className="hover:bg-gray-50">
                <td className="px-4 py-2 text-sm text-gray-600">{index + 1}</td>
                {/* <td className="px-4 py-2 text-sm text-gray-500">{tag._id}</td> */}
                <td className="px-4 py-2 text-blue-600 font-medium">
                  <Link to={tag._id}>{tag.name}</Link>
                </td>
                <td className="px-4 py-2 text-center space-x-2">
                  <button
                    onClick={() => onEditTag(tag)}
                    className="text-yellow-500 hover:text-yellow-600 text-lg"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => handleDeleteTag(tag._id)}
                    className="text-red-500 hover:text-red-600 text-lg"
                  >
                    <MdDelete />
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

export default TagTable;
