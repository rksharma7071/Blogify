// Fetch All Users
const getAllUser = async () => {
  try {
    const response = await fetch("/api/users");
    if (!response.ok) throw new Error("Failed to fetch users");
    const data = await response.json();
    return { data };
  } catch (error) {
    console.error(error);
    return { data: [] }; // Always return { data: ... } for consistency
  }
};

// Fetch User by ID
const getUserWithId = async ({ params }) => {
  try {
    const userId = params.id; // This works correctly with React Router loader
    const response = await fetch(`/api/users/${userId}`);
    if (!response.ok) throw new Error("Failed to fetch user");
    const data = await response.json();
    return { data };
  } catch (error) {
    console.error(error);
    return { data: null }; // Keep structure consistent
  }
};

// Delete User by ID
const deleteUserWithId = async (userId) => {
  try {
    const response = await fetch(`/api/users/${userId}`, {
      method: "DELETE",
    });
    if (!response.ok) throw new Error("Failed to delete user");
    const data = await response.json();
    return { data };
  } catch (error) {
    console.error("Error deleting user:", error);
    return { data: null };
  }
};

export { getAllUser, getUserWithId, deleteUserWithId };
