const API_BASE = import.meta.env.VITE_API;


console.log("API_BASE:", API_BASE);

const getAllCategory = async () => {
  try {
    const response = await fetch(`${API_BASE}/categories`);
    if (!response.ok) throw new Error("Failed to fetch");
    const data = await response.json();
    
    return { data };
  } catch (error) {
    console.error(error);
    return [];
  }
};


const getCategoryWithId = async ({params}) => {
  // console.log("getCategoryWithId called with params:", params);

  try {
    const { slug } = params;
    console.log("Fetching category with slug:", params);
    const response = await fetch(`${API_BASE}/categories/${slug}`);
    if (!response.ok) throw new Error("Failed to fetch category");

    const data = await response.json();
    console.log("Fetched category data:", data);
    return data; // directly return category object
  } catch (error) {
    console.error("Error loading category:", error);
    throw error;
  }
};

const deleteCategoryWithId = async (categoryId) => {
  try {
    const response = await fetch(`${API_BASE}/categories/${categoryId}`, {
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

export { getAllCategory, getCategoryWithId, deleteCategoryWithId };
