const getAllCategory = async () => {
  try {
    const response = await fetch("/api/categories");
    if (!response.ok) throw new Error("Failed to fetch");
    const data = await response.json();
    return { data };
  } catch (error) {
    console.error(error);
    return [];
  }
};

const getCategoryWithId = async (categoryId) => {
  try {
    categoryId = categoryId.params.id;

    const response = await fetch(`/api/categories/${categoryId}`);
    if (!response.ok) throw new Error("Failed to fetch");
    const data = await response.json();
    return { data };
  } catch (error) {
    console.error(error);
    return [];
  }
};


const deleteCategoryWithId = async (categoryId) => {
  try {
    const response = await fetch(`/api/categories/${categoryId}`, {
      method: "DELETE",
    });

    if (!response.ok) throw new Error("Failed to delete category");
    const data = await response.json();
    return { data };

  } catch (error) {
    console.error("Error deleting category:", error);
    return null;
  }
};

export {getAllCategory, getCategoryWithId, deleteCategoryWithId};
