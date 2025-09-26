const API_BASE = import.meta.env.VITE_API;

const getAllPostTag = async () => {
  try {
    const [postTagsResponse, tagsResponse, postsResponse] = await Promise.all([
      fetch(`${API_BASE}/postTags/`),
      fetch(`${API_BASE}/tags/`),
      fetch(`${API_BASE}/posts`),
    ]);

    if (!tagsResponse.ok || !postsResponse.ok || !postTagsResponse.ok)
      throw new Error("Failed to fetch");

    const postTagsData = await postTagsResponse.json();
    const tagsData = await tagsResponse.json();
    const postsData = await postsResponse.json();

    return { postTagsData, tagsData, postsData };
  } catch (error) {
    console.error(error);
    return { postTagsData: [], tagsData: [], postsData: [] };
  }
};
const getPostTagWithId = async () => {
  try {
    const [postTagsResponse, tagsResponse, postsResponse] = await Promise.all([
      fetch(`${API_BASE}/postTags/`),
      fetch(`${API_BASE}/tags/`),
      fetch(`${API_BASE}/posts`),
    ]);

    if (!tagsResponse.ok || !postsResponse.ok || !postTagsResponse.ok)
      throw new Error("Failed to fetch");

    const postTagsData = await postTagsResponse.json();
    const tagsData = await tagsResponse.json();
    const postsData = await postsResponse.json();

    return { postTagsData, tagsData, postsData };
  } catch (error) {
    console.error(error);
    return { postTagsData: [], tagsData: [], postsData: [] };
  }
};

export { getAllPostTag, getPostTagWithId };
