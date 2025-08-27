const getAllPost = async () => {
  try {
    const [postsResponse, usersResponse, categoriesResponse] =
      await Promise.all([
        fetch("/api/posts"),
        fetch("/api/users"),
        fetch("/api/categories"),
      ]);

    if (!categoriesResponse.ok || !usersResponse.ok || !postsResponse.ok)
      throw new Error("Failed to fetch");

    const categoriesData = await categoriesResponse.json();
    const usersData = await usersResponse.json();
    const postsData = await postsResponse.json();

    return { categoriesData, usersData, postsData };
  } catch (error) {
    console.error(error);
    return [];
  }
};


const getPostWithId = async (postId) => {
  try {
    postId = postId.params.slug;
    // console.log("postId", postId);

    const { categoriesData, usersData, postsData } = await getAllPost();

    const post = postsData.find((post) => post.slug === postId);
    if (!post) throw new Error("Post not found");

    const postWithDetails = {
      ...post,
      author_id: post.author_id,
      category_id: post.category_id,
    };

    return { data: postWithDetails };
  } catch (error) {
    console.error(error);
    return null;
  }
};

const deletePostWithId = async (postId) => {
  console.log(postId);
  try {
    const response = await fetch(`/api/posts/${postId}`, {
      method: "DELETE",
    });

    if (!response.ok) throw new Error("Failed to delete post");
    const data = await response.json();
    return { data };
  } catch (error) {
    console.error("Error deleting post:", error);
    return null;
  }
};

export { getAllPost, getPostWithId, deletePostWithId };
