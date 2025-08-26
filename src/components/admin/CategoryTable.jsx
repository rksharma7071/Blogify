import React from "react";
import { Link } from "react-router-dom";
import { deleteCategoryWithId } from "../../api_fetch/category";

function CategoryTable({ refreshCategories, categories }) {
  const handleDeleteCategory = async (id) => {
    if (confirm("Do you want to delete category?")) {
      try {
        const response = await deleteCategoryWithId(id);
        alert(response.data.message);
        await refreshCategories();
      } catch (error) {
        console.error("Error deleting category:", error);
      }
    }
  };

  return (
    <div className="bg-white shadow-md rounded-md p-6">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">
        All Categories
      </h2>
      <div className="overflow-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                S.No.
              </th>
              {/* <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                ID
              </th> */}
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                Name
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                Description
              </th>
              <th className="px-4 py-2 text-center text-sm font-medium text-gray-700">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {categories.map((category, index) => (
              <tr key={category._id} className="hover:bg-gray-50">
                <td className="px-4 py-2 text-sm text-gray-600">{index + 1}</td>
                {/* <td className="px-4 py-2 text-sm text-gray-500">
                  {category._id}
                </td> */}
                <td className="px-4 py-2 text-blue-600 font-medium">
                  <Link to={category._id}>{category.name}</Link>
                </td>
                <td className="px-4 py-2 text-sm text-gray-600">
                  {category.description}
                </td>
                <td className="px-4 py-2 text-center">
                  <button
                    onClick={() => handleDeleteCategory(category._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 text-sm"
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

export default CategoryTable;
