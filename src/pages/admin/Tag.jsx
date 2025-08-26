import React, { useState } from "react";
import { useLoaderData } from "react-router-dom";
import TagTable from "../../components/admin/TagTable";
import TagForm from "../../components/admin/TagForm";
import { getAllTag } from "../../api_fetch/tag";
import Toast from "../../components/admin/Toast";

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
    <div className="max-w-5xl mx-auto p-4">
      {/* Add Tag Button */}
      <div className="flex justify-end mb-4">
        <button
          onClick={handleOpenModal}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          + Add Tag
        </button>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg p-6 shadow-md w-full max-w-md relative">
            <button
              onClick={handleCloseModal}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-xl"
            >
              ✖
            </button>
            <TagForm
              refreshTags={() => {
                refreshTags();
                handleCloseModal();
              }}
              showToast={showToast}
              initialData={editTagData}
            />
          </div>
        </div>
      )}

      {/* Tag Table */}
      <TagTable
        refreshTags={refreshTags}
        tags={tags}
        showToast={showToast}
        onEditTag={handleEditTag}
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
