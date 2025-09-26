const API_BASE = import.meta.env.VITE_API;

const getAllComment = async () => {
  try {
    const [commentsResponse, usersResponse, postsResponse] = await Promise.all([
      fetch(`${API_BASE}/comments`),
      fetch(`${API_BASE}/users/`),
      fetch(`${API_BASE}/posts/`),
    ]);

    if (!commentsResponse.ok || !usersResponse.ok || !postsResponse.ok)
      throw new Error("Failed to fetch");

    const commentsData = await commentsResponse.json();
    const usersData = await usersResponse.json();
    const postsData = await postsResponse.json();

    return { commentsData, usersData, postsData };
  } catch (error) {
    console.error(error);
    return { commentsData: [], usersData: [], postsData: [] };
  }
};

const getCommentWithId = async (commentId) => {
  try {
    commentId = commentId.params.id;
    const [commentsResponse, usersResponse, postsResponse] = await Promise.all([
      fetch(`${API_BASE}/comments/${commentId}`),
      fetch(`${API_BASE}/users/`),
      fetch(`${API_BASE}/posts/`),
    ]);

    if (!commentsResponse.ok || !usersResponse.ok || !postsResponse.ok)
      throw new Error("Failed to fetch");

    const commentsData = await commentsResponse.json();
    const usersData = await usersResponse.json();
    const postsData = await postsResponse.json();

    return { commentsData, usersData, postsData };
  } catch (error) {
    console.error(error);
    return { commentsData: [], usersData: [], postsData: [] };
  }
};

const deleteCommentWithId = async (commentId) => {
  try {
    const response = await fetch(`${API_BASE}/comments/${commentId}`, {
      method: "DELETE",
    });

    if (!response.ok) throw new Error("Failed to delete comment");
    const data = await response.json();
    return { data };
  } catch (error) {
    console.error("Error deleting comment:", error);
    return null;
  }
};

export {getAllComment, getCommentWithId, deleteCommentWithId};
