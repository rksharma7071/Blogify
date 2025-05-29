import React from "react";
import { Link } from "react-router-dom";
import { deleteTagWithId } from "../api_fetch/tag";
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
    <>
      <h1>All Tags</h1>
      <div className="table-container">
        <table border="1" cellPadding="10">
          <thead>
            <tr>
              <th>S.No.</th>
              <th>ID</th>
              <th>Name</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {tags.map((tag, index) => (
              <tr key={tag._id}>
                <td>{index + 1}</td>
                <td>{tag._id}</td>
                <td>
                  <strong>
                    <Link to={tag._id}>{tag.name}</Link>
                  </strong>
                </td>
                <td style={{ textAlign: "center" }}>
                  {/* Edit Button */}
                  <span
                    onClick={() => onEditTag(tag)}
                    className="edit-btn"
                    style={{ marginLeft: "8px", fontSize: "20px" }}
                  >
                    <FaEdit />
                  </span>

                  {/* Delete Button */}
                  {/* <button
                    onClick={() => handleDeleteTag(tag._id)}
                    className="delete-btn"
                    style={{ marginLeft: "8px" }}
                  >
                    🗑️
                  </button> */}
                  <span
                    onClick={() => handleDeleteTag(tag._id)}
                    className="delete-btn"
                    style={{ marginLeft: "8px", fontSize: "20px" }}
                  >
                    <MdDelete />
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default TagTable;
