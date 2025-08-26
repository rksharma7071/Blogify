const getAllPostTag = async () => {
  try {
    const [postTagsResponse, tagsResponse, postsResponse] = await Promise.all([
      fetch("/api/postTags/"),
      fetch("/api/tags/"),
      fetch("/api/posts"),
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
      fetch("/api/postTags/"),
      fetch("/api/tags/"),
      fetch("/api/posts"),
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
