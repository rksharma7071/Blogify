import React, { useState } from "react";
import { useLoaderData } from "react-router-dom";
import TagTable from "../components/TagTable";
import TagForm from "../components/TagForm";
import { getAllTag } from "../api_fetch/tag";
import Toast from "../components/Toast";

function Tag() {
  const loaderData = useLoaderData();
  const [tags, setTags] = useState(loaderData.data || []);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editTagData, setEditTagData] = useState(null); // for editing

  // Toast State
  const [toast, setToast] = useState({ message: "", type: "" });

  const showToast = (message, type = "success") => {
    setToast({ message, type });
  };

  const refreshTags = async () => {
    const updatedTagData = await getAllTag();
    setTags(updatedTagData.data || []);
  };

  const handleOpenModal = () => {
    setEditTagData(null); // clear edit state (so TagForm knows it's "add" mode)
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditTagData(null);
  };

  // Open modal with selected tag for editing
  const handleEditTag = (tag) => {
    setEditTagData(tag);
    setIsModalOpen(true);
  };

  return (
    <div>
      {/* Add Tag Button */}
      <button className="add-btn" onClick={handleOpenModal}>
        + Add Tag
      </button>

      {/* Modal */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button className="close-btn" onClick={handleCloseModal}>
              ✖
            </button>
            <TagForm
              refreshTags={() => {
                refreshTags();
                handleCloseModal();
              }}
              showToast={showToast}
              initialData={editTagData} // pass data when editing
            />
          </div>
        </div>
      )}

      <TagTable
        refreshTags={refreshTags}
        tags={tags}
        showToast={showToast}
        onEditTag={handleEditTag} // pass edit handler
      />

      {/* Toast Popup */}
      {toast.message && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast({ message: "", type: "" })}
        />
      )}
    </div>
  );
}

export default Tag;
