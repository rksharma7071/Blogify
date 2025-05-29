import axios from "../axiosConfig";  // Always use this


const getAllTag = async () => {
  try {
    const response = await fetch("/api/tags");
    if (!response.ok) throw new Error("Failed to fetch");
    const data = await response.json();
    // console.log(data);
    return { data };
  } catch (error) {
    console.error(error);
    return [];
  }
};
const getTagWithId = async (tagId) => {
  try {
    tagId = tagId.params.id;
    const response = await fetch(`/api/tags/${tagId}`);
    if (!response.ok) throw new Error("Failed to fetch");
    const data = await response.json();
    // console.log(data);
    return { data };
  } catch (error) {
    console.error(error);
    return [];
  }
};


const deleteTagWithId = async (tagId) => {
  try {
    const response = await fetch(`/api/tags/${tagId}`, {
      method: "DELETE",
    });

    if (!response.ok) throw new Error("Failed to delete tag");
    const data = await response.json();
    return { data };
  } catch (error) {
    console.error("Error deleting tag:", error);
    return null;
  }
};

export { getAllTag, getTagWithId, deleteTagWithId };
